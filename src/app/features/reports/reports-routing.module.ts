import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { ReportDashboardComponent } from './pages/report-dashboard/report-dashboard.component';

const routes: Routes = [
  { 
    path: '', 
    component: ReportsComponent,
    children: [
      { path: '', component: ReportDashboardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
