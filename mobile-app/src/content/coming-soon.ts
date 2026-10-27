// The words on the Coming Soon page, copied exactly from
// mywordsmatter.app/coming-soon (checked character for character against the live site).

export type ComingSoonItem = { name: string; description: string };

export const COMING_SOON: { title: string; intro: string; items: ComingSoonItem[] } = {
  "title": "Coming Soon to My Words Matter",
  "intro": "Here's a look at what we're working on next:",
  "items": [
    {
      "name": "My Favorite Words",
      "description": "— a personal, quick-access list of the words and cards you use most"
    },
    {
      "name": "My Word Combinations",
      "description": "— save frequently-used combinations of cards (like a favorite meal order) to speak in one tap"
    },
    {
      "name": "My Favorite Words at School (or Work)",
      "description": "— a separate favorites list tailored to school or work settings"
    },
    {
      "name": "Recently Used PECs",
      "description": "— quick access to the cards you've used most recently"
    },
    {
      "name": "Saved Lists",
      "description": "— manage all your saved lists in one place (likely from your Account page)"
    },
    {
      "name": "My Family",
      "description": "— a page to view and manage everyone connected to your family account"
    }
  ]
};
