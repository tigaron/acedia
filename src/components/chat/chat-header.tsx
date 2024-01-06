import { Hash, Mic, Video } from 'lucide-react';

import { ChannelType } from '@prisma/client';

import { MobileToggle } from '@/components/mobile-toggle';

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: ChannelType | 'conversation';
  imageUrl?: string;
}

const channelIconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
};

export const ChatHeader = ({
  serverId,
  name,
  type,
  imageUrl,
}: ChatHeaderProps) => {
  const Icon = type === 'conversation' ? Hash : channelIconMap[type];

  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle serverId={serverId} />
      {type !== 'conversation' && (
        <Icon className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      )}
      <p className="font-semibold text-md text-black dark:text-white">{name}</p>
    </div>
  );
};
