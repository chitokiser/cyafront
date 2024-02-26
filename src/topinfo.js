 
      const Taddress = {
        cyadexAddr: "0x3900609f4b3C635ae1cFC84F4f86eF7166c6139e",
        cyamemAddr: "0x3Fa37ba88e8741Bf681b911DB5C0F9d6DF99046f",   
        cyabankAddr:"0xE823F9d04faF94a570409DC0076580ba74820B4c",
        vetbankAddr: "0x27e8F277826AE9aD67178978d2c89a52f7a5177A",
        erc20: "0xFA7A4b67adCBe60B4EFed598FA1AC1f79becf748",
        
      };
      const Tabi = {
        cyadex: [
          "function getprice() public view returns(uint256)",
          "function balance() public view returns(uint256)",
          "function cyabalances() public view returns(uint256)",
          "function buy() payable public",
          "function sell(uint256 num) public"
        ],
        cyamem: [
          "function sum() public view returns(uint256)",
          "function catbal() public view returns(uint256)"
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

        vetbank: [
          " function g1() public view virtual returns(uint256)",
          " function  g3() public view returns(uint)",
          "function  g5() public view returns(uint) ",
          "function  g8(address user) public view returns(uint)",
          "function  g9(address user) public view returns(uint)",
          "function g11() public view virtual returns(uint256)",
          "function  totaltax() public view returns(uint) ",
          " function getsum( ) public view returns(uint) ",
          "function  getprice( ) public view returns (uint256)",
          "function memberjoin(address _mento) public ",
          "function  getlevel(address user) public view returns(uint)",
          "function getpay(address user) public view returns (uint256)",
          "function allowt(address user) public view returns (uint256)",
          "function gettime( ) public view returns (uint256)",
          "function myinfo(address user) public view returns (uint256,uint256,uint256,uint256,uint256,uint256,address,address)",
          "function withdraw( )public returns(bool)",
          "function allowcation( )public returns(bool)",
          "function withdraw2( )public returns(bool)",
          "function buyvet(uint _num) public returns(bool) ",
          "function sellvet(uint _num) public returns(bool) ",
          "function levelup() public ",
          "event getdepo(uint amount);"
          ],
      };

      const TDataSync = async () => {

         // BNB Price
const responseBinanceTicker = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT');
const bnbPrice = parseFloat(responseBinanceTicker.data.price);
document.getElementById("bPrice").innerHTML=bnbPrice.toFixed(2);
document.getElementById("cPrice").innerHTML=(bnbPrice).toFixed(0);
document.getElementById("bPrice2").innerHTML=(bnbPrice/1000).toFixed(3);



       // ethers setup
       let provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
       let cyadexContract = new ethers.Contract(Taddress.cyadexAddr,Tabi.cyadex, provider);
       let tvlbnb = await cyadexContract.balance() ;  // BNB잔고
       document.getElementById("Tvlbnb").innerHTML = parseFloat(tvlbnb/1e18).toFixed(4); // BNB잔고


       let vetbankContract = new ethers.Contract(Taddress.vetbankAddr, Tabi.vetbank, provider);
        
     
       let mems = await vetbankContract.getsum(); //회원총원
       let tvl2 = await vetbankContract.g11(); //vet 유통량
       let vetp = await vetbankContract.getprice();  //vet가격
       document.getElementById("Mem").innerHTML = parseInt(mems);
       document.getElementById("Vetp").innerHTML = parseFloat(vetp/1e18).toFixed(4);
       document.getElementById("Tvl2").innerHTML = parseInt(tvl2);
        };
     
     TDataSync();


     const Addvet = async () => {
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: "0xEBe3a75eeD0408EC145E1c5C5c131B212cf21788",
            symbol: "VET",
            decimals: 0, 
            // image: tokenImage,
          },
        },
      });
    }

    const addTokenCya = async () => {
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: "0xFA7A4b67adCBe60B4EFed598FA1AC1f79becf748",
            symbol: "CYA",
            decimals: 18, 
            // image: tokenImage,
          },
        },
      });
    }



    