// import { Component, OnInit } from '@angular/core';
// import { VotinigService } from "app/services/blockchain-services/voting/votinig.service";
// import { setTimeout } from 'timers';
// import { registerModuleFactory } from '@angular/core/src/linker/ng_module_factory_loader';
// import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
// import { environment } from "environments/environment";
// import { print, error } from 'util';
// import { HttpHelperService } from "app/services/http-helper/http-helper.service";


// @Component({
//   selector: 'app-setup-component',
//   templateUrl: './setup-component.component.html',
//   styleUrls: ['./setup-component.component.css']
// })
// export class SetupComponentComponent implements OnInit {


//   constructor(private VotinigService: VotinigService, private httpHelper: HttpHelperService) { }
//   publicKeys = [];
//   RegisterResults = [];
//   RegisterError = false;
//   loadingMessage = '';
//   successMessage = '';
//   errorMessage = '';

//   // getCandidateCount(candidate?) {
//   //   this.initializeMessages();

//   //   this.loadingMessage = "Please Wait ...call being made ...";

//   //   this.VotinigService.getCandidateCount("mouna").then(
//   //     (val) => {
//   //       console.log(val, " from compoenent");
//   //       this.loadingMessage = '';
//   //       this.successMessage = "Success. Votes for ahmed are " + val;

//   //     },
//   //     (err) => {

//   //       this.loadingMessage = '';
//   //       this.errorMessage = "Error. Check Your Connection to the BlockChain then retry";
//   //     }).catch(e => console.log(e));


//   // }

//   tally() {
//     this.initializeMessages();

//     this.loadingMessage = "Please Wait ...Transaction being mined ...";

//     setTimeout(() => {
//       this.VotinigService.tallyElection().then(res => {
//         if (res) {
//           this.loadingMessage = '';
//           this.successMessage = "Success. Tallying done, You can see the results";
//         }
//         else {
//         this.loadingMessage = ''; this.errorMessage = "Error. Check Your Connection to the BlockChain then retry";
//         }

//       });;
//     }, 2000);

//   }


//   endRegistrationPhase() {
//     this.initializeMessages();
//     this.loadingMessage = "Please Wait ...Transaction being mined ...";

//     setTimeout(() => {
//       this.VotinigService.endRegistrationPhase(this.VotinigService.votingInstance.sc_address).then(res => {
//         if (res) {
//           this.loadingMessage = '';
//           this.successMessage = "Success. End registration state saved, voting phase is now started";
//         }
//         else {
//         this.loadingMessage = ''; this.errorMessage = "Error. Check Your Connection to the BlockChain then retry";
//         }

//       });
//       ;
//     }, 2000);

//   }

//   // endVotingPhase() {
//   //   this.initializeMessages();
//   //   this.loadingMessage = "Please Wait ...Transaction being mined ...";

//   //   setTimeout(() => {
//   //     this.VotinigService.endVotingPhase().then(res => {
//   //       if (res) {
//   //         this.loadingMessage = '';
//   //         this.successMessage = "Success. End voting state saved, No more votes will be accepted.";
//   //       }
//   //       else {
//   //       this.loadingMessage = ''; this.errorMessage = "Error. Check Your Connection to the BlockChain then retry";
//   //       }
//   //       ;
//   //     });
//   //   }, 2000);

//   // }

//   // registerVoters() {
//   //   this.initializeMessages();
//   //   this.loadingMessage = "Please Wait ...Transaction being mined ...";

//   //   let url = "/users/publicKeys";

//   //   this.httpHelper.request('get', url).subscribe(res => {
//   //     this.publicKeys = res.json().publicKeys;

//   //     this.registerVoter(1);
//   //     this.registerVoter(2, true);
//   //     /*
//   //     for (var i=0; i< this.publicKeys.length ;i++) 
//   //       { 
//   //        console.log("registering voter...", this.publicKeys[i].publicKey);

//   //        if (i == this.publicKeys.length-1)
//   //        { this.registerVoter(this.publicKeys[i].publicKey, true); }
//   //        else 
//   //        {  this.registerVoter(this.publicKeys[i].publicKey); }
//   //      }
//   //      */

//   //   }, (error) => {
//   //     console.log("error", error);
//   //     this.RegisterError = true;

//   //   });


//   // }

//   initializeMessages() {
//     this.loadingMessage = '';
//     this.errorMessage = '';
//     this.successMessage = '';
//   }


//   showEndRegistrationResults() {
//     this.loadingMessage = '';

//     if (this.RegisterError || this.RegisterResults.includes(false)) {
//       this.errorMessage = "Error. Check Your Connection to the Blockchain or the voter's publicKeys";
//     }
//     else {
//       this.successMessage = "Registration Succeed";
//     }

//   }


//   // registerVoter(pubkey, last = false) {
//   //   console.log("register voter");
//   //   setTimeout(() => {
//   //     this.VotinigService.registerVoter(pubkey).
//   //       then(res => {
//   //         this.RegisterResults.push(res);
//   //         console.log("registerResults", this.RegisterResults);
//   //         if (last) {
//   //           console.log("last voter, ", this.RegisterResults);
//   //           this.showEndRegistrationResults();
//   //         }

//   //       }

//   //       ).catch(e => { this.RegisterError = true; this.showEndRegistrationResults(); });

//   //     ;
//   //   }, 2000);

//   // }

//   // castVote() {
//   //   setTimeout(() => { this.VotinigService.castVote(); }, 2000);
//   // }

//   ngOnInit() {
//   }

// }
