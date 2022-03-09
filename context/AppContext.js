import React, { Component, createContext } from 'react';

export const AppContext = createContext();

class AppContextProvider extends Component {
  state = {
    // UX state
    stage: 1,
    faqModalStatus: false,
    showAlertModal: false,
    //web3 state
    ethersProvider: null,
    web3: null,
    signerAddress: null,
    signerEns: null,
    chainId: null,
    //artist form state
    artist_name: '',
    artist_email: '',
    artist_bio: '',
    artist_discord: '',
    artist_telegram: '',
    artist_insta: '',
    artist_twitter: '',
    //artwork form state
    art_name: '',
    art_price: 0,
    art_description: '',
    art_image: '',
    input_1: '',
    input_2: '',
    checkbox_option: ''
  };

  inputChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  setArtImage = (image) => {
    this.setState({ art_image: image });
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

  updateStage = (type) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.setState((prevState) => {
      return {
        stage: type === 'previous' ? prevState.stage - 1 : prevState.stage + 1
      };
    });
  };

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
          updateStage: this.updateStage,
          setArtImage: this.setArtImage,
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
