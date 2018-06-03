import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ElectionService } from "app/services/election/election.service";
import { Election } from "app/models/election";
import { UserService } from "app/services/user/user.service";
import { ModalService } from "app/services/modal-service";
declare let $: any;

@Component({
  selector: 'app-add-voter',
  templateUrl: './add-voter.component.html',
  styleUrls: ['./add-voter.component.css']
})
export class AddVoterComponent implements OnInit {
  @ViewChild('myModal') myModal: ElementRef;
  myForm: any;
  elections: [Election];
  saveAttempt: boolean = false;
  constructor(private fb: FormBuilder, private electionService: ElectionService, private userService: UserService,
    private modalService: ModalService) {
    this.electionService.findAll().then(res => this.elections = res);
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      "name": ["", Validators.compose([Validators.required])],
      "lastName": ["", Validators.compose([Validators.required])],
      "electionId": ["", Validators.compose([Validators.required])],
      "email": ["", Validators.compose([Validators.required, Validators.email])]
    });
  }

  addVoter() {
    this.saveAttempt = true;
    if (this.myForm.valid) {
      this.userService.createVoter(this.myForm.value).then(res => {
        this.modalService.showSuccessModal("Voter added");
      }).catch(e => {
        console.log(e);
        let errorMsg = JSON.parse(e._body).message;
        this.modalService.showErrorModal(errorMsg);
      });
    }
  }
}
