import { ActionReducer, Action } from '@ngrx/store';
import { SocketState } from './store.interface'
export const SETDEVICECODE = 'SETDEVICECODE';
export const SETUCODE = 'SETUCODE';
export const SETSOCKETSTATE = 'SETSOCKETSTATE';
export const SETAUTH = 'SETAUTH';
export const RESET = 'RESET';
export const SETPOSITION = 'SETPOSITION';
export const SETM = 'SETM';
const defaultState: SocketState= { 
    deviceCode: '', 
    randomLinkUcode: '', 
    bIsConnected: false, 
    bIsAuthenticated: false, 
    message: null
};

export const socketReducer: ActionReducer<SocketState> = (state: SocketState = defaultState, action: Action) => {
    switch (action.type) {
        case SETDEVICECODE:
            return Object.assign({}, state, {
                deviceCode: action.payload
            });

        case SETUCODE:
            return Object.assign({}, state, {
                randomLinkUcode: action.payload
            });
        case SETSOCKETSTATE:
            return Object.assign({}, state, {
                bIsConnected: action.payload
            });
        case SETAUTH:
            return Object.assign({}, state, {
                bIsAuthenticated: action.payload
            });
        case SETM:
            return Object.assign({}, state, {
                message: state.message + '/'+ action.payload
            });
        case RESET:
            return defaultState;
        default:
            return state;
    }
};