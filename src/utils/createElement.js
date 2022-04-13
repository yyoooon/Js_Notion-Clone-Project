export const createElement = tagName => {
  return document.createElement(tagName);
};

export const addClassName = ($dom, name) => {
  $dom.className = name;
};
