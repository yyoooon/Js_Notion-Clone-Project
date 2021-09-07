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
              <h3 class="page_name">${page.title}</h3>
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
      li.appendChild(children);

      if (page.documents.length) {
        createTreeView(page.documents, children);
      }
    });
  };

  this.render = () => {
    createTreeView(this.state, $rootUl); // 트리 목록 만든 후
    $pageList.appendChild($rootUl); // 부모에 연결
  };

  const changeToggleIcon = target => {
    if (target.classList.contains('fa-caret-right')) {
      target.classList.replace('fa-caret-right', 'fa-caret-down');
    } else if (target.classList.contains('fa-caret-down')) {
      target.classList.replace('fa-caret-down', 'fa-caret-right');
    }
  };

  $pageList.addEventListener('click', e => {
    const { target } = e;
    const { className } = target;
    const $pageBlock = target.closest('.page') ? target.closest('.page') : '';
    const { pageid } = $pageBlock.dataset;

    if (className === 'page_name') {
      push(`/pages/${pageid}`);
    } else if (target.closest('.page_toggleButton')) {
      const children = $pageBlock.querySelector('.page_list');
      children.classList.toggle('toggled');
      changeToggleIcon(target);
    } else if (className === 'page_removeButton') {
      onRemove(pageid);
    } else if (className === 'page_add_pageButton') {
      onChildPageAdd(pageid);
      push(`/pages/new`);
    }
  });

  $target.appendChild($pageList);
}
