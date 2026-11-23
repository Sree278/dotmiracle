/** Accept a public website with or without a scheme; validation never fetches it. */
export function validWebsite(input: string) {
  const value = input.trim();
  if (!value || value.length > 500) return false;
  try {
    const url = new URL(/^[a-z]+:/i.test(value) ? value : `https://${value}`);
    return ['http:', 'https:'].includes(url.protocol) && url.hostname.includes('.') && !url.username && !url.password;
  } catch { return false; }
}
