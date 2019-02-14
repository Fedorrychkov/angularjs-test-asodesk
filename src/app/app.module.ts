import { NgModule } from 'angular-ts-decorators';
import Datatable from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatsComponent } from './components/stats/stats.component';
import { ExploreComponent } from './components/explore/explore.component';

import { NavComponent } from './shared/nav/nav.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { PopupComponent } from './shared/popup/popup.component';
import { HeaderComponent } from './shared/header/header.component';

import { StatsService } from './services/stats.service';

import './styles.scss';

const APP_COMPONENTS = [
  AppComponent,
  NavComponent,
  StatsComponent,
  SidebarComponent,
  HeaderComponent,
  ExploreComponent,
  LoaderComponent,
  PopupComponent
];

const APP_SERVICES = [
  StatsService
];

@NgModule({
  id: 'AppModule',
  imports: [
    AppRoutingModule,
    Datatable
  ],
  declarations: [
    ...APP_COMPONENTS
  ],
  providers: [
    ...APP_SERVICES
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
