// 예외 상황을 처리해줘야한다 - try, catch이용
// ex) 캐시가 쌓일 때 날려줘야 함, 데이터 형태가 바뀌면 문제가 될 소지가 있다,
// 따로 파일로 만들어서 예외 상황을 처리하는 코드를 작성하는 게 좋다
// 기존의 localStorage.setItem, getItem함수에 예외처리 코드를 추가해서 확장해준 것
const storage = window.localStorage;

export const setItem = (key, value) => {
  try {
    storage.setItem(key, JSON.stringify(value));
    console.log(key, value);
  } catch (e) {
    // 예외 처리
    console.log(e);
  }
};

export const getItem = (key, defaultValue) => {
  try {
    const storedValue = storage.getItem(key);

    if (!storedValue) {
      return defaultValue;
    }

    const parsedValue = JSON.parse(storedValue);
    return parsedValue;
  } catch (e) {
    console.log(e);
    return defaultValue;
  }
};

export const removeItem = (key) => {
  storage.removeItem(key);
};
