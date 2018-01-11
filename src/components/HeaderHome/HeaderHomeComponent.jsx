import './HeaderHomeComponent.scss';

import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

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
    return (
      <div className="header-home" style={{ height }}>
        <div className="bg-overly-header" />

        <div className="container-fluid">
          <div className="head-info">
            <div className="head-contents">
              <h3><span className="icon icon-a" /></h3>
              <h2>Good Thinking</h2>
              <p>Working together, to create something younique.</p>
              <button className="btn btn-default talk-head">Let's Talk</button>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default HeaderHome;
