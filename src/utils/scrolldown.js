import { animateScroll } from 'react-scroll';

export const scrollDown = () => {
    const options = {
      duration: 2000,
      delay: 1000,
      smooth: true,
    };

  animateScroll.scrollToBottom(options);
};
