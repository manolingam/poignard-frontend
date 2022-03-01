import React, { Component, createContext } from 'react';

export const AppContext = createContext();

class AppContextProvider extends Component {
  state = {
    // UX state
    faqModalStatus: false,
    showAlertModal: false,
    //web3 state
    ethersProvider: null,
    web3: null,
    signerAddress: null,
    signerEns: null,
    chainId: null,
    //join state
    input_1: '',
    input_2: '',
    checkbox_option: ''
  };

  inputChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // ------- NOT YET USED ---------
  // updateFaqModalStatus = (status, faqType) => {
  //   this.setState({ faqModalStatus: status, faqType });
  // };

  // updateAlertModalStatus = () => {
  //   this.setState((prevState) => {
  //     return { showAlertModal: !prevState.showAlertModal };
  //   });
  // };

  setWeb3Data = (data) => {
    this.setState({
      ...data
    });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          inputChangeHandler: this.inputChangeHandler,
          // updateFaqModalStatus: this.updateFaqModalStatus,
          // updateAlertModalStatus: this.updateAlertModalStatus,
          setWeb3Data: this.setWeb3Data
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContextProvider;
