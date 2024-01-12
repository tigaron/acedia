/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation createChannel($input: CreateChannelDto!) {\n    createChannel(input: $input) {\n      id\n    }\n  }\n": types.CreateChannelDocument,
    "\n  mutation deleteChannel($input: DeleteChannelDto!) {\n    deleteChannel(input: $input) {\n      id\n    }\n  }\n": types.DeleteChannelDocument,
    "\n  mutation updateChannel($input: UpdateChannelDto!) {\n    updateChannel(input: $input) {\n      id\n    }\n  }\n": types.UpdateChannelDocument,
    "\n  mutation createDM($input: CreateDMDto!) {\n    createDM(input: $input) {\n      id\n    }\n  }\n": types.CreateDmDocument,
    "\n  mutation deleteDM($input: DeleteDMDto!) {\n    deleteDM(input: $input) {\n      id\n    }\n  }\n": types.DeleteDmDocument,
    "\n  mutation updateDM($input: UpdateDMDto!) {\n    updateDM(input: $input) {\n      id\n    }\n  }\n": types.UpdateDmDocument,
    "\n  mutation createMember($inviteCode: String!) {\n    createMember(inviteCode: $inviteCode) {\n      id\n    }\n  }\n": types.CreateMemberDocument,
    "\n  mutation deleteMember($input: DeleteMemberDto!) {\n    deleteMember(input: $input) {\n      id\n      profileId\n      members {\n        id\n        role\n        profileId\n        profile {\n          name\n          email\n          imageUrl\n        }\n      }\n    }\n  }\n": types.DeleteMemberDocument,
    "\n  mutation updateMemberRole($input: UpdateMemberRoleDto!) {\n    updateMemberRole(input: $input) {\n      id\n      profileId\n      members {\n        id\n        role\n        profileId\n        profile {\n          name\n          email\n          imageUrl\n        }\n      }\n    }\n  }\n": types.UpdateMemberRoleDocument,
    "\n  mutation createMessage($input: CreateMessageDto!) {\n    createMessage(input: $input) {\n      id\n    }\n  }\n": types.CreateMessageDocument,
    "\n  mutation deleteMessage($input: DeleteMessageDto!) {\n    deleteMessage(input: $input) {\n      id\n    }\n  }\n": types.DeleteMessageDocument,
    "\n  mutation updateMessage($input: UpdateMessageDto!) {\n    updateMessage(input: $input) {\n      id\n    }\n  }\n": types.UpdateMessageDocument,
    "\n  mutation createProfile($input: CreateProfileDto!) {\n    createProfile(input: $input) {\n      id\n    }\n  }\n": types.CreateProfileDocument,
    "\n  mutation createInviteCode($id: String!) {\n    createInviteCode(id: $id) {\n      id\n      inviteCode\n    }\n  }\n": types.CreateInviteCodeDocument,
    "\n  mutation createServer($input: CreateServerDto!) {\n    createServer(input: $input) {\n      id\n    }\n  }\n": types.CreateServerDocument,
    "\n  mutation deleteServer($id: String!) {\n    deleteServer(id: $id) {\n      id\n    }\n  }\n": types.DeleteServerDocument,
    "\n  mutation leaveServer($id: String!) {\n    leaveServer(id: $id) {\n      id\n    }\n  }\n": types.LeaveServerDocument,
    "\n  mutation updateServer($input: UpdateServerDto!) {\n    updateServer(input: $input) {\n      id\n    }\n  }\n": types.UpdateServerDocument,
    "\n  query getChannelById($id: String!) {\n    getChannelById(id: $id) {\n      id\n      name\n      type\n      serverId\n    }\n  }\n": types.GetChannelByIdDocument,
    "\n  query fetchConversation($memberOneId: String!, $memberTwoId: String!) {\n    fetchConversation(memberOneId: $memberOneId, memberTwoId: $memberTwoId) {\n      id\n      memberOne {\n        profileId\n        profile {\n          name\n          imageUrl\n        }\n      }\n      memberTwo {\n        profileId\n        profile {\n          name\n          imageUrl\n        }\n      }\n    }\n  }\n": types.FetchConversationDocument,
    "\n  query getBatchDMs($conversationId: String!, $cursor: String) {\n    getBatchDMs(conversationId: $conversationId, cursor: $cursor) {\n      messages {\n        id\n        content\n        fileUrl\n        deleted\n        createdAt\n        updatedAt\n        member {\n          id\n          role\n          profile {\n            name\n            imageUrl\n          }\n        }\n      }\n      nextCursor\n    }\n  }\n": types.GetBatchDMsDocument,
    "\n  query getMemberByServerId($serverId: String!, $profileId: String!) {\n    getMemberByServerId(serverId: $serverId, profileId: $profileId) {\n      id\n      role\n    }\n  }\n": types.GetMemberByServerIdDocument,
    "\n  query getBatchMessages($channelId: String!, $cursor: String) {\n    getBatchMessages(channelId: $channelId, cursor: $cursor) {\n      messages {\n        id\n        content\n        fileUrl\n        deleted\n        createdAt\n        updatedAt\n        member {\n          id\n          role\n          profile {\n            name\n            imageUrl\n          }\n        }\n      }\n      nextCursor\n    }\n  }\n": types.GetBatchMessagesDocument,
    "\n  query getProfileByUserId($userId: String!) {\n    getProfileByUserId(userId: $userId) {\n      id\n    }\n  }\n": types.GetProfileByUserIdDocument,
    "\n  query getAllServersByProfileId($profileId: String!) {\n    getAllServersByProfileId(profileId: $profileId) {\n      id\n      name\n      imageUrl\n    }\n  }\n": types.GetAllServersByProfileIdDocument,
    "\n  query getServerById($id: String!, $profileId: String!) {\n    getServerById(id: $id, profileId: $profileId) {\n      id\n    }\n  }\n": types.GetServerByIdDocument,
    "\n  query getServerByInviteCode($inviteCode: String!, $profileId: String!) {\n    getServerByInviteCode(inviteCode: $inviteCode, profileId: $profileId) {\n      id\n    }\n  }\n": types.GetServerByInviteCodeDocument,
    "\n  query getServerByProfileId($profileId: String!) {\n    getServerByProfileId(profileId: $profileId) {\n      id\n    }\n  }\n": types.GetServerByProfileIdDocument,
    "\n  query getServerWithChannelById($id: String!, $profileId: String!) {\n    getServerWithChannelById(id: $id, profileId: $profileId) {\n      channels {\n        id\n        name\n      }\n    }\n  }\n": types.GetServerWithChannelByIdDocument,
    "\n  query getServerWithChannelMemberProfileById(\n    $id: String!\n    $profileId: String!\n  ) {\n    getServerWithChannelMemberProfileById(id: $id, profileId: $profileId) {\n      id\n      name\n      imageUrl\n      inviteCode\n      profileId\n      members {\n        id\n        role\n        profileId\n        profile {\n          name\n          email\n          imageUrl\n        }\n      }\n      channels {\n        id\n        name\n        type\n      }\n    }\n  }\n": types.GetServerWithChannelMemberProfileByIdDocument,
    "\n  subscription messageCreated($channelId: String!) {\n    messageCreated(channelId: $channelId) {\n      id\n      content\n      fileUrl\n      deleted\n      createdAt\n      updatedAt\n      member {\n        id\n        role\n        profile {\n          name\n          imageUrl\n        }\n      }\n    }\n  }\n": types.MessageCreatedDocument,
    "\n  subscription messageDeleted($channelId: String!) {\n    messageDeleted(channelId: $channelId) {\n      id\n      content\n      fileUrl\n      deleted\n      createdAt\n      updatedAt\n      member {\n        id\n        role\n        profile {\n          name\n          imageUrl\n        }\n      }\n    }\n  }\n": types.MessageDeletedDocument,
    "\n  subscription messageUpdated($channelId: String!) {\n    messageUpdated(channelId: $channelId) {\n      id\n      content\n      fileUrl\n      deleted\n      createdAt\n      updatedAt\n      member {\n        id\n        role\n        profile {\n          name\n          imageUrl\n        }\n      }\n    }\n  }\n": types.MessageUpdatedDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createChannel($input: CreateChannelDto!) {\n    createChannel(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createChannel($input: CreateChannelDto!) {\n    createChannel(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteChannel($input: DeleteChannelDto!) {\n    deleteChannel(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteChannel($input: DeleteChannelDto!) {\n    deleteChannel(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateChannel($input: UpdateChannelDto!) {\n    updateChannel(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateChannel($input: UpdateChannelDto!) {\n    updateChannel(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createDM($input: CreateDMDto!) {\n    createDM(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createDM($input: CreateDMDto!) {\n    createDM(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteDM($input: DeleteDMDto!) {\n    deleteDM(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteDM($input: DeleteDMDto!) {\n    deleteDM(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateDM($input: UpdateDMDto!) {\n    updateDM(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateDM($input: UpdateDMDto!) {\n    updateDM(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createMember($inviteCode: String!) {\n    createMember(inviteCode: $inviteCode) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createMember($inviteCode: String!) {\n    createMember(inviteCode: $inviteCode) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteMember($input: DeleteMemberDto!) {\n    deleteMember(input: $input) {\n      id\n      profileId\n      members {\n        id\n        role\n        profileId\n        profile {\n          name\n          email\n          imageUrl\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation deleteMember($input: DeleteMemberDto!) {\n    deleteMember(input: $input) {\n      id\n      profileId\n      members {\n        id\n        role\n        profileId\n        profile {\n          name\n          email\n          imageUrl\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateMemberRole($input: UpdateMemberRoleDto!) {\n    updateMemberRole(input: $input) {\n      id\n      profileId\n      members {\n        id\n        role\n        profileId\n        profile {\n          name\n          email\n          imageUrl\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation updateMemberRole($input: UpdateMemberRoleDto!) {\n    updateMemberRole(input: $input) {\n      id\n      profileId\n      members {\n        id\n        role\n        profileId\n        profile {\n          name\n          email\n          imageUrl\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createMessage($input: CreateMessageDto!) {\n    createMessage(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createMessage($input: CreateMessageDto!) {\n    createMessage(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteMessage($input: DeleteMessageDto!) {\n    deleteMessage(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteMessage($input: DeleteMessageDto!) {\n    deleteMessage(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateMessage($input: UpdateMessageDto!) {\n    updateMessage(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateMessage($input: UpdateMessageDto!) {\n    updateMessage(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createProfile($input: CreateProfileDto!) {\n    createProfile(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createProfile($input: CreateProfileDto!) {\n    createProfile(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createInviteCode($id: String!) {\n    createInviteCode(id: $id) {\n      id\n      inviteCode\n    }\n  }\n"): (typeof documents)["\n  mutation createInviteCode($id: String!) {\n    createInviteCode(id: $id) {\n      id\n      inviteCode\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createServer($input: CreateServerDto!) {\n    createServer(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createServer($input: CreateServerDto!) {\n    createServer(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteServer($id: String!) {\n    deleteServer(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteServer($id: String!) {\n    deleteServer(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation leaveServer($id: String!) {\n    leaveServer(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation leaveServer($id: String!) {\n    leaveServer(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateServer($input: UpdateServerDto!) {\n    updateServer(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateServer($input: UpdateServerDto!) {\n    updateServer(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getChannelById($id: String!) {\n    getChannelById(id: $id) {\n      id\n      name\n      type\n      serverId\n    }\n  }\n"): (typeof documents)["\n  query getChannelById($id: String!) {\n    getChannelById(id: $id) {\n      id\n      name\n      type\n      serverId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchConversation($memberOneId: String!, $memberTwoId: String!) {\n    fetchConversation(memberOneId: $memberOneId, memberTwoId: $memberTwoId) {\n      id\n      memberOne {\n        profileId\n        profile {\n          name\n          imageUrl\n        }\n      }\n      memberTwo {\n        profileId\n        profile {\n          name\n          imageUrl\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query fetchConversation($memberOneId: String!, $memberTwoId: String!) {\n    fetchConversation(memberOneId: $memberOneId, memberTwoId: $memberTwoId) {\n      id\n      memberOne {\n        profileId\n        profile {\n          name\n          imageUrl\n        }\n      }\n      memberTwo {\n        profileId\n        profile {\n          name\n          imageUrl\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getBatchDMs($conversationId: String!, $cursor: String) {\n    getBatchDMs(conversationId: $conversationId, cursor: $cursor) {\n      messages {\n        id\n        content\n        fileUrl\n        deleted\n        createdAt\n        updatedAt\n        member {\n          id\n          role\n          profile {\n            name\n            imageUrl\n          }\n        }\n      }\n      nextCursor\n    }\n  }\n"): (typeof documents)["\n  query getBatchDMs($conversationId: String!, $cursor: String) {\n    getBatchDMs(conversationId: $conversationId, cursor: $cursor) {\n      messages {\n        id\n        content\n        fileUrl\n        deleted\n        createdAt\n        updatedAt\n        member {\n          id\n          role\n          profile {\n            name\n            imageUrl\n          }\n        }\n      }\n      nextCursor\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getMemberByServerId($serverId: String!, $profileId: String!) {\n    getMemberByServerId(serverId: $serverId, profileId: $profileId) {\n      id\n      role\n    }\n  }\n"): (typeof documents)["\n  query getMemberByServerId($serverId: String!, $profileId: String!) {\n    getMemberByServerId(serverId: $serverId, profileId: $profileId) {\n      id\n      role\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getBatchMessages($channelId: String!, $cursor: String) {\n    getBatchMessages(channelId: $channelId, cursor: $cursor) {\n      messages {\n        id\n        content\n        fileUrl\n        deleted\n        createdAt\n        updatedAt\n        member {\n          id\n          role\n          profile {\n            name\n            imageUrl\n          }\n        }\n      }\n      nextCursor\n    }\n  }\n"): (typeof documents)["\n  query getBatchMessages($channelId: String!, $cursor: String) {\n    getBatchMessages(channelId: $channelId, cursor: $cursor) {\n      messages {\n        id\n        content\n        fileUrl\n        deleted\n        createdAt\n        updatedAt\n        member {\n          id\n          role\n          profile {\n            name\n            imageUrl\n          }\n        }\n      }\n      nextCursor\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getProfileByUserId($userId: String!) {\n    getProfileByUserId(userId: $userId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  query getProfileByUserId($userId: String!) {\n    getProfileByUserId(userId: $userId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAllServersByProfileId($profileId: String!) {\n    getAllServersByProfileId(profileId: $profileId) {\n      id\n      name\n      imageUrl\n    }\n  }\n"): (typeof documents)["\n  query getAllServersByProfileId($profileId: String!) {\n    getAllServersByProfileId(profileId: $profileId) {\n      id\n      name\n      imageUrl\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getServerById($id: String!, $profileId: String!) {\n    getServerById(id: $id, profileId: $profileId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  query getServerById($id: String!, $profileId: String!) {\n    getServerById(id: $id, profileId: $profileId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getServerByInviteCode($inviteCode: String!, $profileId: String!) {\n    getServerByInviteCode(inviteCode: $inviteCode, profileId: $profileId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  query getServerByInviteCode($inviteCode: String!, $profileId: String!) {\n    getServerByInviteCode(inviteCode: $inviteCode, profileId: $profileId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getServerByProfileId($profileId: String!) {\n    getServerByProfileId(profileId: $profileId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  query getServerByProfileId($profileId: String!) {\n    getServerByProfileId(profileId: $profileId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getServerWithChannelById($id: String!, $profileId: String!) {\n    getServerWithChannelById(id: $id, profileId: $profileId) {\n      channels {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query getServerWithChannelById($id: String!, $profileId: String!) {\n    getServerWithChannelById(id: $id, profileId: $profileId) {\n      channels {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getServerWithChannelMemberProfileById(\n    $id: String!\n    $profileId: String!\n  ) {\n    getServerWithChannelMemberProfileById(id: $id, profileId: $profileId) {\n      id\n      name\n      imageUrl\n      inviteCode\n      profileId\n      members {\n        id\n        role\n        profileId\n        profile {\n          name\n          email\n          imageUrl\n        }\n      }\n      channels {\n        id\n        name\n        type\n      }\n    }\n  }\n"): (typeof documents)["\n  query getServerWithChannelMemberProfileById(\n    $id: String!\n    $profileId: String!\n  ) {\n    getServerWithChannelMemberProfileById(id: $id, profileId: $profileId) {\n      id\n      name\n      imageUrl\n      inviteCode\n      profileId\n      members {\n        id\n        role\n        profileId\n        profile {\n          name\n          email\n          imageUrl\n        }\n      }\n      channels {\n        id\n        name\n        type\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription messageCreated($channelId: String!) {\n    messageCreated(channelId: $channelId) {\n      id\n      content\n      fileUrl\n      deleted\n      createdAt\n      updatedAt\n      member {\n        id\n        role\n        profile {\n          name\n          imageUrl\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription messageCreated($channelId: String!) {\n    messageCreated(channelId: $channelId) {\n      id\n      content\n      fileUrl\n      deleted\n      createdAt\n      updatedAt\n      member {\n        id\n        role\n        profile {\n          name\n          imageUrl\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription messageDeleted($channelId: String!) {\n    messageDeleted(channelId: $channelId) {\n      id\n      content\n      fileUrl\n      deleted\n      createdAt\n      updatedAt\n      member {\n        id\n        role\n        profile {\n          name\n          imageUrl\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription messageDeleted($channelId: String!) {\n    messageDeleted(channelId: $channelId) {\n      id\n      content\n      fileUrl\n      deleted\n      createdAt\n      updatedAt\n      member {\n        id\n        role\n        profile {\n          name\n          imageUrl\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription messageUpdated($channelId: String!) {\n    messageUpdated(channelId: $channelId) {\n      id\n      content\n      fileUrl\n      deleted\n      createdAt\n      updatedAt\n      member {\n        id\n        role\n        profile {\n          name\n          imageUrl\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription messageUpdated($channelId: String!) {\n    messageUpdated(channelId: $channelId) {\n      id\n      content\n      fileUrl\n      deleted\n      createdAt\n      updatedAt\n      member {\n        id\n        role\n        profile {\n          name\n          imageUrl\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;