// 리스트 데이터를 받아와서 리스트 컴포넌트에 전해주는 컴포넌트
// 서버, 스토리지에서 데이터를 받음
import PageList from "../sidebar/PageList.js";
import LinkButton from "../LinkButton.js";
import { getAllDocumentsData, deleteDocumentsData } from "../../utils/api.js";

export default function Sidebar({ $target, initialState }) {
  const $sidebar = document.createElement("aside");
  $sidebar.classList.add("sidebar");

  this.state = initialState;

  this.setState = async () => {
    pageList.setState(await getAllDocumentsData());
  };

  let isinitialize = false;
  this.render = () => {
    if (!isinitialize) {
      $sidebar.innerHTML = `
    <div class="sidebar_contents_wrap"></div>
    `;
      isinitialize = true;
    }
  };

  this.render();

  const $sidebarContentsWrap = $sidebar.querySelector(".sidebar_contents_wrap");
  const pageList = new PageList({
    $target: $sidebarContentsWrap,
    initialState: this.state,
  });

  new LinkButton({
    $target: $sidebarContentsWrap,
    initialState: {
      text: "➕ 페이지 추가",
      link: `/posts/new`,
      className: "create_page_block_button",
    },
  });

  $target.appendChild($sidebar);
}
