export interface AppState {
    counter: number,
    socket: SocketState
}

export interface SocketState {
    deviceCode: String, 
    randomLinkUcode: String, 
    bIsConnected: Boolean
}