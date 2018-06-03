import { Component, OnInit } from '@angular/core';
import { Election } from "app/models/election";
import { ElectionService } from "app/services/election/election.service";
import { ModalService } from "app/services/modal-service";
import { ActivatedRoute } from '@angular/router';
import { VotinigService } from "app/services/blockchain-services/voting/votinig.service";
import { Observable } from 'rxjs/Observable';
import { setTimeout } from 'timers';


@Component({
  selector: 'app-election-results',
  templateUrl: './election-results.component.html',
  styleUrls: ['./election-results.component.css']
})
export class ElectionResultsComponent implements OnInit {

  constructor(private votingService: VotinigService, private electionService: ElectionService,
    private modalService: ModalService, private route: ActivatedRoute) { }
  election: Election = new Election();
  candidates: any;
  candidateNames: String[] = new Array();
  candidateVotes: Number[] = new Array();
  winners: any = [];

  // ADD CHART OPTIONS. 
  pieChartOptions = { responsive: true }
  pieChartLabels = []
  // CHART COLOR.
  pieChartColor: any = [
    {
      backgroundColor: ['rgba(30, 169, 224, 0.8)',
        'rgba(255,165,0,0.9)',
        'rgba(139, 136, 136, 0.9)',
        'rgba(255, 161, 181, 0.9)',
        'rgba(255, 102, 0, 0.9)'
      ]
    }
  ]

  pieChartData: any = [
    {
      data: []
    }
  ];


  ngOnInit() {

    let id = this.route.snapshot.paramMap.get('id');
    if (id) {

      this.electionService.findElectionById(id).then(res => {
        this.election = res
        this.candidates = this.election.candidates;

        this.getCandidateNames();
        this.pieChartLabels = this.candidateNames;

        this.getCandidatesCounts(this.election.smart_contract); //updates the candidatesVotes array

        setTimeout(() => {
          let data = [{ "data": this.candidateVotes }]
          this.pieChartData = data as any[];
          this.getWinners();
        }, 10000);
      }).catch(e => {
        this.modalService.showErrorModal(e._body);
      });
    }
    else {
      this.modalService.showErrorModal("Specify election");
    }

  }

  getWinners() {
    var max_voted_for = this.candidateVotes.sort()[this.candidateVotes.length - 1];

    for (var i = 0; i < this.candidateVotes.length; i++) {
      if (this.candidateVotes[i] == max_voted_for)
        this.winners.push(this.candidates[i]);
    }
  }


  getCandidateNames() {
    for (var i = 0; i < this.candidates.length; i++) {
      this.candidateNames.push(this.candidates[i].name + " " + this.candidates[i].lastName);
    }
  }

  getCandidatesCounts(sc_address) {
    for (let candidate of this.candidateNames) {
      this.votingService.getCandidateCount(candidate, sc_address).then(
        res => {
          console.log("votes for ", candidate, "are:", res);
          this.candidateVotes.push(res); //TODO: parse to integr ? 
        }).catch(e => {
          this.modalService.showErrorModal(e);
        });
    }
  }

  onChartClick(){

  }
  
}
