import type { VirtualFile } from '../types/terminal';

export const virtualFiles: VirtualFile[] = [
  { permissions: '-rw-r--r--', owner: 'ronnie', size: '2.1K', name: 'about.txt', kind: 'command', command: 'cat about.txt' },
  { permissions: '-rw-r--r--', owner: 'ronnie', size: '1.4K', name: 'summary.md', kind: 'command', command: 'cat summary.md' },
  { permissions: '-rw-r--r--', owner: 'ronnie', size: '8.6K', name: 'experience.log', kind: 'command', command: 'cat experience.log' },
  { permissions: 'drwxr-xr-x', owner: 'ronnie', size: '4.0K', name: 'projects/', kind: 'command', command: 'cat projects/' },
  { permissions: '-rw-r--r--', owner: 'ronnie', size: '3.2K', name: 'skills.json', kind: 'command', command: 'cat skills.json' },
  { permissions: '-rw-r--r--', owner: 'ronnie', size: '1.8K', name: 'credentials.txt', kind: 'command', command: 'cat credentials.txt' },
  { permissions: '-rw-r--r--', owner: 'ronnie', size: '512B', name: 'contact.txt', kind: 'command', command: 'cat contact.txt' },
  { permissions: '-rw-r--r--', owner: 'ronnie', size: '143K', name: 'CV.pdf', kind: 'link', href: '/assets/Ronnie_Alfaro_CV_2026.pdf' },
  { permissions: 'lrwxrwxrwx', owner: 'ronnie', size: '31B', name: 'blog@', kind: 'link', href: 'https://blog.ronniealfaro.com' },
  { permissions: 'lrwxrwxrwx', owner: 'ronnie', size: '32B', name: 'github@', kind: 'link', href: 'https://github.com/ronnie-alfaro' },
  { permissions: 'lrwxrwxrwx', owner: 'ronnie', size: '36B', name: 'linkedin@', kind: 'link', href: 'https://linkedin.com/in/ronniealfaro' },
];
