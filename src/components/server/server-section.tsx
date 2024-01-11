'use client';

import { Plus, Settings } from 'lucide-react';

import { ChannelTypeEnum, MemberRoleEnum, Server } from '@/graphql/gql/graphql';

import { useModal } from '@/hooks/use-modal-store';

import { ActionTooltip } from '@/components/action-tooltip';

interface ServerSectionProps {
  label: string;
  role?: MemberRoleEnum;
  sectionType: 'channels' | 'members';
  channelType?: ChannelTypeEnum;
  server?: Server;
}

export function ServerSection({
  label,
  role,
  sectionType,
  channelType,
  server,
}: ServerSectionProps) {
  const { onOpen } = useModal();

  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {role !== MemberRoleEnum.Guest && sectionType === 'channels' && (
        <ActionTooltip label="Create Channel" side="top">
          <button
            onClick={() => onOpen('createChannel', { channelType })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Plus className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}
      {role === MemberRoleEnum.Admin && sectionType === 'members' && (
        <ActionTooltip label="Manage Members" side="top">
          <button
            onClick={() => onOpen('members', { server })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Settings className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
}
