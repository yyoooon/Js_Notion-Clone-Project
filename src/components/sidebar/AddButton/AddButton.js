import Component from '../../base/Component';

class AddButton extends Component {
  template() {
    return `<button class='create_page_button'>➕ 페이지 추가</button>`;
  }
  setEvent() {
    const { onClick } = this.props;
    const $addButton = this.$target.querySelector('.create_page_button');
    $addButton.addEventListener('click', () => {
      onClick({ title: '제목 없음', parentId: null });
    });
  }
}

export default AddButton;
