import gql from "graphql-tag";

export const WARN_USER = gql`
    mutation warnUser($guildId: String!, $userId: String!, $reason: String) {
        warnUser(guildId: $guildId, userId: $userId, reason: $reason)
    }
`;

export const REPORT_USER = gql`
    mutation reportUser($guildId: String!, $userId: String!, $reason: String) {
        reportUser(guildId: $guildId, userId: $userId, reason: $reason)
    }
`;
