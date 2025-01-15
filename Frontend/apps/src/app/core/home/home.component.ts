import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { HomeStore } from './home.store';

@Component({
    selector: 'app-home',
    imports: [CurrencyPipe],
    templateUrl: './home.component.html'
})
export class HomeComponent {
  viewModel = inject(HomeStore).homeVm;
}
