

let address= {
    tresure: "0x3da25c4F7831C1642a025a2f26451b4c24A74aEF",   
    vetbankAddr: "0x27e8F277826AE9aD67178978d2c89a52f7a5177A",
    adAddr: "0x9A27a782FD75C9Af44A875F327d52Ee662891d5C",
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
          "function myinfo(uint num) public view returns (string,uint256,addres,uint)",
          ],
  
  };

  let Vettop = async () => {
 
  
    const provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
  
    let tresureContract = new ethers.Contract(address.tresure, abi.tresure, provider);
  
   
  
    tresureContract.on('reward', (amount) => {
     console.log('정답보상:', amount);
     document.getElementById('eventT1').innerText = ` 정답보상${amount/1e18} P`;
     treasureBox.style.display = "none";
     const eventDiv = document.getElementById('eventDiv');
     eventDiv.classList.remove('hidden');
  });
  
  
  }
  
  
  
  Vettop ();

  
  document.addEventListener('DOMContentLoaded', function () {
    var answerIdMap = {
        '1': 'WINER', 
        '2': 'CLICK', 
        '3': 'INPUT', 
        '4': 'MELON', 
        '5': 'ONION', 
        '6': 'TIGER', 
        '7': 'CHAIR', 
        '8': 'MOUSE', 
        '9': 'HOUSE', 
        '10': 'CLOUD', 
        '11': 'SMILE', 
        '12': 'HAPPY'
     
    };

    var inputCount = 5; // Number of input fields
    var idSelect = document.getElementById('idSelect');

    

    document.querySelector('.submit-button').addEventListener('click', async function () {
        var inputs = document.querySelectorAll('.input');
        var inputValue = ''; // Reset input value for each iteration
        var selectedId = idSelect.value;
        var allInputsCorrect = true; // Flag to track if all inputs are correct

        for (let i = 0; i < inputCount; i++) {
            if (inputs[i]) { // Check if the input field exists
                inputValue += inputs[i].value; // Combine all input values
                if (inputs[i].value === answerIdMap[selectedId][i]) {
                    inputs[i].style.background = 'green'; // Correct character in correct position
                } else if (answerIdMap[selectedId].includes(inputs[i].value)) {
                    inputs[i].style.background = 'yellow'; // Correct character in incorrect position
                    allInputsCorrect = false; // Partially correct, set flag to false
                } else {
                    inputs[i].style.background = 'lightgrey'; // Incorrect character
                    allInputsCorrect = false; // Incorrect, set flag to false
                }
                inputs[i].classList.remove('input');
            }
        }

        // If all inputs are correct
        if (allInputsCorrect && inputValue === answerIdMap[selectedId]) {
            // Call the Openbox function with the selected ID value
            await Openbox(selectedId);
        }

        var template = `<div style="margin-top: 10px;">
        <input class="input" maxlength="1" pattern=".{1}">
        <input class="input" maxlength="1" pattern=".{1}">
        <input class="input" maxlength="1" pattern=".{1}">
        <input class="input" maxlength="1" pattern=".{1}">
        <input class="input" maxlength="1" pattern=".{1}">
        </div>`;
        document.querySelector('body').insertAdjacentHTML('beforeend', template);
    });
});

  
  async function Openbox(id) {
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
    let tresureContract = new ethers.Contract(address.tresure, abi.tresure, signer);
    
    try {
        // Call the contract's 'openbox' function with the provided ID value
        await tresureContract.openbox(id);
    } catch(e) {
        // Handle any errors that occur during the transaction
        alert(e.data.message.replace('execution reverted: ',''));
    }
};

