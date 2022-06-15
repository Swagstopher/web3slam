// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

contract ApplicantStorage {

    string[] public applications;

    constructor() public {

    }

    //Create Profiles

    function addApplication(string calldata app) external {
        applications.push(app);
    }

    function getApplications() external returns(string[] memory) {
        return applications;
    }

}
