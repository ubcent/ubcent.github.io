import './EmojiSpeakerComponent.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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

const emotions = [
  "m40.582,44.428c-5.404,-2.538 -11.788,-2.54 -17.197,-0.012c-1.339,0.645 0.329,4.15 1.662,3.5c3.571,-1.665 8.896,-2.306 13.875,0.01c1.334,0.619 3.078,-2.813 1.66,-3.498",
  "m38.871,44l-13.744,0c-1.504,0 -1.504,4 0,4l13.744,0c1.504,0 1.504,-4 0,-4",
  "m44.584,40.279c-8.11,5.656 -17.106,5.623 -25.168,0c-0.97,-0.677 -1.845,0.495 -1.187,1.578c2.458,4.047 7.417,7.65 13.771,7.65s11.313,-3.604 13.771,-7.65c0.658,-1.083 -0.217,-2.254 -1.187,-1.578",
  "m31.998,38c-8.568,0 -12.213,2.408 -13.715,6c-0.801,1.919 0.346,3.999 0.346,3.999c0.449,1.218 2.215,2.001 13.371,2.001c11.143,0 12.922,-0.783 13.369,-2.001c0,0 1.146,-2.08 0.346,-3.999c-1.5,-3.592 -5.147,-6 -13.717,-6m9.973,4.965l-0.172,0.563c-0.08,0.258 -0.342,0.472 -0.586,0.472l-18.43,0c-0.24,0 -0.502,-0.214 -0.58,-0.472l-0.174,-0.563c-0.078,-0.26 0.008,-0.616 0.191,-0.797c0,0 2.232,-2.168 9.777,-2.168c7.547,0 9.779,2.168 9.779,2.168c0.187,0.181 0.275,0.537 0.195,0.797",
  "m31.998,36c-9.793,0 -13.959,2.407 -15.674,6c-0.916,1.92 0.395,5 0.395,5c1.637,3.883 1.406,5 15.281,5c13.857,0 13.643,-1.117 15.279,-5c0,0 1.311,-3.08 0.395,-5c-1.715,-3.593 -5.881,-6 -15.676,-6m11.363,4.965l-0.195,0.563c-0.09,0.259 -0.389,0.472 -0.664,0.472l-21.008,0c-0.273,0 -0.572,-0.213 -0.662,-0.473l-0.195,-0.563c-0.09,-0.26 0.008,-0.618 0.217,-0.797c0,0 2.545,-2.168 11.145,-2.168c8.602,0 11.146,2.168 11.146,2.168c0.21,0.18 0.306,0.538 0.216,0.798",
  "m31.998,38c-8.568,0 -12.213,2.408 -13.715,6c-0.801,1.919 0.346,3.999 0.346,3.999c0.449,1.218 2.215,2.001 13.371,2.001c11.143,0 12.922,-0.783 13.369,-2.001c0,0 1.146,-2.08 0.346,-3.999c-1.5,-3.592 -5.147,-6 -13.717,-6m9.973,4.965l-0.172,0.563c-0.08,0.258 -0.342,0.472 -0.586,0.472l-18.43,0c-0.24,0 -0.502,-0.214 -0.58,-0.472l-0.174,-0.563c-0.078,-0.26 0.008,-0.616 0.191,-0.797c0,0 2.232,-2.168 9.777,-2.168c7.547,0 9.779,2.168 9.779,2.168c0.187,0.181 0.275,0.537 0.195,0.797",
  "m44.584,40.279c-8.11,5.656 -17.106,5.623 -25.168,0c-0.97,-0.677 -1.845,0.495 -1.187,1.578c2.458,4.047 7.417,7.65 13.771,7.65s11.313,-3.604 13.771,-7.65c0.658,-1.083 -0.217,-2.254 -1.187,-1.578",
  "m38.871,44l-13.744,0c-1.504,0 -1.504,4 0,4l13.744,0c1.504,0 1.504,-4 0,-4",
  "m40.582,44.428c-5.404,-2.538 -11.788,-2.54 -17.197,-0.012c-1.339,0.645 0.329,4.15 1.662,3.5c3.571,-1.665 8.896,-2.306 13.875,0.01c1.334,0.619 3.078,-2.813 1.66,-3.498"
];

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
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          <h3>
            <svg width="64" height="64">
              <path d="m32.00698,2c-16.568,0 -30,13.432 -30,30s13.432,30 30,30s30,-13.432 30,-30s-13.432,-30 -30,-30zm0,57.5c-15.164,0 -27.5,-12.336 -27.5,-27.5s12.336,-27.5 27.5,-27.5c15.163,0 27.5,12.336 27.5,27.5s-12.337,27.5 -27.5,27.5z" fill="white" />
              <circle r="5" cy="27" cx="20" fill="white" />
              <circle r="5" cy="27" cx="44" fill="white" />
              <path fill="white">
                <animate
                  attributeName="d" 
                  dur="800ms" 
                  repeatCount="indefinite"
                  values={emotions.join(';')}
                />
              </path>
            </svg>
          </h3>
          <h2>{previousWord || '\u00A0'}</h2>
          <p>{currentWord || '\u00A0'}</p>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default EmojiSpeaker;
