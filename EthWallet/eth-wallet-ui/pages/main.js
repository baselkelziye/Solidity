import React, { useEffect } from 'react';
import Web3 from 'web3';
import walletABI from '../walletABI';
import { Image, Button, Card, Input, Header } from 'semantic-ui-react';
import { useState } from 'react';
const src1 =
  'https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg';
const ethWallet = () => {
  const [balance, setBalance] = useState(0);
  const [funds, setFunds] = useState('');
  const [walletContract, setWalletContract] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [address, setAddress] = useState('');
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const contractAddres = '0x8c5eB2dAcB3e963A5cAf015c39EE1fB5C2a1214c';
  const wei = 1000000000000000000;
  const updateFunds = (event) => {
    setFunds(event.target.value);
  };

  const depositFunds = async () => {
    try {
      console.log('initial contract balance ->' + contractBalance);

      await web3.eth.sendTransaction({
        from: address,
        to: contractAddres,
        value: web3.utils.toWei(funds, 'ether'),
      });

      const contractBalance = await web3.eth.getBalance(contractAddres);
      const contractBalanceinEth = await web3.utils.fromWei(
        contractBalance,
        'ether'
      );
      setBalance(contractBalanceinEth);
    } catch (err) {}
  };

  const withdrawFunds = async () => {
    const inWei = await web3.utils.toWei(funds, 'ether'); //funds inputed number
    await walletContract.methods.withdrawETH(inWei).send({ from: address });

    const contractBalance = await web3.eth.getBalance(contractAddres);
    const contractBalanceinEth = await web3.utils.fromWei(
      contractBalance,
      'ether'
    );

    setBalance(contractBalanceinEth);
  };

  const initiliaze = async () => {
    try {
      setLoading(true);

      web3 = new Web3('http://localhost:7545');
      setWeb3(web3);

      const accounts = await web3.eth.getAccounts();
      setAddress(accounts[0]);

      setWalletContract(walletABI(web3));
      setLoading(false);
      setConnected(true);
      const contractBalance = await web3.eth.getBalance(contractAddres);
      const contractBalanceinEth = await web3.utils.fromWei(
        contractBalance,
        'ether'
      );

      setBalance(contractBalanceinEth);
    } catch (err) {}
  };

  return (
    <div>
      <link
        async
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
      />
      <Button
        color="orange"
        content="white"
        fluid
        disabled={connected}
        loading={loading}
        onClick={initiliaze}
      >
        {connected ? 'Connected' : 'Connect'}
      </Button>

      <Card centered>
        <Header as="h1" style={{ marginLeft: '2.8rem', color: 'orange' }}>
          Saadet Zinciri
        </Header>
        <Image
          //   img
          src={src1}
          size="medium "
          centered
        ></Image>

        {connected && (
          <Header
            as="h3"
            style={{ color: 'orange', overflowWrap: 'break-word' }}
          >
            Connected address: {address}
          </Header>
        )}
        <Header as="h3" style={{ color: 'orange' }}>
          Balance: {balance}
        </Header>
        {/* <h3 style={{ color: 'orange' }}> Balance: {balance} </h3> */}
        <Input
          placeholder="amount in ether"
          fluid
          onChange={updateFunds}
          // value={inputValue}
          // focus
        />

        <Button.Group vertical>
          <Button color="orange" content="white" onClick={depositFunds}>
            Deposit
          </Button>
          <Button color="orange" content="white" onClick={withdrawFunds}>
            Withdraw
          </Button>
        </Button.Group>
      </Card>
    </div>
  );
};
export default ethWallet;
