import { FormEvent, KeyboardEvent, MouseEvent, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { bootSequence, profile } from '../data/profile';
import { projects } from '../data/projects';
import { experience } from '../data/experience';
import { skills } from '../data/skills';
import { fortuneFacts } from '../data/fortunes';
import { certificates, credlyProfileUrl, credlySkillsUrl, featuredBadges, verifiedSkills } from '../data/credentials';
import { aiImpact, leadership, principles } from '../data/leadership';
import { hireRonnie, summary, whyHire } from '../data/recruiter';
import { virtualFiles } from '../data/filesystem';
import type { TerminalEntry } from '../types/terminal';
import { SkillGraph } from './SkillGraph';

const helpGroups = [
  {
    title: 'Profile',
    commands: ['about', 'summary', 'why-hire', 'leadership', 'experience'],
  },
  {
    title: 'AI',
    commands: ['ai-impact', 'projects', 'skills', 'principles'],
  },
  {
    title: 'Meta',
    commands: ['certificates', 'credentials', 'contact', 'blog', 'open linkedin', 'open github', 'wget cv', 'fortune', 'clear'],
  },
  {
    title: 'Unix',
    commands: ['ls -la', 'pwd', 'whoami', 'uname -a', 'cat about.txt', 'man portfolio'],
  },
];

const cheatHelpGroups = [
  ...helpGroups,
  {
    title: 'Easter Eggs',
    commands: ['asteroids', 'sudo hire ronnie', 'execute order 66'],
  },
];

const suggestedCommands = ['ls', 'summary', 'why-hire', 'certificates', 'wget cv', 'blog'];
const knownCommands = [
  ...helpGroups.flatMap((group) => group.commands),
  ...virtualFiles.filter((file) => file.kind === 'command').map((file) => file.command),
  'help',
  'ls',
  'ls -l',
  'dir',
  'uname',
  'echo $home',
  'man',
  'linkedin',
  'github',
  'cv',
  'open blog',
  'open cv',
  'open cv.pdf',
  'wget cv.pdf',
  'download cv',
  'asteroids',
  'sudo hire ronnie',
  'execute order 66',
];
const blogUrl = 'https://blog.ronniealfaro.com';
const cvPath = '/assets/Ronnie_CV.pdf';
const cheatAudioPath = '/assets/CTS.mp3';
const gameWidth = 42;
const gameHeight = 16;
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

type Asteroid = {
  id: string;
  x: number;
  y: number;
};

type Bullet = {
  id: string;
  x: number;
  y: number;
};

type AsteroidsState = {
  asteroids: Asteroid[];
  bullets: Bullet[];
  lives: number;
  running: boolean;
  score: number;
  shipX: number;
  tick: number;
};

const initialAsteroidsState = (): AsteroidsState => ({
  asteroids: [
    { id: createId(), x: 8, y: 2 },
    { id: createId(), x: 24, y: 5 },
    { id: createId(), x: 34, y: 1 },
  ],
  bullets: [],
  lives: 3,
  running: true,
  score: 0,
  shipX: Math.floor(gameWidth / 2),
  tick: 0,
});

function randomFortune() {
  return fortuneFacts[Math.floor(Math.random() * fortuneFacts.length)];
}

function editDistance(left: string, right: string) {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);

  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    const current = [leftIndex];

    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const substitutionCost = left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1;
      current[rightIndex] = Math.min(
        current[rightIndex - 1] + 1,
        previous[rightIndex] + 1,
        previous[rightIndex - 1] + substitutionCost,
      );
    }

    previous.splice(0, previous.length, ...current);
  }

  return previous[right.length];
}

function closestCommand(command: string) {
  const candidates = [...new Set(knownCommands)];
  const closest = candidates.reduce<{ command: string; distance: number } | undefined>((best, candidate) => {
    const distance = editDistance(command, candidate);
    return !best || distance < best.distance ? { command: candidate, distance } : best;
  }, undefined);

  if (!closest) {
    return undefined;
  }

  const maximumDistance = Math.max(2, Math.ceil(command.length * 0.3));
  return closest.distance <= maximumDistance ? closest.command : undefined;
}

function commandError(command: string): TerminalEntry {
  const suggestion = closestCommand(command);
  const [program, ...argumentsList] = command.split(' ');
  const target = argumentsList.join(' ');
  const content = ['cat', 'open', 'wget'].includes(program) && target
    ? `${program}: ${target}: No such file or directory`
    : `command not found: ${command}`;

  return {
    id: createId(),
    type: 'command-error',
    content,
    suggestion,
  };
}

function playOrder66Audio() {
  const audioWindow = window as Window & { webkitAudioContext?: typeof AudioContext };
  const AudioContextClass = window.AudioContext || audioWindow.webkitAudioContext;
  if (!AudioContextClass) {
    return;
  }

  const context = new AudioContextClass();
  const master = context.createGain();
  master.gain.setValueAtTime(0.0001, context.currentTime);
  master.gain.exponentialRampToValueAtTime(0.18, context.currentTime + 0.04);
  master.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 2.35);
  master.connect(context.destination);

  const notes = [
    { frequency: 146.83, start: 0, duration: 0.22 },
    { frequency: 146.83, start: 0.28, duration: 0.22 },
    { frequency: 196, start: 0.56, duration: 0.3 },
    { frequency: 174.61, start: 0.94, duration: 0.22 },
    { frequency: 155.56, start: 1.22, duration: 0.22 },
    { frequency: 130.81, start: 1.5, duration: 0.48 },
  ];

  for (const note of notes) {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(note.frequency, context.currentTime + note.start);
    gain.gain.setValueAtTime(0.0001, context.currentTime + note.start);
    gain.gain.exponentialRampToValueAtTime(0.24, context.currentTime + note.start + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + note.start + note.duration);
    oscillator.connect(gain);
    gain.connect(master);
    oscillator.start(context.currentTime + note.start);
    oscillator.stop(context.currentTime + note.start + note.duration + 0.05);
  }

  window.setTimeout(() => void context.close(), 2600);
}

function playCheatAudio() {
  const audio = new Audio(cheatAudioPath);
  audio.volume = 0.72;
  void audio.play().catch(() => undefined);
}

function commandOutput(command: string): TerminalEntry[] {
  switch (command) {
    case 'ls':
    case 'ls -l':
    case 'ls -la':
    case 'dir':
      return [{ id: createId(), type: 'file-listing' }];
    case 'pwd':
      return [{ id: createId(), type: 'text', content: '/home/ronnie' }];
    case 'whoami':
      return [{ id: createId(), type: 'text', content: 'ronnie' }];
    case 'uname':
      return [{ id: createId(), type: 'text', content: 'PortfolioOS' }];
    case 'uname -a':
      return [{ id: createId(), type: 'text', content: 'PortfolioOS ronnie-profile 2026 web-terminal x86_64' }];
    case 'echo $home':
      return [{ id: createId(), type: 'text', content: '/home/ronnie' }];
    case 'man':
    case 'man portfolio':
      return [{ id: createId(), type: 'help', content: '' }];
    case 'help':
      return [
        {
          id: createId(),
          type: 'help',
          content: '',
        },
      ];
    case 'about':
    case 'cat about.txt':
      return [{ id: createId(), type: 'text', content: profile.about }];
    case 'summary':
    case 'cat summary.md':
      return [{ id: createId(), type: 'summary', content: summary }];
    case 'why-hire':
      return [{ id: createId(), type: 'why-hire' }];
    case 'leadership':
      return [{ id: createId(), type: 'leadership' }];
    case 'ai-impact':
      return [{ id: createId(), type: 'ai-impact' }];
    case 'principles':
      return [{ id: createId(), type: 'principles' }];
    case 'projects':
    case 'cat projects':
    case 'cat projects/':
      return [{ id: createId(), type: 'projects' }];
    case 'experience':
    case 'cat experience.log':
      return [{ id: createId(), type: 'experience' }];
    case 'skills':
    case 'cat skills.json':
      return [{ id: createId(), type: 'skills' }];
    case 'credentials':
    case 'certificates':
    case 'cat credentials.txt':
    case 'cat certificates.txt':
      return [{ id: createId(), type: 'credentials' }];
    case 'contact':
    case 'cat contact.txt':
      return [{ id: createId(), type: 'contact' }];
    case 'blog':
    case 'open blog':
      return [{ id: createId(), type: 'blog' }];
    case 'open linkedin':
    case 'linkedin':
      return [
        {
          id: createId(),
          type: 'open-link',
          content: 'Opening LinkedIn target:',
          href: `https://${profile.contact.linkedin}`,
        },
      ];
    case 'open github':
    case 'github':
      return [
        {
          id: createId(),
          type: 'open-link',
          content: 'Opening GitHub target:',
          href: `https://${profile.contact.github}`,
        },
      ];
    case 'sudo hire ronnie':
      return [{ id: createId(), type: 'hire-ronnie' }];
    case 'cv':
    case 'open cv':
    case 'open cv.pdf':
    case 'cat cv.pdf':
    case 'wget cv':
    case 'wget cv.pdf':
    case 'download cv':
      return [{ id: createId(), type: 'cv-download' }];
    case 'fortune':
      return [{ id: createId(), type: 'fortune', content: randomFortune() }];
    default:
      return [commandError(command)];
  }
}

function IntroBlock() {
  return (
    <div className="intro-block">
      <p className="prompt-line">$ whoami</p>
      <h2>{profile.name}</h2>
      <p className="terminal-role">{profile.roles.join(' · ')}</p>
      <p className="statement">{profile.statement}</p>
      <div className="signals" aria-label="Quick professional signals">
        {profile.signals.map((signal) => (
          <span key={signal}>{signal}</span>
        ))}
      </div>
    </div>
  );
}

function Entry({
  cheatMode,
  entry,
  onRunCommand,
}: {
  cheatMode: boolean;
  entry: TerminalEntry;
  onRunCommand: (command: string) => void;
}) {
  if (entry.type === 'input') {
    return <p className="entry input-entry">$ {entry.content}</p>;
  }

  if (entry.type === 'text' || entry.type === 'system') {
    return <p className={`entry ${entry.type === 'system' ? 'system-entry' : ''}`}>{entry.content}</p>;
  }

  if (entry.type === 'command-error') {
    return (
      <div className="command-error" role="alert">
        <p>{entry.content}</p>
        {entry.suggestion ? (
          <p>
            Did you mean:{' '}
            <button type="button" onClick={() => onRunCommand(entry.suggestion!)}>
              {entry.suggestion}
            </button>
            ?
          </p>
        ) : (
          <p className="system-entry">Type ls or help to see the available commands.</p>
        )}
      </div>
    );
  }

  if (entry.type === 'help') {
    const groups = cheatMode ? cheatHelpGroups : helpGroups;

    return (
      <article className="terminal-card command-card help-card">
        {cheatMode && <p className="cheat-label">cheat mode: all commands visible</p>}
        {groups.map((group) => (
          <div className="help-group" key={group.title}>
            <h3>{group.title}</h3>
            <div className="help-command-list">
              {group.commands.map((command) => (
                <button type="button" key={command} onClick={() => onRunCommand(command)}>
                  {command}
                </button>
              ))}
            </div>
          </div>
        ))}
      </article>
    );
  }

  if (entry.type === 'file-listing') {
    return (
      <article className="file-listing" aria-label="Virtual home directory">
        <p className="listing-total">total {virtualFiles.length}</p>
        <div className="file-listing-grid" role="list">
          {virtualFiles.map((file) => (
            <div className="file-row" role="listitem" key={file.name}>
              <span className="file-permissions">{file.permissions}</span>
              <span>{file.owner}</span>
              <span className="file-size">{file.size}</span>
              {file.kind === 'command' ? (
                <button type="button" onClick={() => onRunCommand(file.command)}>
                  {file.name}
                </button>
              ) : (
                <a
                  className="file-link"
                  href={file.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(event) => event.stopPropagation()}
                >
                  {file.name}
                </a>
              )}
            </div>
          ))}
        </div>
        <p className="listing-hint">click an entry, or try: cat about.txt · open CV.pdf · open blog</p>
      </article>
    );
  }

  if (entry.type === 'suggestions') {
    return (
      <article className="terminal-card command-card suggestion-card">
        <p>Interactive shell ready.</p>
        <p className="system-entry">Type help and press Enter, or click a suggested command.</p>
        <div className="help-command-list">
          {suggestedCommands.map((command) => (
            <button type="button" key={command} onClick={() => onRunCommand(command)}>
              {command}
            </button>
          ))}
        </div>
      </article>
    );
  }

  if (entry.type === 'fortune') {
    return (
      <div className="fortune-entry">
        <p>fortune:</p>
        <p>{entry.content}</p>
      </div>
    );
  }

  if (entry.type === 'order-66') {
    return (
      <article className="terminal-card command-card order-card">
        <p className="system-entry">Executing contingency protocol...</p>
        <p className="system-entry">Revoking Jedi access tokens... OK</p>
        <p className="system-entry">Repainting terminal threat model... RED</p>
        <p>Imperial alert sequence armed.</p>
      </article>
    );
  }

  if (entry.type === 'cheat-mode') {
    return (
      <article className="terminal-card command-card cheat-card">
        <p className="system-entry">cheat mode activated</p>
        <p>old school, is cool.</p>
        <p className="system-entry">Expanded command index unlocked. Type help.</p>
      </article>
    );
  }

  if (entry.type === 'summary') {
    return (
      <article className="terminal-card command-card">
        <h3>Executive Summary</h3>
        <p>{entry.content}</p>
      </article>
    );
  }

  if (entry.type === 'why-hire') {
    return (
      <article className="terminal-card command-card">
        <h3>Why Hire</h3>
        <ul className="terminal-list">
          {whyHire.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
    );
  }

  if (entry.type === 'hire-ronnie') {
    return (
      <article className="terminal-card command-card hire-card">
        {hireRonnie.lines.map((line) => (
          <p className="system-entry" key={line}>{line}</p>
        ))}
        <p>
          Contact: <a href={`mailto:${hireRonnie.contact}`}>{hireRonnie.contact}</a>
        </p>
      </article>
    );
  }

  if (entry.type === 'open-link') {
    return (
      <article className="terminal-card command-card link-card">
        <p>{entry.content}</p>
        <p>
          <a href={entry.href} target="_blank" rel="noreferrer">
            {entry.href}
          </a>
        </p>
      </article>
    );
  }

  if (entry.type === 'cv-download') {
    return (
      <article className="terminal-card command-card cv-download">
        <p className="system-entry">Preparing CV artifact...</p>
        <p className="system-entry">Resolving recruiter-readable payload... OK</p>
        <p className="system-entry">Mounting static asset from /assets... OK</p>
        <p>
          Download URL:{' '}
          <a href={cvPath} download>
            {cvPath}
          </a>
        </p>
      </article>
    );
  }

  if (entry.type === 'blog') {
    return (
      <article className="terminal-card command-card link-card">
        <p className="system-entry">Compiling C code...</p>
        <p className="system-entry">Linking posts and dispatch tables... OK</p>
        <p>
          Blog URL:{' '}
          <a href={blogUrl} target="_blank" rel="noreferrer">
            {blogUrl}
          </a>
        </p>
      </article>
    );
  }

  if (entry.type === 'projects') {
    return (
      <div className="grid-list project-list">
        {projects.map((project) => (
          <article className="terminal-card" key={project.name}>
            <div>
              <h3><a href={project.href} target="_blank" rel="noreferrer">{project.name}</a></h3>
              <p className="tagline">{project.tagline}</p>
            </div>
            <p>{project.description}</p>
            <div className="stack-list">
              {project.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    );
  }

  if (entry.type === 'leadership' || entry.type === 'ai-impact') {
    const content = entry.type === 'leadership' ? leadership : aiImpact;

    return (
      <article className="terminal-card command-card">
        <h3>{content.title}</h3>
        <ul className="terminal-list">
          {content.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
    );
  }

  if (entry.type === 'principles') {
    return (
      <article className="terminal-card command-card">
        <h3>Principles</h3>
        <ul className="terminal-list">
          {principles.map((principle) => (
            <li key={principle}>{principle}</li>
          ))}
        </ul>
      </article>
    );
  }

  if (entry.type === 'experience') {
    return (
      <div className="grid-list">
        {experience.map((item) => (
          <article className="terminal-card" key={`${item.company}-${item.period}`}>
            <p className="period">{item.period}</p>
            <h3>{item.company}</h3>
            <p className="tagline">{item.role}</p>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    );
  }

  if (entry.type === 'skills') {
    return (
      <div className="grid-list">
        {skills.map((group) => (
          <article className="terminal-card" key={group.title}>
            <h3>{group.title}</h3>
            <div className="stack-list">
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    );
  }

  if (entry.type === 'credentials') {
    return (
      <div className="credentials-section">
        <article className="terminal-card credentials-overview">
          <p className="period">CREDENTIALS / 2026</p>
          <h3>AI engineering, MLOps, and secure delivery</h3>
          <p>13 courses across Duke University, IBM, and Google. Public Credly badges provide independent evidence for agentic AI, RAG, multimodal applications, and AI security.</p>
          <div className="stack-list" aria-label="Credly verified skills">
            {verifiedSkills.map((skill) => (
              <span key={skill.name}>{skill.name} · {skill.evidence} evidence sources</span>
            ))}
          </div>
          <p className="credential-links">
            <a href={credlyProfileUrl} target="_blank" rel="noreferrer">Explore all Credly badges</a>
            <a href={credlySkillsUrl} target="_blank" rel="noreferrer">Verified skills wallet</a>
          </p>
        </article>

        <SkillGraph />

        <h3 className="credentials-heading">Courses and certificates</h3>
        <div className="grid-list credentials-list">
          {certificates.map((certificate) => (
            <article className="terminal-card credential-card" key={certificate.name}>
              <p className="period">{certificate.completed ?? 'Completion date unavailable'}</p>
              <h3>{certificate.name}</h3>
              <p>{certificate.issuer}</p>
              <div className="stack-list" aria-label={`Skills covered by ${certificate.name}`}>
                {certificate.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
              {(certificate.badgeUrl || certificate.certificateUrl) && (
                <a href={certificate.badgeUrl ?? certificate.certificateUrl} target="_blank" rel="noreferrer">View certificate ↗</a>
              )}
            </article>
          ))}
        </div>

        <h3 className="credentials-heading">More verified badges</h3>
        <div className="grid-list credentials-list">
          {featuredBadges.map((badge) => (
            <article className="terminal-card credential-card" key={badge.name}>
              <p className="period">Issued {badge.issued}</p>
              <h3>{badge.name}</h3>
              <p>{badge.issuer}</p>
              <div className="stack-list" aria-label={`Skills covered by ${badge.name}`}>
                {badge.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
              <a href={badge.url} target="_blank" rel="noreferrer">View certificate ↗</a>
            </article>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="contact-block">
      <p>Phone: <a href={`tel:${profile.contact.phone.replace(/\s/g, '')}`}>{profile.contact.phone}</a></p>
      <p>Email: <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a></p>
      <p>LinkedIn: <a href={`https://${profile.contact.linkedin}`}>{profile.contact.linkedin}</a></p>
      <p>GitHub: <a href={`https://${profile.contact.github}`}>{profile.contact.github}</a></p>
      <p>Credly: <a href={`https://${profile.contact.credly}`}>{profile.contact.credly}</a></p>
    </div>
  );
}

function renderAsteroidsFrame(state: AsteroidsState) {
  const rows = Array.from({ length: gameHeight }, () => Array.from({ length: gameWidth }, () => ' '));

  for (const asteroid of state.asteroids) {
    if (asteroid.y >= 0 && asteroid.y < gameHeight && asteroid.x >= 0 && asteroid.x < gameWidth) {
      rows[asteroid.y][asteroid.x] = asteroid.y % 2 === 0 ? 'O' : '*';
    }
  }

  for (const bullet of state.bullets) {
    if (bullet.y >= 0 && bullet.y < gameHeight && bullet.x >= 0 && bullet.x < gameWidth) {
      rows[bullet.y][bullet.x] = '|';
    }
  }

  rows[gameHeight - 1][state.shipX] = '^';

  return rows.map((row) => `|${row.join('')}|`).join('\n');
}

function advanceAsteroidsState(state: AsteroidsState): AsteroidsState {
  if (!state.running) {
    return state;
  }

  const tick = state.tick + 1;
  const movedBullets = state.bullets.map((bullet) => ({ ...bullet, y: bullet.y - 1 })).filter((bullet) => bullet.y >= 0);
  let movedAsteroids = state.asteroids.map((asteroid) => ({
    ...asteroid,
    y: tick % 4 === 0 ? asteroid.y + 1 : asteroid.y,
  }));
  let score = state.score;

  const bullets = movedBullets.filter((bullet) => {
    const hit = movedAsteroids.find((asteroid) => asteroid.x === bullet.x && asteroid.y === bullet.y);
    if (hit) {
      score += 10;
      movedAsteroids = movedAsteroids.filter((asteroid) => asteroid.id !== hit.id);
      return false;
    }

    return true;
  });

  let lives = state.lives;
  movedAsteroids = movedAsteroids.filter((asteroid) => {
    const hitShip = asteroid.y >= gameHeight - 1 && Math.abs(asteroid.x - state.shipX) <= 1;
    const missed = asteroid.y >= gameHeight;

    if (hitShip) {
      lives -= 1;
      return false;
    }

    return !missed;
  });

  if (tick % 10 === 0 && movedAsteroids.length < 6) {
    movedAsteroids.push({ id: createId(), x: 2 + Math.floor(Math.random() * (gameWidth - 4)), y: 0 });
  }

  return {
    ...state,
    asteroids: movedAsteroids,
    bullets,
    lives,
    running: lives > 0,
    score,
    tick,
  };
}

function AsteroidsGame({ onExit }: { onExit: () => void }) {
  const [game, setGame] = useState<AsteroidsState>(() => initialAsteroidsState());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setGame((current) => advanceAsteroidsState(current));
    }, 120);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    function handleGameKey(event: globalThis.KeyboardEvent) {
      if (event.key === 'q' || event.key === 'Q') {
        event.preventDefault();
        onExit();
        return;
      }

      if (event.key === 'r' || event.key === 'R') {
        event.preventDefault();
        setGame(initialAsteroidsState());
        return;
      }

      if (!game.running && event.key !== 'r' && event.key !== 'R') {
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setGame((current) => ({ ...current, shipX: Math.max(1, current.shipX - 1) }));
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setGame((current) => ({ ...current, shipX: Math.min(gameWidth - 2, current.shipX + 1) }));
      }

      if (event.key === ' ') {
        event.preventDefault();
        setGame((current) => ({
          ...current,
          bullets: [...current.bullets, { id: createId(), x: current.shipX, y: gameHeight - 2 }],
        }));
      }
    }

    window.addEventListener('keydown', handleGameKey);
    return () => window.removeEventListener('keydown', handleGameKey);
  }, [game.running, onExit]);

  return (
    <article className="asteroids-game" aria-label="ASCII asteroids game">
      <div className="game-header">
        <span>asteroids.bin</span>
        <span>score {game.score}</span>
        <span>lives {game.lives}</span>
      </div>
      <pre>{renderAsteroidsFrame(game)}</pre>
      <p>
        controls: left/right move · space fire · q quit{!game.running ? ' · r restart' : ''}
      </p>
      {!game.running && <p className="game-over">signal lost. press r to restart or q to return.</p>}
    </article>
  );
}

export function Terminal() {
  const [entries, setEntries] = useState<TerminalEntry[]>([]);
  const [input, setInput] = useState('');
  const [booting, setBooting] = useState(true);
  const [cheatMode, setCheatMode] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [order66Active, setOrder66Active] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const scrollRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const previousEntryCountRef = useRef(0);
  const scrollToNewEntryRef = useRef(false);
  const commandHistoryRef = useRef<string[]>([]);
  const historyIndexRef = useRef<number | null>(null);
  const historyDraftRef = useRef('');

  const bootEntries = useMemo<TerminalEntry[]>(
    () => bootSequence.map((line) => ({ id: createId(), type: 'system', content: line })),
    [],
  );

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      const nextEntry = bootEntries[index];
      if (!nextEntry) {
        return;
      }

      setEntries((current) => [...current, nextEntry]);
      index += 1;

      if (index >= bootEntries.length) {
        window.clearInterval(timer);
        setBooting(false);
        setEntries((current) => [
          ...current,
          { id: createId(), type: 'suggestions', content: '' },
        ]);
        window.setTimeout(() => inputRef.current?.focus(), 0);
      }
    }, 420);

    return () => window.clearInterval(timer);
  }, [bootEntries]);

  useLayoutEffect(() => {
    const container = scrollRef.current;
    const firstNewEntry = historyRef.current?.children[previousEntryCountRef.current];

    if (container) {
      if (scrollToNewEntryRef.current && firstNewEntry) {
        const top = container.scrollTop + firstNewEntry.getBoundingClientRect().top - container.getBoundingClientRect().top - 12;
        container.scrollTo({ top, behavior: 'instant' });
      } else if (entries.length === 0) {
        container.scrollTo({ top: 0, behavior: 'instant' });
      } else if (entries.length > previousEntryCountRef.current || gameActive) {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        container.scrollTo({ top: container.scrollHeight, behavior: reducedMotion ? 'instant' : 'smooth' });
      }
    }

    previousEntryCountRef.current = entries.length;
    scrollToNewEntryRef.current = false;
  }, [entries, gameActive]);

  useEffect(() => {
    let position = 0;

    function handleKonamiKey(event: globalThis.KeyboardEvent) {
      if (gameActive) {
        return;
      }

      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      const expected = konamiCode[position];

      if (key === expected) {
        position += 1;
      } else {
        position = key === konamiCode[0] ? 1 : 0;
      }

      if (position === konamiCode.length) {
        position = 0;
        setCheatMode(true);
        setEntries((current) => {
          const alreadyActivated = current.some((entry) => entry.type === 'cheat-mode');
          if (alreadyActivated) {
            return current;
          }

          return [...current, { id: createId(), type: 'cheat-mode' }];
        });
        playCheatAudio();
      }
    }

    window.addEventListener('keydown', handleKonamiKey);
    return () => window.removeEventListener('keydown', handleKonamiKey);
  }, [gameActive]);

  function markActivity() {
    setHasUserInteracted(true);
    setLastActivity(Date.now());
  }

  function runCommand(rawCommand: string) {
    markActivity();
    const command = rawCommand.trim().toLowerCase();
    if (!command) {
      return;
    }

    if (commandHistoryRef.current.at(-1) !== rawCommand.trim()) {
      commandHistoryRef.current.push(rawCommand.trim());
    }
    historyIndexRef.current = null;
    historyDraftRef.current = '';
    scrollToNewEntryRef.current = command !== 'clear';

    if (command === 'clear') {
      setEntries([]);
      setInput('');
      setOrder66Active(false);
      return;
    }

    if (command === 'execute order 66') {
      setEntries((current) => [
        ...current,
        { id: createId(), type: 'input', content: command },
        { id: createId(), type: 'order-66' },
      ]);
      setInput('');
      setOrder66Active(true);
      playOrder66Audio();
      return;
    }

    if (command === 'asteroids') {
      setEntries((current) => [
        ...current,
        { id: createId(), type: 'input', content: command },
        { id: createId(), type: 'text', content: 'Loading /usr/local/bin/asteroids... vector field armed.' },
      ]);
      setInput('');
      setGameActive(true);
      return;
    }

    setEntries((current) => [
      ...current,
      { id: createId(), type: 'input', content: command },
      ...commandOutput(command),
    ]);
    setInput('');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runCommand(inputRef.current?.value ?? '');
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      const history = commandHistoryRef.current;
      if (history.length === 0 || (event.key === 'ArrowDown' && historyIndexRef.current === null)) {
        return;
      }

      event.preventDefault();
      if (event.key === 'ArrowUp') {
        if (historyIndexRef.current === null) {
          historyDraftRef.current = event.currentTarget.value;
          historyIndexRef.current = history.length - 1;
        } else {
          historyIndexRef.current = Math.max(0, historyIndexRef.current - 1);
        }
        setInput(history[historyIndexRef.current]);
      } else if (historyIndexRef.current !== null && historyIndexRef.current < history.length - 1) {
        historyIndexRef.current += 1;
        setInput(history[historyIndexRef.current]);
      } else {
        historyIndexRef.current = null;
        setInput(historyDraftRef.current);
      }
      return;
    }

    if (event.key !== 'Enter') {
      return;
    }

    event.preventDefault();
    runCommand(event.currentTarget.value);
  }

  function handleTerminalClick(event: MouseEvent<HTMLElement>) {
    if (gameActive || window.getSelection()?.toString()) {
      return;
    }

    const target = event.target;
    if (target instanceof Element && target.closest('a, button, input, textarea, select, [tabindex]')) {
      return;
    }

    inputRef.current?.focus();
  }

  return (
    <section
      className={`terminal-window${order66Active ? ' order-66' : ''}`}
      aria-label="Interactive CV terminal"
      onClick={handleTerminalClick}
    >
      <div className="terminal-topbar">
        <div className="window-controls" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p>ronnie-profile:~</p>
        <span className="status">{booting ? 'booting' : 'ready'}</span>
      </div>

      <div className="terminal-body" ref={scrollRef}>
        <IntroBlock />
        <div className="history" ref={historyRef} role="log" aria-label="Terminal output" aria-live="polite" aria-relevant="additions">
          {entries.map((entry) => (
            <Entry key={entry.id} cheatMode={cheatMode} entry={entry} onRunCommand={runCommand} />
          ))}
          {gameActive && (
            <AsteroidsGame
              onExit={() => {
                setGameActive(false);
                markActivity();
              }}
            />
          )}
        </div>
      </div>

      <form
        className={`command-row${!hasUserInteracted && !booting && !gameActive ? ' command-row-guide' : ''}`}
        onSubmit={handleSubmit}
      >
        <label htmlFor="terminal-command">$</label>
        <input
          ref={inputRef}
          id="terminal-command"
          value={input}
          disabled={booting || gameActive}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          placeholder={booting ? '' : 'type help and press Enter'}
          aria-label="Terminal command"
          onChange={(event) => {
            markActivity();
            setInput(event.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <span className={`cursor${!hasUserInteracted && !booting && !gameActive ? ' cursor-guide' : ''}`} aria-hidden="true" />
      </form>
    </section>
  );
}
