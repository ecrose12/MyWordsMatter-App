// Where the app sends things to your website's server.
// The app talks to the same server as mywordsmatter.app, so both share one
// support inbox (and, later, the same accounts and picture cards).

export const API_BASE_URL = 'https://mywordsmatter.app';

export function apiUrl(path: string) {
  return `${API_BASE_URL}${path}`;
}
