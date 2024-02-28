
let address= {
    tresure: "0x3da25c4F7831C1642a025a2f26451b4c24A74aEF",
    vetbank: "0x27e8F277826AE9aD67178978d2c89a52f7a5177A",
    ad: "0x9A27a782FD75C9Af44A875F327d52Ee662891d5C"  // donation 
     }
  let abi = {
  
  
  
      vetbank: [
       
        "function myinfo(address user) public view returns (uint256,uint256,uint256,uint256,uint256,uint256,address,address)",
        ],
  
        ad: [
       
          "function g2(uint id) public view returns(string memory)",
          "function donation(uint pay) public",
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
  
  async function updateData() {
    try {
        const provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
        
        // Treasure contract
     
        
        // Advertising contract
        const adContract = new ethers.Contract(address.ad, abi.ad, provider);
        const didno = await adContract.did(); // Total number of donors
        const totaldo = await adContract.totaldo(); // Total donation amount
     
     
        document.getElementById("Holder").innerHTML = (didno); // Total number of donors
        document.getElementById("Totaldo").innerHTML = (totaldo / 1e18); // Total donation amount
        document.getElementById("Totaldo2").innerHTML = (totaldo / 1e18); // Withdrawable amount
        
        // Clear existing donor list
        const donorListElement = document.getElementById("donor-list");
        donorListElement.innerHTML = "";
        
        // Fetch donor information dynamically
        for (let i = 1; i <= didno; i++) {
            const coninfo = await adContract.myinfo(i); // Donation information
            const donorName = coninfo[0];
            const donationAmount = coninfo[1] / 1e18;

            // Create table row
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <th scope="row">${i}</th>
                <td>${donorName}</td>
                <td>${donationAmount}</td>
            `;

            // Append row to donor list
            donorListElement.appendChild(newRow);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

updateData();

  
  async function Donation() {   //기부하기
  
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
    
    // Get the signer (account) from the provider
    let signer = userProvider.getSigner();
  
    // Instantiate the treasure contract with the signer
    const adContract = new ethers.Contract(address.ad, abi.ad, signer);
    const quantity = ethers.utils.parseUnits(document.getElementById('Domoney').value, 18);
    if (quantity < 1e17) {
        alert("입력값이 0.1보다 작으면 실행할 수 없습니다.");
        return; // 함수를 여기서 종료합니다.
    }
  
    
    try {
       
        await adContract.donation(quantity);

    } catch(e) { 
        alert(e.data.message.replace('execution reverted: ',''));
    }
  };




  let Nameregi = async () => {   //이름변경하기

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

        // Get the signer (account) from the provider
        let signer = userProvider.getSigner();

        // Instantiate the treasure contract with the signer
        const adContract = new ethers.Contract(address.ad, abi.ad, signer);

        try {
            await  adContract.nameregi(document.getElementById('Contributor').value); 
          } catch(e) {
            alert(e.data.message.replace('execution reverted: ',''))
          }
        
      };
    
