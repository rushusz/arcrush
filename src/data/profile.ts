// About에 싣는 이력. 확인된 사실만 적는다(출처: 연간 일정 파일의 이력 현황 시트). 빈 묶음은 화면에 나오지 않는다.
export interface Row { when?: string; what: string }

export const profile = {
  nameKo: "류민석",
  nameEn: "Ryu, Minseok",
  /** public/about/ 아래 파일. 비우면 사진 자리를 만들지 않는다. */
  photo: "/about/portrait.jpg" as string,
  lines: [] as string[],
  groups: [
    { title: "Education", rows: [
      { when: "2018.03 – 2027.02", what: "홍익대학교 건축학과 학사 (졸업 예정)" },
    ] as Row[] },
    { title: "Certificates", rows: [
      { when: "2026.02", what: "컴퓨터활용능력 1급" },
      { when: "2025.12", what: "건설안전기사" },
      { when: "2025.10", what: "한국사능력검정시험 2급" },
      { when: "2025.06", what: "건축기사" },
    ] as Row[] },
    { title: "Language", rows: [
      { when: "2026.09", what: "TOEIC Speaking IH (150)" },
      { when: "2026.08", what: "TOEIC 905" },
    ] as Row[] },
    { title: "Activities", rows: [
      { when: "2024.09 – 2024.12", what: "건축봉사동아리 한울, 서울시 노후주택 도배·장판 봉사" },
      { when: "2023.06", what: "파리 엑스포 BIE 총회 연계행사 지원요원 (주프랑스 한국문화원)" },
      { when: "2022.02 – 2023.02", what: "학생회 POLE 기획국장" },
      { when: "2019.02 – 2020.01", what: "자율전공 소모임 장" },
    ] as Row[] },
  ],
  contact: ["lunununu99@gmail.com"] as string[],
};
