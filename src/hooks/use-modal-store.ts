import { create } from 'zustand';

import { Server } from '@prisma/client';

export type ModalType = 'createServer' | 'invite' | 'editServer';

interface ModalData {
  server?: Server;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>(set => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ data, type, isOpen: true }),
  onClose: () => set({ type: null, isOpen: false }),
}));
