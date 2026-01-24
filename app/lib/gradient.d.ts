declare module '@/app/lib/gradient' {
  export interface GradientOptions {
    colors?: string[];
  }

  export class Gradient {
    conf: {
      playing: boolean;
    };

    initGradient(selector: string, options?: GradientOptions): Gradient;
  }
}
