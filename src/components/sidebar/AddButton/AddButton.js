import Component from '../../base/Component';

class AddButton extends Component {
  template() {
    return `<button class='create_page_button'>➕ 페이지 추가</button>`;
  }
  setEvent() {
    const { onClick } = this.props;
    const $addButton = this.$target.querySelector('.create_page_button');
    $addButton.addEventListener('click', () => {
      onClick({ title: '', parentId: null });
    });
  }
}

export default AddButton;
