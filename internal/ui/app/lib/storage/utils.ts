export const LOCAL_STORAGE_USER = "user";
export const LOCAL_STORAGE_UNITS = "units";
export const LOCAL_STORAGE_SETTINGS = "settings";

export const setLocalStorage = (key: string, value: any): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
};

export const getLocalStorage = <T>(key: string): T | undefined => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) return undefined;
    return JSON.parse(serializedValue) as T;
  } catch (error) {
    console.error(`Error getting localStorage key "${key}":`, error);
    return undefined;
  }
};

export const removeLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
  }
};
