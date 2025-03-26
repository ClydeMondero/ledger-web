import { create } from "zustand";

export const useModalStore = create((set) => ({
  isModalOpen: false,
  rowId: null,
  openModal: (rowId = null) => set({ isModalOpen: true, rowId }),
  closeModal: () => set({ isModalOpen: false, rowId: null }),
}));
