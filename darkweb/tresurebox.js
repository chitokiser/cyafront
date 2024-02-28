
let address= {
  tresure: "0x3da25c4F7831C1642a025a2f26451b4c24A74aEF",
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


let Vettop = async () => {
 
  
  const provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');

  let tresureContract = new ethers.Contract(address.tresure, abi.tresure, provider);

  let total = await tresureContract.total(); //찾은보물

  document.getElementById("Total").innerHTML = parseFloat(total/1e18).toFixed(4);

  tresureContract.on('reward', (amount) => {
   console.log('찾은보물:', amount);
   document.getElementById('eventT1').innerText = ` GetPoint ${amount/1e18} P`;
   treasureBox.style.display = "none";
   const eventDiv = document.getElementById('eventDiv');
   eventDiv.classList.remove('hidden');
});


}



Vettop ();

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
  let tresureContract = new ethers.Contract(address.tresure, abi.tresure, signer);
  
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
    document.getElementById("Point").innerHTML= (point/1E18).toFixed(4);   //찾을 돈 

  
  };


  window.onload = function() {
    // 음악 재생을 위한 audio 요소 가져오기
    const backgroundMusic = document.getElementById("backgroundMusic");
    
    // 음악 재생 후 한 번만 실행되도록 이벤트 추가
    backgroundMusic.addEventListener("ended", function() {
        // 루프 중지
        backgroundMusic.loop = false;
    });

    // 음악 재생
    backgroundMusic.play();
}