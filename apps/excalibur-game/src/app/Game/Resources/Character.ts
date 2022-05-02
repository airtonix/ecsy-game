import { Animation, ImageSource, SpriteSheet, range } from 'excalibur';

export const BaseImage = new ImageSource('/assets/player-base.png');
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

export const BaseImageIdleDownAnimation = Animation.fromSpriteSheet(
  BaseImageSpriteSheet,
  [4],
  200
);

export const BaseImageDownAnimation = Animation.fromSpriteSheet(
  BaseImageSpriteSheet,
  range(0, 7),
  200
);

export const BaseImageUpAnimation = Animation.fromSpriteSheet(
  BaseImageSpriteSheet,
  range(8, 15),
  200
);
export const BaseImageLeftAnimation = Animation.fromSpriteSheet(
  BaseImageSpriteSheet,
  range(16, 24),
  200
);
