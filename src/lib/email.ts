import { CONTACT_EMAIL } from '../../shared/search-pages.js';

/** A brief the visitor sends from their own email app. Nothing is stored on the website. */
export interface EmailBrief { subject: string; body: string }

export const mailtoLink = ({ subject, body }: EmailBrief) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const gmailLink = ({ subject, body }: EmailBrief) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const briefText = ({ subject, body }: EmailBrief) => `To: ${CONTACT_EMAIL}\nSubject: ${subject}\n\n${body}`;

/** Open the visitor's email app with the brief filled in. */
export function openEmail(brief: EmailBrief) { window.location.href = mailtoLink(brief); }

export function saveBrief(brief: EmailBrief, fileName: string) {
  const url = URL.createObjectURL(new Blob([`DOTMIRACLE\n\n${briefText(brief)}\n`], { type: 'text/plain;charset=utf-8' }));
  const a = document.createElement('a'); a.href = url; a.download = fileName; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1500);
}
