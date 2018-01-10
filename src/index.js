import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { HomePageComponent, BlogPageComponent, PageNotFoundComponent } from './pages';
import Breadcrumbs from './components/Breadcrumbs';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <nav>
        <Breadcrumbs />
      </nav>

      <Switch>
        <Route exact path="/" component={HomePageComponent} />
        <Route path="/blog" component={BlogPageComponent} />
        <Route component={PageNotFoundComponent} />
      </Switch>
    </div>
  </BrowserRouter>,
  document.getElementById('root'),
);
