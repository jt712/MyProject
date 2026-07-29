const courses = [
  {
    level: "Beginner",
    title: "Python for Beginners",
    duration: "4 weeks",
    description: "Hands-on Python fundamentals, data structures, and first data projects.",

    userType: ["Student"],
    experience: ["Any", "0-2 years"],
    techFocus: ["Python"],
    interest: ["Python"]
  },

  {
    level: "Intermediate",
    title: "GenAI Chatbots & RAG",
    duration: "5 weeks",
    description: "Plan, build, and evaluate domain-grounded assistants.",

    userType: [
      "Student",
      "Early-career professional",
      "Experienced, switching to Data/AI",
      "Manager/Leader enabling team"
    ],
    experience: [
      "Any",
      "0-2 years",
      "3-6 years",
      "7+ years"
    ],
    techFocus: ["GenAI"],
    interest: ["GenAI Chatbot", "GenAI"]
  },

  {
    level: "Advanced",
    title: "MLOps & Platforms",
    duration: "6 weeks",
    description: "CI/CD for models, data contracts and observability.",

    userType: [
      "Experienced, switching to Data/AI",
      "Manager/Leader enabling team"
    ],
    experience: ["3-6 years", "7+ years"],
    techFocus: ["MLOps"],
    interest: ["MLOps"]
  },

  {
    level: "Intermediate",
    title: "Machine Learning",
    duration: "5 weeks",
    description: "Regression, classification, deep learning and deployment.",

    userType: [
      "Student",
      "Early-career professional"
    ],
    experience: ["0-2 years","3-6 years"],
    techFocus:["ML"],
    interest:["Machine Learning"]
  },

  {
    level:"Advanced",
    title:"Agentic AI Systems",
    duration:"5 weeks",
    description:"Build autonomous AI agents using modern frameworks.",

    userType:[
      "Experienced, switching to Data/AI",
      "Manager/Leader enabling team"
    ],
    experience:["7+ years"],
    techFocus:["Agentic"],
    interest:["Agentic AI"]
  }
];

export default courses;