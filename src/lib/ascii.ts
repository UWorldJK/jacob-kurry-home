// Figlet "Graffiti" glyphs (the k9s logo font), only the letters the hero needs.
// Each glyph is six rows; rows are right-padded when rendered, so trailing spaces don't matter here.
const GLYPHS: Record<string, string> = {
  j: String.raw`
     __
    |__|
    |  |
    |  |
/\__|  |
\______|
`,
  a: String.raw`

_____
\__  \
 / __ \_
(____  /
     \/
`,
  c: String.raw`

  ____
_/ ___\
\  \___
 \___  >
     \/
`,
  o: String.raw`

  ____
 /  _ \
(  <_> )
 \____/

`,
  b: String.raw`
___.
\_ |__
 | __ \
 | \_\ \
 |___  /
     \/
`,
  k: String.raw`
 __
|  | __
|  |/ /
|    <
|__|_ \
     \/
`,
  u: String.raw`

 __ __
|  |  \
|  |  /
|____/

`,
  r: String.raw`

_______
\_  __ \
 |  | \/
 |__|

`,
  y: String.raw`

 ___.__.
<   |  |
 \___  |
 / ____|
 \/
`,
};

const ROWS = 6;

/** Render a word as Graffiti-style ASCII art. Characters without a glyph are skipped. */
export function ascii(word: string): string {
  const glyphs = [...word]
    .map((ch) => GLYPHS[ch])
    .filter((g): g is string => g !== undefined)
    .map((g) => {
      const rows = g.split('\n').slice(1, 1 + ROWS);
      const width = Math.max(...rows.map((r) => r.length));
      return rows.map((r) => r.padEnd(width));
    });
  return Array.from({ length: ROWS }, (_, i) => glyphs.map((g) => g[i]).join(' ').trimEnd()).join('\n');
}
