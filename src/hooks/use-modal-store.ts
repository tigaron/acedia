import { create } from 'zustand';

import { Channel, ChannelTypeEnum, Server } from '@/graphql/gql/graphql';

export type ModalType =
  | 'createServer'
  | 'invite'
  | 'editServer'
  | 'members'
  | 'createChannel'
  | 'leaveServer'
  | 'deleteServer'
  | 'deleteChannel'
  | 'editChannel'
  | 'messageFile'
  | 'deleteMessage';

interface ModalData {
  server?: Server;
  channel?: Channel;
  channelType?: ChannelTypeEnum;
  apiUrl?: string;
  query?: Record<string, any>;
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
