// 고정 문구. 원본: 웹아카이브/03_마스터_고정사항.md. 프로젝트 세션은 수정하지 않는다.
export type Status = "thesis" | "studio" | "tool";

export interface Work {
  no: string;
  slug: string;
  keyword: string;
  keywordKo: string;
  title: string;
  term: string;
  site: string;
  status: Status;
  question: string;
  /** question 안에서 강조색으로 표시할 구절 */
  emphasis: string;
  /** 넓은 화면에서 물음의 둘째 줄이 시작되는 구절. 뜻이 묶이는 자리에서 줄을 바꾼다 */
  breakBefore?: string;
  /** 홈(랜딩) 장에서만 쓰는 물음. 없으면 question을 쓴다. 줄바꿈은 lines의 경계에서 한다 */
  home?: { lines: [string, string]; emphasis: string };
  accent: string;
  /** 공개된 작품만 값이 있다. 없으면 목록에 "준비 중"으로 표시한다. */
  href?: string;
}

export const works: Work[] = [
  { no: "01", slug: "a-place-for-water", keyword: "TIME", keywordKo: "시간", title: "A Place for Water", term: "5-1 졸업설계", site: "공주 미르섬", status: "thesis", accent: "#3366CC", href: "/works/a-place-for-water",
    question: "매년 물에 잠기는 섬이, 그 물을 받아들이며 도시의 거실이 될 수 있을까?", emphasis: "그 물을 받아들이며", breakBefore: "도시의 거실이",
    home: { lines: ["매년 물에 잠기는 섬이,", "그 물을 받아들여 도시의 거실이 될 수 있을까?"], emphasis: "그 물을 받아들여" } },
  { no: "02", slug: "the-porous-campus", keyword: "GROUND", keywordKo: "땅", title: "The Porous Campus", term: "4-2", site: "서울 난지도", status: "studio", accent: "#7A5C45", href: "/works/the-porous-campus",
    question: "쓰레기로 만들어진 땅을, 도시와 한강을 잇는 문화공간으로 탈바꿈시킬 수 있을까?", emphasis: "도시와 한강을 잇는", breakBefore: "문화공간으로",
    home: { lines: ["쓰레기로 만들어진 땅을, 도시와 한강을 잇는", "문화공간으로 탈바꿈시킬 수 있을까?"], emphasis: "도시와 한강을 잇는" } },
  { no: "03", slug: "living-arcade", keyword: "THRESHOLD", keywordKo: "문턱", title: "Living Arcade", term: "4-1", site: "서울 남영", status: "studio", accent: "#5E7F5B", href: "/works/living-arcade",
    question: "사람들이 다니던 길을 그대로 두고, 그 위에서 일상을 꾸릴 수 있을까?", emphasis: "길을 그대로 두고", breakBefore: "그 위에서",
    home: { lines: ["사람들이 다니던 길을 그대로 두고,", "그 위에서 일상을 꾸릴 수 있을까?"], emphasis: "길을 그대로 두고" } },
  { no: "04", slug: "epicerie-dobong", keyword: "HEARTH", keywordKo: "화덕", title: "Epicerie Dobong", term: "3-2", site: "서울 도봉", status: "studio", accent: "#C08A2E", href: "/works/epicerie-dobong",
    question: "문 닫는 학교에서, 함께 먹는 일이 혼자 늙어 가는 동네를 다시 이을 수 있을까?", emphasis: "함께 먹는 일이", breakBefore: "혼자 늙어",
    home: { lines: ["문 닫는 학교에서, 함께 먹는 일상으로", "동네의 활기를 되찾을 수 있을까?"], emphasis: "함께 먹는 일상으로" } },
  { no: "05", slug: "re-street-office", keyword: "ENCLOSURE", keywordKo: "둘러쌈", title: "RE:STREET Office", term: "3-1", site: "서울 뚝섬", status: "studio", accent: "#D4322C", href: "/works/re-street-office",
    question: "닫힌 박스 같은 오피스에 거리의 사람들이 들어와, 활기찬 골목길을 만들 수 있을까?", emphasis: "거리의 사람들이 들어와", breakBefore: "활기찬",
    home: { lines: ["폐쇄적인 오피스에 보행자가 들어와,", "활기찬 골목길을 만들 수 있을까?"], emphasis: "보행자가 들어와" } },
  { no: "06", slug: "construction-sequence-simulator", keyword: "SEQUENCE", keywordKo: "순서", title: "BIM 공정 시뮬레이터", term: "진행 중", site: "웹 앱", status: "tool", accent: "#FF7A1A", href: "https://sim.arcrush.kr",
    question: "도면은 완성된 건물만 나타낸다. 공간의 구축 순서를 모델에서 읽어낼 수 있을까?", emphasis: "구축 순서", breakBefore: "공간의",
    home: { lines: ["도면은 완성된 건물만 보여주는데,", "공간의 구축 순서를 모델에서 읽어낼 수 있을까?"], emphasis: "구축 순서" } },
];

export const workBySlug = (slug: string) => {
  const live = works.filter((w) => w.href);
  const i = live.findIndex((w) => w.slug === slug);
  if (i < 0) throw new Error(`Unknown or unpublished work: ${slug}`);
  return { work: live[i], prev: live[(i + live.length - 1) % live.length], next: live[(i + 1) % live.length] };
};

/** 물음을 강조 구절(<em>)과 줄바꿈(<br class="qb">)이 든 HTML로 만든다. 줄바꿈 앞의 공백은 br이 숨겨질 때 띄어쓰기로 남는다. */
export const questionHtml = (w: Work) => {
  let html = w.question.replace(w.emphasis, `<em>${w.emphasis}</em>`);
  if (w.breakBefore) html = html.replace(` ${w.breakBefore}`, ` <br class="qb">${w.breakBefore}`);
  return html;
};

/** 홈 장의 물음. 두 줄로 나누고 강조 구절을 <em>으로 감싼다. */
export const homeQuestionHtml = (w: Work) => {
  if (!w.home) return questionHtml(w);
  return w.home.lines.map((l) => `<span>${l.replace(w.home!.emphasis, `<em>${w.home!.emphasis}</em>`)}</span>`).join(" ");
};
