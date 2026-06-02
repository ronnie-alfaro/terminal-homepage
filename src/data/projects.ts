export type Project = {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    name: 'AI Knowledge Gap Pipeline',
    tagline: 'Support tickets transformed into documentation intelligence.',
    description:
      'Production-grade AI workflow that ingests closed support tickets, creates embeddings, runs Qdrant vector search with inverse relevancy scoring, identifies documentation gaps, and auto-generates merge requests while accounting for prompt-injection risk from untrusted content.',
    stack: ['Python', 'Qdrant', 'Embeddings', 'Vector Search', 'Prompt Injection Defense', 'GitLab MRs'],
  },
  {
    name: 'RagIT',
    tagline: 'Books turned into searchable intelligence.',
    description:
      'AI-driven literary analysis platform that converts books into interactive knowledge graphs, chapter summaries, timelines, character networks, and contextual insights using RAG, semantic search, embeddings, and LLMs.',
    stack: ['Python', 'RAG', 'ChromaDB', 'Embeddings', 'LLMs', 'Knowledge Graphs'],
  },
  {
    name: 'Arxiv Sanity Lite Modern',
    tagline: 'A resurrection of a classic research discovery tool.',
    description:
      'Modernized version of the original Arxiv Sanity concept, redesigned for contemporary paper discovery, semantic search, recommendation workflows, metadata analysis, and research exploration.',
    stack: ['Python', 'Semantic Search', 'Recommender Systems', 'Metadata Analysis', 'Research UX'],
  },
  {
    name: 'Rustdrel',
    tagline: 'A terminal roguelike card game built like a system.',
    description:
      'Rust-based atmospheric dungeon card game with ASCII visuals, animated TUI screens, combat systems, sound effects, difficulty modes, event logs, and modular game-state architecture.',
    stack: ['Rust', 'Ratatui', 'Crossterm', 'Rodio', 'Terminal UX', 'Game State'],
  },
];
