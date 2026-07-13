export type MinistryPathway = {
  id: "worship" | "connect" | "grow" | "serve";
  label: string;
  words: string[];
  accentWord: number;
  introduction: string;
  ministries: Array<{ name: string }>;
  cta: {
    label: string;
    href: string;
  };
};

export const ministryPathways: MinistryPathway[] = [
  {
    id: "worship",
    label: "Worship",
    words: ["Worship", "is", "our", "purpose."],
    accentWord: 0,
    introduction:
      "We gather to praise, pray, and receive God’s Word together in Tamil and English.",
    ministries: [
      { name: "Sunday Worship Service" },
      { name: "Communion Service" },
      { name: "First Day of the Month Service" },
      { name: "Kids’ Circle" }
    ],
    cta: { label: "Explore worship", href: "/worship" }
  },
  {
    id: "connect",
    label: "Connect",
    words: ["Connecting", "to", "grow."],
    accentWord: 0,
    introduction:
      "Faith becomes family as we share meals, celebrations, and everyday life together.",
    ministries: [
      { name: "Fellowship Meals" },
      { name: "Summer Picnic" },
      { name: "Family Visits" },
      { name: "Summer Carnival" },
      { name: "Harvest Festival" },
      { name: "Carol Rounds" }
    ],
    cta: { label: "Find your community", href: "/connect" }
  },
  {
    id: "grow",
    label: "Grow",
    words: ["Growing", "to", "serve."],
    accentWord: 0,
    introduction:
      "Every generation is encouraged to grow through Scripture, prayer, discipleship, and fellowship.",
    ministries: [
      { name: "Sunday School" },
      { name: "Youth Group, Women’s Fellowship & Men’s Fellowship" },
      { name: "Cottage Prayer Meetings" },
      { name: "Monthly Fasting Prayer & Annual Family Camp" },
      { name: "Intercessory Prayer" },
      { name: "Weekly Bible Study" }
    ],
    cta: { label: "Explore ways to grow", href: "/grow" }
  },
  {
    id: "serve",
    label: "Serve",
    words: ["Serving", "is", "a", "privilege."],
    accentWord: 0,
    introduction:
      "We joyfully use what God has given us to care for our neighbors and support His mission.",
    ministries: [
      { name: "Community Outreach" },
      { name: "Mission Support" },
      { name: "Mission Sunday" },
      { name: "Annual Christmas Festival" }
    ],
    cta: { label: "Find a way to serve", href: "/serve" }
  }
];
