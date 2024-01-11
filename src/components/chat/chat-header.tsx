import { Hash, Mic, Video } from 'lucide-react';

import { ChannelTypeEnum } from '@/graphql/gql/graphql';

import { MobileToggle } from '@/components/mobile-toggle';
import { UserAvatar } from '@/components/user-avatar';

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: ChannelTypeEnum | 'conversation';
  imageUrl?: string;
}

const channelIconMap = {
  [ChannelTypeEnum.Text]: Hash,
  [ChannelTypeEnum.Audio]: Mic,
  [ChannelTypeEnum.Video]: Video,
};

export function ChatHeader({
  serverId,
  name,
  type,
  imageUrl,
}: ChatHeaderProps) {
  const Icon = type === 'conversation' ? Hash : channelIconMap[type];

  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle serverId={serverId} />
      {type !== 'conversation' && (
        <Icon className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      )}
      {type === 'conversation' && (
        <UserAvatar src={imageUrl} className="h-8 w-8 md:h-8 md:w-8 mr-2" />
      )}
      <p className="font-semibold text-md text-black dark:text-white">{name}</p>
    </div>
  );
}
