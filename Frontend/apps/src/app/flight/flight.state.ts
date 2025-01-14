import { initialDynamicResource, withHypermediaResource, withHypermediaAction, withLinkedHypermediaResource } from "@angular-architects/ngrx-hateoas";
import { signalStore, withHooks } from "@ngrx/signals";
import { initialFlightCreateVm, initialFlightEditVm } from "./flight.entities";

export const FlightState = signalStore(
  { providedIn: 'root' },
  withHypermediaResource('flightSearchVm', initialDynamicResource),
  withHypermediaResource('flightEditVm', initialFlightEditVm),
  withHypermediaAction('updateFlightConnection'),
  withHypermediaAction('updateFlightTimes'),
  withHypermediaAction('updateFlightOperator'),
  withHypermediaAction('updateFlightPrice'),
  withLinkedHypermediaResource('createFlightVm', initialFlightCreateVm),
  withHypermediaAction('createFlight'),
  withHooks({
    onInit(store) {
        store._connectUpdateFlightConnection(store.flightEditVm.flight.connection, 'update');
        store._connectUpdateFlightTimes(store.flightEditVm.flight.times, 'update');
        store._connectUpdateFlightOperator(store.flightEditVm.flight.operator, 'update');
        store._connectUpdateFlightPrice(store.flightEditVm.flight.price, 'update');
        store._connectCreateFlightVm(store.flightSearchVm, 'createFlightVm');
        store._connectCreateFlight(store.createFlightVm.template, 'create');
    }
})
);
