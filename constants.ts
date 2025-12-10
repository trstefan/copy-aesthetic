import { Theme } from './types';

export const THEMES: Theme[] = [
  {
    id: 'minimalist',
    name: 'Swiss Minimalist',
    description: 'Clean, whitespace-heavy, content-first design.',
    colors: {
      bgPrimary: '#ffffff',
      bgSecondary: '#f8f9fa',
      textPrimary: '#1a1a1a',
      textSecondary: '#6c757d',
      accent: '#000000',
      border: '#e9ecef',
    },
    styles: {
      fontFamily: '"Inter", sans-serif',
      borderRadius: '0px',
      boxShadow: 'none',
      borderWidth: '1px',
    },
    promptShort: 'A clean, minimalist UI design with ample whitespace, stark black and white contrast, and Swiss-style typography.',
    promptLong: 'A hyper-minimalist user interface design inspired by Swiss graphic design. The layout features a strict grid system, generous whitespace, and high-contrast typography using Inter or Helvetica. The color palette is strictly monochrome with subtle gray accents. Elements have sharp corners (0px border radius) and rely on layout rather than shadows for hierarchy. Clean, professional, and content-focused.',
  },
  {
    id: 'cyberpunk',
    name: 'Neon Cyberpunk',
    description: 'High contrast, glowing accents, dark mode aesthetics.',
    colors: {
      bgPrimary: '#09090b',
      bgSecondary: '#18181b',
      textPrimary: '#ffffff',
      textSecondary: '#a1a1aa',
      accent: '#06b6d4',
      border: '#27272a',
    },
    styles: {
      fontFamily: '"JetBrains Mono", monospace',
      borderRadius: '4px',
      boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)',
      borderWidth: '2px',
    },
    promptShort: 'A dark, futuristic cyberpunk UI with neon cyan accents, glowing effects, and monospaced typography.',
    promptLong: 'A futuristic cyberpunk user interface set against a deep black background. The design features glowing neon cyan and magenta accents, creating a high-tech atmosphere. Typography is strictly monospaced (JetBrains Mono), resembling code editors or terminal interfaces. Containers have subtle glowing borders and semi-transparent backgrounds. The aesthetic is gritty yet polished, evoking a sci-fi dashboard.',
  },
  {
    id: 'neobrutalism',
    name: 'Neo-Brutalism',
    description: 'Bold borders, high saturation, retro-modern vibe.',
    colors: {
      bgPrimary: '#fff1f2',
      bgSecondary: '#ffe4e6',
      textPrimary: '#000000',
      textSecondary: '#333333',
      accent: '#f43f5e',
      border: '#000000',
    },
    styles: {
      fontFamily: '"Space Grotesk", sans-serif',
      borderRadius: '8px',
      boxShadow: '5px 5px 0px 0px #000000',
      borderWidth: '3px',
    },
    promptShort: 'A trendy neo-brutalist design with bold black borders, hard shadows, and vibrant pop colors.',
    promptLong: 'A neo-brutalist user interface design characterized by raw, unpolished aesthetics. Elements feature thick, bold black borders (3px+) and hard, offset drop shadows (no blur). The typography uses quirky sans-serif fonts like Space Grotesk. The color palette combines stark black outlines with vibrant, pastel-pop background colors like soft pinks and yellows. The UI feels tactile, playful, and assertive.',
  },
  {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    description: 'Frosted glass effects, blur, and soft gradients.',
    colors: {
      bgPrimary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Special handling for gradient mock
      bgSecondary: 'rgba(255, 255, 255, 0.2)',
      textPrimary: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.8)',
      accent: 'rgba(255, 255, 255, 0.5)',
      border: 'rgba(255, 255, 255, 0.3)',
    },
    styles: {
      fontFamily: '"Inter", sans-serif',
      borderRadius: '16px',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      borderWidth: '1px',
    },
    promptShort: 'A dreamy glassmorphism UI with frosted glass cards, background blur, and soft mesh gradients.',
    promptLong: 'A modern glassmorphism user interface design. The background features a vibrant, soft mesh gradient in purple and blue hues. UI cards resemble frosted glass with background blur filters, semi-transparent white fills, and subtle white borders to simulate light reflection. Typography is clean white sans-serif to ensure readability against the colorful background. The overall look is ethereal, premium, and layered.',
  },
  {
    id: 'luxury',
    name: 'Modern Luxury',
    description: 'Serif fonts, gold accents, dark sophisticated tones.',
    colors: {
      bgPrimary: '#1c1917',
      bgSecondary: '#292524',
      textPrimary: '#fafaf9',
      textSecondary: '#a8a29e',
      accent: '#d4af37', // Gold
      border: '#44403c',
    },
    styles: {
      fontFamily: '"Playfair Display", serif',
      borderRadius: '2px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
      borderWidth: '1px',
    },
    promptShort: 'A sophisticated luxury UI design with serif typography, dark warm grays, and metallic gold accents.',
    promptLong: 'A high-end luxury user interface design. The palette is dominated by deep, warm charcoal and rich black tones, accented by metallic gold elements. Typography pairs elegant serifs (Playfair Display) for headings with clean sans-serifs for body text. Spacing is generous to convey elegance. Components have very subtle borders and deep, soft shadows to create depth. The aesthetic feels exclusive, timeless, and refined.',
  }
];
