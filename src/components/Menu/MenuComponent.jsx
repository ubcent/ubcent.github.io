import './MenuComponent.scss';

import React, { PureComponent } from 'react';
import classnames from 'classnames';

class Menu extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { scrollY: 0 };
  }

  componentDidMount() {
    this.updateScrollTop();
    window.addEventListener('scroll', this.updateScrollTop);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateScrollTop);
  }

  updateScrollTop = () => {
    this.setState({ scrollY: window.scrollY > 55 ? 55 : window.scrollY });
  }

  render() {
    const opacity = this.state.scrollY / (55 / 100) / 100;
    
    return (
      <div className="menu-nav">
        <nav className={classnames('navbar', 'navbar-default', { 'menu-nav-white': this.state.scrollY > 0 })} style={{ backgroundColor: `rgba(255, 255, 255, ${opacity})` }}>
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand navbar-logo-brand" href="/">D. Bondarchuk</a>
            </div>
            <div className="navbar-collapse collapse" aria-expanded="false" style={{ height: 1 }}>
              <ul className="nav navbar-nav">
                <li><a href="#Home" className="scroll-home">home</a></li>
                <li><a href="#About" className="scroll-about">about</a></li>
                <li><a href="#Services" className="scroll-services">Services</a></li>
                <li><a href="#Portfolio" className="scroll-Portfolio">Portfolio</a></li>
                <li><a href="#Skills" className="scroll-skills">skills</a></li>
                <li><a href="#Blog" className="scroll-blog">blog</a></li>
                <li><a href="#Contact" className="scroll-contact">contact</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
};

export default Menu;
