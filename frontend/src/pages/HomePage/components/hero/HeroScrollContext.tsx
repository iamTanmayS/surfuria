import { createContext, useContext } from 'react';
import type { MotionValue } from 'motion/react';

export interface HeroScrollAnimation {
  contentOpacity: MotionValue<number>;
  contentY: MotionValue<number>;
  cueOpacity: MotionValue<number>;
  imageScale: MotionValue<number>;
}

export const HeroScrollContext = createContext<HeroScrollAnimation | null>(null);

export function useHeroScrollAnimation(): HeroScrollAnimation | null {
  return useContext(HeroScrollContext);
}
