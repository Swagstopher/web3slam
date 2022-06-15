// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract BrickCoinStorage {

    struct Profile { 
        string firstName;
        string lastName;
        string dateOfBirth;
        uint32 income;
        uint16 creditScore;
        uint32 homeValue;
        uint32 debt;
        bool completed;
    }

    struct MortgageAppResults { 
        bool income;
        bool creditScore;
        bool debt;
        bool homeValue;
        bool approved;
    }

    mapping (address => Profile) profiles;
    mapping (address => MortgageAppResults) mortgageAppResults;

    constructor() public {

    }

    //Create Profiles

    function createProfile(string calldata _firstName, 
        string calldata _lastName,
        string calldata _dateOfBirth,
        uint32 _income,
        uint16 _creditScore,
        uint32 _HomeValue,
        uint32 _debt
    ) external {
                
        /*
        profiles.firstName = _firstName;
        profiles.lastName = _lastName;
        profiles.dateOfBirth = _dateOfBirth;
        profiles.income = _income;
        profiles.creditScore = _creditScore;
        profiles.homeValue = _HomeValue;
        profiles.debt = _debt;
        profiles.completed = true;
        */

        profiles[msg.sender] = Profile(_firstName, _lastName, _dateOfBirth, _income, _creditScore,_HomeValue, _debt, true);

        //return processMortgage(msg.sender);
    }

    //Process Applications

    function processMortgage(address user) public {



        /*
        //Credit Score needs to be Above 700
        if(creditScore >= 700){

        }
        //Your Income needs to be 5X your Home's Price
        if(income * 5 >= houseValue){
            mortgageAppResults.creditScore = true;
        }
        //Debt Ratio: Your Income needs to be <= 40% of your Post Tax Income 
        if(creditScore >= 700){
            mortgageAppResults.debt = true;
        }
        if(mortgageAppResults.income == true && 
        mortgageAppResults.creditScore == true &&
        mortgageAppResults.debt == true &&
        mortgageAppResults.income == true){
            mortgageAppResults.approved = true;
        }
        */
    }

}
