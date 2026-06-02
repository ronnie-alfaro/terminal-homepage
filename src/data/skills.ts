export type SkillGroup = {
  title: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    title: 'AI & LLM Engineering',
    items: ['RAG Pipelines', 'LLM Integration', 'Prompt Engineering', 'Qdrant', 'Vector Databases', 'Semantic Search', 'MCP Servers', 'Agent Workflows', 'Local LLMs'],
  },
  {
    title: 'Infrastructure & Engineering',
    items: ['Linux/Unix', 'Python', 'Rust', 'FastAPI', 'Docker', 'Kubernetes', 'AWS', 'Databases', 'Shell Scripting', 'ServiceNow'],
  },
  {
    title: 'Leadership & Operations',
    items: ['Team Leadership', 'Coaching', 'Agile/Scrum', 'Lean Six Sigma', 'Incident Management', 'Process Design', 'Routing Models', 'Automation'],
  },
];
