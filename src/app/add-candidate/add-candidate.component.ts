import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ElectionService } from "app/services/election/election.service";
import { CandidateService } from "app/services/candidate/candidate.service";
import { Election } from "app/models/election";
import { ModalService } from "app/services/modal-service";
declare let $: any;

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css']
})
export class AddCandidateComponent implements OnInit {
  @ViewChild('myModal') myModal: ElementRef;
  myForm: any;
  elections: [Election];
  saveAttempt: boolean = false;
  constructor(private fb: FormBuilder, private electionService: ElectionService,
    private candidateService: CandidateService,private modalService: ModalService)
  { }

  ngOnInit() {
    this.electionService.findAll().then(res => this.elections = res);
    this.myForm = this.fb.group({
      "id": ["", Validators.compose([Validators.required])],
      "name": ["", Validators.compose([Validators.required])],
      "lastName": ["", Validators.compose([Validators.required])],
      "electionId": ["", Validators.compose([Validators.required])],
      "description": ["", Validators.compose([])]
    });
  }

  addCandidate() {
    this.saveAttempt = true;
    if (this.myForm.valid) {
      this.candidateService.create(this.myForm.value).then(res => {
       this.modalService.showSuccessModal("Candidate added");
      }).catch(e => {
        let errorMsg = JSON.parse(e._body).message;
        this.modalService.showErrorModal(errorMsg);
      });
    }
  }
}
