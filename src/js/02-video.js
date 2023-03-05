import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const THROTTLE_DELAY = 1000;

const player = new Player('vimeo-player');

const videoElement = document.querySelector('iframe');

player.on(
  'timeupdate',
  throttle(() => {
    player.getCurrentTime().then(time => {
      localStorage.setItem('videoplayer-current-time', time);
    });
  }, THROTTLE_DELAY)
);

const savedTime = localStorage.getItem('videoplayer-current-time');
if (savedTime) {
  player.setCurrentTime(savedTime);
}
