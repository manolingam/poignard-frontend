import React, { Component, createContext } from 'react';

export const AppContext = createContext();

class AppContextProvider extends Component {
  state = {
    // UX state
    stage: 0,
    faqModalStatus: false,
    //web3 state
    ethersProvider: null,
    web3: null,
    signerAddress: null,
    signerEns: null,
    chainId: null,
    signature: null,
    //artist form state
    artist_name: '',
    artist_website: '',
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
    hasMinterRole: false,
    //database state
    db_artist: null,
    db_merkleProof: '',
    db_vouchers_minted: [],
    db_vouchers_not_minted: []
  };

  updateFaqModalStatus = (status, faqType) => {
    this.setState({ faqModalStatus: status, faqType });
  };

  inputChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  resetArtState = () => {
    this.setState({
      art_name: '',
      art_price: 0,
      art_description: '',
      art_image: ''
    });
  };

  setArtImage = (image) => {
    this.setState({ art_image: image });
  };

  updateStage = (number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.setState({ stage: number });
  };

  setDbData = (data) => {
    this.setState({ ...data });
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
          resetArtState: this.resetArtState,
          updateStage: this.updateStage,
          setArtImage: this.setArtImage,
          setWeb3Data: this.setWeb3Data,
          setDbData: this.setDbData,
          updateArtistState: this.updateArtistState,
          updateFaqModalStatus: this.updateFaqModalStatus
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContextProvider;
