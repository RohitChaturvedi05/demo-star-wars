import { Starship } from '../models/Character';
import { StarShipResponse } from './models';

export const getStarShip = async (url: string): Promise<Starship | null> => {
    try {
        const response = await fetch(url);
        const data: StarShipResponse = await response.json();
        return {
            name: data.name,
            cargo_capacity: data.cargo_capacity,
            passengers: data.passengers,
            max_atmosphering_speed: data.max_atmosphering_speed,
            manufacturer: data.manufacturer,
        };
    } catch (error) {
        console.log(error);
        return null;
    }
};
