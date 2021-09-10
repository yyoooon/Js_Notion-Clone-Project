const ROUTE_PUSH_EVENT_NAME = 'route-push';
const ROUTE_REPLACE_EVENT_NAME = 'route-replace';

export const pushRouter = onRoute => {
  window.addEventListener(ROUTE_PUSH_EVENT_NAME, e => {
    const { nextUrl } = e.detail;
    if (nextUrl) {
      history.pushState(null, null, nextUrl);

      onRoute();
    }
  });
};

export const push = nextUrl => {
  window.dispatchEvent(
    new CustomEvent('route-push', {
      detail: {
        // e객체의 속성이 된다
        nextUrl, //
      },
    }),
  );
};

export const replaceRouter = onRoute => {
  window.addEventListener(ROUTE_REPLACE_EVENT_NAME, e => {
    const { nextUrl } = e.detail;
    if (nextUrl) {
      history.replaceState(null, null, nextUrl);

      onRoute();
    }
  });
};

export const replace = nextUrl => {
  window.dispatchEvent(
    new CustomEvent('route-replace', {
      detail: {
        nextUrl,
      },
    }),
  );
};
