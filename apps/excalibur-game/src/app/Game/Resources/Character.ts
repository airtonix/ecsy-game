import {
  Animation,
  ImageFiltering,
  ImageSource,
  SpriteSheet,
  range,
  vec,
} from 'excalibur';

export const BaseImage = new ImageSource(
  '/assets/player-base.png',
  true,
  ImageFiltering.Pixel
);

export const BaseImageSprite = BaseImage.toSprite();

export const BaseImageSpriteSheet = SpriteSheet.fromImageSource({
  image: BaseImage,
  grid: {
    rows: 3,
    columns: 8,
    spriteWidth: 32,
    spriteHeight: 48,
  },
});

export const BaseImageIdleUpAnimation = Animation.fromSpriteSheet(
  BaseImageSpriteSheet,
  [12],
  200
);
BaseImageIdleUpAnimation.scale = vec(0.5, 0.5);
export const BaseImageIdleDownAnimation = Animation.fromSpriteSheet(
  BaseImageSpriteSheet,
  [4],
  200
);
BaseImageIdleDownAnimation.scale = vec(0.5, 0.5);
export const BaseImageIdleLeftAnimation = Animation.fromSpriteSheet(
  BaseImageSpriteSheet,
  [20],
  200
);
BaseImageIdleLeftAnimation.scale = vec(0.5, 0.5);
BaseImageIdleLeftAnimation.flipHorizontal = true;
export const BaseImageIdleRightAnimation = Animation.fromSpriteSheet(
  BaseImageSpriteSheet,
  [20],
  200
);
BaseImageIdleRightAnimation.scale = vec(0.5, 0.5);

export const BaseImageUpAnimation = Animation.fromSpriteSheet(
  BaseImageSpriteSheet,
  range(8, 15),
  200
);
BaseImageUpAnimation.scale = vec(0.5, 0.5);
export const BaseImageDownAnimation = Animation.fromSpriteSheet(
  BaseImageSpriteSheet,
  range(0, 7),
  200
);
BaseImageDownAnimation.scale = vec(0.5, 0.5);
export const BaseImageLeftAnimation = Animation.fromSpriteSheet(
  BaseImageSpriteSheet,
  range(16, 24),
  200
);
BaseImageLeftAnimation.flipHorizontal = true;
BaseImageLeftAnimation.scale = vec(0.5, 0.5);
export const BaseImageRightAnimation = Animation.fromSpriteSheet(
  BaseImageSpriteSheet,
  range(16, 24),
  200
);
BaseImageRightAnimation.scale = vec(0.5, 0.5);
