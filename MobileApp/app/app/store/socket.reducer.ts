import { ActionReducer, Action } from '@ngrx/store';
import { SocketState } from './store.interface'
export const SETDEVICECODE = 'SETDEVICECODE';
export const SETRUCODE = 'SETRUCODE';
export const SETCONNECTED = 'SETRUCODE';
export const RESET = 'RESET';

const defaultState: SocketState= { deviceCode: '', randomLinkUcode: '', bIsConnected: false };

export const socketReducer: ActionReducer<SocketState> = (state: SocketState = defaultState, action: Action) => {
    switch (action.type) {
        case SETDEVICECODE:
            return Object.assign({}, state, {
                deviceCode: action.payload
            });

        case SETRUCODE:
            return Object.assign({}, state, {
                randomLinkUcode: action.payload
            });
        case SETCONNECTED:
            return Object.assign({}, state, {
                bIsConnected: action.payload
            });
        case RESET:
            return defaultState;
        default:
            return state;
    }
};