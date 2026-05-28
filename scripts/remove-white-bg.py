"""Remove near-white background from hero girl image -> transparent PNG."""

from collections import deque
from pathlib import Path

from PIL import Image

SRC = Path(__file__).resolve().parents[1] / "public" / "3d girl hero.png"
OUT = Path(__file__).resolve().parents[1] / "public" / "hero-girl.png"


def is_background_pixel(r: int, g: int, b: int, threshold: int = 238) -> bool:
    return r >= threshold and g >= threshold and b >= threshold


def flood_background_to_alpha(im: Image.Image, threshold: int = 238) -> Image.Image:
    rgba = im.convert("RGBA")
    w, h = rgba.size
    pixels = rgba.load()

    visited = [[False] * w for _ in range(h)]
    q: deque[tuple[int, int]] = deque()

    for x in range(w):
        q.append((x, 0))
        q.append((x, h - 1))
    for y in range(h):
        q.append((0, y))
        q.append((w - 1, y))

    while q:
        x, y = q.popleft()
        if x < 0 or y < 0 or x >= w or y >= h or visited[y][x]:
            continue
        visited[y][x] = True
        r, g, b, a = pixels[x, y]
        if not is_background_pixel(r, g, b, threshold):
            continue
        pixels[x, y] = (r, g, b, 0)
        q.append((x + 1, y))
        q.append((x - 1, y))
        q.append((x, y + 1))
        q.append((x, y - 1))

    return rgba


def soften_edges(im: Image.Image, threshold: int = 220) -> Image.Image:
  pixels = im.load()
  w, h = im.size
  for y in range(h):
    for x in range(w):
      r, g, b, a = pixels[x, y]
      if a == 0:
        continue
      if r >= threshold and g >= threshold and b >= threshold:
        fade = max(0, min(255, int((255 - (r + g + b) / 3) * 4)))
        pixels[x, y] = (r, g, b, min(a, fade))
  return im


def main() -> None:
    src = Image.open(SRC)
    out = flood_background_to_alpha(src)
    out = soften_edges(out)
    out.save(OUT, "PNG", optimize=True)
    print(f"Saved {OUT} ({out.size[0]}x{out.size[1]})")


if __name__ == "__main__":
    main()
