export type Procedure = {
  slug: string;
  title: string;
  summary: string;
  animationUrl?: string;
  steps: { title: string; detail: string }[];
};

export type Case = {
  id: string;
  title: string;
  category: "hand" | "burn" | "nerve" | "aesthetic";
  image: string;
};

export const localProcedures: Procedure[] = [
  {
    slug: "nerve-grafting",
    title: "Nerve Grafting",
    summary: "Microsurgical techniques to bridge nerve gaps.",
    steps: [
      { title: "Assessment", detail: "Exam and donor planning." },
      { title: "Technique", detail: "Autograft or conduit under microscope." },
      { title: "Rehabilitation", detail: "Protection then re-education." },
      { title: "Risks", detail: "Neuroma, incomplete recovery." },
    ],
  },
  {
    slug: "tendon-transfer",
    title: "Tendon Transfer",
    summary: "Re-routing functioning tendons to restore motion.",
    steps: [
      { title: "Assessment", detail: "Deficit and donor synergy." },
      { title: "Technique", detail: "Tensioning and pulley care." },
      { title: "Rehabilitation", detail: "Protected motion, strengthening later." },
      { title: "Risks", detail: "Adhesion, imbalance." },
    ],
  },
];

export const localCases: Case[] = [
  { id: "h1", title: "Thumb replantation", category: "hand", image: "https://5.imimg.com/data5/IOS/Default/2023/1/LX/TJ/BX/2530125/product-jpeg-500x500.png" },
  { id: "n1", title: "Median nerve graft", category: "nerve", image: "https://ars.els-cdn.com/content/image/1-s2.0-S258951411930060X-gr4.jpg" },
  { id: "b1", title: "Post-burn release", category: "burn", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXpj9greYs23JxEkZFlKCqP6apT2v2FyL2ptc3r6YJ5lLkqppLjbaSn-pmWQ5rxGGARhE&usqp=CAU" },
  { id: "a1", title: "Lower blepharoplasty", category: "aesthetic", image: "https://img.freepik.com/premium-photo/two-shots-elderly-woman-face-with-puffiness-her-eyes-wrinkles-before-after-treatment_407348-2133.jpg" },
];

