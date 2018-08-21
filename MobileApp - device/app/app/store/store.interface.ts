export interface AppState {
    socket: SocketState,
    position: Position
}

export interface SocketState {
    deviceCode: String, 
    randomLinkUcode: String, 
    bIsConnected: Boolean,
    bIsAuthenticated: Boolean,
    message: object
}

export interface Position {
    latitude: number,
    longitude: number
}
