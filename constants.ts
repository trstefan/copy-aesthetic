import { Theme } from "./types";

export const THEMES: Theme[] = [
  {
    id: "minimalist",
    name: "Swiss Minimalist",
    description: "Clean, whitespace-heavy, content-first design.",
    colors: {
      bgPrimary: "#ffffff",
      bgSecondary: "#f8f9fa",
      textPrimary: "#1a1a1a",
      textSecondary: "#6c757d",
      accent: "#000000",
      border: "#e9ecef",
    },
    styles: {
      fontFamily: '"Inter", sans-serif',
      borderRadius: "0px",
      boxShadow: "none",
      borderWidth: "1px",
    },
    promptShort:
      "A clean, minimalist UI design with ample whitespace, stark black and white contrast, and Swiss-style typography.",
    promptLong:
      "A hyper-minimalist user interface design inspired by Swiss graphic design. The layout features a strict grid system, generous whitespace, and high-contrast typography using Inter or Helvetica. The color palette is strictly monochrome with subtle gray accents. Elements have sharp corners (0px border radius) and rely on layout rather than shadows for hierarchy. Clean, professional, and content-focused.",
  },
  {
    id: "cyberpunk",
    name: "Neon Cyberpunk",
    description: "High contrast, glowing accents, dark mode aesthetics.",
    colors: {
      bgPrimary: "#09090b",
      bgSecondary: "#18181b",
      textPrimary: "#ffffff",
      textSecondary: "#a1a1aa",
      accent: "#06b6d4",
      border: "#27272a",
    },
    styles: {
      fontFamily: '"JetBrains Mono", monospace',
      borderRadius: "4px",
      boxShadow: "0 0 15px rgba(6, 182, 212, 0.3)",
      borderWidth: "2px",
    },
    promptShort:
      "A dark, futuristic cyberpunk UI with neon cyan accents, glowing effects, and monospaced typography.",
    promptLong:
      "A futuristic cyberpunk user interface set against a deep black background. The design features glowing neon cyan and magenta accents, creating a high-tech atmosphere. Typography is strictly monospaced (JetBrains Mono), resembling code editors or terminal interfaces. Containers have subtle glowing borders and semi-transparent backgrounds. The aesthetic is gritty yet polished, evoking a sci-fi dashboard.",
  },
  {
    id: "neobrutalism",
    name: "Neo-Brutalism",
    description: "Bold borders, high saturation, retro-modern vibe.",
    colors: {
      bgPrimary: "#fff1f2",
      bgSecondary: "#ffe4e6",
      textPrimary: "#000000",
      textSecondary: "#333333",
      accent: "#f43f5e",
      border: "#000000",
    },
    styles: {
      fontFamily: '"Space Grotesk", sans-serif',
      borderRadius: "8px",
      boxShadow: "5px 5px 0px 0px #000000",
      borderWidth: "3px",
    },
    promptShort:
      "A trendy neo-brutalist design with bold black borders, hard shadows, and vibrant pop colors.",
    promptLong:
      "A neo-brutalist user interface design characterized by raw, unpolished aesthetics. Elements feature thick, bold black borders (3px+) and hard, offset drop shadows (no blur). The typography uses quirky sans-serif fonts like Space Grotesk. The color palette combines stark black outlines with vibrant, pastel-pop background colors like soft pinks and yellows. The UI feels tactile, playful, and assertive.",
  },
  {
    id: "glassmorphism",
    name: "Glassmorphism",
    description: "Frosted glass effects, blur, and soft gradients.",
    colors: {
      bgPrimary: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", // Special handling for gradient mock
      bgSecondary: "rgba(255, 255, 255, 0.2)",
      textPrimary: "#ffffff",
      textSecondary: "rgba(255, 255, 255, 0.8)",
      accent: "rgba(255, 255, 255, 0.5)",
      border: "rgba(255, 255, 255, 0.3)",
    },
    styles: {
      fontFamily: '"Inter", sans-serif',
      borderRadius: "16px",
      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      borderWidth: "1px",
    },
    promptShort:
      "A dreamy glassmorphism UI with frosted glass cards, background blur, and soft mesh gradients.",
    promptLong:
      "A modern glassmorphism user interface design. The background features a vibrant, soft mesh gradient in purple and blue hues. UI cards resemble frosted glass with background blur filters, semi-transparent white fills, and subtle white borders to simulate light reflection. Typography is clean white sans-serif to ensure readability against the colorful background. The overall look is ethereal, premium, and layered.",
  },
  {
    id: "luxury",
    name: "Modern Luxury",
    description: "Serif fonts, gold accents, dark sophisticated tones.",
    colors: {
      bgPrimary: "#1c1917",
      bgSecondary: "#292524",
      textPrimary: "#fafaf9",
      textSecondary: "#a8a29e",
      accent: "#d4af37", // Gold
      border: "#44403c",
    },
    styles: {
      fontFamily: '"Playfair Display", serif',
      borderRadius: "2px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
      borderWidth: "1px",
    },
    promptShort:
      "A sophisticated luxury UI design with serif typography, dark warm grays, and metallic gold accents.",
    promptLong:
      "A high-end luxury user interface design. The palette is dominated by deep, warm charcoal and rich black tones, accented by metallic gold elements. Typography pairs elegant serifs (Playfair Display) for headings with clean sans-serifs for body text. Spacing is generous to convey elegance. Components have very subtle borders and deep, soft shadows to create depth. The aesthetic feels exclusive, timeless, and refined.",
  },
  {
    id: "aurora-borealism",
    name: "Aurora Borealism",
    description:
      "Vibrant fluid color blobs, dark mode contrast, and ultra-thin lines.",
    colors: {
      bgPrimary: "#050505",
      bgSecondary: "rgba(20, 20, 20, 0.7)",
      textPrimary: "#ffffff",
      textSecondary: "#a1a1a1",
      accent: "#00f2ff",
      border: "rgba(255, 255, 255, 0.1)",
    },
    styles: {
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      borderRadius: "24px",
      boxShadow: "0 0 40px rgba(0, 242, 255, 0.1)",
      borderWidth: "1px",
    },
    promptShort:
      "A dark UI with glowing aurora color splashes and sharp, futuristic typography.",
    promptLong:
      'A high-energy, dark-themed interface featuring "Aurora" background effects—large, amorphous blobs of neon cyan, magenta, and violet that softly glow and overlap. UI elements are dark and semi-transparent but keep sharp edges and high-contrast white text. The look is futuristic and cinematic, emphasizing depth through glowing light rather than physical shadows.',
  },
  {
    id: "retro-tech",
    name: "Retro Tech",
    description:
      "Nostalgic 90s OS aesthetic with beveled edges and thick borders.",
    colors: {
      bgPrimary: "#008080", // Classic Teal
      bgSecondary: "#c0c0c0", // Classic Silver/Gray
      textPrimary: "#000000",
      textSecondary: "#424242",
      accent: "#000080", // Navy
      border: "#ffffff", // Used for light side of bevel
    },
    styles: {
      fontFamily: '"MS Sans Serif", "Geneva", sans-serif',
      borderRadius: "0px",
      boxShadow:
        "inset 1px 1px #dfdfdf, inset -1px -1px #0a0a0a, 1px 1px #0a0a0a",
      borderWidth: "2px",
    },
    promptShort:
      "A 90s desktop OS aesthetic with beveled gray panels and classic teal backgrounds.",
    promptLong:
      'A nostalgic "vaporwave" or retro-computing interface. It features heavy 3D beveled edges on buttons and windows to simulate a vintage GUI. The color scheme is dominated by battleship gray and teal. Icons are pixelated, and the overall vibe is a high-fidelity tribute to the early days of personal computing and "grey-box" software design.',
  },

  {
    id: "retro-oatmeal",
    name: "Retro Oatmeal",
    description:
      "Organic textures, warm muted tones, and elegant serif typography.",
    colors: {
      bgPrimary: "#f4f1ea",
      bgSecondary: "#ebe7de",
      textPrimary: "#2c2c2c",
      textSecondary: "#6b6b6b",
      accent: "#8c7851",
      border: "#d1cdc2",
    },
    styles: {
      fontFamily: '"Playfair Display", serif',
      borderRadius: "4px",
      boxShadow: "none",
      borderWidth: "1px",
    },
    promptShort:
      "A nostalgic, paper-textured UI with muted earth tones and sophisticated serif fonts.",
    promptLong:
      "An organic, editorial-style web design. The background has a subtle grain texture resembling recycled paper. The layout is structured with thin, delicate borders and uses a warm palette of cream, beige, and charcoal. Typography is the star, featuring high-contrast serif headers that evoke a sense of heritage, craftsmanship, and slow-living.",
  },
  {
    id: "claymorphism",
    name: "Claymorphism",
    description:
      "Inflated 3D shapes, friendly rounded corners, and soft inner shadows.",
    colors: {
      bgPrimary: "#f0f4ff",
      bgSecondary: "#ffffff",
      textPrimary: "#2d334a",
      textSecondary: "#5f6c7b",
      accent: "#ff8e71",
      border: "transparent",
    },
    styles: {
      fontFamily: '"Quicksand", sans-serif',
      borderRadius: "32px",
      boxShadow:
        "inset -8px -8px 12px rgba(0,0,0,0.1), 12px 12px 20px rgba(0,0,0,0.05)",
      borderWidth: "0px",
    },
    promptShort:
      "A playful claymorphism UI with bubble-like cards and soft, friendly 3D depth.",
    promptLong:
      'A whimsical claymorphism user interface. Cards have high border-radii and use dual inner shadows (one light, one dark) to create a soft, inflated 3D effect. The color palette is pastel and inviting. It features friendly typography and looks like a modern mobile app for children or a creative tool, emphasizing a tactile, "squishy" visual feel.',
  },
  {
    id: "neumorphism",
    name: "Neumorphism",
    description:
      "Soft shadows and highlights creating a tactile, extruded plastic look.",
    colors: {
      bgPrimary: "#e0e5ec",
      bgSecondary: "#e0e5ec",
      textPrimary: "#31344b",
      textSecondary: "#44476a",
      accent: "#6d5dfc",
      border: "transparent",
    },
    styles: {
      fontFamily: '"Poppins", sans-serif',
      borderRadius: "30px",
      boxShadow:
        "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255, 0.5)",
      borderWidth: "0px",
    },
    promptShort:
      "A tactile Neumorphic UI with soft shadows, rounded shapes, and monochromatic depth.",
    promptLong:
      'A sleek Neumorphism interface design. The entire layout uses a consistent light gray base color. Buttons and cards appear to emerge from the background using a combination of light "highlight" shadows on the top-left and dark "drop" shadows on the bottom-right. The aesthetic is clean, soft, and highly interactive, resembling a high-end physical remote control or medical device interface.',
  },
];
