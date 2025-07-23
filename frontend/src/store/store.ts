import { atom } from 'jotai';
import type { Item } from '../types/item';
import type { Tab } from '../types/tab';

export const tabAtom = atom<Tab>('all');
export const isScreenWidthChangedAtom = atom<boolean>(false);
export const energyAtom = atom<number>(100);
export const itemsAtom = atom<Item[]>([]);
