import type { EDITOR_LS_KEYS } from "@excalidraw/common";

import type { JSONValue } from "../types";

export class EditorLocalStorage {
  static has(key: typeof EDITOR_LS_KEYS[keyof typeof EDITOR_LS_KEYS]) {
    try {
      return !!window.localStorage.getItem(key);
    } catch (error) {
      console.warn(`localStorage.getItem error: ${(error as Error).message}`);
      return false;
    }
  }

  static get<T extends JSONValue>(
    key: typeof EDITOR_LS_KEYS[keyof typeof EDITOR_LS_KEYS],
  ) {
    try {
      const value = window.localStorage.getItem(key);
      if (value) {
        return JSON.parse(value) as T;
      }
      return null;
    } catch (error) {
      console.warn(`localStorage.getItem error: ${(error as Error).message}`);
      return null;
    }
  }

  static set = (
    key: typeof EDITOR_LS_KEYS[keyof typeof EDITOR_LS_KEYS],
    value: JSONValue,
  ) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`localStorage.setItem error: ${(error as Error).message}`);
      return false;
    }
  };

  static delete = (
    name: typeof EDITOR_LS_KEYS[keyof typeof EDITOR_LS_KEYS],
  ) => {
    try {
      window.localStorage.removeItem(name);
    } catch (error) {
      console.warn(`localStorage.removeItem error: ${(error as Error).message}`);
    }
  };
}
