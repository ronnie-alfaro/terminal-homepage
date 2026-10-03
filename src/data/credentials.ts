export type Certificate = {
  name: string;
  issuer: string;
  completed?: string;
  skills: string[];
  badgeUrl?: string;
  certificateUrl?: string;
};

export type VerifiedSkill = {
  name: string;
  evidence: number;
};

export type FeaturedBadge = {
  name: string;
  issuer: string;
  issued: string;
  skills: string[];
  url: string;
};

export const credlyProfileUrl = 'https://www.credly.com/users/ralfaro/badges/credly';
export const credlySkillsUrl = 'https://www.credly.com/users/ralfaro/skills';

export const verifiedSkills: VerifiedSkill[] = [
  { name: 'LangChain', evidence: 6 },
  { name: 'AI Agents', evidence: 4 },
  { name: 'LangGraph', evidence: 3 },
  { name: 'Prompt Engineering', evidence: 3 },
  { name: 'Vector Databases', evidence: 2 },
  { name: 'Python', evidence: 2 },
];

export const certificates: Certificate[] = [
  {
    name: 'DevOps, DataOps, MLOps',
    issuer: 'Duke University',
    completed: 'September 2026',
    skills: ['MLOps pipelines', 'DevOps', 'DataOps', 'Containerization'],
  },
  {
    name: 'Python Essentials for MLOps',
    issuer: 'Duke University',
    completed: 'September 2026',
    skills: ['Python', 'Pytest', 'Pandas', 'MLOps automation'],
  },
  {
    name: 'Build AI Agents Using MCP',
    issuer: 'IBM',
    completed: 'August 2026',
    skills: ['MCP clients', 'MCP servers', 'LLM tool integration', 'Multi-server systems'],
    badgeUrl: 'https://www.credly.com/badges/a22889fb-fa73-4d48-b946-d2894a54fc78',
  },
  {
    name: 'Agentic AI with LangGraph, CrewAI, AutoGen and BeeAI',
    issuer: 'IBM',
    completed: 'August 2026',
    skills: ['LangGraph', 'CrewAI', 'AutoGen / AG2', 'BeeAI'],
  },
  {
    name: 'Build Multimodal Generative AI Applications',
    issuer: 'IBM',
    completed: 'August 2026',
    skills: ['Multimodal AI', 'Speech-to-text', 'Text-to-image', 'Gradio'],
    badgeUrl: 'https://www.credly.com/badges/844fbb24-98fc-4981-8f0b-0d1a43443411',
  },
  {
    name: 'Fundamentals of Building AI Agents',
    issuer: 'IBM',
    completed: 'August 2026',
    skills: ['AI agents', 'Tool calling', 'LangChain', 'LangGraph'],
    badgeUrl: 'https://www.credly.com/badges/7661e14e-bcac-4c33-9bfd-991100c9fee0',
  },
  {
    name: 'Advanced RAG with Vector Databases and Retrievers',
    issuer: 'IBM',
    completed: 'August 2026',
    skills: ['RAG', 'Vector databases', 'Semantic search', 'ChromaDB'],
    badgeUrl: 'https://www.credly.com/badges/877fe0c9-486e-459d-96b4-d5141ced6adb',
  },
  {
    name: 'Agentic AI with LangChain and LangGraph',
    issuer: 'IBM',
    completed: 'August 2026',
    skills: ['Agentic AI', 'LangChain', 'LangGraph', 'Multi-agent systems'],
    badgeUrl: 'https://www.credly.com/badges/7cf770ec-efc3-406d-9f86-21322ac3b1bd',
  },
  {
    name: 'Vector Databases for RAG: An Introduction',
    issuer: 'IBM',
    completed: 'August 2026',
    skills: ['Vector databases', 'Embeddings', 'RAG', 'Similarity search'],
    badgeUrl: 'https://www.credly.com/badges/ab8443e3-64b1-48a9-8166-b5d105db0ffa',
  },
  {
    name: 'Build RAG Applications: Get Started',
    issuer: 'IBM',
    completed: 'August 2026',
    skills: ['RAG', 'LangChain', 'LlamaIndex', 'Gradio'],
    badgeUrl: 'https://www.credly.com/badges/04c68279-24b4-4941-ab7c-cf3644156985',
  },
  {
    name: 'Develop Generative AI Applications: Get Started',
    issuer: 'IBM',
    completed: 'August 2026',
    skills: ['Generative AI', 'Python', 'Flask', 'Prompt engineering'],
    badgeUrl: 'https://www.credly.com/badges/5fd79e43-1d40-4090-9b83-48d8838d7c76',
  },
  {
    name: 'Generative AI: Introduction and Applications',
    issuer: 'IBM',
    completed: 'June 2026',
    skills: ['Generative AI', 'Model capabilities', 'Multimodal applications'],
  },
  {
    name: 'Start Writing Prompts like a Pro',
    issuer: 'Google',
    skills: ['Prompt engineering', 'Context', 'Evaluation', 'Responsible AI'],
  },
];

export const featuredBadges: FeaturedBadge[] = [
  {
    name: 'Building AI Agents and Agentic Workflows Specialization',
    issuer: 'Coursera · IBM',
    issued: 'September 2026',
    skills: ['AI orchestration', 'Agent evaluation', 'CrewAI', 'LangGraph'],
    url: 'https://www.credly.com/badges/af94dd88-f790-4202-9f8f-2ad9c57bc736',
  },
  {
    name: 'AI Threat Tamer',
    issuer: 'Chainguard',
    issued: 'August 2026',
    skills: ['AI security', 'Secure coding', 'Dependency management'],
    url: 'https://www.credly.com/badges/78843fec-0425-419c-80e2-49a997c41907',
  },
  {
    name: 'Chainguard AI/ML Guardian',
    issuer: 'Chainguard',
    issued: 'August 2026',
    skills: ['Software supply chain security', 'SBOM', 'Vulnerability management'],
    url: 'https://www.credly.com/badges/57438811-82eb-49ac-a55d-5fe8e43a3e39',
  },
];
