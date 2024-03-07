 // testnet
 let contractAddress = {
    cyafarmAddr: "0x967F06939B06dB726681e29f7986CaDaCED60b91",
  };
   let contractAbi = {
  
    cyafarm: [
      "function seeding() public",
      "function withdraw( )public",
      "function g1( ) public view virtual returns(uint256)",
      "function g2(address user) public view virtual returns(uint256)",
      "function pllength( ) public view returns(uint)",
      "function getpl(uint num) public view returns(uint)",
      "function allportinfo(uint num) public view returns(uint depo,uint depon,uint portn,address owner,uint start)",
      "function getperiod(uint num) public view returns(uint)",
      "function getvalue(uint num) public view returns(uint)",
      "function getmywin( ) public view returns(uint) ",
      "function getmydepo( ) public view returns(uint)",
      "function getmyseedmoney( ) public view returns(uint)",
      "function getmyfarm(uint num) public view returns(uint) ",
      "function getmygain( ) public view returns(uint)",
      "function gettax( ) public view returns(uint)", 
      "function charge(uint num) public",
      "function remain( ) public view returns(uint256)",
      "function price( ) public view returns(uint256)",
      "function totaltax( ) public view returns(uint256)",
      "function getcollect(address _address) external view returns (uint256[] memory)",
      "event farmnum(uint winnum)"
    ]
  
  };
  
  
  const topDataSync = async () => {
    // ethers setup
    const provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
    const cyafarmContract = new ethers.Contract(contractAddress.cyafarmAddr,contractAbi.cyafarm,provider);
    const fprice = await cyafarmContract.price();
    const fprice2 = await cyafarmContract.price();
    const fsum = await cyafarmContract.remain();
    const ttax = await cyafarmContract.totaltax();
    const creatnum = await cyafarmContract.pllength();
    //계약잔고
    const fcyabal = await cyafarmContract.g1();
    document.getElementById("Fprice").innerHTML = (fprice/1e18).toFixed(0);
    document.getElementById("Fprice2").innerHTML = (fprice/1e18).toFixed(0);
    document.getElementById("Fprice3").innerHTML = (fprice*10/1e18).toFixed(0);
    document.getElementById("farmtotal").innerHTML = (fsum);
    document.getElementById("farmnum").innerHTML = (creatnum);
    document.getElementById("fcyatvl").innerHTML = (fcyabal);;
    document.getElementById("Ttax").innerHTML = (ttax);;

    
    cyafarmContract.on('farmnum', (winnum) => {
              
        console.log('구매한농장ID:', winnum);
 
        document.getElementById('eventF1').innerText = `구매한농장ID: ${winnum}`;
    });
 
        };
       
  
  
  
  
   let fwithdraw = async () => {  //해결완료  에러메세지 작동함
    const userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
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
    const signer = userProvider.getSigner();
  
    const cyafarmContract = new ethers.Contract(contractAddress.cyafarmAddr, contractAbi.cyafarm, signer);
  
    try {
      await cyafarmContract.withdraw();
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
    let cyafarmContract = new ethers.Contract(contractAddress.cyafarmAddr, contractAbi.cyafarm, signer);
    let mydepo = await cyafarmContract.getmydepo();
    let mygain = await cyafarmContract.getmygain();
    let price = await cyafarmContract.price();
    let gain = (price*10)- mygain;
   
  
    document.getElementById("farmdepo").innerHTML= (mydepo/1e18).toFixed(2);  //충전금 총액
    document.getElementById("farmgain").innerHTML =(mygain/1e18).toFixed(2); //순이익 총액
    document.getElementById("farmjack").innerHTML = (gain/1e18).toFixed(2); //인출 가능까지 남은 목표 이익금


    
  };
  
  
  
  let Buyfarm = async () => {
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
    let cyafarmContract = new ethers.Contract(contractAddress.cyafarmAddr, contractAbi.cyafarm, signer)
  
    try {
      await cyafarmContract.seeding();
    } catch(e) {
      alert(e.message.replace('execution reverted: ',''));
    }
  
  };
  
  
  let Charge = async () => {
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
    let cyafarmContract = new ethers.Contract(contractAddress.cyafarmAddr, contractAbi.cyafarm, signer);


   let seedAmount = parseInt(document.getElementById('Seed2').value);
    if (seedAmount < 1000) {
        alert("VET1000개 이상 입력해야 합니다");
        return;
    }
    
    try {
        await cyafarmContract.charge(seedAmount);
    } catch(e) {
        alert(e.message.replace('execution reverted: ',''));
    }
};




  let Myfarm = async () => {
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
const provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
let cyafarmContract = new ethers.Contract(contractAddress.cyafarmAddr, contractAbi.cyafarm, provider)

const myfarm = await cyafarmContract.getcollect(await signer.getAddress());

// 중복된 농장 ID를 추적하기 위한 Set 생성
const displayedIds = new Set();

// 번호 순서대로 정렬된 농장 ID 배열 생성
const sortedFarmIds = myfarm.slice().sort((a, b) => a - b);

for (const nftId of sortedFarmIds) {
    // 중복된 농장 ID인지 확인
    if (!displayedIds.has(nftId)) {
        const depoInfo = await cyafarmContract.allportinfo(nftId);
        const periodInfo = await cyafarmContract.getperiod(nftId);
        const valueInfo = await cyafarmContract.getvalue(nftId);
        const ownerInfo = depoInfo.owner;

        const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");
        img.src = `../images/farm/nft-id-${nftId}.jpg`;
        img.className = "card-img-top";
        img.alt = "...";
        img.loading = "lazy";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const cardTitle = document.createElement("h6");
        cardTitle.className = "card-title";
        cardTitle.textContent = `농장번호 ${nftId}`;

        const depoText = document.createElement("p");
        depoText.className = "card-text";
        depoText.textContent = `최초농장가치 : ${depoInfo.depo/1E18} FT`;

        const deponText = document.createElement("p");
        deponText.className = "card-text";
        deponText.textContent = `농장생성순서 : ${depoInfo.depon} 번째`;

        const periodText = document.createElement("p");
        periodText.className = "card-text";
        periodText.textContent = `농장운영기간 : ${periodInfo} 초`;

        const valueText = document.createElement("p");
        valueText.className = "card-text";
        valueText.textContent = `농장현재가치 : ${valueInfo/1E18} FT`;

        // 소유자 정보를 추가
        const ownerText = document.createElement("p");
        ownerText.className = "card-text";
        ownerText.textContent = `농장소유자 : ${ownerInfo}`;
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(depoText);
        cardBody.appendChild(deponText);
        cardBody.appendChild(periodText);
        cardBody.appendChild(valueText);
        // 카드 하단에 소유자 정보를 추가
        cardBody.appendChild(ownerText);
        card.appendChild(img);
        card.appendChild(cardBody);

        // 카드를 farmCards div에 추가
        const farmCards = document.getElementById("farmCards");
        farmCards.appendChild(card);
        
        // 중복을 방지하기 위해 표시된 농장 ID를 Set에 추가
        displayedIds.add(nftId);
    }
}

    
}

  
  
  
 
  topDataSync();
  