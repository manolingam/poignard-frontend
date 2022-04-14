import React, { Component, createContext } from 'react';

export const AppContext = createContext();

class AppContextProvider extends Component {
  state = {
    // UX state
    stage: 0,
    faqModalStatus: false,
    redeemEvent: false,
    firstVouchersFetch: false,
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
    //database state
    db_artist: null,
    db_merkleProof: ''
  };

  updateFaqModalStatus = (status, faqType) => {
    this.setState({ faqModalStatus: status, faqType });
  };

  updateStage = (number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.setState({ stage: number });
  };

  updateRedeemEvent = (status) => {
    this.setState({ redeemEvent: status });
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

          updateFaqModalStatus: this.updateFaqModalStatus,
          updateStage: this.updateStage,
          updateRedeemEvent: this.updateRedeemEvent,
          setWeb3Data: this.setWeb3Data,
          setDbData: this.setDbData
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContextProvider;
