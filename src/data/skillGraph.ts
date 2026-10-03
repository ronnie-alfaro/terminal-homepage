export type SkillGraphCategory = 'Agents' | 'Retrieval' | 'MLOps' | 'Generative AI' | 'Security';

export type SkillGraphNode = {
  id: string;
  label: string;
  category: SkillGraphCategory;
  x: number;
  y: number;
  terms: string[];
};

export const skillGraphCategories: SkillGraphCategory[] = [
  'Agents',
  'Retrieval',
  'MLOps',
  'Generative AI',
  'Security',
];

// Positions are in a 1000 × 560 viewBox. Terms match the skill tags in credentials.ts.
export const skillGraphNodes: SkillGraphNode[] = [
  { id: 'agents', label: 'AI Agents', category: 'Agents', x: 135, y: 100, terms: ['AI agents', 'Agentic AI'] },
  { id: 'langgraph', label: 'LangGraph', category: 'Agents', x: 345, y: 95, terms: ['LangGraph'] },
  { id: 'mcp', label: 'MCP', category: 'Agents', x: 95, y: 230, terms: ['MCP clients', 'MCP servers'] },
  { id: 'crewai', label: 'CrewAI', category: 'Agents', x: 270, y: 245, terms: ['CrewAI'] },
  { id: 'langchain', label: 'LangChain', category: 'Agents', x: 485, y: 180, terms: ['LangChain'] },
  { id: 'tool-calling', label: 'Tool Calling', category: 'Agents', x: 415, y: 290, terms: ['Tool calling', 'LLM tool integration'] },

  { id: 'rag', label: 'RAG', category: 'Retrieval', x: 625, y: 80, terms: ['RAG'] },
  { id: 'vector-db', label: 'Vector DBs', category: 'Retrieval', x: 840, y: 115, terms: ['Vector databases'] },
  { id: 'semantic-search', label: 'Semantic Search', category: 'Retrieval', x: 705, y: 235, terms: ['Semantic search', 'Similarity search'] },
  { id: 'chromadb', label: 'ChromaDB', category: 'Retrieval', x: 895, y: 255, terms: ['ChromaDB'] },
  { id: 'llamaindex', label: 'LlamaIndex', category: 'Retrieval', x: 560, y: 295, terms: ['LlamaIndex'] },

  { id: 'mlops', label: 'MLOps', category: 'MLOps', x: 115, y: 365, terms: ['MLOps pipelines', 'MLOps automation'] },
  { id: 'python', label: 'Python', category: 'MLOps', x: 320, y: 380, terms: ['Python'] },
  { id: 'devops', label: 'DevOps / DataOps', category: 'MLOps', x: 205, y: 500, terms: ['DevOps', 'DataOps'] },
  { id: 'containers', label: 'Containers', category: 'MLOps', x: 65, y: 500, terms: ['Containerization'] },

  { id: 'genai', label: 'Generative AI', category: 'Generative AI', x: 510, y: 390, terms: ['Generative AI', 'GenAI'] },
  { id: 'multimodal', label: 'Multimodal', category: 'Generative AI', x: 705, y: 370, terms: ['Multimodal AI', 'Multimodal applications'] },
  { id: 'prompting', label: 'Prompting', category: 'Generative AI', x: 485, y: 510, terms: ['Prompt engineering'] },
  { id: 'gradio', label: 'Gradio', category: 'Generative AI', x: 785, y: 505, terms: ['Gradio'] },

  { id: 'ai-security', label: 'AI Security', category: 'Security', x: 920, y: 385, terms: ['AI security'] },
  { id: 'supply-chain', label: 'Supply Chain', category: 'Security', x: 925, y: 505, terms: ['Software supply chain security'] },
];
