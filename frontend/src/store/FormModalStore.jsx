import { create } from "zustand";

export const useModalStore = create((set) => ({
  isModalOpen: false,
  isPending: false,
  rowId: null,
  togglePending: () => set((state) => ({ isPending: !state.isPending })),
  openModal: (rowId = null) => set({ isModalOpen: true, rowId }),
  closeModal: () => set({ isModalOpen: false, rowId: null }),
}));
