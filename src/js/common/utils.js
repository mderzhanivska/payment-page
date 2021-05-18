
export const shuffle = (array) => {
  let tmp;
  let current;
  let top = array.length;

  if (top) {
    while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
  }

  return array;
};


export const langPage = document.documentElement.lang;
export const isInfoPage = document.querySelector('body').dataset.info;


export const addListeners = (listeners) => {
  listeners.forEach(({ dom, event, callback }) => {
    if (dom && callback) {
      dom.addEventListener(event, callback, false);
    }
  });
};
