import { useState } from 'react';
import { certificates, featuredBadges } from '../data/credentials';
import { skillGraphCategories, skillGraphNodes } from '../data/skillGraph';

type GraphCredential = {
  name: string;
  issuer: string;
  date?: string;
  skills: string[];
  url?: string;
};

type GraphEdge = {
  from: string;
  to: string;
  count: number;
};

const graphCredentials: GraphCredential[] = [
  ...certificates.map((certificate) => ({
    name: certificate.name,
    issuer: certificate.issuer,
    date: certificate.completed,
    skills: certificate.skills,
    url: certificate.badgeUrl ?? certificate.certificateUrl,
  })),
  ...featuredBadges.map((badge) => ({
    name: badge.name,
    issuer: badge.issuer,
    date: badge.issued,
    skills: badge.skills,
    url: badge.url,
  })),
];

const credentialsBySkill = new Map(skillGraphNodes.map((node) => [
  node.id,
  graphCredentials.filter((credential) => credential.skills.some((skill) =>
    node.terms.some((term) => skill.toLowerCase() === term.toLowerCase()))),
]));

const edgeCounts = new Map<string, number>();

for (const credential of graphCredentials) {
  const linkedNodes = skillGraphNodes.filter((node) =>
    credentialsBySkill.get(node.id)?.includes(credential));

  for (let from = 0; from < linkedNodes.length; from += 1) {
    for (let to = from + 1; to < linkedNodes.length; to += 1) {
      const key = `${linkedNodes[from].id}|${linkedNodes[to].id}`;
      edgeCounts.set(key, (edgeCounts.get(key) ?? 0) + 1);
    }
  }
}

const edges: GraphEdge[] = [...edgeCounts].map(([key, count]) => {
  const [from, to] = key.split('|');
  return { from, to, count };
});

const nodeById = new Map(skillGraphNodes.map((node) => [node.id, node]));

function categoryClass(category: string) {
  return `category-${category.toLowerCase().replace(/[^a-z]+/g, '-')}`;
}

export function SkillGraph() {
  const [selectedId, setSelectedId] = useState('rag');
  const selectedNode = nodeById.get(selectedId)!;
  const relatedCredentials = credentialsBySkill.get(selectedId) ?? [];
  const connectedIds = new Set(edges.flatMap((edge) => {
    if (edge.from === selectedId) return [edge.to];
    if (edge.to === selectedId) return [edge.from];
    return [];
  }));

  return (
    <section className="terminal-card skill-map" aria-labelledby="skill-map-title">
      <div className="skill-map-intro">
        <div>
          <p className="period">SKILL GRAPH / {skillGraphNodes.length} NODES</p>
          <h3 id="skill-map-title">Where the credentials connect</h3>
        </div>
        <p>Each dot is a skill. Larger dots appear in more credentials; lines connect skills covered together. Select a dot to see the supporting courses and badges.</p>
      </div>

      <div className="skill-map-legend" aria-label="Skill groups">
        {skillGraphCategories.map((category) => (
          <span className={categoryClass(category)} key={category}>{category}</span>
        ))}
      </div>

      <div className="skill-map-scroll" role="region" aria-label="Interactive skill graph" tabIndex={0}>
        <div className="skill-map-canvas">
          <svg viewBox="0 0 1000 560" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            {edges.map((edge) => {
              const from = nodeById.get(edge.from)!;
              const to = nodeById.get(edge.to)!;
              const selected = edge.from === selectedId || edge.to === selectedId;

              return (
                <line
                  key={`${edge.from}-${edge.to}`}
                  className={`skill-map-line${selected ? ' is-related' : ''}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  strokeWidth={selected ? Math.min(2.6, 1.2 + edge.count * 0.35) : 1}
                />
              );
            })}
          </svg>
          {skillGraphNodes.map((node) => {
            const count = credentialsBySkill.get(node.id)?.length ?? 0;
            const active = node.id === selectedId;
            const related = connectedIds.has(node.id);

            return (
              <button
                className={`skill-map-node ${categoryClass(node.category)}${active ? ' is-active' : ''}${related ? ' is-related' : ''}`}
                key={node.id}
                type="button"
                style={{ left: `${node.x / 10}%`, top: `${node.y / 5.6}%` }}
                data-size={Math.min(count, 3)}
                aria-pressed={active}
                aria-label={`${node.label}, ${count} linked ${count === 1 ? 'credential' : 'credentials'}`}
                onClick={() => setSelectedId(node.id)}
                onFocus={() => setSelectedId(node.id)}
                onMouseEnter={() => setSelectedId(node.id)}
              >
                <span>{node.label}</span>
                <small>{count}</small>
              </button>
            );
          })}
        </div>
      </div>

      <div className="skill-map-detail" aria-live="polite">
        <div>
          <p className="period">SELECTED / {selectedNode.category.toUpperCase()}</p>
          <h4>{selectedNode.label}</h4>
          <p>{relatedCredentials.length} linked {relatedCredentials.length === 1 ? 'credential' : 'credentials'}</p>
        </div>
        <ul>
          {relatedCredentials.map((credential) => (
            <li key={credential.name}>
              {credential.url ? (
                <a href={credential.url} target="_blank" rel="noreferrer">{credential.name} ↗</a>
              ) : (
                <strong>{credential.name}</strong>
              )}
              <span>{credential.issuer}{credential.date ? ` · ${credential.date}` : ''}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
