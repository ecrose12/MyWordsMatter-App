// The words on the Meet the Creators page, copied exactly from
// mywordsmatter.app/team (checked character for character against the live site),
// with one approved fix: "over over 10 years" -> "over 10 years" in Laura's bio.

export type TeamBlock =
  | { type: 'p' | 'label'; text: string }
  | { type: 'arrowList'; items: string[] }
  | { type: 'boldLead'; lead: string; rest: string }
  | { type: 'link'; label: string; text: string; url: string };

export type TeamCard = { name: string; photoAlt: string; blocks: TeamBlock[] };

export const TEAM: { title: string; intro: string; cards: TeamCard[] } = {
  "title": "Meet the Creators",
  "intro": "My Words Matter was created by:",
  "cards": [
    {
      "name": "Elizabeth Crose",
      "photoAlt": "Elizabeth Crose",
      "blocks": [
        {
          "type": "p",
          "text": "Elizabeth is a Full Stack Developer and co-creator of My Words Matter, built during the OKCoders 2026 Full Stack, AI-Enhanced Software Development bootcamp through Techlahoma. Passionate about accessible technology, she set out to build a free, easy-to-use communication tool so cost and waiting lists never stand between someone and their voice."
        },
        {
          "type": "p",
          "text": "Her path into software development follows years of hands-on experience spanning payroll, human resources, finance, public-sector education, and community service — work that gave her a practical understanding of how people actually interact with systems, processes, and technology. For the past three years, she has supported the Human Resources, Payroll, and Finance departments as an Administrative Assistant for a public school district, where accuracy, organization, confidentiality, and clear communication were essential every day. She's currently scouting schools to complete her Computer Science degree and working toward her Google UX Design Professional Certification ahead of the Spring 2027 semester."
        },
        {
          "type": "p",
          "text": "Community involvement has long been part of Elizabeth's life. She has served on the Board of Directors for the Mighty Miracles Foundation and remains active with the Down Syndrome Association of Tulsa — experiences that let her advocate for others, build meaningful relationships, and support organizations making a real difference for individuals and families."
        },
        {
          "type": "p",
          "text": "Her move into software development is a natural extension of that experience — driven by how technology can make everyday processes more efficient, accessible, and user-friendly, backed by an understanding of both the people using a system and what it takes to build one that actually works for them."
        },
        {
          "type": "link",
          "label": "📎 LinkedIn:",
          "text": "linkedin.com/in/elizabethcrose",
          "url": "https://www.linkedin.com/in/elizabethcrose/"
        }
      ]
    },
    {
      "name": "Laura Sohl",
      "photoAlt": "Laura Sohl",
      "blocks": [
        {
          "type": "p",
          "text": "Laura is a Full Stack Developer and co-creator of My Words Matter, built during the OKCoders 2026 Full Stack, AI-Enhanced Software Development bootcamp through Techlahoma. With her graduate training, Laura brings something many designers and developers don't — a research-backed understanding of human behavior. She likes seeing why people make the decisions they do, what frustrates them, and how to design systems that fit the way they think and work."
        },
        {
          "type": "p",
          "text": "Laura has over 10 years of experience translating complex information into clear, accessible communications. She combines UX research and design skills with formal training in graphic design and full-stack development. Her M.S. in Industrial/Organizational Psychology provides a strong foundation in human factors and user behavior."
        },
        {
          "type": "label",
          "text": "She is comfortable working through the full design process:"
        },
        {
          "type": "arrowList",
          "items": [
            "→ UX research & usability testing",
            "→ Information architecture & content design",
            "→ Visual design: Adobe XD, InDesign, Illustrator, Photoshop, Figma, Canva, Microsoft Power Apps",
            "→ Front-end basics: HTML, CSS, JavaScript",
            "→ Scientific & data visualization"
          ]
        },
        {
          "type": "boldLead",
          "lead": "Certifications:",
          "rest": "OK Coders Full-stack Bootcamp (Techlahoma, 2026) · UX Design (Google/Coursera, 2025) · Graphic Design (RISD, 2025) · Scientific Illustration (2020)"
        },
        {
          "type": "link",
          "label": "📎 LinkedIn:",
          "text": "linkedin.com/in/laura-sohl-smith",
          "url": "https://www.linkedin.com/in/laura-sohl-smith/"
        },
        {
          "type": "link",
          "label": "📎 Portfolio:",
          "text": "sohlsmith.com",
          "url": "http://sohlsmith.com/"
        }
      ]
    }
  ]
};

// Photos, in the same order as the cards above.
export const TEAM_PHOTOS = [
  require('@/assets/images/team/elizabeth-crose.jpg'),
  require('@/assets/images/team/laura-sohl.jpg'),
];
