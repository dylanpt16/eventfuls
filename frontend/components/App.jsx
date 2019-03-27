import React from 'react';
import {
  Route,
  Link,
  Switch,
  HashRouter
} from 'react-router-dom';

import HeaderLinks from './header_links/header_links';
import GreetingContainer from './greeting/greeting_container';
import SessionFormContainer from './session_form/session_form_container';
import FrontPage from './front_page/front_page';
import EventFormContainer from './event_form/event_form_container';
import EventPageContainer from './event_page/event_page_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
  <div className="page">
    <div className="page-header">
      <HeaderLinks />
      <GreetingContainer />
    </div>
    <div className="page-content">
      <Switch>
        <Route exact path="/" component={FrontPage} />
        <AuthRoute path="/login" component={SessionFormContainer} />
        <AuthRoute path="/signup" component={SessionFormContainer} />
        <ProtectedRoute path="/events/new" component={EventFormContainer} />
        <Route path="/events/:eventId" component={EventPageContainer} />
      </Switch>
    </div>
  </div>
);

export default App;
