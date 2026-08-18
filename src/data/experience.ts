export type Experience = {
  company: string;
  role: string;
  period: string;
  description: string;
};

export const experience: Experience[] = [
  {
    company: 'GitLab',
    role: 'Support Engineering Manager',
    period: '02/2020-07/2026',
    description:
      'Led a globally distributed team of 14 engineers supporting ~5,000 annual customer cases. Raised First Response Time SLA from ~75% to nearly 99%; architected Mechanizer, a Python and Zendesk automation platform that processed 10,000+ requests and saved ~500 engineering hours per month; built STAR priority escalation; led the SEMRA AI initiative; and developed engineers into Staff and management roles.',
  },
  {
    company: 'TradeStation Technologies',
    role: 'Senior Manager, Global Operations',
    period: '04/2017-02/2020',
    description:
      'Led ~20 engineers across Systems Administration, Development, ServiceNow, Monitoring, and SRE for latency-sensitive trading platforms and server farms of ~100-150 systems. Drove enterprise ServiceNow adoption, improved Linux and Windows patching, and created Power BI dashboards for IT Operations and the CTO.',
  },
  {
    company: 'Experian',
    role: 'Systems Engineer Expert (Staff/Principal Level)',
    period: '11/2011-04/2017',
    description:
      'Progressed through five technical and leadership roles to the organization\'s highest technical IC level. Led an 8-person Operations Service Desk, owned critical CheetahMail domains, designed an event-driven delivery network, automated DNS and routing validation in Python, and led an Agile transformation using Scrum and OKRs.',
  },
  {
    company: 'Arcus (Comcast Partner)',
    role: 'Senior Solution Architect / Senior Sysadmin',
    period: '09/2010-11/2011',
    description:
      'Designed early AWS infrastructure with EC2, ELB, RDS, Route 53, VPC foundations, and Auto Scaling. Embedded with Comcast as an L3 systems engineer supporting large-scale Linux environments, security hardening, certificates, audits, and migrations.',
  },
  {
    company: 'Event by Wire',
    role: 'Head of Engineering',
    period: '09/2008-09/2010',
    description:
      'Led a 10-person technology organization delivering live internet broadcasting services. Owned engineering, architecture, infrastructure, and customer-facing operations while building streaming, secure deployment-appliance, multimedia tribute, and digital fulfillment platforms.',
  },
];
