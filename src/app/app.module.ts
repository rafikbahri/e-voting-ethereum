import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from "app/services/auth.service";
import { HttpModule } from '@angular/http';
import { routing } from "app/app.routing";
import { AuthGuard } from "app/auth.guard";
import { NavbarComponent } from './navbar/navbar.component';
import { LogoutGuard } from "app/logout.guard";
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddElectionPageComponent } from './add-election-page/add-election-page.component';
import { FooterComponent } from './footer/footer.component';
import { AddVoterComponent } from './add-voter/add-voter.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ElectionService } from "app/services/election/election.service";
import { HttpHelperService } from "app/services/http-helper/http-helper.service";
import { UserService } from "app/services/user/user.service";
import { Web3Service } from "app/services/blockchain-services/web3.service";
import { VotinigService } from "app/services/blockchain-services/voting/votinig.service";
import { CandidateService } from "app/services/candidate/candidate.service";
import { AddCandidateComponent } from './add-candidate/add-candidate.component';
import { ElectionListComponent } from './election-list/election-list.component';
import { NextPhasePipe } from './next-phase.pipe';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { VoterListComponent } from './voter-list/voter-list.component';
import { ModalServiceModule } from "app/services/modal-service";
import { JwtHelperService } from "app/services/jwt-helper/jwthelper.service";
import { RoleGuard } from "app/role.guard";
import { ElectionResultsComponent } from './election-results/election-results.component';
import { ChartsModule } from 'ng2-charts';
import { ElectionsComponent } from './elections/elections.component';
import { GenEcckeysComponent } from './gen-ecckeys/gen-ecckeys.component'
import { LRSService } from "app/services/lrs/lrs.service";
import { VotePageComponent } from './vote-page/vote-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    DashboardComponent,
    SidebarComponent,
    AddElectionPageComponent,
    FooterComponent,
    AddVoterComponent,
    SetPasswordComponent,
    AddCandidateComponent,
    ElectionListComponent,
    NextPhasePipe,
    CandidateListComponent,
    VoterListComponent,
    ElectionResultsComponent,
    ElectionsComponent,
    GenEcckeysComponent,
    VotePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    ModalServiceModule,
    ChartsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    RoleGuard,
    LogoutGuard,
    ElectionService,
    HttpHelperService,
    UserService,
    Web3Service,
    VotinigService,
    CandidateService,
    JwtHelperService,
    LRSService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
