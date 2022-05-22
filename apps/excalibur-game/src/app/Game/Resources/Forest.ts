import {
  Animation,
  ImageFiltering,
  ImageSource,
  SpriteSheet,
  vec,
} from 'excalibur';

export const ForestDecoration2 = new ImageSource(
  '/assets/forest/forestDecoration_2.png',
  true,
  ImageFiltering.Pixel
);

export const ForestDecoration2ImageSprite = ForestDecoration2.toSprite();

const PortalSourceX = 16;
const PortalSourceY = 10 * 16;
const PortalFrameW = 3 * 16;
const PortalFrameH = 3 * 16;

export const ForestPortalSpriteSheet =
  SpriteSheet.fromImageSourceWithSourceViews({
    image: ForestDecoration2,
    sourceViews: [
      {
        x: PortalSourceX,
        y: PortalSourceY,
        width: PortalFrameW,
        height: PortalFrameH,
      },
      {
        x: PortalSourceX + PortalFrameW * 1,
        y: PortalSourceY,
        width: PortalFrameW,
        height: PortalFrameH,
      },
      {
        x: PortalSourceX + PortalFrameW * 2,
        y: PortalSourceY,
        width: PortalFrameW,
        height: PortalFrameH,
      },
      {
        x: PortalSourceX + PortalFrameW * 3,
        y: PortalSourceY,
        width: PortalFrameW,
        height: PortalFrameH,
      },
    ],
  });

export const PortalIdleAnimation = Animation.fromSpriteSheet(
  ForestPortalSpriteSheet,
  [0, 1, 2, 3],
  200
);
PortalIdleAnimation.scale = vec(1, 1);
