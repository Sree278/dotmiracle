import type { ContentSection } from '../lib/studio';

/** The HTML and JSON-LD both read the same questions from the published brief. */
export default function PageQuestions({ questions }: { questions: NonNullable<ContentSection['faq']> }) {
  if (!questions.length) return null;
  return <section id="frequently-asked-questions" className="search-section" aria-labelledby="faq-heading"><p className="eyebrow"><i/>PRACTICAL ANSWERS</p><h2 id="faq-heading">Frequently asked questions</h2><div className="divide-y divide-[#d9ddcf] border-y border-[#d9ddcf]">{questions.map(({ question, answer }) => <details key={question} className="group py-1"><summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 py-3 text-sm font-semibold [&::-webkit-details-marker]:hidden"><span>{question}</span><span aria-hidden="true" className="text-lg font-normal group-open:rotate-45">+</span></summary><p className="pb-4 text-sm leading-relaxed text-[#5d655b]">{answer}</p></details>)}</div></section>;
}
