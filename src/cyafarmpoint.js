 // testnet
 let contractAddress = {
    cyafarmAddr: "0xeFAf3eBa3Ca71C551710dBeE1222DA857B18ec50",
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


    async function displayCards(cyafarmContract, signer) {
        // 카드 정보 가져오기
        const mytresure = await cyafarmContract.getcollect(await signer.getAddress());

        // 카드를 표시할 HTML 문자열 생성
        let html = '';
        mytresure.forEach((card, index) => {
            const imagePath = `../images/farm/nft-id-${card}.jpg`; 

            // 카드 HTML 코드 추가
            html += `
                <div id="Mycard${card}" class="card">
                    <img src="${imagePath}" alt="Card ${card}">
                    <div>농장번호 : ${card}</div>
                </div>
            `;
        });

        // HTML에 카드 정보 추가
        document.getElementById('myCardsContainer').innerHTML = html;

     
    }
    
    // displayCards 함수 호출
    await displayCards(cyafarmContract, signer);
  
    
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
    try {
      await cyafarmContract.charge(document.getElementById('Seed2').value);
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
    const displayedIds = [];

    myfarm.forEach(async (nftId) => {
        if (!displayedIds.includes(nftId)) {
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
            displayedIds.push(nftId); // 이미 표시된 농장 카드의 ID를 저장
        }
    });
}

  
  
  
 
  topDataSync();
  