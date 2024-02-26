let Vaddress = {    //vet bank랑 똑같음 alliance만 제외
    vetbank: "0x27e8F277826AE9aD67178978d2c89a52f7a5177A",  
  
  
  };
  let Vabi = {
  
    vetbank: [
    " function g1() public view virtual returns(uint256)",
    " function  g3() public view returns(uint)",
    "function  g5() public view returns(uint) ",
    "function  g8(address user) public view returns(uint)",
    "function  g9(address user) public view returns(uint)",
    "function g11() public view virtual returns(uint256)",
    "function  totaltax() public view returns(uint) ",
    " function getsum( ) public view returns(uint) ",
    "function  getprice( ) public view returns (uint256)",
    "function memberjoin(address _mento) public ",
    "function  getlevel(address user) public view returns(uint)",
    " function getpay(address user) public view returns (uint256)",
    " function allowt(address user) public view returns (uint256)",
    "function gettime( ) public view returns (uint256)",
    "function myinfo(address user) public view returns (uint256,uint256,uint256,uint256,uint256,uint256,address,address)",
    "function withdraw( )public returns(bool)",
    "function allowcation( )public returns(bool)",
    "function withdraw2( )public returns(bool)",
    "function buyvet(uint _num) public returns(bool) ",
    "function sellvet(uint _num) public returns(bool) ",
    "function levelup() public ",
    "event getdepo(uint amount);"
    ],
  };
  
  let Vettop = async () => {
    // Initialize provider
    const provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');

    // Initialize contract instance
    let vetbankContract = new ethers.Contract(Vaddress.vetbank, Vabi.vetbank, provider);

    // Get the current price
    let cprice = await vetbankContract.getprice(); 

    // Listen for the 'getdepo' event
    vetbankContract.on('getdepo', (amount) => {
        // Log amount to console for debugging
        console.log('Cashback:', amount);

        // Convert amount to human-readable format
        const points = amount / 1e18;

        // Update the DOM with the points value
        document.getElementById('eventV1').innerText = `Get Money: ${points} CYA`;
    });
};
  
    let Memberjoin = async () => {
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
  
      let vetContract = new ethers.Contract(Vaddress.vetbankAddr,Vabi.vetbank, signer);
  
      try {
        await vetContract.memberjoin(document.getElementById('mentoaddress').value);
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
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
      let vetContract = new ethers.Contract(Vaddress.vetbankAddr,Vabi.vetbank, signer);
      let myvet = await vetContract.g8(await signer.getAddress());
      let mypay = await vetContract.getpay(await signer.getAddress());
      let myvetvalue = await vetContract.getprice() * await myvet;
      document.getElementById("Myvet").innerHTML= parseInt(myvet); 
      document.getElementById("Mytvl").innerHTML= parseFloat(myvetvalue/1e18).toFixed(4); 
      document.getElementById("Mypay").innerHTML= parseFloat(mypay/1e18).toFixed(6); 
      console.log(mypay);
      let my = await vetContract.myinfo(await signer.getAddress());
      let tpoint =  parseInt(await my[0]);
      let point =  parseInt(await my[1]);
      let myexp =  parseInt(await my[2]);
      let mylev =  parseInt(await my[3]);
      let menty =  parseInt(await my[5]);
      let mento = (await my[6]);
      let agent = (await my[7]);
      let levelexp = parseInt(2**mylev*10000);
      document.getElementById("Tpoint").innerHTML= (tpoint/1E18).toFixed(4); 
      document.getElementById("Point").innerHTML= (point/1E18).toFixed(4);   //찾을 돈 돈
      document.getElementById("Myexp").innerHTML= (myexp);
      document.getElementById("Mylev").innerHTML= (mylev);
      document.getElementById("Mylev2").innerHTML= (mylev);
    
      document.getElementById("Mymenty").innerHTML= (menty);
      document.getElementById("Mymento").innerHTML= (mento);
      document.getElementById("Myagent").innerHTML= (agent);
      document.getElementById("Expneeded").innerHTML= (levelexp - myexp);
      document.getElementById("LevelBar").style.width = `${myexp/levelexp*100}%`; // CHECK:: 소수점으로 나오는 것 같아 *100 했습니다. 
       
      let myt = parseInt(await vetContract.allowt(await signer.getAddress()));
      let time2 = parseInt(604800); 
      let nowt = Math.floor(new Date().getTime()/ 1000);
      let left = parseInt((myt + time2)- nowt );
      let day = parseInt(left/60/60/24);
      let hour = parseInt(left/3600)%24;
      let min = parseInt((left/60)%60);
      let sec = left%60;
  
      document.getElementById("Left").innerHTML = left > 0 ? `${day}일${hour}시간${min}분${sec}초` : '';
    
    };
  
  
    // 멘토데이타 입력
  var dataArray = [
    "0x54363a36aabA3ff0678f452c6592125441E2E25f",
    "0x54363a36aabA3ff0678f452c6592125441E2E25f",
    "0x54363a36aabA3ff0678f452c6592125441E2E25f",
    "0x54363a36aabA3ff0678f452c6592125441E2E25f",
    "0x54363a36aabA3ff0678f452c6592125441E2E25f"
  ];
  
  // Function to select and display random data
  function displayRandomData() {
    // Select a random item from the array
    var randomIndex = Math.floor(Math.random() * dataArray.length);
    var randomData = dataArray[randomIndex];
  
    // Display the random data
    document.getElementById("randomData").textContent = randomData;
  }
  
  // Event listener for button click
  document.getElementById("randomButton").addEventListener("click", displayRandomData);
  
  
  function autoFillMentoAddress() {
    // Retrieve the printed mentoaddress
    var mentoaddress = document.getElementById('randomData').textContent;
  
    document.getElementById('mentoaddress').value = mentoaddress;
  }
  
  document.getElementById("randomButton").addEventListener("click", autoFillMentoAddress);
  
  


  
  
  
    let Levelup = async () => {
     
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
  
      let vetContract = new ethers.Contract(Vaddress.vetbankAddr,Vabi.vetbank, signer);
      
      try {
        await vetContract.levelup(); 
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    
  };



  let Allow = async () => {
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
  
    let vetContract = new ethers.Contract(Vaddress.vetbankAddr,Vabi.vetbank, signer);
  
    try {
      await vetContract.allowcation();
  
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };
  
    let Withdraw = async () => {
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
  
      let vetContract = new ethers.Contract(Vaddress.vetbankAddr,Vabi.vetbank, signer);
  
      try {
        await vetContract.withdraw();
  
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    };
  
  
    let Withdraw2 = async () => {
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
  
      let vetContract = new ethers.Contract(Vaddress.vetbank,Vabi.vetbank, signer);
  
      try {
        await vetContract.withdraw2();
  
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    };
  
  
  
  
  
    Vettop();
   