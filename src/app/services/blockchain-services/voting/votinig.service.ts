import { Injectable } from '@angular/core';
import { Web3Service } from "app/services/blockchain-services/web3.service";
import { concat } from 'rxjs/operators/concat';
import { defer } from 'rxjs/observable/defer';
import { Observable } from 'rxjs/Observable';
import { reject } from 'q';

// Import our contract artifacts and turn them into usable abstractions.
const voting_artifacts = require('../../../../../build/contracts/Voting.json');
var contract = require("truffle-contract");
const BigNumber = require('bignumber.js');

@Injectable()
export class VotinigService {

  Voting = contract(voting_artifacts);
  votingInstance: any;

  constructor(private web3Service: Web3Service) {
    this.web3Service = web3Service;
    // Bootstrap the Voting abstraction for Use 
    this.Voting.setProvider(this.web3Service._web3.currentProvider);
  }

  deployNewContract() {
    return new Promise<any>((resolve, reject) => {
      let transactionData = {
        from: this.web3Service.account,
        gas: '4000000'
      };
      // this.web3Service.unlockAccount().then(res => {
      console.log("waiting tx to be mined");
      this.Voting.new(transactionData)
        .then(contract => {
          if (typeof contract.address !== 'undefined') {
            console.log(contract);
            resolve(contract)
          }
        })
        .catch(e => {
          console.log(e);
          reject(e)
        })
    })
  }

  finishSetup(sc_address, electionName, numberOfVoters, numberOfCandidates, candidates) {
    return new Promise<any>((resolve, reject) => {
      this.Voting.at(sc_address)
        .then(sc => {
          this.votingInstance = sc;
          if (this.votingInstance) {
            this.votingInstance.finishSetUp.call(
              electionName,
              // this.web3Service.dateToUnixTime(votingStartTime),
              //this.web3Service.dateToUnixTime(votingEndTime),
              numberOfVoters,
              numberOfCandidates,
              candidates,
              { from: this.web3Service.account, gas: 5800000 }
            ).then(validSetup => {
              console.log(validSetup);
              if (validSetup) {
                //this.web3Service.unlockAccount(); 
                this.votingInstance.finishSetUp.sendTransaction(
                  electionName,
                  // this.web3Service.dateToUnixTime(votingStartTime),
                  //this.web3Service.dateToUnixTime(votingEndTime),
                  numberOfVoters,
                  numberOfCandidates,
                  candidates,
                  { from: this.web3Service.account, gas: 4800000 })
                  .then(tx => {
                    resolve(this.web3Service.waitForTxMine(tx))
                  }).catch(e => {
                    console.log(e);
                    reject(e);
                  });
              }
              else {
                console.log("Invalide Setup");
                reject("Invalide Setup");
              }
            }).catch(e => {
              console.log("error: check your account addrress | you have not permission", e);
              reject(e);
            });
          }
        })
        .catch(e => {
          console.log(e);
          reject(e);
        });
    });
  }


  registerVoter(pubkey, sc_address) {
    return new Promise<any>((resolve, reject) => {
      pubkey = [new BigNumber(pubkey[0]), new BigNumber(pubkey[1])]
      this.Voting.at(sc_address)
        .then(sc => {
          this.votingInstance = sc;
          if (this.votingInstance) {
            this.votingInstance.registerVoter.call(
              pubkey
              , { from: this.web3Service.account, gas: 4200000 }
            ).then(validkey => {
              console.log(validkey);
              if (validkey) {
                // this.web3Service.unlockAccount().then(res => {
                this.votingInstance.registerVoter.sendTransaction(
                  pubkey,
                  { from: this.web3Service.account, gas: 4200000 })
                  .then(tx => {
                    console.log(tx);
                    resolve(this.web3Service.waitForTxMine(tx))
                  }).catch(e => { console.log(e); reject(e) });
                //  }).catch(e => console.log(e));
              }
              else {
                console.log("Invalide registerVoter");
                reject("Invalide registerVoter")
              }
            }).catch(e => { console.log(e); reject(e); });
          }
        }).catch(e => { console.log(e); reject(e); });;
    });
  }

  endRegistrationPhase(sc_address) {
    return new Promise<any>((resolve, reject) => {
      this.Voting.at(sc_address)
        .then(sc => {
          this.votingInstance = sc;
          if (this.votingInstance) {
            this.votingInstance.endRegistrationPhase.call(
              { from: this.web3Service.account, gas: 4200000 }
            ).then(valid => {
              console.log("end registration call", valid);
              if (valid) {
                // this.web3Service.unlockAccount().then(res => {
                this.votingInstance.endRegistrationPhase.sendTransaction(
                  { from: this.web3Service.account, gas: 4200000 })
                  .then(tx => {
                    console.log(tx);
                    resolve(this.web3Service.waitForTxMine(tx))
                  }).catch(e => { reject(e) });
              }
              else {
                reject("Can't endRegistrationPhase.please publish voters public keys")
              }
            }).catch(e => { console.log(e); reject(e) });
          }
        }).catch(e => { console.log(e); reject(e) });
    })
  }

  endVotingPhase(sc_address) {
    return new Promise<any>((resolve, reject) => {
      this.Voting.at(sc_address)
        .then(sc => {
          this.votingInstance = sc;
          if (this.votingInstance) {
            this.votingInstance.endVotingPhase.call(
              { from: this.web3Service.account, gas: 4200000 }
            ).then(valid => {
              console.log(valid);
              if (valid) {
                // this.web3Service.unlockAccount().then(res => {
                this.votingInstance.endVotingPhase.sendTransaction(
                  { from: this.web3Service.account, gas: 4200000 })
                  .then(tx => {
                    console.log(tx);
                    resolve(this.web3Service.waitForTxMine(tx))
                  }).catch(e => { reject(e); });

              }
              else {
                reject("can't endVotingPhase");
              }
            }).catch(e => { reject(e); });
          }
        }).catch(e => { reject(e); });
    })
  }



  castVote(hashedVote, vote, pubKeys, c_0, signature, link, sc_address) {

    return new Promise<any>((resolve, reject) => {
      this.Voting.at(sc_address)
        .then(sc => {
          this.votingInstance = sc;
          hashedVote = new BigNumber(hashedVote);
          c_0 = new BigNumber(c_0);
          signature.map(s => new BigNumber(s))
          link.map(l => new BigNumber(l))
          pubKeys.map(key => new BigNumber(key));
          if (this.votingInstance) {
            this.votingInstance.castVote.call(hashedVote, vote, pubKeys, c_0, signature, link,
              { from: this.web3Service.account, gas: 5000000 })
              .then(valid => {
                console.log(valid);
                if (valid[0]) {
                  //   this.web3Service.unlockAccount().then(res => {
                  let tx = this.votingInstance.castVote.sendTransaction(hashedVote, vote, pubKeys, c_0, signature, link,
                    { from: this.web3Service.account, gas: 5000000 })
                    .then(tx => {
                      console.log(tx);
                      resolve(this.web3Service.waitForTxMine(tx))
                    }).catch(e => { console.log(e), reject(e) });
                }
                else {
                  console.log("can't castVote");
                  switch (valid[1].toString()) {
                    case "0": reject("You have Already Voted"); break;
                    case "1": reject("verify your vote (candidate not exist)"); break;
                    case "2": reject("verify ring (order of public keys)"); break;
                    case "4": reject("verifyRingSignature = false"); break;
                    case "5": reject("hashVote must be equal to vote"); break;
                  }
                }
              }).catch(e => { console.log("error", e); reject(e) });
          }
        }).catch(e => { console.log("error", e); reject(e) });
    })
  }



  getCandidateCount(candidate, sc_address) {
    return new Promise<any>((resolve, reject) => {
      this.Voting.at(sc_address)
        .then(sc => {
          this.votingInstance = sc;
          if (this.votingInstance) {
            this.votingInstance.getCandidateCount.call(candidate,
              { from: this.web3Service.account, gas: 4200000 }
            ).then(valid => {
              console.log(candidate, valid.toString());
              resolve(valid.toString());

            }).catch(e => { console.log(e); reject(e) });
          }

        }).catch(e => {
          console.log(e);
          reject(e);
        });
    })
  }



  tallyElection(sc_address) {
    return new Promise<any>((resolve, reject) => {
      this.Voting.at(sc_address)
        .then(sc => {
          this.votingInstance = sc;
          if (this.votingInstance) {
            this.votingInstance.tallyElection.call(
              { from: this.web3Service.account, gas: 4200000 }
            ).then(valid => {
              console.log(valid);
              if (valid) {
                //   this.web3Service.unlockAccount().then(res => {
                this.votingInstance.tallyElection.sendTransaction(
                  { from: this.web3Service.account, gas: 4200000 })
                  .then(tx => {
                    console.log(tx);
                    resolve(this.web3Service.waitForTxMine(tx))
                  }).catch(e => { console.log(e); reject(e) });
              }
              else {
                reject("can'tTallyPhase");
              }
            }).catch(e => { console.log(e); reject(e) });
          }
        }).catch(e => { console.log(e); reject(e) });
    });
  }
}
