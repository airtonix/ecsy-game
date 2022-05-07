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

export const SallyCharactorAnimations: MoveableActorAnimationMap = {
  idle_down: createAnimation({
    sheet: HcHumans1AImageSpriteSheet,
    frames: [1],
    interval: 200,
  }),
  idle_left: createAnimation({
    sheet: HcHumans1AImageSpriteSheet,
    frames: [13],
    interval: 200,
  }),
  idle_right: createAnimation({
    sheet: HcHumans1AImageSpriteSheet,
    frames: [25],
    interval: 200,
  }),
  idle_up: createAnimation({
    sheet: HcHumans1AImageSpriteSheet,
    frames: [37],
    interval: 200,
  }),

  move_down: createAnimation({
    sheet: HcHumans1AImageSpriteSheet,
    frames: [0, 1, 2],
    interval: 200,
  }),
  move_left: createAnimation({
    sheet: HcHumans1AImageSpriteSheet,
    frames: [12, 13, 14],
    interval: 200,
  }),
  move_right: createAnimation({
    sheet: HcHumans1AImageSpriteSheet,
    frames: [24, 25, 26],
    interval: 200,
  }),
  move_up: createAnimation({
    sheet: HcHumans1AImageSpriteSheet,
    frames: [36, 37, 38],
    interval: 200,
  }),
};
