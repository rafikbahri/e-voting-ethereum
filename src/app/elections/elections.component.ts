import { Component, OnInit } from '@angular/core';
import { ElectionService } from "app/services/election/election.service";
import { Election } from "app/models/election";
import { VotinigService } from "app/services/blockchain-services/voting/votinig.service";
import { ModalService } from "app/services/modal-service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-elections',
  templateUrl: './elections.component.html',
  styleUrls: ['./elections.component.css']
})
export class ElectionsComponent implements OnInit {
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
    this.electionService.findByVoter().then(elections => {
      this.elections = elections;
    }).catch(e => {
      this.modalService.showErrorModal(e._body);
    });
  }

  operation(index, state) {
    let election = this.elections[index];
    switch (state) {
      case "VOTING": return this.voteToElection(election);
      case "REGISTRATION": return this.registerToElection(election);
      case "FINISHED": return this.seeResults(election);
    }
  }

  seeResults(election) {
    this.router.navigate(['election/results', { id: election._id }]);
  }

  registerToElection(election) {
    this.router.navigate(['lrs/genkeys']);
  }

  voteToElection(election){
    this.router.navigate(['vote' , { election: election._id } ]);
  }

}
