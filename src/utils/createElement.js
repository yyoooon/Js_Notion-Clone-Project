export const createElement = tagName => {
  return document.createElement(tagName);
};

export const addClassName = ($dom, classNameArr = []) => {
  classNameArr.length &&
    classNameArr.map(className => {
      $dom.classList.add(className);
    });
};
