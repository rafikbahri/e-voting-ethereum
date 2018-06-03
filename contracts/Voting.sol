pragma solidity ^0.4.21;

import "./Secp256k1.sol";
import "./LinkableRingSignature.sol";
import "./owned.sol";

contract Voting is owned {

    enum State { SETUP, REGISTRATION, VOTING, READY_TO_TALLY, END_TALLY }
    State public state;

    modifier inState(State s) {
        if(state != s) {
            throw;
        }
        _;
    } 


    /****************************************
                    SETUP DATA
    /****************************************/
    string public electionName;
    //uint public votingStartTime;
    //uint public votingEndTime;
    uint public numberOfVoters;
    uint public numberOfCandidates;
    bytes32[] public candidates;
    mapping(bytes32 => bool) public candidatesMap;

    /****************************************
                END SETUP DATA
    /****************************************/


    /****************************************
                REGISTRATION DATA
    /****************************************/
    uint256[] public ring;
    uint256 public ringHash;
    uint256[2][] public voters; //voters publickeys [X,Y]
    mapping(bytes32 => bool) public registeredKeys;
    /****************************************
             END REGISTRATION DATA
    /****************************************/

    bool public debug = true;
    /****************************************
                    VOTE DATA
    /****************************************/
    mapping(bytes32 => bool) public registeredVoteLink; //to verify if voter has already voted
    bytes32[] public votes;
    uint256[] public hashedVotes;
    /****************************************
                  END VOTE DATA
    /****************************************/
    
    mapping(bytes32 => uint256) public electionResults; 
    /************************************** */
    
    function Voting() {
            state = State.SETUP;
        }

    // @dev Sets a contract to debug mode so election times can be ignored.
    // Can only be called by owner.
    function setDebug() inState(State.SETUP) onlyOwner() {
        debug = true;
    }

    function finishSetUp(   string _electionName,
                           // uint  _votingStartTime,
                            // uint  _votingEndTime,
                            uint  _numberOfVoters,
                            uint  _numberOfCandidates,
                            bytes32[] _candidates
                            //,uint256[2][] _publicKeys

                            
                        ) inState(State.SETUP) onlyOwner() returns (bool) {

      

        /* if(_registrationStartTime < block.timestamp) {
            return false;
        }


        if(Secp256k1.isPubKey(_thresholdKey) == false) {
            return false;
        } 
        */


        if(_numberOfCandidates < 2) {
            return false;
        }
        
        if(_numberOfVoters < 2) {
            return false;
        }
        
        
        electionName = _electionName;
        numberOfCandidates = _numberOfCandidates;
        numberOfVoters = _numberOfVoters;
       // votingStartTime = _votingStartTime;
        // votingEndTime = _votingEndTime;
        //state = State.VOTING;
        candidates = _candidates;
        for (uint i=0;i<numberOfCandidates;i++) {
            candidatesMap[_candidates[i]] = true;
        }

        state = State.REGISTRATION;
        return true;
    }


    function registerVoter(uint256[2] publicKey) inState(State.REGISTRATION) onlyOwner returns (bool){
        
        // if(block.timestamp > registrationEndTime + registrationVotingGap) {
        //     state = State.VOTING;
        //     return false;
        // }

        // if(block.timestamp > registrationEndTime) {
        //     return false;
        // }

        if(Secp256k1.isPubKey(publicKey) == false) {
            return false;
        }

        if(registeredKeys[sha3(publicKey)]) {
            return false;
        }

        ring.push(publicKey[0]);
        ring.push(publicKey[1]);
        voters.push([publicKey[0], publicKey[1]]);
        registeredKeys[sha3(publicKey)] = true;
        return true;
    }


    function endRegistrationPhase() inState(State.REGISTRATION) onlyOwner returns (bool) {

        // if(!debug) {
        //     if(block.timestamp < registrationEndTime) {
        //         return false;
        //     }  
        // }
          if(ring.length / 2 == numberOfVoters) {
            ringHash = LinkableRingSignature.hashToInt(ring);
            state = State.VOTING;
            return true;
        }
        
        else 

            return false;

        
    }

            

    function endVotingPhase() inState(State.VOTING) onlyOwner returns (bool) {
        
       // if(!debug) {
         //   if(block.timestamp < votingEndTime) {
           //     return false;
            //}
        //}

        state = State.READY_TO_TALLY;

        return true;
    }


   

function bytesToBytes32(bytes b) returns (bytes32) {
 

    bytes32 result;
assembly {
    result := mload(add(b, 32))
}
return result;
    
}

    
    function castVote(
        uint256 hashedVote,
        bytes vote,
        uint256[] pubKeys,
        uint256 c_0,
        uint256[] signature,
        uint256[2] link) inState(State.VOTING) returns (bool,uint){ 
        
        bytes32 linkedH = sha3(link);
        if(registeredVoteLink[linkedH]) {
            return (false,0);
        }
        
        if(candidatesMap[bytesToBytes32(vote)] == false) {
            return (false,1);
        }

        uint256 _ringHash = LinkableRingSignature.hashToInt(pubKeys);
        
        if( ringHash != _ringHash) {
            return (false,2);
        }
        
       if( hashedVote != uint256(sha3(vote))) {

            return (false,5);
        }
        
        if(LinkableRingSignature.verifyRingSignature(hashedVote, pubKeys, c_0, signature, link)) {
            
            hashedVotes.push(hashedVote);
            votes.push(bytesToBytes32(vote));
            registeredVoteLink[linkedH] = true;

            return (true,3);
        }

        return (false,4);
        
    }


    function tallyElection() inState(State.READY_TO_TALLY) onlyOwner constant {
        
            //initialize
        for( uint i =0; i < candidates.length; i++ ) {
            electionResults[candidates[i]] = 0;}


        //count votes
       for( uint j = 0; j < votes.length; j++) {
           electionResults[votes[j]] += 1;}

                   state = State.END_TALLY;

    }


    function getCandidateCount(bytes32 candidate) inState(State.END_TALLY) constant returns(uint256) {
            return electionResults[candidate];
    }

    function getCandidates() constant returns (bytes32[]){
        return candidates;
    }

    function getRingSize(uint ringIdx) constant returns (uint) {
        return ring.length;
    }
    

    function getNumberCastedVotes() constant returns (uint) {
        return votes.length;
    }


    function getNumRegisterVoters() constant returns (uint) {
        return voters.length;
    }

}