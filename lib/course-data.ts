export type Lesson = {
  id: string;
  title: string;
  duration: string;
  bunnyVideoId?: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  feedback: string;
};

export type CourseSection = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type PdfResource = {
  id: string;
  title: string;
  url: string;
};

export type CourseStatus = "active" | "coming_soon";

export type CourseOffer = {
  id: string;
  title: string;
  description: string;
  status: CourseStatus;
  priceInr: number;
  originalPriceInr: number;
  imageUrl: string;
  bunnyVideoId: string;
  lessons: Lesson[];
  sections: CourseSection[];
  pdfs: PdfResource[];
};

export type FlagshipCourse = {
  brand: string;
  tagline: string;
  title: string;
  description: string;
  priceInr: number;
  originalPriceInr: number;
  curriculum: {
    mindTraining: Lesson[];
    careerGuidance: Lesson[];
  };
  courseOffers: CourseOffer[];
  testimonials: Testimonial[];
};

const coreConceptsLessons: Lesson[] = [
  { id: "pps-1", title: "Day 1 — Overcome Fear of Public Speaking", duration: "15 min", bunnyVideoId: "9ff73a36-c7fb-422e-ac68-e0ff240167e0" },
  { id: "pps-2", title: "Day 2 — Powerful Voice & Body Language", duration: "18 min", bunnyVideoId: "22b13f62-bbcd-47d1-bcfb-cbda16461c89" },
  { id: "pps-3", title: "Day 3 — Hook, Line & Audience Attention", duration: "20 min", bunnyVideoId: "e06cd0c8-ee9b-456a-bbe8-5308fb9ab772" },
  { id: "pps-4", title: "Day 4 — Storytelling Mastery", duration: "22 min", bunnyVideoId: "a2606fac-2570-4ef7-8273-79cef64111eb" },
  { id: "pps-5", title: "Day 5 — Influence & Persuasion Psychology", duration: "21 min", bunnyVideoId: "5cec2098-d9a8-4e91-ae6b-688631c5c88d" },
  { id: "pps-6", title: "Day 6 — Camera Speaking & Social Media", duration: "19 min", bunnyVideoId: "50ba8728-a9ea-4917-8555-e402e7faae03" },
  { id: "pps-7", title: "Day 7 — Stage Performance Mastery", duration: "24 min", bunnyVideoId: "d687474c-0f9f-440e-acce-f900153351f8" },
];

const advancedTutorialLessons: Lesson[] = [
  { id: "pt-1", title: "Mirror Practice", duration: "10 min", bunnyVideoId: "9aa14b30-d5bd-473b-87d4-aab6934eeee9" },
  { id: "pt-2", title: "Background Tips", duration: "12 min", bunnyVideoId: "39c9b66b-a172-4088-b6bb-d991dab36436" },
  { id: "pt-3", title: "Video Shooting Ideas", duration: "14 min", bunnyVideoId: "ba10d06c-9932-4cfe-b724-39aa3107da02" },
  { id: "pt-4", title: "Ring Light Use", duration: "8 min", bunnyVideoId: "f6060e7c-5260-4e98-b66d-c9a70720d8b6" },
  { id: "pt-5", title: "Ring Light + Video Shoot", duration: "16 min", bunnyVideoId: "1be11696-5f3a-442b-9def-81148b048fd0" },
  { id: "pt-6", title: "Dressing Sense", duration: "9 min", bunnyVideoId: "612871d0-0b09-4f8f-a2e7-dbe6c008649c" },
  { id: "pt-7", title: "Breathing Technique", duration: "11 min", bunnyVideoId: "aae60d0e-7e2e-4ed4-bdbf-61d9785ff7a0" },
  { id: "pt-8", title: "Voice Clarity", duration: "13 min", bunnyVideoId: "87508c8b-f5c3-4098-94d4-3160b0af8cbf" },
  { id: "pt-9", title: "Disfluency — Public Speaking Killer", duration: "12 min", bunnyVideoId: "a5b8f7d1-b550-428b-a48c-70846d4ed0f5" },
  { id: "pt-10", title: "Public Speaking Formula", duration: "17 min", bunnyVideoId: "43a528fb-5c70-4e24-b9d6-81a94a139173" },
];

const flagshipPublicSpeakingCourse: CourseOffer = {
  id: "powerful-public-speaking",
  title: "Powerful Public Speaking",
  description:
    "A practical speaking system that builds confidence, presence, and communication clarity through guided video lessons and downloadable resources.",
  status: "active",
  priceInr: 99,
  originalPriceInr: 999,
  imageUrl: "/images/course-speaking.svg",
  bunnyVideoId: "9ff73a36-c7fb-422e-ac68-e0ff240167e0",
  sections: [
    {
      id: "core-concepts",
      title: "Core Concepts",
      lessons: coreConceptsLessons,
    },
    {
      id: "advanced-tutorials",
      title: "Advanced Tutorials",
      lessons: advancedTutorialLessons,
    },
  ],
  lessons: [...coreConceptsLessons, ...advancedTutorialLessons],
  pdfs: [
    { id: "core-concepts-guide", title: "Core Concepts Guide", url: "/downloads/core-concepts-guide.pdf" },
    { id: "advanced-tutorials-workbook", title: "Advanced Tutorials Workbook", url: "/downloads/advanced-tutorials-workbook.pdf" },
    { id: "speaker-practice-notes", title: "Speaker Practice Notes", url: "/downloads/speaker-practice-notes.pdf" },
  ],
};

export const flagshipCourse: FlagshipCourse = {
  brand: "Dynamic Fast Mind",
  tagline: "Learn Fast. Think Dynamic.",
  title: "Powerful Public Speaking",
  description:
    "A focused transformation program that trains how students learn, think, and build career direction with confidence.",
  priceInr: 999,
  originalPriceInr: 5999,
  curriculum: {
    mindTraining: [
      {
        id: "mt-1",
        title: "Build Laser Focus in 20 Minutes",
        duration: "18 min",
      },
      {
        id: "mt-2",
        title: "Memory Frameworks for Faster Revision",
        duration: "22 min",
      },
      {
        id: "mt-3",
        title: "Dynamic Recall Drills for Exams",
        duration: "19 min",
      },
    ],
    careerGuidance: [
      {
        id: "cg-1",
        title: "Choose a Career Path Without Confusion",
        duration: "24 min",
      },
      {
        id: "cg-2",
        title: "Skill Mapping for High-Growth Roles",
        duration: "20 min",
      },
      {
        id: "cg-3",
        title: "Roadmap: College to First Opportunity",
        duration: "21 min",
      },
    ],
  },
  courseOffers: [
    flagshipPublicSpeakingCourse,
    {
      id: "mind-reading",
      title: "Mind Reading",
      description: "Coming soon.",
      status: "coming_soon",
      priceInr: 99,
      originalPriceInr: 199,
      imageUrl: "/images/course-mindreading.svg",
      bunnyVideoId: "",
      lessons: [],
      sections: [],
      pdfs: [],
    },
    {
      id: "face-reading",
      title: "Face Reading",
      description: "Coming soon.",
      status: "coming_soon",
      priceInr: 99,
      originalPriceInr: 199,
      imageUrl: "/images/course-face-reading.svg",
      bunnyVideoId: "",
      lessons: [],
      sections: [],
      pdfs: [],
    },
    {
      id: "graphology",
      title: "Graphology",
      description: "Coming soon.",
      status: "coming_soon",
      priceInr: 99,
      originalPriceInr: 199,
      imageUrl: "/images/course-graphology.svg",
      bunnyVideoId: "",
      lessons: [],
      sections: [],
      pdfs: [],
    },
    {
      id: "career-test-bundle",
      title: "Career Development Test Bundle",
      description: "Coming soon.",
      status: "coming_soon",
      priceInr: 199,
      originalPriceInr: 799,
      imageUrl: "/images/course-tests-bundle.svg",
      bunnyVideoId: "",
      lessons: [],
      sections: [],
      pdfs: [],
    },
    {
      id: "motivation-learning",
      title: "Motivation Learning",
      description: "Coming soon.",
      status: "coming_soon",
      priceInr: 99,
      originalPriceInr: 199,
      imageUrl: "/images/course-motivation.svg",
      bunnyVideoId: "",
      lessons: [],
      sections: [],
      pdfs: [],
    },
    {
      id: "mind-map",
      title: "Mind Map",
      description: "Coming soon.",
      status: "coming_soon",
      priceInr: 99,
      originalPriceInr: 199,
      imageUrl: "/images/course-mindmap.svg",
      bunnyVideoId: "",
      lessons: [],
      sections: [],
      pdfs: [],
    },
  ],
  testimonials: [
    {
      id: "st-1",
      name: "Riya Mehta",
      role: "Class 12 Student",
      feedback:
        "I stopped feeling overwhelmed and started finishing study targets consistently. My retention improved in just two weeks.",
    },
    {
      id: "st-2",
      name: "Arjun Nair",
      role: "Engineering Student",
      feedback:
        "The career guidance module gave me clarity I could not get from random videos online. The roadmap is practical and direct.",
    },
    {
      id: "st-3",
      name: "Sana Khan",
      role: "NEET Aspirant",
      feedback:
        "The mind training lessons helped me study with structure. I now revise faster and feel more confident before tests.",
    },
  ],
};