export interface station {
    bus_id: number;
    name: string;
    lat: string;
    lng: string;
    order: number;
    arrived_time: any;
    id: number;
}

export interface myStation {
    start_station_id: any;
    end_station_id: any;
    id: number;
}
