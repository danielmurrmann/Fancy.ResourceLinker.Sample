import { Component, inject } from '@angular/core';
import { ActionCardComponent } from '../../shared/ui/action-card/action-card.component';
import { FlightConnectionFormComponent } from '../shared/flight-connection-form/flight-connection-form.component';
import { FlightOperatorFormComponent } from '../shared/flight-operator-form/flight-operator-form.component';
import { FlightPriceFormComponent } from '../shared/flight-price-form/flight-price-form.component';
import { FlightTimesFormComponent } from '../shared/flight-times-form/flight-times-form.component';
import { FlightEditStore } from './flight-edit.store';
import { concat, delay, of, Subject, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

function createCallStateSignal() {
	const subject = new Subject<'Success' | 'Error' | null>();
	const callState$ = subject.pipe(
		switchMap(v => v === null ? of(null) : concat(of(v), of(null).pipe(delay(3000))))
	);
	const callState = toSignal(callState$);
	return { subject, callState$, callState };
}

// Add reusable helper that performs an async action and pushes Success/Error to the subject
async function performCallAndSetCallState(action: () => Promise<any>, callState: { subject: Subject<'Success' | 'Error' | null> }) {
  try {
    await action();
    callState.subject.next('Success');
  } catch {
    callState.subject.next('Error');
  }
}

@Component({
    selector: 'app-flight-edit',
    imports: [ActionCardComponent, FlightConnectionFormComponent, FlightOperatorFormComponent, FlightTimesFormComponent, FlightPriceFormComponent],
    templateUrl: './flight-edit.component.html'
})
export class FlightEditComponent {
  store = inject(FlightEditStore);
  viewModel = this.store.getFlightEditVmAsPatchable();
  flightConnection = this.viewModel.flight.connection;
  flightTimes = this.viewModel.flight.times;
  flightOperator = this.viewModel.flight.operator;
  flightPrice = this.viewModel.flight.price;

  updateFlightConnectionCallState = createCallStateSignal();
  updateFlightTimesCallState = createCallStateSignal();
  updateFlightOperatorCallState = createCallStateSignal();
  updateFlightPriceCallState = createCallStateSignal();

  async updateFlightConnection() {
    await performCallAndSetCallState(() => this.store.updateFlightConnection(), this.updateFlightConnectionCallState);
  }

  async updateFlightTimes() {
    await performCallAndSetCallState(() => this.store.updateFlightTimes(), this.updateFlightTimesCallState);
  }

  async updateFlightOperator() {
    await performCallAndSetCallState(() => this.store.updateFlightOperator(), this.updateFlightOperatorCallState);
  }

  async updateFlightPrice() {
    await performCallAndSetCallState(() => this.store.updateFlightPrice(), this.updateFlightPriceCallState);
  }
}
