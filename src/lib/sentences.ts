// 본문(.text) 안에서 문장이 끝날 때마다 줄을 바꾼다. 빌드 시 슬롯 HTML에 적용한다.
// 캡션, 핵심 문장(.pull), 표, 인터랙션 부품의 글자는 건드리지 않는다.
const VOID = new Set(["br", "img", "hr", "input", "source", "meta", "link", "wbr", "path", "circle", "rect", "line", "polyline", "polygon", "ellipse", "use", "stop"]);

const breakSentences = (text: string) =>
  text.replace(/([.?!]["'”’)]?)[ \t\r\n]+(?=\S)/g, (m, end: string, at: number, all: string) => {
    const before = all.slice(Math.max(0, at - 4), at);
    if (/(?:Fig|No|vs|St|Dr)$/.test(before)) return m; // 약어 뒤에서는 끊지 않는다
    if (/(?:^|[\s(])[A-Za-z]$/.test(before)) return m;  // 한 글자 약어(A. 등)
    return `${end}<br>`;
  });

export function sentencePerLine(html: string): string {
  const parts = html.split(/(<[^>]+>)/);
  let depth = 0;       // .text 요소 안에서의 중첩 깊이 (0이면 밖)
  let skip = 0;        // .text 안이지만 제외할 요소의 깊이
  const out: string[] = [];
  for (const part of parts) {
    if (!part.startsWith("<")) {
      out.push(depth > 0 && skip === 0 ? breakSentences(part) : part);
      continue;
    }
    const m = /^<\s*(\/)?\s*([a-zA-Z][\w-]*)/.exec(part);
    if (m && !part.startsWith("<!--")) {
      const closing = !!m[1];
      const tag = m[2].toLowerCase();
      const selfClosing = VOID.has(tag) || /\/\s*>$/.test(part);
      if (!selfClosing) {
        if (closing) {
          if (skip > 0) skip--;
          else if (depth > 0) depth--;
        } else if (depth > 0) {
          const excluded = /^(figure|figcaption|table|button|svg|script|style|details)$/.test(tag) || /class="[^"]*\b(caption|pull)\b/.test(part);
          if (skip > 0 || excluded) skip++;
          else depth++;
        } else if (/class="[^"]*\btext\b/.test(part)) {
          depth = 1;
        }
      }
    }
    out.push(part);
  }
  return out.join("");
}
