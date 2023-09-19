/**
 * 날짜 객체를 YYYY[구분자]MM[구분자]DD 형태로 반환
 * @param {string} separator 구분자
 * @param {Date} date
 * @return YYYY[구분자]MM[구분자]DD 형태의 string
 */
export const formatDateToString = (date, separator) => {
  try {
    if (!date && typeof date !== "object") {
      throw new Error("매개변수 date는 Date 객체여야 합니다.");
    }
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${yyyy}${separator}${mm}${separator}${dd}`;
    return formattedDate;
  } catch (error) {
    console.error(error);
  }
};
