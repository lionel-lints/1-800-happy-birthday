import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import IndexPage from "./dev-components/IndexPage.js";
import RowPage from "./dev-components/RowPage.js";
import AboutPage from "./dev-components/AboutPage.js";
import ContactPage from "./dev-components/ContactPage.js";

import GlobalStyleReset from "./components/GlobalStyleReset.js";
import { LanguageContextProvider } from "./components/LanguageContext.js";

ReactDOM.render(
  <Router>
    <GlobalStyleReset />
    <LanguageContextProvider>
      <div>
        <Route
          path="/"
          exact
          component={props => <IndexPage {...props} currentPage={1} />}
        />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/:slugOrId.html" exact component={RowPage} />
        <Route
          path="/page/:page.html"
          render={props => (
            <IndexPage
              {...props}
              currentPage={parseInt(props.match.params.page, 10)}
            />
          )}
        />
      </div>
    </LanguageContextProvider>
  </Router>,
  document.getElementById("root")
);
