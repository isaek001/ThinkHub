/**
 * Photography for the public site. Served from the Unsplash CDN, which is
 * stable and licensed for commercial use without attribution (credit is still
 * printed in the footer as a courtesy).
 *
 * Each image is fetched with an explicit width so we never pull a full-size
 * original down to a phone.
 */
const photo = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMG = {
  hero: photo('photo-1497366754035-f200968a6e72', 2000),
  about: photo('photo-1531482615713-2afd69097998', 1400),
  programs: [photo('photo-1542744173-8e7e53415bb0', 1400)],
};

const SPACE_PHOTOS = [
  photo('photo-1552664730-d307ca884978', 1400),
  photo('photo-1497366811353-6870744d04b2', 1400),
  photo('photo-1518998053901-5348d3961a04', 1400),
  photo('photo-1478737270239-2f02b77fc618', 1400),
  photo('photo-1454165804606-c3d57bc86b40', 1400),
];

const SPACE_KEY = [
  ['incubator', 0],
  ['cowork', 1],
  ['galler', 2],
  ['record', 3],
  ['studio', 3],
  ['consult', 4],
  ['advis', 4],
];

/** Picks a photo by the space's title, falling back to its position. */
export function spacePhoto(space, index) {
  const title = String(space?.title || '').toLowerCase();
  for (const [needle, i] of SPACE_KEY) {
    if (title.includes(needle)) return SPACE_PHOTOS[i];
  }
  return SPACE_PHOTOS[index % SPACE_PHOTOS.length];
}

export function programPhoto(index) {
  return IMG.programs[index % IMG.programs.length];
}
