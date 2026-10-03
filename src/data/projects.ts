export type Project = {
  name: string;
  href: string;
  tagline: string;
  description: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    name: 'Metaphrasis',
    href: 'https://github.com/ronnie-alfaro/Metaphrasis',
    tagline: 'Resilient local-first long-form EPUB translation.',
    description:
      'Local-first EPUB translation engine using GGUF models, worker-based execution, SQLite-backed state, checkpointing, pause/resume, crash recovery, and automatic LLM-driven recovery for malformed document structures. Preserves literary coherence across English, French, and Spanish and translates a typical 200-page book in ~2 hours on an M4 Max without commercial inference APIs.',
    stack: ['GGUF', 'Local LLMs', 'SQLite', 'Worker Architecture', 'Crash Recovery', 'EPUB'],
  },
  {
    name: 'librerIA',
    href: 'https://github.com/ronnie-alfaro/librerIA',
    tagline: 'Local-first RAG for literary analysis.',
    description:
      'Retrieval-Augmented Generation platform for literary analysis using semantic EPUB chunking, locally generated embeddings, ChromaDB, SQLite metadata and state, cosine similarity, and MCP. Produces relationship maps, chapter summaries, narrative timelines, key-event highlights, and RPG-style character profiles.',
    stack: ['RAG', 'MCP', 'ChromaDB', 'SQLite', 'Embeddings', 'Local Inference'],
  },
];
