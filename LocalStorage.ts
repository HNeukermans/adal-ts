import { Storage } from './IStorage';
export class LocalStorage implements Storage {
    public setItem(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    public getItem(key: string): string {
        return localStorage.getItem(key);
    }
}