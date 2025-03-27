import { Component, inject, signal } from '@angular/core';
import { Location } from '@angular/common';
import { ActionCardComponent } from '../../shared/ui/action-card/action-card.component';
import { FlightConnectionFormComponent } from '../shared/flight-connection-form/flight-connection-form.component';
import { FlightOperatorFormComponent } from '../shared/flight-operator-form/flight-operator-form.component';
import { FlightTimesFormComponent } from '../shared/flight-times-form/flight-times-form.component';
import { FlightCreateStore } from './flight-create.store';

@Component({
    selector: 'app-flight-create',
    imports: [ActionCardComponent, FlightConnectionFormComponent, FlightOperatorFormComponent, FlightTimesFormComponent],
    templateUrl: './flight-create.component.html'
})
export class FlightCreateComponent {
  location = inject(Location);
  store = inject(FlightCreateStore);
  
  viewModel = this.store.getFlightCreateVmAsPatchable();

  saveEnabled = this.store.createFlightState.isAvailable;
  
  flightConnection = this.viewModel.connection;
  flightTimes = this.viewModel.times;
  flightOperator = this.viewModel.operator;

  async onSaveFlight() {
    const response = await this.store.createFlight();
    console.log('Flight created at: ', response.headers.get('Location'));
    this.location.back();
  }
}
