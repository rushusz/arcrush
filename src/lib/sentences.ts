// 본문(.text) 줄바꿈 규칙. 빌드 시 슬롯 HTML에 적용한다.
// 짧은 문장들은 한 줄에 이어 쓰고, 다음 문장을 붙이면 한 줄(LIMIT 글자)을 넘길 때만 문장 끝에서 줄을 바꾼다.
// 줄바꿈은 항상 문장과 문장 사이에만 넣는다. 캡션, 핵심 문장(.pull), 표, 인터랙션 부품은 건드리지 않는다.
const LIMIT = 80; // 넓은 화면에서 본문 한 줄에 들어가는 글자 수의 근사값
const VOID = new Set(["br", "img", "hr", "input", "source", "meta", "link", "wbr", "path", "circle", "rect", "line", "polyline", "polygon", "ellipse", "use", "stop"]);
const BLOCK = /^(p|div|li|ul|ol|h[1-6]|section|blockquote|dd|dt|dl)$/;
const ABBR = /(?:Fig|No|vs|St|Dr)\.\s*$|(?:^|[\s(])[A-Za-z]\.\s*$/;

/** 글을 문장 단위로 나눈다. 약어 뒤의 마침표는 문장 끝으로 보지 않는다. */
function splitSentences(text: string): string[] {
  const raw = text.match(/[^.?!]*[.?!]+["'”’)]?\s*|[^.?!]+$/g) ?? [text];
  const out: string[] = [];
  for (const piece of raw) {
    if (out.length && ABBR.test(out[out.length - 1])) out[out.length - 1] += piece;
    else out.push(piece);
  }
  return out;
}

export function sentencePerLine(html: string): string {
  const parts = html.split(/(<[^>]+>)/);
  let depth = 0; // .text 요소 안에서의 중첩 깊이 (0이면 밖)
  let skip = 0;  // .text 안이지만 제외할 요소의 깊이
  let lineLen = 0;        // 현재 줄에 쌓인 글자 수
  let sentenceOpen = false; // 문장이 끝나지 않은 채 인라인 태그를 만났는가
  const out: string[] = [];

  const flow = (text: string) => {
    let res = "";
    for (const piece of splitSentences(text)) {
      const body = piece.trim();
      if (!body) { res += piece; continue; }
      const ends = /[.?!]["'”’)]?\s*$/.test(piece) && !ABBR.test(piece);
      if (!sentenceOpen && lineLen > 0 && lineLen + 1 + body.length > LIMIT) {
        res = res.replace(/\s+$/, "") + " <br>" + piece.replace(/^\s+/, ""); // 앞의 공백은 좁은 화면에서 br이 숨겨질 때 띄어쓰기로 남는다
        lineLen = body.length;
      } else {
        res += piece;
        lineLen += (lineLen > 0 && !sentenceOpen ? 1 : 0) + body.length;
      }
      sentenceOpen = !ends;
    }
    return res;
  };

  for (const part of parts) {
    if (!part.startsWith("<")) {
      out.push(depth > 0 && skip === 0 ? flow(part) : part);
      continue;
    }
    const m = /^<\s*(\/)?\s*([a-zA-Z][\w-]*)/.exec(part);
    if (m && !part.startsWith("<!--")) {
      const closing = !!m[1];
      const tag = m[2].toLowerCase();
      if (BLOCK.test(tag) || tag === "br") { lineLen = 0; sentenceOpen = false; }
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
          lineLen = 0;
          sentenceOpen = false;
        }
      }
    }
    out.push(part);
  }
  return out.join("");
}
