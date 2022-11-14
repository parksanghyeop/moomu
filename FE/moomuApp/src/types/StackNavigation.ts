export type RootStackParamList = {
    Start: undefined;
    LoginSignUp: {
        id: number;
    };
    Bus: undefined;
    BusMap: {
        stationList: Array<object>;
        commute_or_leave: string;
        name: string;
    };
    Station: {
        bus_id: number;
        name: string;
        commute_or_leave: string;
        order: number;
    };
    Main: undefined;
    BusSearch: undefined;
    Information: undefined;
    FAQ: undefined;
    Notification: undefined;
    Setting: undefined;
    FaqDetail: {
        faq: any;
    };
    InformationDetail: {
        information: any;
    };
};
