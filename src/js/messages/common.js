
export const onClickCloseMessage = ({ target }) => {
  const parent = target.parentElement;
  parent.classList.remove('show');
};
