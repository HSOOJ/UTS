import IPalette from "./Palette.types";

const Palette: IPalette = {
  // Gray
  Grigio100: "#F8FAFF",
  Grigio200: "#D5DDE9",
  Grigio300: "#8A929C",
  Grigio400: "#4C4E50",
  Grigio500: "#32363B",

  // Black
  Nero100: "#222426",
  Nero300: "#131415",

  // Red
  Rosso100: "#FF4D6B",
  Rosso200: "#EC003C",

  // Yellow
  Giallo200: "#FFE249",
  Giallo300: "#FED136",

  // Blue
  Blu100: "#BBD3FF",
  Blu200: "#759AFF",
  Blu300: "#0066FF",

  BluOpacity100: "rgba(117,154,255, 0.2)",
} as const;

export default Palette;
