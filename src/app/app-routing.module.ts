import { StateProvider } from '@uirouter/angularjs';
import { Ng1StateDeclaration } from '@uirouter/angularjs/lib/interface';
import { getTypeName, NgModule } from 'angular-ts-decorators';
import { StatsComponent } from './components/stats/stats.component';
import { ExploreComponent } from './components/explore/explore.component';

export interface UiState extends Ng1StateDeclaration {
  component?: any;
}

const routes: UiState[] = [
  { name: 'index', url: '', redirectTo: 'stats' },
  { name: 'stats', url: '/stats', component: StatsComponent },
  { name: 'explore', url: '/stats/{id}/explore', component: ExploreComponent }
];

@NgModule({
  id: 'AppRoutingModule',
  imports: [
    'ui.router'
  ],
})
export class AppRoutingModule {
  static config($stateProvider: StateProvider) {
    'ngInject';
    routes.forEach(route => $stateProvider.state(getNg1StateDeclaration(route)));
  }
}

function getNg1StateDeclaration(state: UiState) {
  if (state.component && typeof state.component !== 'string') {
    state.component = getTypeName(state.component);
  }
  return state;
}

