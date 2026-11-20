#!/usr/bin/env python3
"""Check the generated site's SEO and navigation invariants without dependencies.

Run after `node scripts/build.mjs`: python3 scripts/check-seo.py
This checks generated HTML, not real-world rankings, consent, live HTTP status or Core Web Vitals.
"""
from collections import deque
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import json
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent / 'public'
SITE = 'https://dotmiracle.com'
NS = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}

class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.hidden = None
        self.script_json = False
        self.json_data = []
        self.json_buffer = ''
        self.breadcrumb = False
        self.breadcrumb_links = []
        self.breadcrumb_labels = []
        self.in_breadcrumb_link = False
        self.links = []
        self.canonicals = []
        self.descriptions = []
        self.robots = []
        self.headings = 0
        self.titles = []
        self.in_title = False
        self.tag_count = 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'script':
            if a.get('src') == 'https://www.googletagmanager.com/gtm.js?id=GTM-KWL6XQJZ':
                self.tag_count += 1
            self.hidden = 'script'
            self.script_json = a.get('type') == 'application/ld+json'
            self.json_buffer = ''
            return
        if tag == 'style':
            self.hidden = 'style'
            return
        if self.hidden:
            return
        if tag == 'title':
            self.in_title = True
            self.titles.append('')
        if tag == 'h1':
            self.headings += 1
        if tag == 'link' and 'canonical' in a.get('rel', '').split():
            self.canonicals.append(a.get('href'))
        if tag == 'meta' and a.get('name') == 'description':
            self.descriptions.append(a.get('content', ''))
        if tag == 'meta' and a.get('name') == 'robots':
            self.robots.append(a.get('content', ''))
        if tag == 'div' and 'breadcrumb' in a.get('class', '').split():
            self.breadcrumb = True
        if tag == 'a' and 'href' in a:
            self.links.append(a['href'])
            if self.breadcrumb:
                self.breadcrumb_links.append(a['href'])
                self.breadcrumb_labels.append('')
                self.in_breadcrumb_link = True

    def handle_endtag(self, tag):
        if tag == 'script' and self.hidden == 'script':
            if self.script_json:
                self.json_data.append(json.loads(self.json_buffer))
            self.hidden = None
            self.script_json = False
            return
        if tag == 'style' and self.hidden == 'style':
            self.hidden = None
            return
        if self.hidden:
            return
        if tag == 'title':
            self.in_title = False
        if tag == 'a':
            self.in_breadcrumb_link = False
        if tag == 'div' and self.breadcrumb:
            self.breadcrumb = False

    def handle_data(self, data):
        if self.hidden == 'script' and self.script_json:
            self.json_buffer += data
        elif not self.hidden and self.in_title:
            self.titles[-1] += data
        elif not self.hidden and self.in_breadcrumb_link:
            self.breadcrumb_labels[-1] += data


def path_of(file):
    rel = file.relative_to(ROOT)
    return '/' if rel == Path('index.html') else '/' + rel.parent.as_posix() + '/'


def fail(condition, message):
    if not condition:
        raise AssertionError(message)


def main():
    files = sorted(ROOT.rglob('index.html'))
    fail(files, 'No generated pages found; run node scripts/build.mjs first')
    pages = {}
    titles = {}
    descriptions = {}
    for file in files:
        path = path_of(file)
        html = file.read_text(encoding='utf-8')
        page = Page()
        page.feed(html)
        page.close()
        pages[path] = page
        fail(page.headings == 1, f'{path}: expected one H1, found {page.headings}')
        fail(len(page.titles) == 1 and page.titles[0].strip(), f'{path}: missing or duplicate title')
        fail(len(page.descriptions) == 1 and page.descriptions[0], f'{path}: missing or duplicate description')
        fail(page.canonicals == [SITE + path], f'{path}: incorrect canonical {page.canonicals}')
        fail(page.tag_count == 1 and '<head>\n<script async src="https://www.googletagmanager.com/gtm.js?id=GTM-KWL6XQJZ"></script>' in html, f'{path}: Google container missing, duplicated, or misplaced')
        fail(not any('noindex' in r for r in page.robots), f'{path}: indexable page marked noindex')
        title = page.titles[0].strip()
        fail(title not in titles, f'{path}: duplicate title with {titles.get(title)}')
        titles[title] = path
        desc = page.descriptions[0]
        fail(desc not in descriptions, f'{path}: duplicate description with {descriptions.get(desc)}')
        descriptions[desc] = path
        if path != '/':
            graphs = [entry for data in page.json_data for entry in data.get('@graph', []) if entry.get('@type') == 'BreadcrumbList']
            fail(len(graphs) == 1, f'{path}: missing or duplicate BreadcrumbList')
            items = graphs[0]['itemListElement']
            expected = [urlsplit(item['item']).path for item in items[:-1]]
            fail(expected == page.breadcrumb_links, f'{path}: structured breadcrumbs {expected} do not match visible links {page.breadcrumb_links}')
            labels = [item['name'] for item in items[:-1]]
            visible_labels = [label.strip() for label in page.breadcrumb_labels]
            fail(labels == visible_labels, f'{path}: breadcrumb labels {labels} do not match visible labels {visible_labels}')
            fail(items[-1]['item'] == SITE + path, f'{path}: breadcrumb does not end at current page')
    sitemap = ET.parse(ROOT / 'sitemap.xml').getroot()
    locs = [item.text for item in sitemap.findall('s:url/s:loc', NS)]
    fail(len(locs) == len(set(locs)), 'Duplicate URLs in sitemap')
    fail(set(locs) == {SITE + path for path in pages}, 'Sitemap and generated pages differ')
    for path, page in pages.items():
        for href in page.links:
            url = urlsplit(href)
            if url.scheme or url.netloc or not url.path.startswith('/'):
                continue
            target = url.path
            if target.endswith('/'):
                fail(target in pages, f'{path}: broken internal page link {href}')
            else:
                fail((ROOT / target.lstrip('/')).is_file(), f'{path}: broken internal asset link {href}')
    visited = set()
    queue = deque(['/'])
    while queue:
        path = queue.popleft()
        if path in visited:
            continue
        visited.add(path)
        for href in pages[path].links:
            url = urlsplit(href)
            if not url.scheme and not url.netloc and url.path in pages:
                queue.append(url.path)
    fail(set(pages) == visited, f'Pages unreachable from the home page: {sorted(set(pages) - visited)}')
    not_found = Page()
    not_found.feed((ROOT / '404.html').read_text(encoding='utf-8'))
    fail(any('noindex' in value for value in not_found.robots), '404 page must be noindex')
    fail(not_found.tag_count == 1, '404 page must include exactly one container tag')
    print(f'Validated {len(pages)} indexable pages, internal navigation, structured breadcrumbs, sitemap, 404, metadata and container placement.')

if __name__ == '__main__':
    main()
