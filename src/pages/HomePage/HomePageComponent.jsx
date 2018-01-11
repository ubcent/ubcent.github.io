import './HomePageComponent.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import HeaderHome from 'components/HeaderHome';

export default function Home() {
  return (
    <div>
      <HeaderHome />
      <p>
        This is an example single page app built
        with React and React&nbsp;Router using {' '}
        BrowserRouter. Navigate with the links below and
        refresh the page or copy/paste the url to test out the redirect
        functionality deployed to overcome GitHub&nbsp;Pages incompatibility
        with single page apps (like this one).
      </p>

      <div>
        <Link to="/blog">Blog</Link>
      </div>
      <div>
        <Link to="/example/two-deep?field1=foo&field2=bar#boom!">Example two deep with query and hash</Link>
      </div>
    </div>
  );
}
