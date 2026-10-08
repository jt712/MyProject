import "./courses.css";

const courses = [
  {
    id: "python-beginners",
    level: "Beginner",
    title: "Python for Beginners",
    duration: "4 weeks",
    description: "Hands-on Python fundamentals, data structures, and first data projects.",
    userType: ["Student", "Early-career professional"],
    experience: ["Any", "0-2 years"],
    techFocus: ["Python", "Any"],
    interest: ["Python", "Any"],
    curriculum: [
      "Syntax, variables, and control flow",
      "Functions, modules, and packaging",
      "Data handling with Pandas",
      "Mini-project: data story and API calls"
    ]
  },
  {
    id: "ml-foundations",
    level: "Intermediate",
    title: "Machine Learning Foundations",
    duration: "6 weeks",
    description: "Regression, classification, metrics, and deployment-aware ML.",
    userType: ["Student", "Early-career professional"],
    experience: ["Any", "0-2 years", "3-6 years"],
    techFocus: ["ML", "Python", "Any"],
    interest: ["Machine Learning", "Any"],
    curriculum: [
      "Regression and classification playbook",
      "Cross-validation and metrics",
      "Regularization and feature selection",
      "Packaging and simple deployment"
    ]
  },
  {
    id: "genai-rag",
    level: "Intermediate",
    title: "GenAI Chatbots & RAG",
    duration: "5 weeks",
    description: "Plan, build, and evaluate domain-grounded assistants with safety and retrieval.",
    userType: [
      "Student",
      "Early-career professional",
      "Experienced, switching to Data/AI",
      "Manager/Leader enabling teams"
    ],
    experience: ["Any", "0-2 years", "3-6 years", "7+ years"],
    techFocus: ["GenAI", "Any"],
    interest: ["GenAI Chatbot", "GenAI", "Any"],
    curriculum: [
      "Use-case framing and evaluation",
      "Retrieval, chunking, and ranking",
      "Prompting patterns and guardrails",
      "Observability and quality checks"
    ]
  },
  {
    id: "agentic-ai",
    level: "Advanced",
    title: "Agentic AI Systems",
    duration: "5 weeks",
    description: "Planner–executor agents, tools, delegation, and safety for production.",
    userType: [
      "Experienced, switching to Data/AI",
      "Manager/Leader enabling teams"
    ],
    experience: ["Any", "3-6 years", "7+ years"],
    techFocus: ["Agentic", "GenAI", "Any"],
    interest: ["Agentic AI", "GenAI", "Any"],
    curriculum: [
      "Agent patterns: planner/executor, tools",
      "Routing, memory, and context windows",
      "Safety, permissions, and observability",
      "Evaluations and rollout playbooks"
    ]
  },
  {
    id: "mlops-platforms",
    level: "Advanced",
    title: "MLOps & Platforms",
    duration: "6 weeks",
    description: "CI/CD for models, data contracts, observability, and responsible releases.",
    userType: [
      "Experienced, switching to Data/AI",
      "Manager/Leader enabling teams"
    ],
    experience: ["Any", "3-6 years", "7+ years"],
    techFocus: ["MLOps", "ML", "Any"],
    interest: ["MLOps", "Any"],
    curriculum: [
      "Packaging, registries, and promotion",
      "Data quality, drift, and contracts",
      "Pipelines, testing, and governance",
      "Monitoring, rollback, and SLOs"
    ]
  },
  {
    id: "prompt-engineering",
    level: "Intermediate",
    title: "Prompt Engineering & Safety",
    duration: "3 weeks",
    description: "System prompts, evals, red-teaming, and hallucination controls.",
    userType: [
      "Student",
      "Early-career professional",
      "Experienced, switching to Data/AI"
    ],
    experience: ["Any", "0-2 years", "3-6 years"],
    techFocus: ["GenAI", "Any"],
    interest: ["GenAI", "Any"],
    curriculum: [
      "Prompt patterns and system design",
      "Guardrails: constraints, policies, filters",
      "Evaluation harness and metrics",
      "Live exercises with real documents"
    ]
  },
  {
    id: "copilot-workflow",
    level: "Intermediate",
    title: "Copilot & Workflow Automation",
    duration: "4 weeks",
    description: "Design and ship tool-using assistants with approvals, telemetry, and UX.",
    userType: [
      "Early-career professional",
      "Experienced, switching to Data/AI",
      "Manager/Leader enabling teams"
    ],
    experience: ["Any", "0-2 years", "3-6 years"],
    techFocus: ["GenAI", "Any"],
    interest: ["GenAI", "Any"],
    curriculum: [
      "When to build copilots vs forms",
      "Tooling, permissions, and UX",
      "Telemetry, feedback, and learning loops",
      "Launch playbook and adoption"
    ]
  },
  {
    id: "azure-ai-openai",
    level: "Intermediate",
    title: "Azure AI Foundry & OpenAI",
    duration: "3 weeks",
    description: "Blueprints for Azure AI Foundry: safety, deployment, evals, and cost control.",
    userType: [
      "Experienced, switching to Data/AI",
      "Manager/Leader enabling teams"
    ],
    experience: ["Any", "3-6 years", "7+ years"],
    techFocus: ["GenAI", "Azure", "Any"],
    interest: ["GenAI", "Any"],
    curriculum: [
      "Provisioning, networking, and keys",
      "Safety, content filters, and approvals",
      "RAG patterns with Azure Search",
      "Monitoring, cost, and rollout"
    ]
  },
  {
    id: "vertex-notebooklm",
    level: "Intermediate",
    title: "Vertex AI & NotebookLM",
    duration: "3 weeks",
    description: "Build, evaluate, and ship on Vertex AI with grounding and governance.",
    userType: [
      "Experienced, switching to Data/AI",
      "Manager/Leader enabling teams"
    ],
    experience: ["Any", "3-6 years", "7+ years"],
    techFocus: ["GenAI", "ML", "Any"],
    interest: ["GenAI", "Machine Learning", "Any"],
    curriculum: [
      "Model Garden, tuning, and evals",
      "Grounding with search and BigQuery",
      "Pipelines, CI/CD, and monitoring",
      "NotebookLM use for research workflows"
    ]
  },
  {
    id: "ai-product-strategy",
    level: "Leadership",
    title: "AI Product & Strategy",
    duration: "2 weeks",
    description: "Prioritization, ROI, governance, and partner/vendor strategies for AI.",
    userType: ["Manager/Leader enabling teams"],
    experience: ["Any", "3-6 years", "7+ years"],
    techFocus: ["GenAI", "MLOps", "Any"],
    interest: ["Any"],
    curriculum: [
      "Use-case scoring and ROI",
      "Risk, compliance, and procurement",
      "Team models and capability building",
      "Roadmaps and measurement"
    ]
  }
];

export default courses;