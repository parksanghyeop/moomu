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

export interface Bus {
    region_id: number;
    name: string;
    commute_or_leave: string;
    id: number;
    stations: station[];
    order: number;
}

export interface jwt {
    exp: number;
    id: number;
    nickname: string;
    region: number;
    role: number;
}
