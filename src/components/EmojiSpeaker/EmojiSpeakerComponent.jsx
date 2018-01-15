import './EmojiSpeakerComponent.scss';

import React, { PureComponent, Fragment } from 'react';
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

const emotions = {
  o: 'M27,48a5,5 0 1,0 10,0a5,5 0 1,0 -10,0',
  b: 'm31.998,38c-8.568,0 -12.213,2.408 -13.715,6c-0.801,1.919 0.346,3.999 0.346,3.999c0.449,1.218 2.215,2.001 13.371,2.001c11.143,0 12.922,-0.783 13.369,-2.001c0,0 1.146,-2.08 0.346,-3.999c-1.5,-3.592 -5.147,-6 -13.717,-6m9.973,4.965l-0.172,0.563c-0.08,0.258 -0.342,0.472 -0.586,0.472l-18.43,0c-0.24,0 -0.502,-0.214 -0.58,-0.472l-0.174,-0.563c-0.078,-0.26 0.008,-0.616 0.191,-0.797c0,0 2.232,-2.168 9.777,-2.168c7.547,0 9.779,2.168 9.779,2.168c0.187,0.181 0.275,0.537 0.195,0.797',
  c: 'm51.643,35.344c-4.484,-0.662 -11.108,-1.344 -19.644,-1.344l-0.001,0c-8.535,0 -15.159,0.682 -19.641,1.344c-1.746,0.258 -2.357,1.263 -2.357,2.066c0,9.59 3.492,12.59 17.811,12.59l8.381,0c14.316,0 17.808,-3 17.808,-12.59c0,-0.803 -0.613,-1.808 -2.357,-2.066m-19.643,12.656c-6.376,0 -15.467,0 -15.223,-2.053c0.044,-0.367 0.152,-0.803 0.289,-1.276c0.158,-0.526 0.28,-0.671 1.378,-0.671c1.839,0 24.716,0 27.112,0c1.098,0 1.223,0.145 1.377,0.671c0.141,0.474 0.246,0.909 0.289,1.276c0.245,2.053 -8.846,2.053 -15.222,2.053m16.934,-9.831l-1.113,2.909c-0.195,0.507 -0.762,0.922 -1.264,0.922l-29.114,0c-0.5,0 -1.068,-0.415 -1.262,-0.922l-1.115,-2.909c-0.194,-0.507 0.053,-0.983 0.549,-1.058c0,0 7.392,-1.111 16.385,-1.111c8.992,0 16.385,1.111 16.385,1.111c0.495,0.077 0.742,0.551 0.549,1.058',
  d: 'm32,38c-4.969,0 -9,4.029 -9,9s4.031,9 9,9c4.973,0 9,-4.029 9,-9s-4.027,-9 -9,-9m-6,6c1.197,-2.391 3.436,-4 5.998,-4c2.567,0 4.803,1.608 6.002,4l-12,0',
  q: 'M27,48a5,5 0 1,0 10,0a5,5 0 1,0 -10,0',
  a: 'm47.783,34.006c-15.783,0 -15.783,0 -31.568,0c-0.785,0 -1.505,-0.09 -1.912,0.43c-3.909,4.986 0.69,19.564 17.696,19.564c17.007,0 21.606,-14.578 17.696,-19.564c-0.406,-0.52 -1.127,-0.43 -1.912,-0.43m-15.783,18.176c-2.913,0 -5.483,-0.561 -7.713,-1.517c2.152,-1.032 4.711,-1.663 7.713,-1.663s5.563,0.631 7.713,1.663c-2.229,0.956 -4.799,1.517 -7.713,1.517m15.006,-12.182c-10.422,0 -19.591,0 -30.012,0c-2.001,0 -2.001,-4 0.053,-4c14.953,0 14.953,0 29.906,0c2.053,0 2.053,4 0.053,4',
  empty: 'm38.871,44l-13.744,0c-1.504,0 -1.504,4 0,4l13.744,0c1.504,0 1.504,-4 0,-4'
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

  generateValues = () => {
    const { message } = this.props;
    
    return [...message].map((letter, index) => emotions[this.resolveCharacter(index) || defaultEmoji]);
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
    const values = this.generateValues();

    return (
      <Fragment>
        <h3>
          <svg width="64" height="64">
            <path d="m32.00698,2c-16.568,0 -30,13.432 -30,30s13.432,30 30,30s30,-13.432 30,-30s-13.432,-30 -30,-30zm0,57.5c-15.164,0 -27.5,-12.336 -27.5,-27.5s12.336,-27.5 27.5,-27.5c15.163,0 27.5,12.336 27.5,27.5s-12.337,27.5 -27.5,27.5z" fill="white" />
            <circle r="5" cy="27" cx="20" fill="white" />
            <circle r="5" cy="27" cx="44" fill="white" />
            <path fill="white">
              <animate
                attributeName="d"
                dur={`${200 * values.length}ms`}
                repeatCount="indefinite"
                values={values.join(';')}
              />
            </path>
          </svg>
        </h3>
        <h2>{previousWord || '\u00A0'}</h2>
        <p>{currentWord || '\u00A0'}</p>
      </Fragment>
    );
  }
}

export default EmojiSpeaker;
