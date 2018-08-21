import { ActionReducer, Action } from '@ngrx/store';
import { Position } from './store.interface'
export const RESET = 'RESET';
export const SETPOSITION = 'SETPOSITION';
const defaultState: Position= {  
    latitude: null,
    longitude: null
};

export const positionReducer: ActionReducer<Position> = (state: Position = defaultState, action: Action) => {
    switch (action.type) {
        case SETPOSITION:
            return Object.assign({}, state, {
                latitude: action.payload.latitude,
                longitude: action.payload.longitude
            });
        case RESET:
            return defaultState;
        default:
            return state;
    }
};