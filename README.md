# 노션 클로닝 프로젝트                                  
### Vanilla js만을 사용해 컴포넌트 기반의 SPA를 구현해보는 프로젝트 

[배포 링크](https://js-notion-clone-project.vercel.app/)

</br>

### 📌 기간
1차 구현: `21.08.25 ~ 21.09.10`
</br>
리팩토링: `22.04.11~`

</br>

### 📌 기술 스택
`JavaScript`
`Scss`
`HistoryAPI`
`Fetch`
`Webpack5`
`Babel`
`ESLint`
`Prettier`

</br>

### 📌 주요 기능

- **컴포넌트 기반**으로 상태 변경에 의해 렌더링되도록 구현.
- CRUD API를 이용해 **문서 생성/조회/수정/삭제** 기능과 **문서 목록 조회** 기능 구현.
- 문서 생성 시 특정 문서의 하위로 종속시킬 수 있어 **문서 목록이 트리 구조로 구성**됨.
- 토글 기능으로 **자식 문서를 숨기고 펼칠 수 있게** 구현
- debounce를 적용해 텍스트가 입력되는 동안 **특정 시간마다 자동 저장**되도록 구현.

</br>

  *트리구조의 문서 목록*
  
  <img width='20%' src='https://user-images.githubusercontent.com/81611808/147889117-2dd6894d-c589-4109-9a11-d757f5d0c8f0.png'>

</br>


### 📌 전체 컴포넌트 구조
![컴포넌트 구조](https://user-images.githubusercontent.com/81611808/147889079-d5e72ae4-814e-4ecd-a30b-2430c6bf2b5e.png)

### 📌 베이스 컴포넌트 명세
```jsx
export default class Component {
  $node;   // 내 돔
  $target; // 부모(내 돔을 연결할) 돔
  props;   // 부모에게 받은 데이터
  state;   // 나의 상태
  constructor($target, props) {
    this.$target = $target; // 부모 돔 저장
    this.props = props;     // props 저장
    this.setup();           // 초기 셋팅
    this.render();          // 렌더링(돔 생성)
    this.setEvent();        // 돔에 이벤트 부착
    this.fetch();           // 외부 데이터를 비동기로 불러온 후, 그 값으로 setState
  }

  // 주로 상태를 셋팅한다
  setup() {
    return;
  }

  // 내 돔을 생성한다
  createNode(tagName) {
    this.$node = createElement(tagName);
  }

  // 외부 데이터를 비동기로 불러와서 setState를 실행시킨다.
  fetch()  {
     return;
  }

  // 내 돔이나 부모 돔에 삽입할 마크업을 한다.
  template() {
    return;
  }

  // 자식 컴포넌트를 연결한다.
  mounted() {
    return;
  }

  // 부모 돔에 이벤트를 건다(이벤트 위임이 목적)
  addEventToTarget(eventType, selector, callback) {
    const children = [...Array.from(this.$target.querySelectorAll(selector))];

    const isTarget = target => {
      if (target instanceof HTMLElement) {
        return children.includes(target) || target.closest(selector);
      }
    };

    this.$target.addEventListener(eventType, event => {
      if (!isTarget(event.target)) return false;
      callback(event);
    });
  }

  // 내 돔이나 자식 돔에 이벤트를 건다.
  setEvent() {
    return;
  }

  // template에 작성한 마크업을 내 돔이나 자식 돔에 삽입한다.
  // mounted()함수를 실행해 자식 컴포넌트를 연결한다.
  render() {
    if (this.$node) {
      this.$node.innerHTML = this.template();
      this.$target.appendChild(this.$node);
    } else {
      this.$target.innerHTML = this.template();
    }
    this.mounted();
  }

  // 자식 컴포넌트만 리렌더링 하는 경우의 로직을 작성한다.
  childUpdate() {
    return;
  }

  // 상태 변경이 필요한 지 판단하는 메소드
  // 기존 state값과 새로 들어온 state값을 비교해, 같지 않다면 true를 반환한다.
  checkNeedRender(newState) {
    let needRender = false;
    const updateStateKey = Object.keys(newState);

    updateStateKey.map(key => {
      if (
        !(JSON.stringify(this.state[key]) === JSON.stringify(newState[key]))
      ) {
        needRender = true;
      }
    });

    return needRender;
  }

  // 필요한 경우, 상태를 변경한 후 리렌더링을 한다.
  // 1. 내 컴포넌트 자체를 리렌더링 하는 경우
  // 2. 특정 자식 컴포넌트만 리렌더링 하는 경우 (두 번째 인자에 true설정)
  setState(newState, childUpdate = false) {
    const needRender = this.checkNeedRender(newState);
    if (!needRender) return;

    this.state = { ...this.state, ...newState };
    childUpdate ? this.childUpdate() : this.render();
  }
}


```

