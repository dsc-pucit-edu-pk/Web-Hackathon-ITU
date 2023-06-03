import {create} from 'zustand';

const useLocationStore = create((set) => ({
  region: null,
  selectRegion: (region) => set({ region }),
}));


export default useLocationStore;