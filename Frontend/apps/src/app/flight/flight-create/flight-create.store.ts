import { withHypermediaAction, withLinkedHypermediaResource } from "@angular-architects/ngrx-hateoas";
import { signalStore } from "@ngrx/signals";
import { FlightConnection, FlightTimes, FlightOperator, Aircraft, initialFlightConnection, initialFlightTimes, initialFlightOperator } from "../flight.entities";
import { FlightSearchStore } from "../flight-search/flight-search.store";
import { inject } from "@angular/core";

export type FlightCreateVm = {
  connection: FlightConnection,
  times: FlightTimes,
  operator: FlightOperator
};

export const initialFlightCreateVm: FlightCreateVm = {
  connection: initialFlightConnection,
  times: initialFlightTimes,
  operator: initialFlightOperator
};

export const FlightCreateStore = signalStore(
  { providedIn: 'root' },
  withLinkedHypermediaResource('flightCreateVm', initialFlightCreateVm, () => inject(FlightSearchStore).flightSearchVm, 'createFlightVm'),
  withHypermediaAction('createFlight', store => store.flightCreateVm, 'create')
);
