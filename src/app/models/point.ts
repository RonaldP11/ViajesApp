import { Geo } from "./geopoint";

export interface Point {
    title: string;
    description: string;
    icon?: string;
    images: string[];
    coord: Geo;
}
