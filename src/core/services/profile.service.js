import { StorageAdapter } from './storage.service';

const PROFILE_KEY = 'gst_pro_user';

const defaultProfile = {
  businessName: '',
  ownerName: '',
  gstin: '',
  phone: '',
  email: '',
  address: ''
};

export const ProfileService = {
  getProfile: () => {
    const saved = StorageAdapter.get(PROFILE_KEY);
    return saved ? { ...defaultProfile, ...saved } : { ...defaultProfile };
  },

  saveProfile: (profile) => {
    return StorageAdapter.set(PROFILE_KEY, profile);
  }
};
