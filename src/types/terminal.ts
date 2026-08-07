export type TerminalEntry =
  | {
      id: string;
      type: 'system' | 'input' | 'text' | 'help' | 'suggestions';
      content: string;
    }
  | {
      id: string;
      type: 'projects' | 'experience' | 'skills';
    }
  | {
      id: string;
      type: 'credentials';
    }
  | {
      id: string;
      type: 'leadership' | 'ai-impact' | 'principles';
    }
  | {
      id: string;
      type: 'summary' | 'why-hire' | 'hire-ronnie' | 'open-link' | 'blog';
      content?: string;
      href?: string;
    }
  | {
      id: string;
      type: 'order-66';
    }
  | {
      id: string;
      type: 'cheat-mode';
    }
  | {
      id: string;
      type: 'cv-download';
    }
  | {
      id: string;
      type: 'contact';
    }
  | {
      id: string;
      type: 'fortune';
      content: string;
    }
  | {
      id: string;
      type: 'file-listing';
    }
  | {
      id: string;
      type: 'command-error';
      content: string;
      suggestion?: string;
    };

export type VirtualFile =
  | {
      permissions: string;
      owner: string;
      size: string;
      name: string;
      kind: 'command';
      command: string;
    }
  | {
      permissions: string;
      owner: string;
      size: string;
      name: string;
      kind: 'link';
      href: string;
      download?: boolean;
    };
