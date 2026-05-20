export type Lesson = {
  id: string;
  title: string;
  duration: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  feedback: string;
};

export type CourseOffer = {
  id: string;
  title: string;
  priceInr: number;
  originalPriceInr: number;
  imageUrl: string;
  bunnyVideoId: string;
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

export const flagshipCourse: FlagshipCourse = {
  brand: "Dynamic Fast Mind",
  tagline: "Learn Fast. Think Dynamic.",
  title: "Dynamic Fast Mind - Flagship Program",
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
    {
      id: "powerful-public-speaking",
      title: "Powerful Public Speaking",
      priceInr: 99,
      originalPriceInr: 999,
      imageUrl: "/images/course-speaking.svg",
      bunnyVideoId: "827917b7-c678-4f79-9e2d-e3d394b0e748",
    },
    {
      id: "mind-reading",
      title: "Mind Reading",
      priceInr: 99,
      originalPriceInr: 199,
      imageUrl: "/images/course-mindreading.svg",
      bunnyVideoId: "",
    },
    {
      id: "face-reading",
      title: "Face Reading",
      priceInr: 99,
      originalPriceInr: 199,
      imageUrl: "/images/course-face-reading.svg",
      bunnyVideoId: "",
    },
    {
      id: "graphology",
      title: "Graphology",
      priceInr: 99,
      originalPriceInr: 199,
      imageUrl: "/images/course-graphology.svg",
      bunnyVideoId: "",
    },
    {
      id: "career-test-bundle",
      title: "Career Development Test Bundle",
      priceInr: 199,
      originalPriceInr: 799,
      imageUrl: "/images/course-tests-bundle.svg",
      bunnyVideoId: "",
    },
    {
      id: "motivation-learning",
      title: "Motivation Learning",
      priceInr: 99,
      originalPriceInr: 199,
      imageUrl: "/images/course-motivation.svg",
      bunnyVideoId: "",
    },
    {
      id: "mind-map",
      title: "Mind Map",
      priceInr: 99,
      originalPriceInr: 199,
      imageUrl: "/images/course-mindmap.svg",
      bunnyVideoId: "",
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