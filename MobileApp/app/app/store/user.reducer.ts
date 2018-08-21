import { ActionReducer, Action } from '@ngrx/store';
import { UserState } from './store.interface'
export const SETUSERNAME = 'SETDEVICECODE';
export const SETRUCODE = 'SETRUCODE';
export const SETTOKEN = 'SETTOKEN';
export const RESET = 'RESET';

const defaultState: UserState= { username: '', randomLinkUcode: '', token: '' };

export const userReducer: ActionReducer<UserState> = (state: UserState = defaultState, action: Action) => {
    switch (action.type) {
        case SETUSERNAME:
            return Object.assign({}, state, {
                username: action.payload
            });

        case SETRUCODE:
            return Object.assign({}, state, {
                randomLinkUcode: action.payload
            });
        case SETTOKEN:
            return Object.assign({}, state, {
                token: action.payload
            });
        case RESET:
            return defaultState;
        default:
            return state;
    }
};