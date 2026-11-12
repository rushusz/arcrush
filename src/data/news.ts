// News 목록. 확인된 사실만 적는다. date는 "YYYY.MM"으로 통일하고, 화면에서는 연도별로 묶여 최신이 위로 온다.
// 같은 달 안에서는 여기 적힌 순서를 따른다.
export interface NewsItem { date: string; text: string; href?: string }

export const news: NewsItem[] = [
  { date: "2027.02", text: "홍익대학교 건축학과 졸업 예정" },
  { date: "2026.11", text: "BIM 공정 시뮬레이터 v0.1 공개", href: "https://sim.arcrush.kr" },
  { date: "2026.11", text: "웹 아카이브 arcrush.kr 공개", href: "/#works" },
  { date: "2026.06", text: "졸업설계 A Place for Water 최종 발표", href: "/works/a-place-for-water" },
  { date: "2025.08", text: "현대건설 인턴 수료" },
  { date: "2024.12", text: "현대건설 인턴 시작, 고양삼송지구 공동주택 시공 업무 보조" },
  { date: "2024.12", text: "건축설계 스튜디오 The Porous Campus", href: "/works/the-porous-campus" },
  { date: "2024.06", text: "건축설계 스튜디오 Living Arcade", href: "/works/living-arcade" },
  { date: "2023.12", text: "건축설계 스튜디오 Epicerie Dobong", href: "/works/epicerie-dobong" },
  { date: "2022.08", text: "에스엘즈 인턴 수료" },
  { date: "2022.07", text: "에스엘즈 인턴 시작, 연구 보조와 VR 환경 구축 보조" },
  { date: "2022.06", text: "건축설계 스튜디오 RE:STREET Office", href: "/works/re-street-office" },
  { date: "2022.03", text: "포스코에이앤씨건축사사무소 인턴 수료" },
  { date: "2022.01", text: "포스코에이앤씨건축사사무소 인턴 시작, 실시설계 업무 보조" },
];
