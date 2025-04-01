export interface Signature {
  id: string;
  prompt: string;
  imageUrl: string;
  createdAt: string;
  style?: SignatureStyle;
}

export enum SignatureStyle {
  ELEGANT = "elegant",
  BOLD = "bold",
  CASUAL = "casual",
  PROFESSIONAL = "professional",
  ARTISTIC = "artistic",
  MINIMALIST = "minimalist",
  CALLIGRAPHY = "calligraphy",
  MODERN = "modern",
  CLASSIC = "classic",
  SCRIPT = "script",
  CORPORATE = "corporate",
  HANDWRITTEN = "handwritten",
  VINTAGE = "vintage",
  FORMAL = "formal",
  CREATIVE = "creative",
  STYLIZED = "stylized",
  DECORATIVE = "decorative",
  FLOURISH = "flourish",
  MONOLINE = "monoline",
  BRUSH = "brush",
  GOTHIC = "gothic"
}

export const SignatureStyleDescriptions: Record<SignatureStyle, string> = {
  [SignatureStyle.ELEGANT]: "Craft an elegant signature with refined, graceful curves, smooth flowing lines, and a sophisticated aesthetic.",
  [SignatureStyle.BOLD]: "Generate a bold signature with strong, assertive strokes, sharp edges, and a powerful, commanding presence.",
  [SignatureStyle.CASUAL]: "Design a casual signature with relaxed, free-flowing strokes, a natural and friendly appearance, and an effortless charm.",
  [SignatureStyle.PROFESSIONAL]: "Create a professional signature with clean, balanced lines, minimal flourishes, and a polished look suitable for corporate use.",
  [SignatureStyle.ARTISTIC]: "Generate an artistic signature with creative, expressive flourishes, abstract elements, and a visually striking design.",
  [SignatureStyle.MINIMALIST]: "Design a minimalist signature with sleek, simple lines, minimal embellishments, and a focus on clarity and elegance.",
  [SignatureStyle.CALLIGRAPHY]: "Create a calligraphic signature with flowing, elegant script, balanced letterforms, and classic penmanship.",
  [SignatureStyle.MODERN]: "Generate a modern signature with clean, sharp lines, contemporary style, and innovative visual elements.",
  [SignatureStyle.CLASSIC]: "Design a classic signature with timeless, traditional elements, balanced strokes, and a sophisticated appeal.",
  [SignatureStyle.SCRIPT]: "Create a script-style signature with beautifully connected, flowing cursive letterforms that convey elegance.",
  [SignatureStyle.CORPORATE]: "Generate a corporate signature with a formal, professional appearance, structured strokes, and clear readability for official use.",
  [SignatureStyle.HANDWRITTEN]: "Design a natural handwritten signature with authentic-looking, slightly imperfect strokes that convey a personal touch.",
  [SignatureStyle.VINTAGE]: "Create a vintage signature with old-fashioned stylistic elements, classic curves, and an antique character.",
  [SignatureStyle.FORMAL]: "Generate a formal signature with dignified, refined strokes, and an elegant, sophisticated presentation.",
  [SignatureStyle.CREATIVE]: "Design a creative signature with unique, unconventional styling, artistic curves, and distinctive personality.",
  [SignatureStyle.STYLIZED]: "Create a stylized signature with distinctive flair, artistic curves, and unique decorative elements that reflect personality.",
  [SignatureStyle.DECORATIVE]: "Generate a decorative signature with intricate ornamental elements, artistic flourishes, and elegant embellishments.",
  [SignatureStyle.FLOURISH]: "Design a signature with graceful, flowing decorative extensions and elegant, swirling flourishes.",
  [SignatureStyle.MONOLINE]: "Create a monoline signature with consistent stroke weight, clean geometric lines, and a cohesive design.",
  [SignatureStyle.BRUSH]: "Generate a brush pen signature with dynamic stroke variations, organic flow, and a bold, artistic touch.",
  [SignatureStyle.GOTHIC]: "Design a gothic-style signature with sharp, angular strokes, intricate detailing, and traditional blackletter-inspired elements."
};

export interface SignatureGenerationResponse {
  id: string;
  status: 'starting' | 'processing' | 'succeeded' | 'failed';
  output?: string[];
  error?: string;
}

export interface AppState {
  signatures: Signature[];
  isLoading: boolean;
  error: string | null;
}

export type AppAction = 
  | { type: 'ADD_SIGNATURE'; payload: Signature }
  | { type: 'SET_SIGNATURES'; payload: Signature[] }
  | { type: 'REMOVE_SIGNATURE'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }; 