import { Component, OnInit } from '@angular/core';
import { ElectionService } from "app/services/election/election.service";
import { Election } from "app/models/election";
import { VotinigService } from "app/services/blockchain-services/voting/votinig.service";
import { ModalService } from "app/services/modal-service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-election-list',
  templateUrl: './election-list.component.html',
  styleUrls: ['./election-list.component.css']
})
export class ElectionListComponent implements OnInit {
  elections: Array<Election> = [];
  stateColor = {
    "SETUP": "label-success",
    "REGISTRATION": "label-info",
    "VOTING": "label-warning",
    "READY_TO_TALLY": "label-danger",
    "FINISHED": "label-primary"
  }
  loadingMessage;
  constructor(private electionService: ElectionService, private votingService: VotinigService,
    private modalService: ModalService, private router: Router) { }

  ngOnInit() {
    this.electionService.findAll().then(elections => {
      this.elections = elections;
    }).catch(e => {
      this.modalService.showErrorModal(e._body);
    });
  }

  operation(index, state) {
    let election = this.elections[index];
    switch (state) {
      case "SETUP": this.finishSetup(election); break;
      case "REGISTRATION": this.endRegistrationPhase(election); break;
      case "VOTING": this.endVotingPhase(election); break;
      case "READY_TO_TALLY": this.tallyElection(election); break;
      case "FINISHED": this.seeResults(election); break;
    }
  }

  seeResults(election) {
    this.router.navigate(['election/results', { id: election._id }]);
  }

  finishSetup(election) {
    let candidates = [];
    for (let i = 0; i < election.candidates.length; i++) {
      candidates[i] = election.candidates[i].name + " " + election.candidates[i].lastName;
    }
    this.loadingMessage = 'Please Wait ...Transaction being mined ...';
    this.votingService.finishSetup(
      election.smart_contract,
      election.title,
      election.nbOfVoters,
      candidates.length,
      candidates
    ).then(txDetails => {
      election.state = "REGISTRATION"
      this.loadingMessage = '';
      this.modalService.showSuccessModal(JSON.stringify(txDetails));
      this.electionService.update(election)
        .then(res => console.log(election))
        .catch(e => console.log(e))
    }).catch(e => {
      this.loadingMessage = '';
      this.modalService.showErrorModal(e);
    });
  }

  endRegistrationPhase(election) {
    this.loadingMessage = 'Please Wait ...Transaction being mined ...';
    this.votingService.endRegistrationPhase(election.smart_contract).then(txDetails => {
      election.state = "VOTING"
      this.loadingMessage = '';
      this.modalService.showSuccessModal(JSON.stringify(txDetails));
      this.electionService.update(election)
        .then(res => console.log(res))
        .catch(e => console.log(e))
    }).catch(e => {
      this.loadingMessage = '';
      this.modalService.showErrorModal(e);
    });
  }

  endVotingPhase(election) {
    this.loadingMessage = 'Please Wait ...Transaction being mined ...';
    this.votingService.endVotingPhase(election.smart_contract).then(txDetails => {
      election.state = "READY_TO_TALLY"
      this.loadingMessage = '';
      this.modalService.showSuccessModal(JSON.stringify(txDetails));
    }).catch(e => {
      this.loadingMessage = '';
      this.modalService.showErrorModal(e);
    });
  }

  tallyElection(election) {
    this.loadingMessage = 'Please Wait ...Transaction being mined ...';
    this.votingService.tallyElection(election.smart_contract).then(txDetails => {
      election.state = "FINISHED"
      this.loadingMessage = '';
      this.modalService.showSuccessModal(JSON.stringify(txDetails));
    }).catch(e => {
      this.loadingMessage = '';
      this.modalService.showErrorModal(e);
    });
  }

}
