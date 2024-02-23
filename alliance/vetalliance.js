

let alliAddress = {
    alliAddr: "0x6A5481aac9B5258F60af73345319AFa4e635478D",  

  };

  let alliAbi = {
  
    alli: [
    "function registration(string memory name,string memory images,string memory home,string memory phone,string memory add,uint rate) public",
    "function registration(string memory name,string memory images,string memory home,string memory phone,string memory add,uint rate) public",
    "function certification(uint id) public",
    "function buy(uint id,uint fee)public",
    "function outpay(uint id )public",
    " function g1() public view virtual returns(uint256)",
    " function g2(address user) public view virtual returns(uint256)",
    " function g3(address user) public view virtual returns(uint256)",
    "function g4(uint id) public view returns(string memory,string memory,string memory,string memory,string memory,uint,address,bool,uint) ",
    "function allis(uint id) public view returns(string memory,string memory,string memory,string memory,string memory,uint,address,uint,uint,uint,bool) ",
    " function  g9() public view returns(uint)",
    "function  g10(address user) public view returns(uint)",
    "function tax() public view virtual returns(uint256)", 
    "function totaltax() public view virtual returns(uint256)",
     "event reward(uint amount)"
    ],
   
  };
  
    

    let Vtop = async () => {

  
         const provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
    
          let alliContract = new ethers.Contract(alliAddress.alliAddr, alliAbi.alli, provider);
         let tvl = await alliContract.g1();
         let tax = await alliContract.tax(); 
         let totaltax = await alliContract.totaltax(); 
         document.getElementById("Atvl").innerHTML = parseFloat(tvl/1e18).toFixed(2);
         document.getElementById("Atax").innerHTML = parseFloat(tax/1e18).toFixed(2);
         document.getElementById("Atotaltax").innerHTML = parseFloat(totaltax/1e18).toFixed(2);
      
      
         
          //1번가맹점
       let as1= await alliContract.allis(0);
       let a1name  = await as1[0];  //이름
       let a1images  = await as1[1];  //이미지 주소
       let a1home  = await as1[2]; //홈페이지
       let a1phone  = await as1[3];  //전화번호
       let a1tadd  = await as1[4]; //매장주소
       let a1rate  = await as1[5];    //DC비율
       let a1owner  = await as1[6];    //오너
       let a1tdepo  = await as1[8];    //가맹점 누적
       let a1temp  = await as1[7];    //가맹점 실맹출
       let a1depo  = a1temp * (100-a1rate)/100;
       let a1id  = await as1[9];   // id

       document.getElementById("A1name").innerHTML = (a1name);
       document.getElementById("A1rate").innerHTML = (a1rate);
       document.getElementById("A1tdepo").innerHTML =  parseFloat(a1tdepo/1e18).toFixed(2);
       document.getElementById("A1depo").innerHTML =  parseFloat(a1depo/1e18).toFixed(2);
       
       document.getElementById("A1id").innerHTML = parseInt(a1id);
       document.getElementById("A1owner").innerHTML = (a1owner);



      //2번가맹점
      let as2= await alliContract.allis(1);
          let a2name  = await as2[0];  //이름
          let a2images  = await as2[1];  //이미지 주소
          let a2home  = await as2[2]; //홈페이지
          let a2phone  = await as2[3];  //전화번호
          let a2tadd  = await as2[4]; //매장주소
          let a2rate  = await as2[5];    //DC비율
          let a2owner  = await as2[6];    //오너
          let a2tdepo  = await as2[8];    //가맹점 누적
          let a2temp  = await as2[7];    //가맹점 실맹출
          let a2depo  = a2temp * (100-a1rate)/100;
          let a2id  = await as2[9];   // id
   
          document.getElementById("A2name").innerHTML = (a2name);
          document.getElementById("A2rate").innerHTML = (a2rate);
          document.getElementById("A2tdepo").innerHTML =  parseFloat(a2tdepo/1e18).toFixed(2);
          document.getElementById("A2depo").innerHTML =  parseFloat(a2depo/1e18).toFixed(2);
          
          document.getElementById("A2id").innerHTML = parseInt(a2id);
          document.getElementById("A2owner").innerHTML = (a2owner);



      alliContract.on('reward', (amount) => {
        // Handle incoming event data
        console.log('Cashback:', amount); // Log amount to console for debugging
        
        // Assuming amount represents a token amount and needs to be divided by 1e18
        const points = amount / 1e18; // Convert amount to human-readable format
        
        // Update the DOM with the points value
        document.getElementById('eventA1').innerText = `Get Points: ${points}p`;
    });
   
   };
 
    let Aidbuy = async () => {
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
      let alliContract = new ethers.Contract(alliAddress.alliAddr, alliAbi.alli, signer);
      const quantity = ethers.utils.parseUnits(document.getElementById('fee').value, 18);
      try {
        await alliContract.buy(document.getElementById('aid').value,quantity);
        
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    };
  
  

    let Outpay = async () => {
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
        let alliContract = new ethers.Contract(alliAddress.alliAddr, alliAbi.alli, signer);
        
        try {
          await alliContract.outpay(document.getElementById('aid2').value);
          
        } catch(e) {
          alert(e.data.message.replace('execution reverted: ',''))
        }
      };
 

      Vtop();
     