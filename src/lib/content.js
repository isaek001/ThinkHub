/** Human labels for every editable field (site fields + list item fields). */
export const FIELD_LABELS = {
  name: 'Name',
  tagline: 'Tagline',
  heroTitle: 'Headline',
  heroText: 'Hero text',
  about: 'About us',
  mission: 'Mission',
  email: 'Email',
  phone: 'Phone',
  address: 'Address',
  instagram: 'Instagram link',
  twitter: 'X / Twitter link',
  linkedin: 'LinkedIn link',
  tiktok: 'TikTok link',
  youtube: 'YouTube link',
  label: 'Label',
  value: 'Value',
  icon: 'Icon',
  title: 'Title',
  text: 'Text',
  dates: 'Dates',
  status: 'Status',
  link: 'Link',
  role: 'Role',
};

export const fieldLabel = (key) =>
  FIELD_LABELS[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());

export const SECTION_META = {
  stats: { label: 'Numbers', help: 'The highlight numbers under the top banner.', fields: ['label', 'value'] },
  pillars: { label: 'Values', help: 'The three "Create, Collaborate, Chill" style cards.', fields: ['title', 'text'] },
  spaces: { label: 'Spaces', help: 'Cards in "What is inside the hub". Pick an icon for each space.', fields: ['icon', 'title', 'text'] },
  programs: { label: 'Programs', help: 'Workshops and events. Status is a short label such as Open, Closing soon or Past edition.', fields: ['title', 'dates', 'status', 'text', 'link'] },
  team: { label: 'Team', help: 'People shown on the site.', fields: ['name', 'role'] },
};

export const SITE_HELP =
  'Text shown across the public site. Leave email, phone or a social link blank to hide it. Social links must start with https://';

/** Fields that get a textarea instead of a single-line input. */
export const LONG_FIELDS = new Set(['text', 'about', 'mission', 'heroText']);

/** Only allow absolute http(s) URLs through as links. */
export const safeUrl = (value) => (/^https?:\/\//i.test(value ?? '') ? value : '');

export const initials = (name) => (name ?? '').trim().charAt(0).toUpperCase();

export const SOCIAL_LINKS = [
  ['instagram', 'Instagram'],
  ['twitter', 'X / Twitter'],
  ['linkedin', 'LinkedIn'],
  ['tiktok', 'TikTok'],
  ['youtube', 'YouTube'],
];

export const activeSocials = (site) =>
  SOCIAL_LINKS.map(([key, label]) => ({ key, label, href: safeUrl(site?.[key]) })).filter((s) => s.href);
