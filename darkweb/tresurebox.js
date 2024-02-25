
let address= {
  tresureAddr: "0x3da25c4F7831C1642a025a2f26451b4c24A74aEF",
  vetbankAddr: "0x27e8F277826AE9aD67178978d2c89a52f7a5177A",
  adAddr: "0x9A27a782FD75C9Af44A875F327d52Ee662891d5C",
   }
let abi = {

  tresure: [
      "function openbox(uint _id) public",
      "function  total( ) public view returns(uint)",
      "function myinfo(address user) public view returns (uint256,uint256,uint256,uint256,uint256,uint256,uint256,)",
      "function getpower(address user) public view returns(uint)",
      "event reward(uint amount);"
    ],

    vetbank: [
     
      "function myinfo(address user) public view returns (uint256,uint256,uint256,uint256,uint256,uint256,address,address)",
      ],

      ad: [
     
        "function g2(uint id) public view returns(string memory)",
        "function donation(uint pay) public",
        "function nameregi(string memory _name) public",
        " function g1() public view returns (uint256)",
        "function g4(address user) public view returns (uint)", 
        "function g5(uint _did) public view returns (uint)",
        "function did() public view returns (uint256)",
        "function totaldo() public view returns (uint256)",
        "function myinfo(uint num) public view returns (string,uint256,addres,uint)",
        ],

};


document.addEventListener("DOMContentLoaded", function() {
  // Your code here
  let Ttopdate = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
      let treasureContract = new ethers.Contract(address.tresureAddr, abi.tresure, provider);
      let tvl = await treasureContract.total();
      document.getElementById("Total").innerHTML = parseFloat(tvl / 1e18).toFixed(4);
      

      let adContract = new ethers.Contract(address.adAddr, abi.ad, provider);  //보물관련 메세지 출력 
      let ad0 = await adContract.g2(0);
      let ad1 = await adContract.g2(1);
      let ad2 = await adContract.g2(2);
      let ad3 = await adContract.g2(3);
      let ad4 = await adContract.g2(4);
      let ad5 = await adContract.g2(5);
      document.getElementById("Ad0").innerHTML = (ad0);
      document.getElementById("Ad1").innerHTML = (ad1);
      document.getElementById("Ad2").innerHTML = (ad2);
      document.getElementById("Ad3").innerHTML = (ad3);
      document.getElementById("Ad4").innerHTML = (ad4);
      document.getElementById("Ad5").innerHTML = (ad5);

      

   

      // Register event listener after contract initialization
      treasureContract.on('reward', (amount) => {
        console.log('Reward Amount:', amount);
        let eventS1Element = document.getElementById('eventT1');
        if (eventS1Element) {
          eventS1Element.innerText = `Get point: ${amount / 1e18}p`;
        } else {
          console.error('Error: Element with ID "eventT1" not found.');
        }
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  Ttopdate();  
});



async function Openbox() {
  // Connect to the user's Web3 provider
  let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
  
  // Request adding Binance Smart Chain to wallet
  await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
          chainId: "0xCC",
          rpcUrls: ["https://opbnb-mainnet-rpc.bnbchain.org"],
          chainName: "opBNB",
          nativeCurrency: {
              name: "BNB",
              symbol: "BNB",
              decimals: 18
          },
          blockExplorerUrls: ["https://opbnbscan.com"]
      }]
  });
  
  // Request access to user's accounts
  await userProvider.send("eth_requestAccounts", []);
  
  // Get the signer (account) from the provider
  let signer = userProvider.getSigner();

  // Instantiate the treasure contract with the signer
  let tresureContract = new ethers.Contract(address.tresureAddr, abi.tresure, signer);
  
  // Retrieve the treasure ID from HTML input
  let treasureId = document.getElementById("tid").value;
  
  // Log the retrieved value (for debugging)
  console.log("Treasure ID:", treasureId);
  
  try {
      // Call the contract's 'openbox' function with the retrieved treasure ID
      await tresureContract.openbox(treasureId);
  } catch(e) {
      // Handle any errors that occur during the transaction
      alert(e.data.message.replace('execution reverted: ',''));
  }
};

  document.getElementById("treasureButton").addEventListener("click", Openbox);

  let MemberLogin = async () => {
    let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
          chainId: "0xCC",
          rpcUrls: ["https://opbnb-mainnet-rpc.bnbchain.org"],
          chainName: "opBNB",
          nativeCurrency: {
              name: "BNB",
              symbol: "BNB",
              decimals: 18
          },
          blockExplorerUrls: ["https://opbnbscan.com"]
      }]
  });
    await userProvider.send("eth_requestAccounts", []);
    let signer = userProvider.getSigner();
    let vetContract = new ethers.Contract(address.vetbankAddr, abi.vetbank, signer);
    let my = await vetContract.myinfo(await signer.getAddress());
    let tpoint =  parseInt(await my[0]);
    let point =  parseInt(await my[1]);
   

    document.getElementById("Tpoint").innerHTML= (tpoint/1E18).toFixed(4); 
    document.getElementById("Point").innerHTML= (point/1E18).toFixed(4);   //찾을 돈 돈

  
  };




