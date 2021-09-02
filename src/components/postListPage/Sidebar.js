// 리스트 데이터를 받아와서 리스트 컴포넌트에 전해주는 컴포넌트
// 서버, 스토리지에서 데이터를 받음

import { request } from "../../api.js";
import SidebarPagesList from "./SidebarPagesList.js";
import LinkButton from "../LinkButton.js";

export default function Sidebar({ $target, initialState }) {
  const $sidebar = document.createElement("aside");
  $sidebar.classList.add("sidebar");
  const $sidebarContentsWrap = document.createElement("div");
  $sidebarContentsWrap.classList.add("sidebar_contents_wrap");
  $sidebar.appendChild($sidebarContentsWrap);

  this.state = initialState;

  this.setState = async () => {
    const allDocuments = await request(`/documents`, {
      method: "GET",
    });
    sidebarPagesList.setState(allDocuments);
  };

  this.render = () => {
    $target.appendChild($sidebar);
  };

  const sidebarPagesList = new SidebarPagesList({
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

  this.render();
}
