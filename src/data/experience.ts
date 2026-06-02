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
    period: '2020-Present',
    description:
      'Lead 14 engineers, helped scale AMER support operations, created automation tooling adopted company-wide, integrated AI-powered workflows, designed routing logic, support processes, and escalation protocols.',
  },
  {
    company: 'TradeStation Technologies',
    role: 'Senior Manager, Global Operations',
    period: '2018-2020',
    description:
      'Scaled operations across infrastructure support, ServiceNow, JIRA, Confluence, PowerBI, incident management, and DevOps delivery.',
  },
  {
    company: 'Experian',
    role: 'IT & Systems Team Leader / Application Operations Engineer',
    period: '2011-2017',
    description:
      'Led cross-functional technical teams, supported business-critical platforms, improved operational processes, coached engineers, and managed release quality.',
  },
  {
    company: 'Arcus / Event By Wire / Netsurfmedia',
    role: 'AWS Architect, IT Manager, Lead SysAdmin',
    period: '2003-2011',
    description:
      'Built and operated cloud, Unix/Linux, and dedicated-server infrastructure across AWS, web platforms, product delivery, server migrations, security, scripting, and cost-reduction initiatives.',
  },
];
