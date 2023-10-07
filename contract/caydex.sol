// SPDX-License-Identifier: MIT
// ver1.2
pragma solidity >=0.7.0 <0.9.0;
interface ICya {
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
   }


contract Cyadex  {
    uint256 public price;
    address public admin;
  
    mapping(address => uint8)public staff;
   
    ICya cya; 

    constructor(address _cya) {
        cya = ICya(_cya);
        price = 257;
        admin = msg.sender;
        staff[msg.sender] = 5;
        
    }
        
 
    
    function buy() payable public {
        uint256 pay = msg.value*price;
        uint256 dexbal = cya.balanceOf(address(this));
        require(pay <= dexbal, "Not enough tokens");
        cya.transfer(msg.sender,pay); 
        
    }

    function sell(uint256 num) public {  
        uint256 pay=num/price;
        require(balance() >= pay,"no bnb");
        cya.approve(msg.sender,num);
        uint256 allowance = cya.allowance(msg.sender, address(this));
        require(allowance >= num, "Check allowance");
        cya.transferFrom(msg.sender, address(this), num);
        payable(msg.sender).transfer(pay*99/100); 
    }

    function priceup(uint256 num)public {  
        require(staff[msg.sender] >= 5,"no staff"); 
        price = num;
        }
        
         function staffup(address _staff,uint8 num)public {  
        require(staff[msg.sender] >= 5,"no staff"); 
        staff[_staff] = num;
        }
        
        

    
    function deposit()external payable{
    }
    
    function getprice()public view returns(uint256){  
        return price;
   }
    function balance()public view returns(uint256){   
        return address(this).balance;
   }
    
    function cyabalances() public view returns(uint256) {
        return cya.balanceOf(address(this));
    }
 
    function mycyabalances() public view returns(uint256) {
        return cya.balanceOf(msg.sender);
    }

}

