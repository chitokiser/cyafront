
let address= {
    tresureAddr: "0x3da25c4F7831C1642a025a2f26451b4c24A74aEF",
    vetbankAddr: "0x27e8F277826AE9aD67178978d2c89a52f7a5177A",
    adAddr: "0x9A27a782FD75C9Af44A875F327d52Ee662891d5C"
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
          "function totalad() public view returns (uint256)",
          "function nameregi(string memory _name) public",//기부자 본인 이름 등록 
          "function myinfo(uint num) public view returns (string memory,uint256,address,uint)",
          ],
  
  };
  
  let Ttopdate = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
      let treasureContract = new ethers.Contract(address.tresureAddr, abi.tresure, provider);
      let tvl = await treasureContract.total();
      document.getElementById("Total").innerHTML = parseFloat(tvl / 1e18).toFixed(4);  // 찾은 보물
      
      let adContract = new ethers.Contract(address.adAddr, abi.ad, provider);  // 기부자 명단 출력
      
      let didno = await adContract.did();   // 기부자 총인원
      let withdo = await adContract.g1();  // 인출가능 액
      let totaldo = await adContract.totaldo();  // 기부총액
      let totalad = await adContract.totaldo();  // 광고총액

  
      document.getElementById("Holder").innerHTML = (didno);  // 기부자 총인원
      document.getElementById("Totaldo").innerHTML = (totaldo/1e18);  // 기부총액
      document.getElementById("Totaldo2").innerHTML = (totaldo/1e18);  // 인출가능액
    //   document.getElementById("Withdo").innerHTML = ((withdo-totalad)/1e18);  // 인출가능액
      
      let coninfo1 = await adContract.myinfo(1);  // 기부1 정보
      document.getElementById("Cn1").innerHTML = (coninfo1[0]); // 기부자 이름
      document.getElementById("Cm1").innerHTML = (coninfo1[1]/1e18); // 기부 금액
      
      //2번 기부자
      let coninfo2 = await adContract.myinfo(2);  // 기부1 정보
      document.getElementById("Cn2").innerHTML = (coninfo2[0]); // 기부자 이름
      document.getElementById("Cm2").innerHTML = (coninfo2[1]/1e18); // 기부 금액
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  Ttopdate(); 
  
  async function Donation() {   //기부하기
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