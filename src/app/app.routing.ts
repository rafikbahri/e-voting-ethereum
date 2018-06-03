import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "app/login/login.component";
import { AuthGuard } from "app/auth.guard";
import { LogoutGuard } from "app/logout.guard";
import { DashboardComponent } from "app/dashboard/dashboard.component";
import { SidebarComponent } from "app/sidebar/sidebar.component";
import { AddElectionPageComponent } from "app/add-election-page/add-election-page.component";
import { AddVoterComponent } from "app/add-voter/add-voter.component";
import { SetPasswordComponent } from "app/set-password/set-password.component";
import { ElectionListComponent } from "app/election-list/election-list.component";
import { AddCandidateComponent } from "app/add-candidate/add-candidate.component";
import { CandidateListComponent } from "app/candidate-list/candidate-list.component";
import { VoterListComponent } from "app/voter-list/voter-list.component";
import { RoleGuard } from "app/role.guard";
import { ElectionResultsComponent } from "app/election-results/election-results.component";
import { ElectionsComponent } from "app/elections/elections.component";
import { GenEcckeysComponent } from "app/gen-ecckeys/gen-ecckeys.component";
import { VotePageComponent } from "app/vote-page/vote-page.component";

const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [LogoutGuard] },
    { path: 'set-password', component: SetPasswordComponent },
    { path: 'home', component: DashboardComponent, canActivate: [AuthGuard] },
    {
        path: 'election/create',
        component: AddElectionPageComponent,
        canActivate: [RoleGuard],
        data: {
            expectedRole: 'admin'
        }
    },
    {
        path: 'election/list',
        component: ElectionListComponent,
        canActivate: [RoleGuard],
        data: {
            expectedRole: 'admin'
        }
    },
    {
        path: 'election/results/:id',
        component: ElectionResultsComponent,
        canActivate: [RoleGuard],
        data: {
            expectedRole: 'admin'
        }
    },
    {
        path: 'election/results',
        component: ElectionResultsComponent,
        canActivate: [RoleGuard],
        data: {
            expectedRole: 'admin'
        }
    },
    {
        path: 'voter/add',
        component: AddVoterComponent,
        canActivate: [RoleGuard],
        data: {
            expectedRole: 'admin'
        }
    },
    {
        path: 'voter/list',
        component: VoterListComponent,
        canActivate: [RoleGuard],
        data: {
            expectedRole: 'admin'
        }
    },
    {
        path: 'candidate/add',
        component: AddCandidateComponent,
        canActivate: [RoleGuard],
        data: {
            expectedRole: 'admin'
        }
    },
    {
        path: 'candidate/list',
        component: CandidateListComponent,
        canActivate: [RoleGuard],
        data: {
            expectedRole: 'admin'
        }
    },
    {
        path: 'election/results',
        component: ElectionResultsComponent,
        canActivate: [RoleGuard],
        data: {
            expectedRole: 'admin'
        }
    },
    {
        path: 'elections',
        component: ElectionsComponent,
        canActivate: [RoleGuard],
        data: {
            expectedRole: 'voter'
        }
    },
     {
        path: 'vote',
        component: VotePageComponent,
        canActivate: [RoleGuard],
        data: {
            expectedRole: 'voter'
        }
    },
    {
        path: 'lrs/genkeys',
        component: GenEcckeysComponent,
        canActivate: [RoleGuard],
        data: {
            expectedRole: 'voter'
        }
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home', pathMatch: 'full' },

];

export const routing = RouterModule.forRoot(APP_ROUTES);
