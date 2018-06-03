import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { UserService } from "app/services/user/user.service";
import { ModalService } from "app/services/modal-service";
declare let $: any;
@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {
  myForm = new FormGroup({
    pwd: new FormControl()
  });

  uid: string;
  constructor(private userService: UserService, private modalService: ModalService) { }

  ngOnInit() {
    // get user id from url
    this.uid = window.location.href.split('=')[1];
  }

  save() {
    if (this.myForm.value.pwd)
      if (this.myForm.valid) {
        this.userService.setPassword(this.uid, this.myForm.value.pwd).then(res => {
          this.modalService.showSuccessModal("Password changed")
        }).catch(e => {
          this.modalService.showErrorModal(e._body)
        });
      }
  }

}
