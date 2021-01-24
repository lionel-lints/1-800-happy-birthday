import React, { Component } from "react";
const { Provider, Consumer } = React.createContext();

class LanguageContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lang: "en"
    };

    this.setEnglish = this.setEnglish.bind(this);
    this.setEspanol = this.setEspanol.bind(this);
  }

  setEnglish() {
    this.setState({ lang: "en" });
  }

  setEspanol() {
    this.setState({ lang: "es" });
  }

  render() {
    return (
      <Provider
        value={{
          lang: this.state.lang,
          setEnglish: this.setEnglish,
          setEspanol: this.setEspanol
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { LanguageContextProvider, Consumer as LanguageContextConsumer };
