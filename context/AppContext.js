import React, { Component, createContext } from 'react';

import { fetchVouchers } from '../utils/requests';
import { TIMEOUT_MINUTES } from '../config';

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
    db_merkleProof: '',
    db_minted_vouchers: [],
    db_unminted_vouchers: []
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

  fetchAllVouchersInContext = async (contentType) => {
    this.setState({ firstVouchersFetch: false });

    const mintedVouchers = await fetchVouchers(true, contentType.toLowerCase());
    if (mintedVouchers.data.data.vouchers.length > 0) {
      this.setDbData({
        db_minted_vouchers: mintedVouchers.data.data.vouchers
      });
    }
    const unmintedVouchers = await fetchVouchers(
      false,
      contentType.toLowerCase()
    );
    if (unmintedVouchers.data.data.vouchers.length > 0) {
      this.setDbData({
        db_unminted_vouchers: unmintedVouchers.data.data.vouchers
      });
    }

    this.setState({ firstVouchersFetch: true });

    setTimeout(() => {
      this.fetchAllVouchersInContext('all');
    }, TIMEOUT_MINUTES * 60 * 1000);
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,

          updateFaqModalStatus: this.updateFaqModalStatus,
          updateStage: this.updateStage,
          updateRedeemEvent: this.updateRedeemEvent,
          fetchAllVouchersInContext: this.fetchAllVouchersInContext,

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
