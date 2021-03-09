import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SummaryComponent } from './components/board/card/summary/summary.component';
import { DetailComponent } from './components/board/card/detail/detail.component';

import { BoardComponent } from './components/board/board/board.component';
import { HeaderComponent } from './components/common/header/header.component';
import { ListComponent } from './components/board/list/list.component';
import { ContentEditDirective } from './directives/common/content-edit.directive';
import { ContextMenuComponent } from './components/common/contextmenu/context-menu.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import {ProjectBoardComponent  } from "./projects/project-board.component";
import {LocalService} from './board/local/local.service';

@NgModule({
  declarations: [
    AppComponent,
    SummaryComponent,
    DetailComponent,
    BoardComponent,
    HeaderComponent,
    ListComponent,
    ContentEditDirective,
    ContextMenuComponent,
    LoginComponent,
    RegisterComponent,
    ProjectBoardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule

  ],
  providers: [ authInterceptorProviders, LocalService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
