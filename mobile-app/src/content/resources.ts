// The words on the Resource Links page, copied exactly from
// mywordsmatter.app/resources (checked character for character against the live site),
// with one approved change for the phone app: the intro's last sentence
// "These links open in a new tab." -> "These links open in your browser."

export type ResourceItem = { name: string; url: string; description: string };
export type ResourceSection = { heading: string; items: ResourceItem[] };

export const RESOURCES: { title: string; intro: string; sections: ResourceSection[] } = {
  "title": "Resource Links",
  "intro": "Helpful external resources for social stories, PECS, and visual supports. These links open in your browser.",
  "sections": [
    {
      "heading": "Social Stories",
      "items": [
        {
          "name": "Carol Gray Social Stories",
          "url": "https://carolgraysocialstories.com/",
          "description": "The official source for Social Stories, created by Carol Gray, including a free sampler of ready-to-use stories."
        }
      ]
    },
    {
      "heading": "PECS & Visual Supports",
      "items": [
        {
          "name": "Pyramid Educational Consultants (PECS)",
          "url": "https://pecs.com/",
          "description": "The official training and resource provider for the Picture Exchange Communication System."
        },
        {
          "name": "Autism Speaks: Visual Supports",
          "url": "https://www.autismspeaks.org/visual-supports",
          "description": "Free tool kits, worksheets, and guides on using visual supports, including first-then boards and picture schedules."
        },
        {
          "name": "ARASAAC Pictogram Library",
          "url": "https://arasaac.org/",
          "description": "A free, open-licensed library of thousands of communication pictograms and symbols."
        }
      ]
    }
  ]
};
