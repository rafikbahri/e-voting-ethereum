import { Component, OnInit } from '@angular/core';
import { Election } from "app/models/election";
import { ElectionService } from "app/services/election/election.service";
import { ModalService } from "app/services/modal-service";
import { VotinigService } from "app/services/blockchain-services/voting/votinig.service";

@Component({
  selector: 'app-voter-list',
  templateUrl: './voter-list.component.html',
  styleUrls: ['./voter-list.component.css']
})
export class VoterListComponent implements OnInit {
  elections: [Election];
  election: Election;
  voters: any;
  loadingMessage: string = '';
  constructor(private electionService: ElectionService, private modalService: ModalService,
    private votingService: VotinigService) { }

  ngOnInit() {
    this.electionService.findAll().then(res => {
      this.elections = res
      this.voters = this.elections[0].voters;
    }).catch(e => {
      this.modalService.showErrorModal(e._body);
    });
  }

  changeElection(index) {
    this.voters = this.elections[index].voters;
    this.election = this.elections[index];
  }

  registerVoter(pubkey) {
    this.loadingMessage = 'Please Wait ...Transaction being mined ...';
    this.votingService.registerVoter(pubkey, this.election.smart_contract).then(txDetails => {
      this.loadingMessage = '';
      this.modalService.showSuccessModal(JSON.stringify(txDetails));
      this.election.ring.push(pubkey[0]);
      this.election.ring.push(pubkey[1]);
      this.electionService.update(this.election).then(res => {
        console.log(res)
      }).catch(e => {
        this.modalService.showErrorModal(e._body);
      });
    }).catch(e => {
      this.loadingMessage = '';
      this.modalService.showErrorModal(e);
    });
  }

  isRegistered(pubkey) {
    return this.election.ring.indexOf(pubkey[0])>=0 && this.election.ring.indexOf(pubkey[1])>=0;
  }


}
