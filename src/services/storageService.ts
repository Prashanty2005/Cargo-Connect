// Local storage service for persisting user data

// Generic function to save an item to localStorage
export const saveItem = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving item to localStorage: ${key}`, error);
  }
};

// Generic function to get an item from localStorage
export const getItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error getting item from localStorage: ${key}`, error);
    return defaultValue;
  }
};

// Function to remove an item from localStorage
export const removeItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item from localStorage: ${key}`, error);
  }
};

// User preferences
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  language: string;
}

const USER_PREFERENCES_KEY = 'user_preferences';

// Get user preferences
export const getUserPreferences = (userId: string): UserPreferences => {
  const key = `${USER_PREFERENCES_KEY}_${userId}`;
  return getItem<UserPreferences>(key, {
    theme: 'system',
    notifications: true,
    language: 'en'
  });
};

// Save user preferences
export const saveUserPreferences = (userId: string, preferences: UserPreferences): void => {
  const key = `${USER_PREFERENCES_KEY}_${userId}`;
  saveItem(key, preferences);
};

// Recent searches
export const RECENT_SEARCHES_KEY = 'recent_searches';

// Get recent searches
export const getRecentSearches = (userId: string): string[] => {
  const key = `${RECENT_SEARCHES_KEY}_${userId}`;
  return getItem<string[]>(key, []);
};

// Add recent search
export const addRecentSearch = (userId: string, search: string): void => {
  const key = `${RECENT_SEARCHES_KEY}_${userId}`;
  const searches = getRecentSearches(userId);
  
  // Remove if already exists (to move to front)
  const filtered = searches.filter(s => s !== search);
  
  // Add to beginning of array
  filtered.unshift(search);
  
  // Keep only the latest 10 searches
  const trimmed = filtered.slice(0, 10);
  
  saveItem(key, trimmed);
};

// Clear recent searches
export const clearRecentSearches = (userId: string): void => {
  const key = `${RECENT_SEARCHES_KEY}_${userId}`;
  saveItem(key, []);
};
