import { Storage } from './storage';

export class SessionStorage implements Storage {
  public setItem(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  public getItem(key: string) {
    return sessionStorage.getItem(key);
  }
}
