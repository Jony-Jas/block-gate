// SPDX-License-Identifier: MIT

pragma solidity >= 0.8.0 < 0.9.0;

contract Hack{

    // Declaring a Structure for the user
    address payable public owner;
    //mapping(address=>uint) public UserBalance;

    constructor()  {
        owner=payable(msg.sender);
    }

    struct User{
        address UserAddress;
        string password;
        uint polygon_id;
        string upi_id;
        uint amount;
        uint successful_Transaction;
    }
    //mapping(address=> User) addressMapping;
    mapping(string=>User) upiIdMapping;

    User[] public users; // declaring array for both the structure and the array.
    address[] public addressArray;

     // Function to set the 'User' struct
     function addUser(
        address _userAddress,
        string memory _password,
        uint _polygonId,
        string memory _upiId,
        uint _amount,
        uint _successfulTransaction
    ) public {
        User memory u = User(_userAddress,_password, _polygonId, _upiId, _amount, _successfulTransaction);
        users.push(u);
        addressArray.push(_userAddress); // Store the user's address
        upiIdMapping[_upiId] = u;
    }

    function getUser(string memory upi_id) external view returns (User memory){
        return upiIdMapping[upi_id];
    }

    // Function to get the 'User' struct values
    function getUserCount() public view returns (uint) {
        return users.length;
    }

    // Function to access the Structure using thier index
    function getUserByIndex(uint index) public view returns (address,string memory, uint, string memory, uint, uint){
        require(index<users.length,"The index is out of bound");
        User storage user = users[index];
        return (user.UserAddress,user.password, user.polygon_id, user.upi_id, user.amount, user.successful_Transaction);
    }

    // Function to get all user addresses
    function getAllUserAddresses() public view returns (address[] memory) {
        return (addressArray);
    }
    
    // Function to select a random address that matches one of the provided addresses


    function selectRandomMatchingAddress(address address1, string memory _upi) public view returns (address) {
        require(users.length > 0, "No users available");

        uint256 seed = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, msg.sender)));
        uint256 totalUsers = users.length;
        uint256 randomIndex = seed % totalUsers;

        address address2 = upiIdMapping[_upi].UserAddress;
        for (uint256 i = 0; i < totalUsers; i++) {
            address randomAddress = users[randomIndex].UserAddress;

            if (randomAddress != address1 && randomAddress != address2) {
                return randomAddress;
            }

            // Move to the next address in the array, wrapping around if necessary
            randomIndex = (randomIndex + 1) % totalUsers;
        }

        revert("No available addresses that match the provided addresses");
    }



    // Function to recieve amount    
    receive() external  payable {}
    function sendMoney(address payable _to) public payable {
        bool sent = _to.send(msg.value);
        require(sent,"Insufficient balance");
    }

    // Function to subtract the amount from the Bridges
    function subAmount(address userAddressToCheck, uint val) public returns(uint){
        string memory upi_id;
        for(uint i=0;i<users.length;i++){
            if(users[i].UserAddress==userAddressToCheck){
                upi_id = users[i].upi_id;
                break;
            }
        }
        upiIdMapping[upi_id].amount-=val;
        return 0;
    }


    //Function to add the amount to the merchant
    function addMerchantAmount(string memory MerchantupiIdToCheck,uint val) public returns(uint){
        upiIdMapping[MerchantupiIdToCheck].amount+=val;
        return 0;
    }   
    
}