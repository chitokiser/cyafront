let contractAddress = {  
    cyacoopAddr: "0xfd323330e67a965098a38E8f173aC85fA5a9fA9f",  
    huntAddr: "0x85e8a930767B2ea47D5642E3B15aC2e32ADeeAf6"
  };
  let contractAbi = {
  
    hunt: [
      "function creat(string memory _answer,uint _level)public",
      "function hunting(uint _tid,string memory _answer)public",
      "function withdraw( )public",
      "function buybox(uint num)public",
      "function sellbox(uint num)public",
      "function boxdown(address user,uint num)public returns(bool)",
      "function powerup( )public",
      "function attup( )public",
      "function defup( )public",
      "function weaponup( )public",
      "function armoup( )public",
      "function depoup(address user,uint num)public",
      "function faup(address _family )public",
      "function unbox(uint num)public",
      "function g1() public view virtual returns(uint256)",
      "function g2(uint256 _id) public view returns(uint,uint256,address[]memory winner,uint box)",
      "function g3(address user) public view virtual returns(uint256)",
      "function g4()public view virtual returns(uint depo,uint sapp,uint ruby,uint eme,uint wes,uint ars)",
      "function g5(address user) public view returns(uint)",
      "function g6(uint tid) public view returns(uint)",
      "function getatt(address user) public view returns(uint)",
      "function getdef(address user) public view returns(uint)",
      "function getweapon(address user) public view returns(uint)",
      "function getarmo(address user) public view returns(uint)",
      "function getpower(address user) public view returns(uint)",
      "function getbox(address user) public view returns(uint)",
      "function boxprice() public view returns(uint)",
      "function winners() public view returns(uint)",  
      "function tid() public view returns(uint)"  
      ],
      
      cyacoop: [
        "function getprice() public view returns(uint256)",
        "function allow() public view returns(uint256)",
        "function g1() public view returns(uint256)",
        "function g2() public view returns(uint256 allowt, uint256 exp, uint8 level, uint256 booster)",
        "function g6() public view returns(uint256)",
        "function g7(address user) public view returns(uint256)",
        "function memberjoin(uint256 _num) public",
        "function automemberjoin() public",
        "function levelup() public returns(bool)",
        "function geteps(address user) external view returns (uint256)",
        "function withdraw() public returns(bool)",
        "function mentolength() public view returns(uint256)",
        "function addmento() public",
        "function buybooster() public",
        "function buycat(uint _num) public returns(bool)",
        "function sellcat(uint num) public returns(bool)"
      ]

  };

  let HSync = async () => {
    // ethers setup
    let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');
    let huntContract = new ethers.Contract(contractAddress.huntAddr, contractAbi.hunt, provider);
   
    let boxp =  await huntContract.boxprice();
    let hwin =  await huntContract.winners();
    let htid =  await huntContract.tid();
    document.getElementById("Boxprice").innerHTML = (boxp/1e18).toFixed(6);
    document.getElementById("Winners").innerHTML = (hwin);
    document.getElementById("Htid").innerHTML = (htid);
    let htvl = await huntContract.g1();
    document.getElementById("Htvl").innerHTML = (htvl/1e18).toFixed(6);
    
  };

  
  let Hlogin = async () => {
    let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
            chainId: "0x38",
            rpcUrls: ["https://bsc-dataseed.binance.org/"],
            chainName: "Binance Smart Chain",
            nativeCurrency: {
                name: "BNB",
                symbol: "BNB",
                decimals: 18
            },
            blockExplorerUrls: ["https://bscscan.com/"]
        }]
    });

    await userProvider.send("eth_requestAccounts", []);
    let signer = userProvider.getSigner();
    let cyacoopContract = new ethers.Contract(contractAddress.cyacoopAddr, contractAbi.cyacoop,signer);
    
    let g2 = await cyacoopContract.g2();

    let mylevel = g2.level;
    let myexp = g2.exp;
    let levelexp = (2**g2.level)*10000;
    let mybooster = g2.booster;
     
    // level
    document.getElementById("Level").innerHTML = (mylevel);
    document.getElementById("LevelBar").style.width = `${myexp/levelexp*100}%`; // CHECK:: 소수점으로 나오는 것 같아 *100 했습니다.
    document.getElementById("Exp").innerHTML = parseInt(myexp);
    document.getElementById("Expneeded").innerHTML = parseInt(levelexp - myexp);
    document.getElementById("Mybooster").innerHTML = parseInt(mybooster);
    
    

    
    let huntContract = new ethers.Contract(contractAddress.huntAddr,contractAbi.hunt,signer);    
    let g4 = await huntContract.g4();
    let hsapp = g4.sapp;
    let hruby = g4.ruby;
    let heme = g4.eme;
    let hwes = g4.wes;
    let hars = g4.ars;
  
   
    let mybox =  parseInt(await huntContract.getbox(await signer.getAddress()));
    let hgetpower = await huntContract.getpower(await signer.getAddress());
    let hgetatt =  await huntContract.getatt(await signer.getAddress());
    let hgetdef =  await huntContract.getdef(await signer.getAddress());
    let hgetweapon =  await huntContract.getweapon(await signer.getAddress());
    let hgetarmo =  await huntContract.getarmo(await signer.getAddress());
    let powerexp = (2**hgetpower);
    let attexp = (2**hgetatt);
    let defexp = (2**hgetdef);
    let wesexp = (2**hgetweapon);
    let arsexp = (2**hgetarmo);

   
    document.getElementById("Getpower").innerHTML = (hgetpower);
    document.getElementById("Getatt").innerHTML =(hgetatt);
    document.getElementById("Getdef").innerHTML = (hgetdef);
    document.getElementById("Getweapon").innerHTML = (hgetweapon);
    document.getElementById("Getarmo").innerHTML = (hgetarmo);
    document.getElementById("Powerbar").style.width = `${hsapp/powerexp*100}%`;
    document.getElementById("Attbar").style.width = `${hruby/attexp*100}%`;
    document.getElementById("Defbar").style.width = `${heme/defexp*100}%`;
    document.getElementById("Weaponbar").style.width = `${hwes/wesexp*100}%`;
    document.getElementById("Armobar").style.width = `${hars/arsexp*100}%`;
    
   
	let mmybox = document.querySelector("#Mybox");
	mmybox.innerText = mybox;

  let ssapp = document.querySelector("#Sapp");
	ssapp.innerText = hsapp;
  
  let rruby = document.querySelector("#Ruby");
	rruby.innerText = hruby;
  let eeme = document.querySelector("#Eme");
	eeme.innerText = heme;

  let wwes = document.querySelector("#Wes");
	wwes.innerText = hwes;

  let aars = document.querySelector("#Ars");
	aars.innerText = hars;
  };


  let levelUp = async () => {

      let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
      await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
              chainId: "0x38",
              rpcUrls: ["https://bsc-dataseed.binance.org/"],
              chainName: "Binance Smart Chain",
              nativeCurrency: {
                  name: "BNB",
                  symbol: "BNB",
                  decimals: 18
              },
              blockExplorerUrls: ["https://bscscan.com/"]
          }]
      });
      await userProvider.send("eth_requestAccounts", []);
      let signer = userProvider.getSigner();

      let cyacoopContract = new ethers.Contract(contractAddress.cyacoopAddr, contractAbi.cyacoop, signer);
      
      try {
        await cyacoopContract.levelup();
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
  };


  let Powerup = async () => {
      let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
      await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
              chainId: "0x38",
              rpcUrls: ["https://bsc-dataseed.binance.org/"],
              chainName: "Binance Smart Chain",
              nativeCurrency: {
                  name: "BNB",
                  symbol: "BNB",
                  decimals: 18
              },
              blockExplorerUrls: ["https://bscscan.com/"]
          }]
      });
      await userProvider.send("eth_requestAccounts", []);
      let signer = userProvider.getSigner();

      let huntContract = new ethers.Contract(contractAddress.huntAddr, contractAbi.hunt, signer);
      
      try {
        await huntContract.powerup();
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }

  };

  let Attup = async () => {

      let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
      await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
              chainId: "0x38",
              rpcUrls: ["https://bsc-dataseed.binance.org/"],
              chainName: "Binance Smart Chain",
              nativeCurrency: {
                  name: "BNB",
                  symbol: "BNB",
                  decimals: 18
              },
              blockExplorerUrls: ["https://bscscan.com/"]
          }]
      });
      await userProvider.send("eth_requestAccounts", []);
      let signer = userProvider.getSigner();

      let huntContract = new ethers.Contract(contractAddress.huntAddr, contractAbi.hunt, signer);
      
      try {
        await huntContract.attup();
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
  };

  let Defup = async () => {
      let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
      await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
              chainId: "0x38",
              rpcUrls: ["https://bsc-dataseed.binance.org/"],
              chainName: "Binance Smart Chain",
              nativeCurrency: {
                  name: "BNB",
                  symbol: "BNB",
                  decimals: 18
              },
              blockExplorerUrls: ["https://bscscan.com/"]
          }]
      });
      await userProvider.send("eth_requestAccounts", []);
      let signer = userProvider.getSigner();

      let huntContract = new ethers.Contract(contractAddress.huntAddr, contractAbi.hunt, signer);
      
      try {
        await huntContract.defup();
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
  };


  let Weaponup = async () => {
      let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
      await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
              chainId: "0x38",
              rpcUrls: ["https://bsc-dataseed.binance.org/"],
              chainName: "Binance Smart Chain",
              nativeCurrency: {
                  name: "BNB",
                  symbol: "BNB",
                  decimals: 18
              },
              blockExplorerUrls: ["https://bscscan.com/"]
          }]
      });
      await userProvider.send("eth_requestAccounts", []);
      let signer = userProvider.getSigner();

      let huntContract = new ethers.Contract(contractAddress.huntAddr, contractAbi.hunt, signer);
      
      try {
        await huntContract.weaponup();
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
  };


  let Armoup = async () => {
   
      let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
      await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
              chainId: "0x38",
              rpcUrls: ["https://bsc-dataseed.binance.org/"],
              chainName: "Binance Smart Chain",
              nativeCurrency: {
                  name: "BNB",
                  symbol: "BNB",
                  decimals: 18
              },
              blockExplorerUrls: ["https://bscscan.com/"]
          }]
      });
      await userProvider.send("eth_requestAccounts", []);
      let signer = userProvider.getSigner();

      let huntContract = new ethers.Contract(contractAddress.huntAddr, contractAbi.hunt, signer);
      
      try {
        await huntContract.armoup();
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
  };



  let Unbox = async () => {
    
      let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
      await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
              chainId: "0x38",
              rpcUrls: ["https://bsc-dataseed.binance.org/"],
              chainName: "Binance Smart Chain",
              nativeCurrency: {
                  name: "BNB",
                  symbol: "BNB",
                  decimals: 18
              },
              blockExplorerUrls: ["https://bscscan.com/"]
          }]
      });
      await userProvider.send("eth_requestAccounts", []);
      let signer = userProvider.getSigner();

      let huntContract = new ethers.Contract(contractAddress.huntAddr, contractAbi.hunt, signer);
      
      try {
        await huntContract.unbox(document.getElementById('unboxamount').value);
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
  };

  let Buybox = async () => {
   
      let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
      await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
              chainId: "0x38",
              rpcUrls: ["https://bsc-dataseed.binance.org/"],
              chainName: "Binance Smart Chain",
              nativeCurrency: {
                  name: "BNB",
                  symbol: "BNB",
                  decimals: 18
              },
              blockExplorerUrls: ["https://bscscan.com/"]
          }]
      });
      await userProvider.send("eth_requestAccounts", []);
      let signer = userProvider.getSigner();

      let huntContract = new ethers.Contract(contractAddress.huntAddr, contractAbi.hunt, signer);
      
      try {
        await huntContract.buybox(document.getElementById('buyboxamount').value);
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    };



  let Sellbox = async () => {
  
      let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
      await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
              chainId: "0x38",
              rpcUrls: ["https://bsc-dataseed.binance.org/"],
              chainName: "Binance Smart Chain",
              nativeCurrency: {
                  name: "BNB",
                  symbol: "BNB",
                  decimals: 18
              },
              blockExplorerUrls: ["https://bscscan.com/"]
          }]
      });
      await userProvider.send("eth_requestAccounts", []);
      let signer = userProvider.getSigner();

      let huntContract = new ethers.Contract(contractAddress.huntAddr, contractAbi.hunt, signer);
      
      try {
        await huntContract.sellbox(document.getElementById('sellboxamount').value);
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    };



  let Hunting = async () => {
    if (document.getElementById("Answer").value !== 'null') {
      let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
      await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
              chainId: "0x38",
              rpcUrls: ["https://bsc-dataseed.binance.org/"],
              chainName: "Binance Smart Chain",
              nativeCurrency: {
                  name: "BNB",
                  symbol: "BNB",
                  decimals: 18
              },
              blockExplorerUrls: ["https://bscscan.com/"]
          }]
      });
      await userProvider.send("eth_requestAccounts", []);
      let signer = userProvider.getSigner();
      let huntContract = new ethers.Contract(contractAddress.huntAddr, contractAbi.hunt, signer);
      let tid = document.getElementById('Tid').value;
      let answer = document.getElementById('Answer').value;
    
      try {
        await huntContract.hunting(tid-1,answer);
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    }
  };

  // let Getbox = async () => {
  //   if (document.getElementById("Tid2").value !== 'null') {
  
  //   let provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');
  //   let huntContract = new ethers.Contract(contractAddress.huntAddr, contractAbi.hunt,provider);
   
  //   let tid2 = document.getElementById('Tid2').value;
  //   try{
  //   let gg2 = await huntContract.g2(tid2);
  //   let leftb = document.querySelector("Leftbox");
  //   leftb.innerText =gg2[1];
  //   console.log(gg)
  //   }
  //   catch(e) {
  //     alert("no box")
  //   }
  //   }
  // };


  (async () => {
    HSync();
    let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
            chainId: "0x38",
            rpcUrls: ["https://bsc-dataseed.binance.org/"],
            chainName: "Binance Smart Chain",
            nativeCurrency: {
                name: "BNB",
                symbol: "BNB",
                decimals: 18
            },
            blockExplorerUrls: ["https://bscscan.com/"]
        }]
    });
    await userProvider.send("eth_requestAccounts", []);
  })();
