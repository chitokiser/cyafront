
let Qaddress= {
    quiz: "0x3Fa290db3E85EAD9994f2E7682E69f1126349B80", //퀴즈
    vetbank: "0x27e8F277826AE9aD67178978d2c89a52f7a5177A",

     }
  let Qabi = {
  
    quiz: [
        "function openbox(uint _id,string memory _answer) public",
        "function  total( ) public view returns(uint)",
        "function myinfo(address user) public view returns (uint256,uint256,uint256,uint256,uint256,uint256,uint256,)",
        "function getpower(address user) public view returns(uint)",
        "function getcollect(address _address) external view returns (uint256[] memory)",
        "function cllect(address _address,uint num) external view returns (uint)",  //수집
        "event reward(uint amount)",
        "event wrong(uint amount)",
      ],
  
    vetbank: [
       
        "function myinfo(address user) public view returns (uint256,uint256,uint256,uint256,uint256,uint256,address,address)",
        ],
  
  };
  
  
  let Vettop = async () => {
   
    
    const provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
  
    let tresureContract = new ethers.Contract(Qaddress.quiz, Qabi.quiz, provider);
  
    let total = await tresureContract.total(); //퀴즈누적상금누적
    
    document.getElementById("Qtotal").innerHTML = parseFloat(total/1e18).toFixed(4);
 
  
// 'reward' 이벤트 핸들러
tresureContract.on('reward', (amount) => {
    console.log('*** reward 이벤트 핸들러 호출됨 ***');
    console.log('찾은보물:', amount);
    document.getElementById('eventQ1').innerText = `***정답입니다+ ${amount/1e18} P`;

    
    setTimeout(() => {
        document.getElementById('eventQ1').innerText = '';
    }, 30000);
});

// 'wrong' 이벤트 핸들러
tresureContract.on('wrong', (amount) => {
    console.log('*** wrong 이벤트 핸들러 호출됨 ***');
    console.log('잃은VET:', amount);
    document.getElementById('eventQ2').innerText = `***틀렸습니다- ${amount} VET`;

    // 3초 후에 결과값을 지우는 코드
    setTimeout(() => {
        document.getElementById('eventQ2').innerText = '';
    }, 30000);
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
    let tresureContract = new ethers.Contract(Qaddress.quiz, Qabi.quiz, signer);
    
    // Get treasureId and answer from the clicked button's parent element
    let parentElement = this.parentElement;
    let treasureId = parentElement.querySelector(".qid").value;
    let answer = parentElement.querySelector(".Answer").value;
    
    // Log the retrieved value (for debugging)
    console.log("Treasure ID:", treasureId);
    
    try {
        await tresureContract.openbox(treasureId, answer);
    } catch(e) {
        // Handle any errors that occur during the transaction
        alert(e.data.message.replace('execution reverted: ',''));
    }
};

// Add event listener to all buttons with class "treasureButton"
let treasureButtons = document.querySelectorAll(".treasureButton");
treasureButtons.forEach(button => {
    button.addEventListener("click", Openbox);
});

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
    let vetContract = new ethers.Contract(Qaddress.vetbank, Qabi.vetbank, signer);
    let my = await vetContract.myinfo(await signer.getAddress());
    let tpoint =  parseInt(await my[0]);
    let point =  parseInt(await my[1]);
   

    document.getElementById("Tpoint").innerHTML= (tpoint/1E18).toFixed(4); 
    document.getElementById("Point").innerHTML= (point/1E18).toFixed(4);   //찾을 돈 

  
  };
 


  
