import { RouterModule, Routes } from '@angular/router';
import { Pomodoro } from './pomodoro/pomodoro';
import { NgModule } from '@angular/core';

//Add new components here
export const routes: Routes = [
    {path: '', component: Pomodoro}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

