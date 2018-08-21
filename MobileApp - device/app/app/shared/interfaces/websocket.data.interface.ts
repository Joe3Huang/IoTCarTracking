export interface WebsocketData
{
    command: string; 
    send_to: string; //All or the uid of the device
    device_type: string; //'MOBILE_GPS', 
    device_code: string; //'100006',
    random_link_ucode: string; //'8753f3ac-3b23-11e8-ab28-0242ac150002',
    message: string; //
}