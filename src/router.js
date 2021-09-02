const ROUTE_CHANGE_EVENT_NAME = "route-change";

// 인자로 url이 들어오면 history에 push하고 라우팅 함수를 실행시킴
export const initRouter = (onRoute) => {
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
    const { nextUrl } = e.detail;
    if (nextUrl) {
      history.pushState(null, null, nextUrl);
      onRoute();
    }
  });
};

// 코드로써 이벤트를 발생시키는 것
// 원하는 부분에 실행시키면 이벤트가 발생된다
// url을 받아 이벤트 객체에 저장한다
export const push = (nextUrl) => {
  window.dispatchEvent(
    new CustomEvent("route-change", {
      detail: {
        // e객체의 속성이 된다
        nextUrl: nextUrl, //
      },
    })
  );
};
