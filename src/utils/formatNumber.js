/**
 * 숫자에 천 단위로 숫자 삽입한 문자열 반환하는 함수
 * @param {number} num 가공할 숫자 데이터
 * @returns 천 단위로 콤마(,)를 삽입한 문자열을 반환
 */
export const formatNumberWithCommas = (num) => {
  if (!num) return num;
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
