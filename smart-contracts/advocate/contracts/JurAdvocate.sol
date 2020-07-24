pragma solidity >=0.5.0 <0.7.0;

import "@openzeppelin/contracts/ownership/Ownable.sol";
import "./IRole.sol";
import "./IAdvocate.sol";

contract JurAdvocate is IRole, IAdvocate, Ownable {
    /**
    Struct defining the values of a Jur Advocate.
    activationTime - The timestamp from which the advocate will be valid.
    isActive - Boolean state depicting if a Jur Advocate is currently valid.
    advocateType - The type of the Jur Advocate complementing the bussiness logic.
    */
    struct Advocate {
        address wallet;
        uint256 activationTime;
        uint256 advocateId;
        bool isActive;
        string advocateType;
    }

    /** Dynamic array holding the advocate types */
    string[] public advocateTypes;

    /** Mapping between the address of the Jur Advocate and their properties. */
    mapping(address => Advocate) public advocate;
    mapping(uint256 => Advocate) public advocateList;

    /** Total count of Jur Advocates. */
    uint256 public advocateCount;
    string private roleName = "JUR_ADVOCATE";

    /**
    @dev addJurAdvocate - Function to let the Jur admin add a new address as a Jur Advocate, thus
    validating it's license which can be verified on the blockchain.
    @param _wallet - The address which will hold the Jur Advocate.
    @param _advocateType - The position of the value from the advocateTypes array signifying the
    advocate type.
    */
    function addJurAdvocate(address _wallet, uint256 _advocateType)
        public
        onlyOwner
    {
        require(_wallet != address(0), "Please provide a valid address.");
        assert(_advocateType <= advocateTypes.length);
        advocate[_wallet] = Advocate(
            _wallet,
            now,
            advocateCount,
            true,
            advocateTypes[_advocateType]
        );
        advocateList[advocateCount] = Advocate(
            _wallet,
            now,
            advocateCount,
            true,
            advocateTypes[_advocateType]
        );
        advocateCount++;

        emit AdvocateAdded(_wallet, now, advocateTypes[_advocateType]);
    }

    /**
    @dev changeState - Function to let the Jur admin change the state of a Jur Advocate.
    @param _wallet - The address holding the Jur Advocate.
    @param _newState -  Boolean status to update.
    */
    function changeState(address _wallet, bool _newState) public onlyOwner {
        require(_wallet != address(0), "Please provide a valid address.");
        Advocate storage _advocate = advocate[_wallet];
        Advocate storage _advocateList = advocateList[_advocate.advocateId];
        require(_advocate.activationTime != 0, "Address is not a Jur Advocate");
        _advocate.isActive = _newState;
        _advocateList.isActive = _newState;

        emit AdvocateStateUpdated(_wallet, _newState);
    }

    /**
    @dev changeState - Function to let the Jur admin change the state of a Jur Advocate.
    @param _wallet - The address holding the Jur Advocate.
    @param _advocateType -  Advocate type to update to update.
    */
    function changeAdvocateType(address _wallet, uint256 _advocateType)
        public
        onlyOwner
    {
        require(_wallet != address(0), "Please provide a valid address.");
        assert(_advocateType <= advocateTypes.length);
        Advocate storage _advocate = advocate[_wallet];
        Advocate storage _advocateList = advocateList[_advocate.advocateId];
        require(
            _advocate.activationTime != 0,
            "Address is not a Jur Advocate."
        );
        _advocate.advocateType = advocateTypes[_advocateType];
        _advocateList.advocateType = advocateTypes[_advocateType];

        emit AdvocateTypeUpdated(_wallet, advocateTypes[_advocateType]);
    }

    /**
    @dev addAdvocateType - Function to let an admin add advocate types to support the bussiness
    logic.
    @param _advocateType - The new advocate type.
    */
    function addAdvocateType(string memory _advocateType) public onlyOwner {
        require(
            bytes(_advocateType).length != 0,
            "Advocate type cannot be an empty string."
        );
        advocateTypes.push(_advocateType);
    }

    function getRole() external view returns (string memory) {
        return roleName;
    }

    function isUser(address _wallet) public view returns (bool) {
        Advocate storage _advocate = advocate[_wallet];
        return (_advocate.isActive);
    }

    function getAdvocate(address _wallet) public view returns(uint, bool, string memory) {
        Advocate storage _advocate = advocate[_wallet];
        return(_advocate.activationTime, _advocate.isActive, _advocate.advocateType);
    }
}
