import { Gender } from '../components/Gender';
import { Characters, Planet } from '../models/Character';

export const ActionType = {
    SET_CHARACTERS: 'SET_CHARACTERS',
    SET_TOTAL_PAGE: 'SET_TOTAL_PAGE',
    SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
    SET_FAV_CHARACTERS: 'SET_FAV_CHARACTERS',
    SET_PLANETS: 'SET_PLANETS',
    SET_SPACE_SHIPS: 'SET_SPACE_SHIPS',
    SET_GENDER: 'SET_GENDER',
} as const;

export type Action =
    | { type: typeof ActionType.SET_CHARACTERS; payload: Characters }
    | { type: typeof ActionType.SET_CURRENT_PAGE; payload: number }
    | { type: typeof ActionType.SET_TOTAL_PAGE; payload: number }
    | {
          type: typeof ActionType.SET_GENDER;
          payload: { value: Gender; id: string };
      }
    | {
          type: typeof ActionType.SET_FAV_CHARACTERS;
          payload: string;
      }
    | {
          type: typeof ActionType.SET_SPACE_SHIPS;
          payload: string;
      }
    | {
          type: typeof ActionType.SET_PLANETS;
          payload: Record<string, Planet>;
      };
