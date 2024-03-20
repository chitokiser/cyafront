
let address= {
    tresure: "0x7f9DC432e1B4e5D0C5994ee3439bADDb922dc061",  //트레져2
    vetbankAddr: "0x27e8F277826AE9aD67178978d2c89a52f7a5177A",
    adAddr: "0x9A27a782FD75C9Af44A875F327d52Ee662891d5C",
     }
  let abi = {
  
    tresure: [
        "function openbox(uint _id) public",
        "function  total( ) public view returns(uint)",
        "function myinfo(address user) public view returns (uint256,uint256,uint256,uint256,uint256,uint256,uint256,)",
        "function getpower(address user) public view returns(uint)",
        "function getcollect(address _address) external view returns (uint256[] memory)",
        "function cllect(address _address,uint num) external view returns (uint)",  //수집
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
          "function cards() public view returns (uint256)",
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
     let formattedAmount = (amount / 1e18).toFixed(6);
     document.getElementById('eventT1').innerText = `포인트+ ${formattedAmount} P`;
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
  document.getElementById("treasureButton").addEventListener("click", Openbox);

  document.getElementById("treasureButton").addEventListener("click", function() {
    var backgroundMusic = document.getElementById("backgroundMusic");
    // 음악이 이미 재생 중이면 일시 중지하고, 아니면 재생
    if (backgroundMusic.paused) {
      backgroundMusic.play();
    } else {
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0; // 음악을 처음으로 되감음
    }
  }); 
  
