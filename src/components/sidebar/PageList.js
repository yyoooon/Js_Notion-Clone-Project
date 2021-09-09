import { push } from '../../utils/router.js';

export default function PageList({
  $target,
  initialState,
  onRemove,
  onChildPageAdd,
}) {
  const $pageList = document.createElement('div');
  $pageList.classList.add('pages_outliner');
  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  const $rootUl = document.createElement('ul');
  $rootUl.classList.add('page_list');
  $rootUl.id = 'root';

  const createTreeView = (pages, ul) => {
    ul.innerHTML = '';
    pages.map(page => {
      const li = document.createElement('li');
      li.classList.add('page');
      li.dataset.pageid = page.id;
      ul.appendChild(li);

      li.innerHTML = `
        <div class="page_focuable_elements">
              <button class="page_toggleButton" type="button">
                <i class="fas fa-caret-right"></i>
              </button>
              <h3 class="page_name">${
                page.title ? page.title : '제목 없음'
              }</h3>
              <button class="page_removeButton" type="button">
                  𝗫
              </button>
              <button class="page_add_pageButton" type="button">
                  ➕
              </button>
        </div>
      `;
      const children = document.createElement('ul');
      children.classList.add('page_list');
      children.classList.add('visible');
      li.appendChild(children);

      if (page.documents.length) {
        createTreeView(page.documents, children);
      }
    });
  };

  // fa - caret - down;

  const changeToggleIcon = () => {
    const openChildrens = $rootUl.querySelectorAll('.visible');
    for (const children of openChildrens) {
      const toggleIcon = children.querySelector('.fas');
      if (toggleIcon) {
        toggleIcon.classList.remove('fa-caret-right');
        toggleIcon.classList.add('fa-caret-down');
      }
    }

    // .classList.replace('fa-caret-right', 'fa-caret-down');
    // if (target.classList.contains('fa-caret-right')) {
    //   target.classList.replace('fa-caret-right', 'fa-caret-down');
    // } else if (target.classList.contains('fa-caret-down')) {
    //   target.classList.replace('fa-caret-down', 'fa-caret-right');
    // }
  };

  this.render = () => {
    createTreeView(this.state, $rootUl); // 트리 목록 만든 후
    changeToggleIcon(); // 자식 열려있는 것들 다 찾아서 토글 아이콘 바꿔줌
    $pageList.appendChild($rootUl); // 부모에 연결
  };

  // const changeToggleIcon = target => {
  //   if (target.classList.contains('fa-caret-right')) {
  //     target.classList.replace('fa-caret-right', 'fa-caret-down');
  //   } else if (target.classList.contains('fa-caret-down')) {
  //     target.classList.replace('fa-caret-down', 'fa-caret-right');
  //   }
  // };

  $pageList.addEventListener('click', e => {
    const { target } = e;
    const { className } = target;
    const $pageBlock = target.closest('.page') ? target.closest('.page') : '';
    const { pageid } = $pageBlock.dataset;

    if (className === 'page_name') {
      // 현재 url에서 같은 페이지를 누를 때 리턴
      const { pathname } = window.location;
      const [, , urlPageId] = pathname.split('/');
      if (pageid === urlPageId) {
        return;
      }
      push(`/pages/${pageid}`);
    } else if (target.closest('.page_toggleButton')) {
      const children = $pageBlock.querySelector('.page_list');
      children.classList.toggle('visible');
      // changeToggleIcon(target);
    } else if (className === 'page_removeButton') {
      onRemove(pageid);
    } else if (className === 'page_add_pageButton') {
      onChildPageAdd(pageid);
      push(`/pages/new`);
    }
  });

  $target.appendChild($pageList);
}
