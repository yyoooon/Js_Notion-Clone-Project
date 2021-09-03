export const API_END_POINT = "https://kdt.roto.codes"; // 반복되는 URL은 상수로 빼주는 것이 좋다

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": "yoon",
      },
    }); // 다음 주소는 인자로 받는다

    if (res.ok) {
      // 중요!!
      return await res.json();
    }
    throw new Error("API 호출 오류");
  } catch (e) {
    alert(e.message);
  }
};
