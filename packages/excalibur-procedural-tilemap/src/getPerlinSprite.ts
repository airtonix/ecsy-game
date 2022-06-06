import { Color, Rectangle, Sprite } from 'excalibur';

export function getPerlinSprite(
  size: number,
  perlin: number,
  spriteForPerlinValue?: (value: number) => Sprite | void
) {
  const sprite =
    typeof spriteForPerlinValue === 'function' && spriteForPerlinValue(perlin);

  return (
    sprite ||
    new Rectangle({
      width: size,
      height: size,
      color:
        perlin < 0.2
          ? Color.ExcaliburBlue // 💧 water
          : perlin >= 0.2 && perlin < 0.3
          ? Color.Orange // 🏖️
          : perlin >= 0.3 && perlin < 0.7
          ? Color.Green // 🍀
          : Color.Gray, // 🏂
    })
  );
}
