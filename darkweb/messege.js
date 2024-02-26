
let Aaddress= {

     ad: "0x9A27a782FD75C9Af44A875F327d52Ee662891d5C",
     }
  let Aabi = {
  
  
  
        ad: [
       
          "function g2(uint id) public view returns(string memory)",
          "function donation(uint pay) public",
          "function nameregi(string memory _name) public",
          " function g1() public view returns (uint256)",
          "function g4(address user) public view returns (uint)", 
          "function g5(uint _did) public view returns (uint)",
          "function did() public view returns (uint256)",
          "function aid() public view returns (uint256)",
          "function totaldo() public view returns (uint256)",
          "function myinfo(uint num) public view returns (string,uint256,addres,uint)",
          ],
  
  };
  
  
  let Adtop = async () => {
   
    
    const provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
  
    let adContract = new ethers.Contract(Aaddress.ad, Aabi.ad, provider);

    const numberOfAds = await adContract.aid(); // Update the number of ads if needed
  
    for (let i = 0; i < numberOfAds; i++) {
      let adElement = document.getElementById(`Ad${i}`);
      if (adElement) {
        let ad = await adContract.g2(i);
        adElement.innerHTML = ad;
      } else {
        console.error(`Element with ID "Ad${i}" not found.`);
      }
    }
}
   Adtop ();
  
 