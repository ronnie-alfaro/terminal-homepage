export type CredentialGroup = {
  title: string;
  items: string[];
};

export const credentials: CredentialGroup[] = [
  {
    title: 'Languages',
    items: ['Spanish - native/bilingual', 'English - full professional', 'French - B2', 'Italian - A1'],
  },
  {
    title: 'Certifications',
    items: ['AWS Concepts', 'Kubernetes Quick Start', 'Docker Deep Dive', 'Working with Scrum Teams', 'Git and GitLab'],
  },
  {
    title: 'Recognition',
    items: ['Praise program quarterly award Q3 FY13', 'Praise program quarterly award Q4 FY12', 'Praise program annual award FY13'],
  },
];
