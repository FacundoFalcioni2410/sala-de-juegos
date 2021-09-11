import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { QuienSoyComponent} from './components/quien-soy/quien-soy.component';
import { AuthGuard } from './guards/auth.guard';
import { ErrorComponent } from './components/error/error.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'about', component: QuienSoyComponent},
  {
    path: 'chat',
    component: ChatComponent,
  },
  {path: 'saladejuegos', loadChildren: () => import('./sala-de-juegos/sala-de-juegos.module').then(m => m.SalaDeJuegosModule) },
  {path: 'error', component: ErrorComponent},
  {path: '**', redirectTo: 'error'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }