import {create }from 'zustand';
import axios from 'axios';

export const useWishlist = create((set, get) => ({
  wishlist: [],
  clearWishlist: () => set({ wishlist: [] }),
  addToWishlist: async (adId, user, token) => {
    if (!user) {
      return;
    }
    const isLiked = get().wishlist.some((item) => item.adId === adId);
    // instantaneously update UI
    if (isLiked) {
      set({
        wishlist: get().wishlist.filter((item) => item.adId !== adId),
      });
    } else {
      set({
        wishlist: [
          ...get().wishlist,
          {
            adId,
          },
        ],
      });
    }

    const URL = isLiked
      ? `${import.meta.env.VITE_BASE_URI}/wishlist/remove/${adId}`
      : `${import.meta.env.VITE_BASE_URI}/wishlist/add/${adId}`;

    const response = await axios.post(URL, {}, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (response.data.success) {
      const wishlist = Object.keys(response.data.wishlist).map(
        (key) => response.data.wishlist[key]
      );
  
      set({
        wishlist: get().wishlist.filter((item) => item.adId !== adId),
      });
      set({ wishlist });
    } else {
      // revert UI
      set({
        wishlist: get().wishlist.filter((item) => item.adId !== adId),
      });

    }
  },
  isLiked: (adId) => {
    return get().wishlist.some((item) => item.adId === adId);
  },
  getWishlist: async (token) => {
    const wishlist = await axios.get(`${import.meta.env.VITE_BASE_URI}/wishlist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    set({ wishlist: wishlist.data.wishlist });
  }
}));
