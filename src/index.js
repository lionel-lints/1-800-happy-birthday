import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { HomePage } from "@/modules/home";
import AboutPage from "@/modules/about/AboutPage.js";
import ContactPage from "@/modules/contact/ContactPage.js";

import { GlobalStyleReset, LanguageContextProvider } from "@/modules/_common";

ReactDOM.render(
  <Router>
    <GlobalStyleReset />
    <LanguageContextProvider>
      <div>
        <Route path="/" exact component={props => <HomePage {...props} />} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route
          path="/page/:page.html"
          render={props => (
            <HomePage
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
