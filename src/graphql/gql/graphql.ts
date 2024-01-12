/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Channel = {
  __typename?: 'Channel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  messages?: Maybe<Array<Maybe<Message>>>;
  name: Scalars['String']['output'];
  profile: Profile;
  profileId: Scalars['String']['output'];
  server: Server;
  serverId: Scalars['String']['output'];
  type: ChannelTypeEnum;
  updatedAt: Scalars['DateTime']['output'];
};

/** Defines the type of a channel. */
export enum ChannelTypeEnum {
  Audio = 'AUDIO',
  Text = 'TEXT',
  Video = 'VIDEO'
}

export type Conversation = {
  __typename?: 'Conversation';
  createdAt: Scalars['DateTime']['output'];
  directMessages?: Maybe<Array<Maybe<DirectMessage>>>;
  id: Scalars['String']['output'];
  memberOne: Member;
  memberOneId: Scalars['String']['output'];
  memberTwo: Member;
  memberTwoId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateChannelDto = {
  name: Scalars['String']['input'];
  serverId: Scalars['String']['input'];
  type: ChannelTypeEnum;
};

export type CreateDmDto = {
  content: Scalars['String']['input'];
  conversationId: Scalars['String']['input'];
  fileUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CreateMessageDto = {
  channelId: Scalars['String']['input'];
  content: Scalars['String']['input'];
  fileUrl?: InputMaybe<Scalars['String']['input']>;
  memberId: Scalars['String']['input'];
  serverId: Scalars['String']['input'];
};

export type CreateProfileDto = {
  email: Scalars['String']['input'];
  imageUrl: Scalars['String']['input'];
  name: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type CreateServerDto = {
  imageUrl: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type DMsResult = {
  __typename?: 'DMsResult';
  messages?: Maybe<Array<Maybe<DirectMessage>>>;
  nextCursor?: Maybe<Scalars['String']['output']>;
};

export type DeleteChannelDto = {
  channelId: Scalars['String']['input'];
  serverId: Scalars['String']['input'];
};

export type DeleteDmDto = {
  conversationId: Scalars['String']['input'];
  dmId: Scalars['String']['input'];
};

export type DeleteMemberDto = {
  memberId: Scalars['String']['input'];
  serverId: Scalars['String']['input'];
};

export type DeleteMessageDto = {
  channelId: Scalars['String']['input'];
  memberId: Scalars['String']['input'];
  messageId: Scalars['String']['input'];
  serverId: Scalars['String']['input'];
};

export type DirectMessage = {
  __typename?: 'DirectMessage';
  content: Scalars['String']['output'];
  conversation: Conversation;
  conversationId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deleted: Scalars['Boolean']['output'];
  fileUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  member: Member;
  memberId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Member = {
  __typename?: 'Member';
  conversationsInitiated?: Maybe<Array<Maybe<Conversation>>>;
  conversationsReceived?: Maybe<Array<Maybe<Conversation>>>;
  createdAt: Scalars['DateTime']['output'];
  directMessages?: Maybe<Array<Maybe<DirectMessage>>>;
  id: Scalars['String']['output'];
  messages?: Maybe<Array<Maybe<Message>>>;
  profile: Profile;
  profileId: Scalars['String']['output'];
  role: MemberRoleEnum;
  server: Server;
  serverId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

/** Defines the role of a member in a server. */
export enum MemberRoleEnum {
  Admin = 'ADMIN',
  Guest = 'GUEST',
  Moderator = 'MODERATOR'
}

export type Message = {
  __typename?: 'Message';
  channel: Channel;
  channelId: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deleted: Scalars['Boolean']['output'];
  fileUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  member: Member;
  memberId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type MessagesResult = {
  __typename?: 'MessagesResult';
  messages?: Maybe<Array<Maybe<Message>>>;
  nextCursor?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createChannel?: Maybe<Server>;
  createDM?: Maybe<DirectMessage>;
  createInviteCode?: Maybe<Server>;
  createMember?: Maybe<Server>;
  createMessage?: Maybe<Message>;
  createProfile?: Maybe<Profile>;
  createServer?: Maybe<Server>;
  deleteChannel?: Maybe<Server>;
  deleteDM?: Maybe<DirectMessage>;
  deleteMember?: Maybe<Server>;
  deleteMessage?: Maybe<Message>;
  deleteServer?: Maybe<Server>;
  leaveServer?: Maybe<Server>;
  updateChannel?: Maybe<Server>;
  updateDM?: Maybe<DirectMessage>;
  updateMemberRole?: Maybe<Server>;
  updateMessage?: Maybe<Message>;
  updateServer?: Maybe<Server>;
};


export type MutationCreateChannelArgs = {
  input: CreateChannelDto;
};


export type MutationCreateDmArgs = {
  input: CreateDmDto;
};


export type MutationCreateInviteCodeArgs = {
  id: Scalars['String']['input'];
};


export type MutationCreateMemberArgs = {
  inviteCode: Scalars['String']['input'];
};


export type MutationCreateMessageArgs = {
  input: CreateMessageDto;
};


export type MutationCreateProfileArgs = {
  input: CreateProfileDto;
};


export type MutationCreateServerArgs = {
  input: CreateServerDto;
};


export type MutationDeleteChannelArgs = {
  input: DeleteChannelDto;
};


export type MutationDeleteDmArgs = {
  input: DeleteDmDto;
};


export type MutationDeleteMemberArgs = {
  input: DeleteMemberDto;
};


export type MutationDeleteMessageArgs = {
  input: DeleteMessageDto;
};


export type MutationDeleteServerArgs = {
  id: Scalars['String']['input'];
};


export type MutationLeaveServerArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateChannelArgs = {
  input: UpdateChannelDto;
};


export type MutationUpdateDmArgs = {
  input: UpdateDmDto;
};


export type MutationUpdateMemberRoleArgs = {
  input: UpdateMemberRoleDto;
};


export type MutationUpdateMessageArgs = {
  input: UpdateMessageDto;
};


export type MutationUpdateServerArgs = {
  input: UpdateServerDto;
};

export type Profile = {
  __typename?: 'Profile';
  channels?: Maybe<Array<Maybe<Channel>>>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  imageUrl: Scalars['String']['output'];
  members?: Maybe<Array<Maybe<Member>>>;
  name: Scalars['String']['output'];
  servers?: Maybe<Array<Maybe<Server>>>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  fetchConversation?: Maybe<Conversation>;
  getAllServersByProfileId?: Maybe<Array<Maybe<Server>>>;
  getBatchDMs?: Maybe<DMsResult>;
  getBatchMessages?: Maybe<MessagesResult>;
  getChannelById?: Maybe<Channel>;
  getMemberByServerId?: Maybe<Member>;
  getProfileByUserId?: Maybe<Profile>;
  getServerById?: Maybe<Server>;
  getServerByInviteCode?: Maybe<Server>;
  getServerByProfileId?: Maybe<Server>;
  getServerWithChannelById?: Maybe<Server>;
  getServerWithChannelMemberProfileById?: Maybe<Server>;
};


export type QueryFetchConversationArgs = {
  memberOneId: Scalars['String']['input'];
  memberTwoId: Scalars['String']['input'];
};


export type QueryGetAllServersByProfileIdArgs = {
  profileId: Scalars['String']['input'];
};


export type QueryGetBatchDMsArgs = {
  conversationId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetBatchMessagesArgs = {
  channelId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetChannelByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetMemberByServerIdArgs = {
  profileId: Scalars['String']['input'];
  serverId: Scalars['String']['input'];
};


export type QueryGetProfileByUserIdArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetServerByIdArgs = {
  id: Scalars['String']['input'];
  profileId: Scalars['String']['input'];
};


export type QueryGetServerByInviteCodeArgs = {
  inviteCode: Scalars['String']['input'];
  profileId: Scalars['String']['input'];
};


export type QueryGetServerByProfileIdArgs = {
  profileId: Scalars['String']['input'];
};


export type QueryGetServerWithChannelByIdArgs = {
  id: Scalars['String']['input'];
  profileId: Scalars['String']['input'];
};


export type QueryGetServerWithChannelMemberProfileByIdArgs = {
  id: Scalars['String']['input'];
  profileId: Scalars['String']['input'];
};

export type Server = {
  __typename?: 'Server';
  channels: Array<Channel>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  imageUrl: Scalars['String']['output'];
  inviteCode: Scalars['String']['output'];
  members: Array<Member>;
  name: Scalars['String']['output'];
  profile: Profile;
  profileId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  dmCreated?: Maybe<DirectMessage>;
  dmDeleted?: Maybe<DirectMessage>;
  dmUpdated?: Maybe<DirectMessage>;
  messageCreated?: Maybe<Message>;
  messageDeleted?: Maybe<Message>;
  messageUpdated?: Maybe<Message>;
};


export type SubscriptionDmCreatedArgs = {
  conversationId: Scalars['String']['input'];
};


export type SubscriptionDmDeletedArgs = {
  conversationId: Scalars['String']['input'];
};


export type SubscriptionDmUpdatedArgs = {
  conversationId: Scalars['String']['input'];
};


export type SubscriptionMessageCreatedArgs = {
  channelId: Scalars['String']['input'];
};


export type SubscriptionMessageDeletedArgs = {
  channelId: Scalars['String']['input'];
};


export type SubscriptionMessageUpdatedArgs = {
  channelId: Scalars['String']['input'];
};

export type UpdateChannelDto = {
  channelId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  serverId: Scalars['String']['input'];
  type: ChannelTypeEnum;
};

export type UpdateDmDto = {
  content: Scalars['String']['input'];
  conversationId: Scalars['String']['input'];
  dmId: Scalars['String']['input'];
};

export type UpdateMemberRoleDto = {
  memberId: Scalars['String']['input'];
  role: MemberRoleEnum;
  serverId: Scalars['String']['input'];
};

export type UpdateMessageDto = {
  channelId: Scalars['String']['input'];
  content: Scalars['String']['input'];
  memberId: Scalars['String']['input'];
  messageId: Scalars['String']['input'];
  serverId: Scalars['String']['input'];
};

export type UpdateServerDto = {
  imageUrl: Scalars['String']['input'];
  name: Scalars['String']['input'];
  serverId: Scalars['String']['input'];
};

export type CreateChannelMutationVariables = Exact<{
  input: CreateChannelDto;
}>;


export type CreateChannelMutation = { __typename?: 'Mutation', createChannel?: { __typename?: 'Server', id: string } | null };

export type DeleteChannelMutationVariables = Exact<{
  input: DeleteChannelDto;
}>;


export type DeleteChannelMutation = { __typename?: 'Mutation', deleteChannel?: { __typename?: 'Server', id: string } | null };

export type UpdateChannelMutationVariables = Exact<{
  input: UpdateChannelDto;
}>;


export type UpdateChannelMutation = { __typename?: 'Mutation', updateChannel?: { __typename?: 'Server', id: string } | null };

export type CreateDmMutationVariables = Exact<{
  input: CreateDmDto;
}>;


export type CreateDmMutation = { __typename?: 'Mutation', createDM?: { __typename?: 'DirectMessage', id: string } | null };

export type DeleteDmMutationVariables = Exact<{
  input: DeleteDmDto;
}>;


export type DeleteDmMutation = { __typename?: 'Mutation', deleteDM?: { __typename?: 'DirectMessage', id: string } | null };

export type UpdateDmMutationVariables = Exact<{
  input: UpdateDmDto;
}>;


export type UpdateDmMutation = { __typename?: 'Mutation', updateDM?: { __typename?: 'DirectMessage', id: string } | null };

export type CreateMemberMutationVariables = Exact<{
  inviteCode: Scalars['String']['input'];
}>;


export type CreateMemberMutation = { __typename?: 'Mutation', createMember?: { __typename?: 'Server', id: string } | null };

export type DeleteMemberMutationVariables = Exact<{
  input: DeleteMemberDto;
}>;


export type DeleteMemberMutation = { __typename?: 'Mutation', deleteMember?: { __typename?: 'Server', id: string, profileId: string, members: Array<{ __typename?: 'Member', id: string, role: MemberRoleEnum, profileId: string, profile: { __typename?: 'Profile', name: string, email: string, imageUrl: string } }> } | null };

export type UpdateMemberRoleMutationVariables = Exact<{
  input: UpdateMemberRoleDto;
}>;


export type UpdateMemberRoleMutation = { __typename?: 'Mutation', updateMemberRole?: { __typename?: 'Server', id: string, profileId: string, members: Array<{ __typename?: 'Member', id: string, role: MemberRoleEnum, profileId: string, profile: { __typename?: 'Profile', name: string, email: string, imageUrl: string } }> } | null };

export type CreateMessageMutationVariables = Exact<{
  input: CreateMessageDto;
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage?: { __typename?: 'Message', id: string } | null };

export type DeleteMessageMutationVariables = Exact<{
  input: DeleteMessageDto;
}>;


export type DeleteMessageMutation = { __typename?: 'Mutation', deleteMessage?: { __typename?: 'Message', id: string } | null };

export type UpdateMessageMutationVariables = Exact<{
  input: UpdateMessageDto;
}>;


export type UpdateMessageMutation = { __typename?: 'Mutation', updateMessage?: { __typename?: 'Message', id: string } | null };

export type CreateProfileMutationVariables = Exact<{
  input: CreateProfileDto;
}>;


export type CreateProfileMutation = { __typename?: 'Mutation', createProfile?: { __typename?: 'Profile', id: string } | null };

export type CreateInviteCodeMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type CreateInviteCodeMutation = { __typename?: 'Mutation', createInviteCode?: { __typename?: 'Server', id: string, inviteCode: string } | null };

export type CreateServerMutationVariables = Exact<{
  input: CreateServerDto;
}>;


export type CreateServerMutation = { __typename?: 'Mutation', createServer?: { __typename?: 'Server', id: string } | null };

export type DeleteServerMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteServerMutation = { __typename?: 'Mutation', deleteServer?: { __typename?: 'Server', id: string } | null };

export type LeaveServerMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type LeaveServerMutation = { __typename?: 'Mutation', leaveServer?: { __typename?: 'Server', id: string } | null };

export type UpdateServerMutationVariables = Exact<{
  input: UpdateServerDto;
}>;


export type UpdateServerMutation = { __typename?: 'Mutation', updateServer?: { __typename?: 'Server', id: string } | null };

export type GetChannelByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetChannelByIdQuery = { __typename?: 'Query', getChannelById?: { __typename?: 'Channel', id: string, name: string, type: ChannelTypeEnum, serverId: string } | null };

export type FetchConversationQueryVariables = Exact<{
  memberOneId: Scalars['String']['input'];
  memberTwoId: Scalars['String']['input'];
}>;


export type FetchConversationQuery = { __typename?: 'Query', fetchConversation?: { __typename?: 'Conversation', id: string, memberOne: { __typename?: 'Member', profileId: string, profile: { __typename?: 'Profile', name: string, imageUrl: string } }, memberTwo: { __typename?: 'Member', profileId: string, profile: { __typename?: 'Profile', name: string, imageUrl: string } } } | null };

export type GetBatchDMsQueryVariables = Exact<{
  conversationId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetBatchDMsQuery = { __typename?: 'Query', getBatchDMs?: { __typename?: 'DMsResult', nextCursor?: string | null, messages?: Array<{ __typename?: 'DirectMessage', id: string, content: string, fileUrl?: string | null, deleted: boolean, createdAt: any, updatedAt: any, member: { __typename?: 'Member', id: string, role: MemberRoleEnum, profile: { __typename?: 'Profile', name: string, imageUrl: string } } } | null> | null } | null };

export type GetMemberByServerIdQueryVariables = Exact<{
  serverId: Scalars['String']['input'];
  profileId: Scalars['String']['input'];
}>;


export type GetMemberByServerIdQuery = { __typename?: 'Query', getMemberByServerId?: { __typename?: 'Member', id: string, role: MemberRoleEnum } | null };

export type GetBatchMessagesQueryVariables = Exact<{
  channelId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetBatchMessagesQuery = { __typename?: 'Query', getBatchMessages?: { __typename?: 'MessagesResult', nextCursor?: string | null, messages?: Array<{ __typename?: 'Message', id: string, content: string, fileUrl?: string | null, deleted: boolean, createdAt: any, updatedAt: any, member: { __typename?: 'Member', id: string, role: MemberRoleEnum, profile: { __typename?: 'Profile', name: string, imageUrl: string } } } | null> | null } | null };

export type GetProfileByUserIdQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetProfileByUserIdQuery = { __typename?: 'Query', getProfileByUserId?: { __typename?: 'Profile', id: string } | null };

export type GetAllServersByProfileIdQueryVariables = Exact<{
  profileId: Scalars['String']['input'];
}>;


export type GetAllServersByProfileIdQuery = { __typename?: 'Query', getAllServersByProfileId?: Array<{ __typename?: 'Server', id: string, name: string, imageUrl: string } | null> | null };

export type GetServerByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
  profileId: Scalars['String']['input'];
}>;


export type GetServerByIdQuery = { __typename?: 'Query', getServerById?: { __typename?: 'Server', id: string } | null };

export type GetServerByInviteCodeQueryVariables = Exact<{
  inviteCode: Scalars['String']['input'];
  profileId: Scalars['String']['input'];
}>;


export type GetServerByInviteCodeQuery = { __typename?: 'Query', getServerByInviteCode?: { __typename?: 'Server', id: string } | null };

export type GetServerByProfileIdQueryVariables = Exact<{
  profileId: Scalars['String']['input'];
}>;


export type GetServerByProfileIdQuery = { __typename?: 'Query', getServerByProfileId?: { __typename?: 'Server', id: string } | null };

export type GetServerWithChannelByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
  profileId: Scalars['String']['input'];
}>;


export type GetServerWithChannelByIdQuery = { __typename?: 'Query', getServerWithChannelById?: { __typename?: 'Server', channels: Array<{ __typename?: 'Channel', id: string, name: string }> } | null };

export type GetServerWithChannelMemberProfileByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
  profileId: Scalars['String']['input'];
}>;


export type GetServerWithChannelMemberProfileByIdQuery = { __typename?: 'Query', getServerWithChannelMemberProfileById?: { __typename?: 'Server', id: string, name: string, imageUrl: string, inviteCode: string, profileId: string, members: Array<{ __typename?: 'Member', id: string, role: MemberRoleEnum, profileId: string, profile: { __typename?: 'Profile', name: string, email: string, imageUrl: string } }>, channels: Array<{ __typename?: 'Channel', id: string, name: string, type: ChannelTypeEnum }> } | null };

export type MessageCreatedSubscriptionVariables = Exact<{
  channelId: Scalars['String']['input'];
}>;


export type MessageCreatedSubscription = { __typename?: 'Subscription', messageCreated?: { __typename?: 'Message', id: string, content: string, fileUrl?: string | null, deleted: boolean, createdAt: any, updatedAt: any, member: { __typename?: 'Member', id: string, role: MemberRoleEnum, profile: { __typename?: 'Profile', name: string, imageUrl: string } } } | null };

export type MessageDeletedSubscriptionVariables = Exact<{
  channelId: Scalars['String']['input'];
}>;


export type MessageDeletedSubscription = { __typename?: 'Subscription', messageDeleted?: { __typename?: 'Message', id: string, content: string, fileUrl?: string | null, deleted: boolean, createdAt: any, updatedAt: any, member: { __typename?: 'Member', id: string, role: MemberRoleEnum, profile: { __typename?: 'Profile', name: string, imageUrl: string } } } | null };

export type MessageUpdatedSubscriptionVariables = Exact<{
  channelId: Scalars['String']['input'];
}>;


export type MessageUpdatedSubscription = { __typename?: 'Subscription', messageUpdated?: { __typename?: 'Message', id: string, content: string, fileUrl?: string | null, deleted: boolean, createdAt: any, updatedAt: any, member: { __typename?: 'Member', id: string, role: MemberRoleEnum, profile: { __typename?: 'Profile', name: string, imageUrl: string } } } | null };


export const CreateChannelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createChannel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateChannelDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createChannel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateChannelMutation, CreateChannelMutationVariables>;
export const DeleteChannelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteChannel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteChannelDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteChannel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteChannelMutation, DeleteChannelMutationVariables>;
export const UpdateChannelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateChannel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateChannelDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateChannel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateChannelMutation, UpdateChannelMutationVariables>;
export const CreateDmDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createDM"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateDMDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDM"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateDmMutation, CreateDmMutationVariables>;
export const DeleteDmDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteDM"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteDMDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteDM"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteDmMutation, DeleteDmMutationVariables>;
export const UpdateDmDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateDM"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateDMDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDM"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateDmMutation, UpdateDmMutationVariables>;
export const CreateMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inviteCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"inviteCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inviteCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateMemberMutation, CreateMemberMutationVariables>;
export const DeleteMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteMemberDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileId"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"profileId"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}}]}}]} as unknown as DocumentNode<DeleteMemberMutation, DeleteMemberMutationVariables>;
export const UpdateMemberRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateMemberRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMemberRoleDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMemberRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileId"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"profileId"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateMemberRoleMutation, UpdateMemberRoleMutationVariables>;
export const CreateMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMessageDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateMessageMutation, CreateMessageMutationVariables>;
export const DeleteMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteMessageDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const UpdateMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMessageDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateMessageMutation, UpdateMessageMutationVariables>;
export const CreateProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProfileDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateProfileMutation, CreateProfileMutationVariables>;
export const CreateInviteCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createInviteCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createInviteCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"inviteCode"}}]}}]}}]} as unknown as DocumentNode<CreateInviteCodeMutation, CreateInviteCodeMutationVariables>;
export const CreateServerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createServer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateServerDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createServer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateServerMutation, CreateServerMutationVariables>;
export const DeleteServerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteServer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteServer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteServerMutation, DeleteServerMutationVariables>;
export const LeaveServerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"leaveServer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveServer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<LeaveServerMutation, LeaveServerMutationVariables>;
export const UpdateServerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateServer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateServerDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateServer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateServerMutation, UpdateServerMutationVariables>;
export const GetChannelByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getChannelById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getChannelById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"serverId"}}]}}]}}]} as unknown as DocumentNode<GetChannelByIdQuery, GetChannelByIdQueryVariables>;
export const FetchConversationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchConversation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"memberOneId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"memberTwoId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchConversation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"memberOneId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"memberOneId"}}},{"kind":"Argument","name":{"kind":"Name","value":"memberTwoId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"memberTwoId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"memberOne"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profileId"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"memberTwo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profileId"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FetchConversationQuery, FetchConversationQueryVariables>;
export const GetBatchDMsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBatchDMs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBatchDMs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"conversationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"fileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"nextCursor"}}]}}]}}]} as unknown as DocumentNode<GetBatchDMsQuery, GetBatchDMsQueryVariables>;
export const GetMemberByServerIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMemberByServerId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"serverId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMemberByServerId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"serverId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"serverId"}}},{"kind":"Argument","name":{"kind":"Name","value":"profileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profileId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<GetMemberByServerIdQuery, GetMemberByServerIdQueryVariables>;
export const GetBatchMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBatchMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBatchMessages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"fileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"nextCursor"}}]}}]}}]} as unknown as DocumentNode<GetBatchMessagesQuery, GetBatchMessagesQueryVariables>;
export const GetProfileByUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProfileByUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProfileByUserId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetProfileByUserIdQuery, GetProfileByUserIdQueryVariables>;
export const GetAllServersByProfileIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllServersByProfileId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllServersByProfileId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"profileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profileId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<GetAllServersByProfileIdQuery, GetAllServersByProfileIdQueryVariables>;
export const GetServerByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getServerById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getServerById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"profileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profileId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetServerByIdQuery, GetServerByIdQueryVariables>;
export const GetServerByInviteCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getServerByInviteCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inviteCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getServerByInviteCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"inviteCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inviteCode"}}},{"kind":"Argument","name":{"kind":"Name","value":"profileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profileId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetServerByInviteCodeQuery, GetServerByInviteCodeQueryVariables>;
export const GetServerByProfileIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getServerByProfileId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getServerByProfileId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"profileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profileId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetServerByProfileIdQuery, GetServerByProfileIdQueryVariables>;
export const GetServerWithChannelByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getServerWithChannelById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getServerWithChannelById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"profileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profileId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetServerWithChannelByIdQuery, GetServerWithChannelByIdQueryVariables>;
export const GetServerWithChannelMemberProfileByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getServerWithChannelMemberProfileById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getServerWithChannelMemberProfileById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"profileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profileId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"inviteCode"}},{"kind":"Field","name":{"kind":"Name","value":"profileId"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"profileId"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"channels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]} as unknown as DocumentNode<GetServerWithChannelMemberProfileByIdQuery, GetServerWithChannelMemberProfileByIdQueryVariables>;
export const MessageCreatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"messageCreated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageCreated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"fileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MessageCreatedSubscription, MessageCreatedSubscriptionVariables>;
export const MessageDeletedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"messageDeleted"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageDeleted"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"fileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MessageDeletedSubscription, MessageDeletedSubscriptionVariables>;
export const MessageUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"messageUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"fileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MessageUpdatedSubscription, MessageUpdatedSubscriptionVariables>;