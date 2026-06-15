let scrollY = 0;

export const lockScroll = () => {
  scrollY = window.scrollY;

  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';

  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = '100%';
};

export const unlockScroll = () => {
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';

  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';

  window.scrollTo(0, scrollY);
};
