import './HeaderHomeComponent.scss';

import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

import EmojiSpeaker from 'components/EmojiSpeaker';

class HeaderHome extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { height: 0 };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ height: window.innerHeight });
  }

  render() {
    const { height } = this.state;

    const message = 'Arnold ipsum. Just bodies. I need your clothes, your boots, and your motorcycle. Grant me revenge! And if you do not listen, then to HELL with you. Make it quick because my horse is getting tired. Come on don\'t bullshit me. Into the tunnel. Bring your toy back to the carpet.';
    return (
      <div className="header-home" style={{ height }}>
        <div className="bg-overly-header" />

        <div className="container-fluid">
          <div className="head-info">
            <div className="head-contents">
              <EmojiSpeaker message={message} />
              <button className="btn btn-default talk-head">Let's Talk</button>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default HeaderHome;
