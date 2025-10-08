import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const ProfileContext = createContext(null);
export const useProfile = () => useContext(ProfileContext);

const initial = { nombre:'', email:'', rem:'', prefs:[] };

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useLocalStorage('ds_profile', initial);

  const updateProfile = (patch) => setProfile(p => ({ ...p, ...patch }));

  const value = { profile, updateProfile };
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}
