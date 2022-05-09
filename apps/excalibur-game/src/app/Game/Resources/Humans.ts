import {
  Animation,
  ImageFiltering,
  ImageSource,
  SpriteSheet,
  Vector,
} from 'excalibur';

export const HcHumans1AImage = new ImageSource(
  '/assets/HC_Humans1A.png',
  true,
  ImageFiltering.Pixel
);
export const HcHumans1AImageSpriteSheet = SpriteSheet.fromImageSource({
  image: HcHumans1AImage,
  grid: {
    rows: 8,
    columns: 12,
    spriteWidth: 16,
    spriteHeight: 32,
  },
});

type MoveableActorAnimationMap = {
  idle_left: Animation;
  idle_right: Animation;
  idle_up: Animation;
  idle_down: Animation;
  move_left: Animation;
  move_right: Animation;
  move_up: Animation;
  move_down: Animation;
};

type CreateAnimationProps = {
  sheet: SpriteSheet;
  frames: number[];
  interval: number;
  scale?: Vector;
  flip?: { horizontal?: boolean; vertical?: boolean };
};
function createAnimation({
  sheet,
  frames,
  interval,
  scale,
  flip,
}: CreateAnimationProps) {
  const animation = Animation.fromSpriteSheet(sheet, frames, interval);
  if (scale) animation.scale = scale;
  animation.flipHorizontal = !!flip?.horizontal;
  animation.flipVertical = !!flip?.vertical;

  return animation;
}

function createHumansAnimationSet(start = 1): MoveableActorAnimationMap {
  return {
    idle_down: createAnimation({
      sheet: HcHumans1AImageSpriteSheet,
      frames: [start + 1],
      interval: 200,
    }),
    idle_left: createAnimation({
      sheet: HcHumans1AImageSpriteSheet,
      frames: [start + 13],
      interval: 200,
    }),
    idle_right: createAnimation({
      sheet: HcHumans1AImageSpriteSheet,
      frames: [start + 25],
      interval: 200,
    }),
    idle_up: createAnimation({
      sheet: HcHumans1AImageSpriteSheet,
      frames: [start + 37],
      interval: 200,
    }),

    move_down: createAnimation({
      sheet: HcHumans1AImageSpriteSheet,
      frames: [start, start + 1, start + 2],
      interval: 200,
    }),
    move_left: createAnimation({
      sheet: HcHumans1AImageSpriteSheet,
      frames: [start + 12, start + 13, start + 14],
      interval: 200,
    }),
    move_right: createAnimation({
      sheet: HcHumans1AImageSpriteSheet,
      frames: [start + 24, start + 25, start + 26],
      interval: 200,
    }),
    move_up: createAnimation({
      sheet: HcHumans1AImageSpriteSheet,
      frames: [start + 36, start + 37, start + 38],
      interval: 200,
    }),
  };
}

export const SallyCharactorAnimations = createHumansAnimationSet(0);
export const KarenCharactorAnimations = createHumansAnimationSet(3);
export const JaneCharactorAnimations = createHumansAnimationSet(6);
export const MelCharactorAnimations = createHumansAnimationSet(9);

export const SamCharactorAnimations = createHumansAnimationSet(48);
export const KevinCharactorAnimations = createHumansAnimationSet(51);
export const JohnCharactorAnimations = createHumansAnimationSet(54);
export const MarkCharactorAnimations = createHumansAnimationSet(57);

export const CHARACTER_ANIMATIONS = {
  Jane: JaneCharactorAnimations,
  John: JohnCharactorAnimations,
  Karen: KarenCharactorAnimations,
  Kevin: KevinCharactorAnimations,
  Mark: MarkCharactorAnimations,
  Mel: MelCharactorAnimations,
  Sally: SallyCharactorAnimations,
  Sam: SamCharactorAnimations,
};

export function getRandomHumanAnimation() {
  const items = Object.entries(CHARACTER_ANIMATIONS);
  const max = items.length;
  const min = 0;
  const index = Math.floor(Math.random() * (max - min) + min);
  return items[index];
}
