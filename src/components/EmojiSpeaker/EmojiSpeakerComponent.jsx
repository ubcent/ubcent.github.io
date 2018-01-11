import './EmojiSpeakerComponent.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const delay = 200
const message = "Arnold ipsum. Just bodies. I need your clothes, your boots, and your motorcycle. Grant me revenge! And if you do not listen, then to HELL with you. Make it quick because my horse is getting tired. Come on don't bullshit me. Into the tunnel. Bring your toy back to the carpet.";

const defaultEmoji = "😐"
const emojiCode = {}
const emojis = Object.keys(emojiMap);
const start = Date.now()
emojis.forEach(emoji => emojiCode[emoji] = twemoji.parse(emoji, {
  folder: 'svg',
  ext: '.svg'
}).slice('<img class="emoji" draggable="false" alt="😐" src="'.length, -3))
console.log(emojiCode)

setInterval(_ => {
  const index = Math.floor((Date.now() - start) / delay) % (message.length + 1)
  emojiIcon.src = emojiCode[resolveCharacter(index) || defaultEmoji]
  const words = message.substr(0, index).split(' ')
  text.textContent = words.pop()
  previousText.textContent = words.pop()
}, delay);

const emojiMap = {
  o: ['o', 'e'],
  b: ['b', 'p', 'm'],
  c: ['c', 'g', 'j', 'k', 'n', 'r', 's', 't', 'v', 'x', 'z', 'sh'],
  d: ['d', 'l', 'th'],
  q: ['q', 'u', 'w', 'y'],
  a: ['a', 'i'],
  empty: [],
};

class EmojiSpeaker extends PureComponent {
  static propTypes = {
    message: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.timer = null;
  }

  componentDidMount() {
    setInterval(() => {
      const index = Math.floor((Date.now() - start) / delay) % (message.length + 1);
      emojiIcon.src = emojiCode[this.resolveCharacter(index) || defaultEmoji];
      const words = message.substr(0, index).split(' ');
      text.textContent = words.pop();
      previousText.textContent = words.pop();
    }, 200);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  resolveCharacter = (index) => {
    const character = message.toLowerCase()[index];
    const previousDouble = message.toLowerCase().substr(index - 1, index + 1);
    const nextDouble = message.toLowerCase().substr(index, index + 2);
    return emojis.find(e => emojiMap[e].indexOf(previousDouble) !== -1) || emojis.find(e => emojiMap[e].indexOf(nextDouble) !== -1) || emojis.find(e => emojiMap[e].indexOf(character) !== -1)
  }
}

export default EmojiSpeaker;
