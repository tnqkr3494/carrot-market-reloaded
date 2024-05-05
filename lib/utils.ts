export function formatToTimeAgo(date: string): string {
  const dayInMs = 1000 * 60 * 60 * 24;
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = Math.round((time - now) / dayInMs);

  // 시간을 한국어로 몇일 전, 몇일 후 표현
  const formatter = new Intl.RelativeTimeFormat("ko");

  return formatter.format(diff, "days");
}

export function formatToWon(price: number): string {
  // 9,999처럼 쉼표표시
  return price.toLocaleString("ko-KR");
}
