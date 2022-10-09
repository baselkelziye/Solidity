const abi = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  { stateMutability: 'payable', type: 'fallback' },
  {
    inputs: [],
    name: 'getBalance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address payable', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
    name: 'withdrawETH',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { stateMutability: 'payable', type: 'receive' },
];
const EthWalletContract = (web3) => {
  return new web3.eth.Contract(
    abi,
    '0x8c5eB2dAcB3e963A5cAf015c39EE1fB5C2a1214c' //contract address
  );
};

export default EthWalletContract;
