import './EmojiSpeakerComponent.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const emojiMap = {
  o: ['o', 'e'],
  b: ['b', 'p', 'm'],
  c: ['c', 'g', 'j', 'k', 'n', 'r', 's', 't', 'v', 'x', 'z', 'sh'],
  d: ['d', 'l', 'th'],
  q: ['q', 'u', 'w', 'y'],
  a: ['a', 'i'],
  empty: [],
};

const emojis = Object.keys(emojiMap);

const defaultEmoji = 'c';

class EmojiSpeaker extends PureComponent {
  static propTypes = {
    message: PropTypes.string.isRequired,
    delay: PropTypes.number.isRequired
  }

  static defaultProps = {
    delay: 200
  }

  constructor(props) {
    super(props);

    this.timer = null;
    this.start = Date.now();

    this.state = {
      currentWord: '',
      previousWord: '',
      emoji: defaultEmoji
    }
  }

  componentDidMount() {
    const { delay, message } = this.props;
    this.timer = setInterval(() => {
      const index = Math.floor((Date.now() - this.start) / delay) % (message.length + 1);
      const words = message.substr(0, index).split(' ');

      this.setState({
        currentWord: words.pop(),
        previousWord: words.pop(),
        emoji: this.resolveCharacter(index) || defaultEmoji
      });
    }, delay);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  resolveCharacter = (index) => {
    const { message } = this.props;
    const character = message.toLowerCase()[index];
    const previousDouble = message.toLowerCase().substr(index - 1, index + 1);
    const nextDouble = message.toLowerCase().substr(index, index + 2);

    return emojis.find(e => emojiMap[e].indexOf(previousDouble) !== -1) || emojis.find(e => emojiMap[e].indexOf(nextDouble) !== -1) || emojis.find(e => emojiMap[e].indexOf(character) !== -1)
  }

  render() {
    const { previousWord, currentWord, emoji } = this.state;
    
    return (
      <div>
        <h3><span className={classnames('icon', `icon-${emoji}`)} /></h3>
        <h2>{previousWord}</h2>
        <p>{currentWord}</p>
      </div>
    );
  }
}

export default EmojiSpeaker;
