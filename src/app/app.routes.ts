import { RouterModule, Routes } from '@angular/router';
import { Pomodoro } from './pomodoro/pomodoro';
import { NgModule } from '@angular/core';
import { Timer } from './timer/timer';
import { Stopwatch } from './stopwatch/stopwatch';

//Add new components here
export const routes: Routes = [
    {path: '', component: Pomodoro},
    {path: 'timer', component: Timer},
    {path: 'stopwatch', component: Stopwatch},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

