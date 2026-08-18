export type SkillGroup = {
  title: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    title: 'Languages',
    items: ['Python', 'TypeScript', 'JavaScript', 'Rust', 'SQL', 'Bash', 'Perl'],
  },
  {
    title: 'AI / Retrieval',
    items: ['RAG', 'MCP', 'LangChain', 'LangGraph', 'Embeddings', 'Semantic Search', 'Vector Databases', 'llama.cpp', 'GGUF', 'Local Inference'],
  },
  {
    title: 'Platform / Cloud',
    items: ['Docker Compose', 'GitHub Actions', 'GitOps', 'Kubernetes', 'Terraform', 'CloudFormation', 'Ansible', 'AWS', 'Azure', 'GCP', 'Linux'],
  },
  {
    title: 'Data / Reliability',
    items: ['PostgreSQL', 'SQLite', 'MongoDB', 'Redis', 'Kafka', 'ChromaDB', 'Qdrant', 'Grafana', 'Prometheus', 'OpenTelemetry', 'Splunk', 'Nginx'],
  },
];
