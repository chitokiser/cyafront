
       
      const contractAddress = {
        cyadexAddr: "0x3900609f4b3C635ae1cFC84F4f86eF7166c6139e",
        cyamemAddr: "0x3Fa37ba88e8741Bf681b911DB5C0F9d6DF99046f",   
        cyabankAddr:"0xE823F9d04faF94a570409DC0076580ba74820B4c",
        vetbank: "0x27e8F277826AE9aD67178978d2c89a52f7a5177A",  
        erc20: "0xFA7A4b67adCBe60B4EFed598FA1AC1f79becf748"
      };
      const contractAbi = {
        cyadex: [
          "function getprice() public view returns(uint256)",
          "function balance() public view returns(uint256)",
          "function cyabalances() public view returns(uint256)",
          "function buy() payable public",
          "function sell(uint256 num) public",
          "function priceup(uint256 num)public"
        ],
        cyamem: [
          "function sum() public view returns(uint256)",
          "function catbal() public view returns(uint256)"
        ],
        vetbank: [
          "function buyvet(uint _num) public returns(bool) ",
          "function sellvet(uint _num) public returns(bool) ",
          ],

        cyabank: [
          "function g1() public view virtual returns(uint256)",
          "function price() public view returns(uint256)",
          "function g6() public view virtual returns",
          "function g7() public view virtual returns(uint256)",
          "function g10() public view virtual returns(uint256)",
          "function allow() public view returns(uint256)",
          "function g11() public view virtual returns(uint256)"
        ],
        erc20: [
          "function approve(address spender, uint256 amount) external returns (bool)",
          "function allowance(address owner, address spender) external view returns (uint256)"
        ],
  
      };
      const topDataSync = async () => {
    
        // BNB Price
        const responseBinanceTicker = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT');
        const bnbPrice = parseFloat(responseBinanceTicker.data.price);
     

        };
     

    
      

      

        const buyCya = async () => {
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
  
          const cyadexContract = new ethers.Contract(contractAddress.cyadexAddr, contractAbi.cyadex, signer);
          await cyadexContract.buy({ value: ethers.utils.parseUnits(document.getElementById('bnbInput').value, 'ether') });
        };
  
        const sellCya = async () => {
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
  
          const quantity = ethers.utils.parseUnits(document.getElementById('cyaInput').value, 18);
  
          // Approve
          const erc20 = new ethers.Contract(contractAddress.erc20, contractAbi.erc20, signer);
          if (await erc20.allowance(await signer.getAddress(), contractAddress.cyadexAddr) < quantity) {
            await erc20.approve(contractAddress.cyadexAddr, 2^256-1);
          }
          // Sell
          const cyadexContract = new ethers.Contract(contractAddress.cyadexAddr, contractAbi.cyadex, signer);
          await cyadexContract.sell(quantity);
        };
  
   

        
    let Vbuy = async () => {
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
      let vetContract = new ethers.Contract(contractAddress.vetbank,contractAbi.vetbank, signer);
  
      try {
        await vetContract.buyvet(document.getElementById('Buyvetnum').value);
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    };
  
  
    let Vsell = async () => {
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
  
      let vetContract = new ethers.Contract(contractAddress.vetbank,contractAbi.vetbank, signer);
  
      try {
        await vetContract.sellvet(document.getElementById('Sellvetnum').value);
      } catch(e) {
        alert(e.data.message.replace('execution reverted: ',''))
      }
    };
  




        (async () => {
          topDataSync();
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
          
          let cyadexContract = new ethers.Contract(contractAddress.cyadexAddr, contractAbi.cyadex, userProvider);
          let selectElement = document.getElementById('bnbInput');
          let selectElement2 = document.getElementById('cyaInput');
          
          selectElement.addEventListener('change', async (event) => {
            if (event.target.value < 0.001) {
              alert("now enough value");
            } else {
              document.getElementById('bnbOutput').value=event.target.value*parseFloat(await cyadexContract.getprice())
            }
          });
          selectElement2.addEventListener('change', async (event) => {
            document.getElementById('cyaOutput').value=event.target.value/parseFloat(await cyadexContract.getprice())*990/1000
          })
          })();

        