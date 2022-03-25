interface IPaletteGrigio {
  [Grigio100: string]: string;
  Grigio200: string;
  Grigio300: string;
  Grigio400: string;
  Grigio500: string;

  Nero100: string;
  Nero300: string;
}

interface IPaletteBlu {
  Blu100: string;
  Blu200: string;
  Blu300: string;
}

interface IPaletteRosso {
  Rosso100: string;
  Rosso200: string;
}

export default interface IPalette
  extends IPaletteGrigio,
    IPaletteRosso,
    IPaletteBlu {}
