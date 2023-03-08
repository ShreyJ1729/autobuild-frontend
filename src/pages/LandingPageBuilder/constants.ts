export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: "About",
    href: "#",
  },
  {
    label: "Products",
    children: [
      {
        label: "LandingPage",
        subLabel: "Build a landing page in seconds from text description.",
        href: "#",
      },
      {
        label: "Iterate",
        subLabel: "NLP-driven full-stack development.",
        href: "#",
      },
    ],
  },
  {
    label: "Blog",
    href: "#",
  },
];

export interface DESCRIPTION_EXAMPLE {
  title: string;
  description: string;
  color: string;
}

export const DESCRIPTION_EXAMPLES: Array<DESCRIPTION_EXAMPLE> = [
  {
    title: "Digital Marketing Agency",
    description:
      "ClickFuel, a digital marketing agency for small businesses and startups. We do SEO, PPC, social media, and email marketing.",
    color: "cyan",
  },
  {
    title: "Couchsurfing App for Student-Founders",
    description:
      "Surfa Club is a couchsurfing app for student-founders to connect with each other and find housing for conferences, hackathons, and other events.",
    color: "red",
  },
];
