import { withHypermediaResource, withHypermediaCollectionAction } from "@angular-architects/ngrx-hateoas";
import { signalStore } from "@ngrx/signals";
import { Flight } from "../flight.entities";

export type FlightSearchVm = {
  from: string,
  to: string,
  flights: Flight[]
}

const initialFlightSearchVm: FlightSearchVm = {
  from: '',
  to: '',
  flights: []
}

export const FlightSearchStore = signalStore(
  { providedIn: 'root' },
  withHypermediaResource('flightSearchVm', initialFlightSearchVm),
  withHypermediaCollectionAction('deleteFlight', store => store.flightSearchVm.flights, 'delete')
);
