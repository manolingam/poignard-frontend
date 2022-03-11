import React, { Component, createContext } from 'react';

export const AppContext = createContext();

class AppContextProvider extends Component {
  state = {
    // UX state
    stage: 0,
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
    //contract state
    signature: '',
    hasMinterRole: false,
    merkleProof: ''
  };

  inputChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  setArtImage = (image) => {
    this.setState({ art_image: image });
  };

  updateArtistState = (stateName, stateValue) => {
    this.setState({ [stateName]: stateValue });
  };

  updateStage = (number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.setState({ stage: number });
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
          setWeb3Data: this.setWeb3Data,
          updateArtistState: this.updateArtistState
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContextProvider;
