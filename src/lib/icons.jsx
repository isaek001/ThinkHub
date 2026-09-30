import {
  Anchor, Antenna, Aperture, Armchair, Atom, AudioLines, Award, Bike, Binary, Blend, Blocks,
  BookOpen, Boxes, Briefcase, Brush, Building2, Bus, Cake, Calendar, Camera, Car, CircuitBoard,
  Clapperboard, ClipboardList, Cloud, CloudSun, Code, Coffee, Cog, Compass, Container, Contrast,
  Cpu, Crown, Database, Diamond, Disc3, Drama, Drum, Feather, Film, Flame, Flower, Footprints,
  Forklift, Gamepad2, Gauge, Gem, Gift, Globe, Guitar, Hammer, HardDrive, Hash, Heart, Home,
  Image as ImageIcon, Lamp, Layers, Leaf, LayoutGrid, Lightbulb, Map, MapPin, Medal, MessageCircle,
  MessageSquare, Mic, MicVocal, Milestone, Monitor, Mountain, Moon, Music, Music4, Navigation,
  Network, Notebook, Orbit, Package, Paintbrush, PaintBucket, Palette, PartyPopper, Pen, PenTool,
  Piano, Pipette, Plane, PlugZap, Podcast, Presentation, Projector, Radio, Recycle, Rocket, Route,
  Router, Scan, ScanLine, Scissors, Server, Shapes, Ship, ShoppingBag, Signature, SlidersHorizontal,
  Sofa, Sparkles, Star, Store, Sun, SwatchBook, Target, Telescope, Tent, Ticket, Train, Tractor,
  TreePine, Trophy, Tv, Type, UserPlus, Users, Utensils, Video, Wallet, Wand2, WandSparkles, Waves,
  Waypoints, Wifi, Wrench, Zap,
} from 'lucide-react';

const ICONS = {
  Anchor, Antenna, Aperture, Armchair, Atom, AudioLines, Award, Bike, Binary, Blend, Blocks,
  BookOpen, Boxes, Briefcase, Brush, Building2, Bus, Cake, Calendar, Camera, Car, CircuitBoard,
  Clapperboard, ClipboardList, Cloud, CloudSun, Code, Coffee, Cog, Compass, Container, Contrast,
  Cpu, Crown, Database, Diamond, Disc3, Drama, Drum, Feather, Film, Flame, Flower, Footprints,
  Forklift, Gamepad2, Gauge, Gem, Gift, Globe, Guitar, Hammer, HardDrive, Hash, Heart, Home,
  ImageIcon, Lamp, Layers, Leaf, LayoutGrid, Lightbulb, Map, MapPin, Medal, MessageCircle,
  MessageSquare, Mic, MicVocal, Milestone, Monitor, Mountain, Moon, Music, Music4, Navigation,
  Network, Notebook, Orbit, Package, Paintbrush, PaintBucket, Palette, PartyPopper, Pen, PenTool,
  Piano, Pipette, Plane, PlugZap, Podcast, Presentation, Projector, Radio, Recycle, Rocket, Route,
  Router, Scan, ScanLine, Scissors, Server, Shapes, Ship, ShoppingBag, Signature, SlidersHorizontal,
  Sofa, Sparkles, Star, Store, Sun, SwatchBook, Target, Telescope, Tent, Ticket, Train, Tractor,
  TreePine, Trophy, Tv, Type, UserPlus, Users, Utensils, Video, Wallet, Wand2, WandSparkles, Waves,
  Waypoints, Wifi, Wrench, Zap,
};

// Curated set (not all ~6k icons) so the bundle stays small. Names are stored in
// content.json, so keep them stable once shipped.
export const SPACE_ICON_GROUPS = [
  {
    label: 'Spaces',
    names: ['Building2', 'Sofa', 'Armchair', 'Lamp', 'LayoutGrid', 'Home', 'Store', 'Boxes', 'Package', 'Container', 'Forklift', 'Tent'],
  },
  {
    label: 'Tech & digital',
    names: ['Cpu', 'CircuitBoard', 'Code', 'Database', 'Server', 'Network', 'Binary', 'Atom', 'HardDrive', 'Wifi', 'Router', 'Antenna', 'Tv', 'Monitor', 'Blocks', 'Layers', 'Gauge'],
  },
  {
    label: 'Creative',
    names: ['Palette', 'Brush', 'Paintbrush', 'PaintBucket', 'Pipette', 'SwatchBook', 'Blend', 'Contrast', 'Scan', 'ScanLine', 'Aperture', 'Shapes', 'Type', 'Signature', 'PenTool', 'Feather', 'Wand2', 'WandSparkles', 'Sparkles', 'Pen'],
  },
  {
    label: 'Media & audio',
    names: ['Mic', 'MicVocal', 'Music', 'Music4', 'Guitar', 'Piano', 'Drum', 'Disc3', 'AudioLines', 'Waves', 'Radio', 'Podcast', 'Video', 'Camera', 'Film', 'Clapperboard', 'Projector', 'ImageIcon'],
  },
  {
    label: 'Growth',
    names: ['Rocket', 'Orbit', 'Telescope', 'Target', 'Trophy', 'Medal', 'Award', 'Crown', 'Gem', 'Diamond', 'Lightbulb', 'Zap', 'SlidersHorizontal', 'Milestone', 'Waypoints', 'Route'],
  },
  {
    label: 'People & events',
    names: ['Users', 'UserPlus', 'Calendar', 'Presentation', 'PartyPopper', 'Cake', 'Gift', 'Coffee', 'Gamepad2', 'Drama', 'Footprints', 'Heart', 'Star'],
  },
  {
    label: 'Media library',
    names: ['BookOpen', 'Notebook', 'ClipboardList', 'Ticket', 'Wallet', 'ShoppingBag', 'Briefcase', 'Globe', 'MessageSquare', 'MessageCircle', 'Map', 'MapPin', 'Hash', 'Compass'],  },
  {
    label: 'Making & outdoors',
    names: ['Hammer', 'Scissors', 'Wrench', 'Cog', 'PlugZap', 'Recycle', 'Flame', 'Sun', 'Moon', 'Cloud', 'CloudSun', 'Utensils', 'Mountain', 'TreePine', 'Leaf', 'Flower', 'Navigation', 'Ship', 'Anchor', 'Plane', 'Car', 'Bus', 'Train', 'Bike', 'Tractor'],
  },
];

export const SPACE_ICON_MAP = Object.fromEntries(
  SPACE_ICON_GROUPS.flatMap((g) => g.names).map((name) => [name, ICONS[name] || null]),
);

export const SPACE_ICON_NAMES = SPACE_ICON_GROUPS.flatMap((g) => g.names);

/**
 * Resolve a stored icon value to a lucide component.
 * Falls back to `null` when the value is not a known icon name, so callers can
 * render legacy emoji values that predate the icon picker.
 */
export function resolveIcon(value) {
  return SPACE_ICON_MAP[value] || null;
}

/** Renders a stored icon value: lucide icon when recognised, raw emoji/text otherwise. */
export function ContentIcon({ value, className = 'ic', size = 30, strokeWidth = 1.8 }) {
  const Icon = resolveIcon(value);
  if (Icon) return <Icon className={className} size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
  if (value) return <span className={`${className} ic-emoji`} aria-hidden="true">{value}</span>;
  return null;
}
