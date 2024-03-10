
let address= {
    myquiz: "0x3Fa290db3E85EAD9994f2E7682E69f1126349B80", //quiz 주소

     }
  let abi = {
  
    myquiz: [
        "function  total( ) public view returns(uint)",
        "function myinfo(address user) public view returns (uint256,uint256,uint256)",
        "function getpower(address user) public view returns(uint)",
        "function getcollect(address _address) external view returns (uint256[] memory)",
        "function cllect(address _address,uint num) external view returns (uint)",  //카드 컬렉터
        "event reward(uint amount);"
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
   
    let  myquizContract = new ethers.Contract(address.myquiz, abi.myquiz, signer);
    
   
    async function displayCards(myquizContract, signer) {
        // 카드 정보 가져오기
        const myquiz = (await myquizContract.getcollect(await signer.getAddress())).slice(); // 새 배열로 복사
    
        // 카드를 번호 순서대로 소팅
        myquiz.sort((a, b) => a - b);
    
        // 카드를 표시할 HTML 문자열 생성
        let html = '';
        myquiz.forEach((card, index) => {   
            const imagePath = `../images/quiz/card/card${card}.png`; // 이미지 파일의 경로를 동적으로 생성
    
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
        myquiz.forEach((card, index) => {
            document.getElementById(`Mycard${card}`).addEventListener('click', () => {
                console.log(`Card ${card} clicked: ${card}`);
                // 여기에 클릭 이벤트 처리 로직을 추가하세요.
            });
        });
    }
    
    
    
    // displayCards 함수 호출
    await displayCards(myquizContract, signer);
};