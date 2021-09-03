import { push } from "../../utils/router.js";

export default function PageList({
  $target,
  initialState,
  onToggle,
  onRemove,
}) {
  const $pageList = document.createElement("div");
  $pageList.classList.add("pages_outliner");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const createItem = (post) => {
    return `
    <li class="page_block" data-postid=${post.id}>
      <a class="link" href="#">
          <div class="block_focuable_elements">
          <button class="block_toggleButton" type="button">
              ▶︎
          </button>
          <h3 class="block_name">${post.title}</h3>
          <button class="block_removeButton" type="button">
              𝗫
          </button>
          <button class="block_add_pageButton" type="button">
              ➕
          </button>
          </div>
      </a>
    <ul class="page_blocks_list"></ul>
  </li>
    `;
  };

  this.render = () => {
    $pageList.innerHTML = `
    <ul class="page_blocks_list">
        ${this.state.map((post) => createItem(post)).join("")}
    </ul>
`;
  };

  $pageList.addEventListener("click", (e) => {
    const { target } = e;
    const { className } = target;
    const $page_block = target.closest(".page_block");
    const { postid } = $page_block.dataset;

    if (className === "block_toggleButton") {
      // onToggle() - 자식 리스트들이 들어가야?
    } else if (className === "block_name") {
      push(`/posts/${parseInt(postid)}`);
    } else if (className === "block_removeButton") {
      // onRemove(postId)
    } else if (className === "block_add_pageButton") {
      push(`/posts/new`);
    }
  });

  $target.appendChild($pageList);
}
