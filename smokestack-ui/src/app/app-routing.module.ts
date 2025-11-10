import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CigarListComponent } from './components/cigar-list/cigar-list.component';
import { CigarFormComponent } from './components/cigar-form/cigar-form.component';
import { CigarDetailsComponent } from './components/cigar-details/cigar-details.component';

const routes: Routes = [
  { path: '', component: CigarListComponent },
  { path: 'cigars/new', component: CigarFormComponent },
  { path: 'cigars/edit/:id', component: CigarFormComponent },
  { path: 'cigars/:id', component: CigarDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
