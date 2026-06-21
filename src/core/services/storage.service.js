/**
 * StorageAdapter abstracts the storage mechanism.
 * This makes it easy to swap to AsyncStorage for React Native in the future.
 */
export const StorageAdapter = {
  get: (key) => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading ${key} from LocalStorage`, error);
      return null;
    }
  },
  
  set: (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting ${key} in LocalStorage`, error);
      return false;
    }
  },
  
  remove: (key) => {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key} from LocalStorage`, error);
      return false;
    }
  },
  
  clear: () => {
    try {
      window.localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing LocalStorage', error);
      return false;
    }
  }
};
