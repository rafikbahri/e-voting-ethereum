import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

@Injectable()
export class ModalService {
  private modalSubject: Subject<any>;
  public modalEvent$: Observable<any>;
  constructor() {
    this.modalSubject = new Subject<any>();
    this.modalEvent$ = this.modalSubject.asObservable();
  }

  showErrorModal(msg) {
    this.modalSubject.next({
      'state': "Error",
      'msg': msg
    });
  }

  showSuccessModal(msg) {
    this.modalSubject.next({
      'state': "Success",
      'msg': msg
    });
  }
}
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ModalService]
})

export class ModalServiceModule { } 
