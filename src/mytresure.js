
let address= {
    tresure: "0x7f9DC432e1B4e5D0C5994ee3439bADDb922dc061", //tresure2 주소

     }
  let abi = {
  
    tresure: [
        "function  total( ) public view returns(uint)",
        "function myinfo(address user) public view returns (uint256,uint256,uint256,uint256,uint256,uint256,uint256,)",
        "function getpower(address user) public view returns(uint)",
        "function getcollect(address _address) external view returns (uint256[] memory)",
        "function cllect(address _address,uint num) external view returns (uint)",  //카드 컬렉터
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
   
    let tresureContract = new ethers.Contract(address.tresure, abi.tresure, signer);
    async function displayCards(tresureContract, signer) {
        // 카드 정보 가져오기
        const mytresure = await tresureContract.getcollect(await signer.getAddress());

        // 카드를 표시할 HTML 문자열 생성
        let html = '';
        mytresure.forEach((card, index) => {
            const imagePath = `../images/mytresure/card${card}.png`; // 이미지 파일의 경로를 동적으로 생성

            // 카드 HTML 코드 추가
            html += `
                <div id="Mycard${card}" class="card">
                    <img src="${imagePath}" alt="Card ${card}">
                    <div>보물번호 : ${card}</div>
                </div>
            `;
        });

        // HTML에 카드 정보 추가
        document.getElementById('myCardsContainer').innerHTML = html;

        // 각 카드에 이벤트 리스너 추가 (예시로 추가한 코드)
        mytresure.forEach((card, index) => {
            document.getElementById(`Mycard${card}`).addEventListener('click', () => {
                console.log(`Card ${card} clicked: ${card}`);
                // 여기에 클릭 이벤트 처리 로직을 추가하세요.
            });
        });
    }
    
    // displayCards 함수 호출
    await displayCards(tresureContract, signer);
};