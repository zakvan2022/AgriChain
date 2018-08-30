// dashboard
export interface Location {
    lat: number;
    long: number;
}

export interface Todo {
    title: string;
    appointment_date: Date;
    interval: string;
}

export interface TodoList {
    date: Date;
    items: Todo[];
}

export interface Profile {
    id: string;
    name: string;
}
export interface ProfileList {
    selected_id: string;
    items: Profile[];
}
export interface Zones {
    id: string;
    name: string;
}
export interface ZonesList {
    selected_id: string;
    items: Zones[];
}
export interface Bulb {
    id: string;
    name: string;
}
export interface BulbList {
    selected_id: string;
    items: Bulb[];
}