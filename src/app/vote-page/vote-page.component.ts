import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ElectionService } from "app/services/election/election.service";
import { ModalService } from "app/services/modal-service";
import { Election } from "app/models/election";
import { LRSService } from "app/services/lrs/lrs.service";
import { VotinigService } from "app/services/blockchain-services/voting/votinig.service";

@Component({
  selector: 'app-vote-page',
  templateUrl: './vote-page.component.html',
  styleUrls: ['./vote-page.component.css']
})
export class VotePageComponent implements OnInit {
  electionId: string;
  election: Election = new Election();
  privatekey: string = '';
  choice: string;
  result: any;
  loadingMessage: string = '';
  constructor(private route: ActivatedRoute, private electionService: ElectionService,
    private modalService: ModalService, private LRSService: LRSService, private votingService: VotinigService) { }

  ngOnInit() {
    this.electionId = this.route.snapshot.paramMap.get('election');
    if (this.electionId) {
      this.electionService.findElectionById(this.electionId).then((election) => {
        this.election = election;
      }).catch(e => {
        this.modalService.showErrorModal(e._body);
      });
    }
  }

  signVote() {
    if (this.privatekey && this.choice) {
      let pubkey = JSON.parse(window.localStorage.getItem("user")).publicKey;
      let i = this.election.ring.indexOf(pubkey[0]) / 2;
      this.LRSService.lrs(this.privatekey, i, this.choice, this.election.ring)
        .then(res => {
          this.result = res;
        })
        .catch(e => console.log(e))
    }
  }

  vote() {
    if (this.result) {
      this.loadingMessage = 'Please Wait ...Transaction being mined ...';
      this.votingService.castVote(this.result.hashedVote, this.choice, this.election.ring, this.result.c_0,
        this.result.S, this.result.link, this.election.smart_contract)
        .then(txDetails => {
          this.loadingMessage = '';
          this.modalService.showSuccessModal(JSON.stringify(txDetails));
        }).catch(e => {
          this.loadingMessage = '';
          this.modalService.showErrorModal(e);
        });
    }
  }
}
