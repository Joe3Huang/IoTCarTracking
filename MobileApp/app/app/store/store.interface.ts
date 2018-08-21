export interface AppState {
    counter: number,
    socket: SocketState,
    user: UserState
}

export interface SocketState {
    deviceCode: String, 
    randomLinkUcode: String, 
    bIsConnected: Boolean
}

export interface UserState {
    username: String, 
    randomLinkUcode: String, 
    token: String
}