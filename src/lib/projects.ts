import {
  BookOpenCheck,
  GraduationCapIcon,
  HandHeartIcon,
  HeartPulseIcon,
  type LucideIcon,
  ShoppingBasketIcon,
} from "lucide-react";

/**
 * The foundation is education-led. `education` projects are the core work;
 * `welfare` projects address the circumstances that pull a student out of
 * school in the first place.
 */
export type Pillar = "education" | "welfare";

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  /** One line, used on cards and in navigation. */
  summary: string;
  /** Two or three paragraphs, used on the project page. */
  body: string[];
  image: string;
  icon: LucideIcon;
  pillar: Pillar;
  /** Displayed as a labelled figure on the project page. */
  stat: { value: string; label: string };
  highlights: string[];
  /** What a supporter's money buys on this specific project. */
  costs: { amount: string; covers: string }[];
  /** Concrete ways to help, shown in the project page sidebar. */
  needs: string[];
  seasonal?: boolean;
};

/**
 * TODO: every figure and description below is a placeholder written from the
 * project titles. Replace with the foundation's real numbers and wording.
 */
export const projects: Project[] = [
  {
    slug: "students-education",
    title: "Students Education",
    shortTitle: "Students Education",
    summary:
      "School fees, uniforms, books and stationery for students whose families cannot afford to keep them enrolled.",
    body: [
      "This is the foundation's core work. We pay school fees directly to the institution, never in cash, and cover the costs that quietly force families to withdraw a child: admission charges, uniforms, shoes, textbooks and stationery.",
      "Students are enrolled for a full academic year at a time, so no one loses their place mid-session. Where a household depends on a child's earnings, we add a monthly stipend that offsets what the child would have brought home, because asking a family to choose between food and schooling is not a real choice.",
      "Places are prioritised for students at the points where drop-out is most likely — around grade five, and earlier for girls.",
    ],
    image: "/images/projects/students-education.jpg",
    icon: GraduationCapIcon,
    pillar: "education",
    stat: { value: "2,400+", label: "students supported to date" },
    highlights: [
      "Fees paid directly to the school, never in cash",
      "Uniforms, textbooks and stationery for the full academic year",
      "Monthly stipend for households that depend on a child's income",
      "Places prioritised for girls at risk of leaving after grade five",
    ],
    costs: [
      { amount: "PKR 3,000", covers: "One month of school fees for one student" },
      { amount: "PKR 8,000", covers: "A full year of books, uniform and stationery" },
      { amount: "PKR 35,000", covers: "A full academic year for one student" },
    ],
    needs: [
      "Sponsor a student for a term or a full year",
      "Donate new or good-condition uniforms and school shoes",
      "Help us verify applications in Faisalabad through home visits",
    ],
  },
  {
    slug: "free-education-tutorship",
    title: "Free Education & Tutorship",
    shortTitle: "Free Education & Tutorship",
    summary:
      "Free after-school tuition centres and one-to-one tutoring, so enrolment turns into actual learning.",
    body: [
      "Enrolment on its own does not educate a child. Most of our students are the first in their family to reach secondary school, and there is no one at home who can help with mathematics or English. Without support they fall behind, then fail, then leave.",
      "Our free tuition centres run small-group sessions after school hours, taught by paid local teachers alongside volunteer tutors. Class sizes are deliberately small so that a student who is struggling is noticed in the first week rather than at the end of term.",
      "We review attendance and grades every term for every student we support. When attendance drops, the response is a home visit to find out why — not withdrawal of support.",
    ],
    image: "/images/projects/free-education-tutorship.jpg",
    icon: BookOpenCheck,
    pillar: "education",
    stat: { value: "310", label: "students tutored every week" },
    highlights: [
      "Free after-school tuition in mathematics, English and science",
      "Small groups so struggling students are spotted early",
      "Termly attendance and grade reviews for every student",
      "Board exam preparation and past-paper practice for senior students",
    ],
    costs: [
      { amount: "PKR 2,500", covers: "One month of tuition for one student" },
      { amount: "PKR 12,000", covers: "A teacher's monthly salary contribution" },
      { amount: "PKR 25,000", covers: "Learning materials for a centre for a term" },
    ],
    needs: [
      "Teach a subject you know — even two evenings a week helps",
      "Tutor remotely by video call from anywhere",
      "Donate books, stationery or a working laptop",
    ],
  },
  {
    slug: "ramzan-ration-pack",
    title: "Ramzan Ration Pack",
    shortTitle: "Ramzan Ration",
    summary:
      "A month's essential groceries delivered to households before Ramzan begins, with dignity and without queues.",
    body: [
      "Food prices rise sharply in the weeks before Ramzan, exactly when households need more. Our ration packs are assembled and delivered before the month begins, so families are not left waiting or queuing in public for help.",
      "Each pack contains a month's staples for an average household: flour, rice, cooking oil, pulses, sugar, tea, dates and spices. Packs are delivered to the home by volunteers, which keeps the process private and lets us check on families we already know through the education and widows projects.",
      "Recipients are drawn from our verified list, with priority given to widow-headed households and the families of students we support.",
    ],
    image: "/images/projects/ramzan-ration-pack.jpg",
    icon: ShoppingBasketIcon,
    pillar: "welfare",
    stat: { value: "6,500", label: "ration packs distributed" },
    highlights: [
      "A full month of staples: flour, rice, oil, pulses, sugar, tea and dates",
      "Delivered to the home, so no family has to queue in public",
      "Distributed before Ramzan starts, not during it",
      "Priority for widow-headed households and students' families",
    ],
    costs: [
      { amount: "PKR 15,000", covers: "One full ration pack for one household" },
      { amount: "PKR 45,000", covers: "Ration packs for three households" },
      { amount: "PKR 150,000", covers: "Ration packs for ten households" },
    ],
    needs: [
      "Sponsor one or more ration packs",
      "Join the packing team in the weeks before Ramzan",
      "Help with delivery if you have a vehicle",
    ],
    seasonal: true,
  },
  {
    slug: "widows-support",
    title: "Widows Support",
    shortTitle: "Widows Support",
    summary:
      "Monthly support and skills training for widowed women, so their children stay in school rather than at work.",
    body: [
      "When a household loses its earner, the first economy made is almost always a child's schooling. Supporting widowed women is therefore inseparable from our education work — it is often the single most effective way to keep a student enrolled.",
      "We provide a monthly stipend to widow-headed households on our verified list, alongside skills training in stitching, embroidery and small-scale food production, plus small grants for the equipment needed to start earning independently.",
      "The aim is not indefinite assistance. It is to get a household through the period after a bereavement without the children being pulled out of school, and to leave the mother with an income she controls.",
    ],
    image: "/images/projects/widows-support.jpg",
    icon: HandHeartIcon,
    pillar: "welfare",
    stat: { value: "180", label: "households receiving monthly support" },
    highlights: [
      "Monthly stipend for verified widow-headed households",
      "Skills training in stitching, embroidery and food production",
      "Small equipment grants — a sewing machine, tools, initial stock",
      "Children of supported households prioritised for scholarships",
    ],
    costs: [
      { amount: "PKR 10,000", covers: "One month of support for one household" },
      { amount: "PKR 30,000", covers: "A sewing machine and starter materials" },
      { amount: "PKR 120,000", covers: "A year of support for one household" },
    ],
    needs: [
      "Sponsor a household's monthly support",
      "Teach a skill: stitching, embroidery, book-keeping or literacy",
      "Buy from the women we support, or help them find buyers",
    ],
  },
  {
    slug: "health-support",
    title: "Health Support",
    shortTitle: "Health Support",
    summary:
      "Free medical camps, medicines and treatment referrals for families who cannot afford care.",
    body: [
      "Illness in a household is one of the most common reasons a student stops attending school, either because they are unwell themselves or because they are caring for someone who is. Medical debt does the rest.",
      "Our free medical camps bring general physicians, paediatric care and basic diagnostics into neighbourhoods where the nearest functioning facility is hours away or unaffordable. Medicines are dispensed on site at no cost.",
      "Patients who need specialist treatment, surgery or ongoing medication are referred onward, and the foundation covers the cost where the family cannot. We follow up rather than assuming a referral was acted on.",
    ],
    image: "/images/projects/health-support.jpg",
    icon: HeartPulseIcon,
    pillar: "welfare",
    stat: { value: "18,000", label: "patients seen at free camps" },
    highlights: [
      "Free medical camps with medicines dispensed on site",
      "Maternal and child health screening",
      "Referral and cost cover for surgery and specialist treatment",
      "Follow-up visits, so a referral is not the end of the story",
    ],
    costs: [
      { amount: "PKR 1,500", covers: "One patient consultation and medicines" },
      { amount: "PKR 50,000", covers: "Medicines for one free medical camp" },
      { amount: "PKR 200,000", covers: "A full one-day camp for a neighbourhood" },
    ],
    needs: [
      "Volunteer as a doctor, dentist, paramedic or pharmacist",
      "Donate medicines that are well within their expiry date",
      "Sponsor a camp in a specific neighbourhood",
    ],
  },
];

export const educationProjects = projects.filter((p) => p.pillar === "education");
export const welfareProjects = projects.filter((p) => p.pillar === "welfare");

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** TODO: replace with audited figures before publishing. */
export const impactStats = [
  { value: "2,400+", label: "Students supported in school" },
  { value: "310", label: "Students tutored every week" },
  { value: "6,500", label: "Ramzan ration packs distributed" },
  { value: "180", label: "Widow-headed households supported" },
];

export const values = [
  {
    title: "Education first",
    body: "Every decision is measured against one question: does this keep a student in school and learning?",
  },
  {
    title: "Local knowledge",
    body: "Projects start with families and teachers in Faisalabad telling us what they need, not with a plan written in an office.",
  },
  {
    title: "Open books",
    body: "Spending is tracked against outcomes and reported publicly, including the things that did not work.",
  },
];
