import { Timestamp } from '@google-cloud/firestore';
import { atom } from 'recoil';

export interface Community {
    id: string;
    creatorId: string;
    numberOfmembers: number;
    privateType: 'public' | 'restricted' | 'private';
    createdAt?: Timestamp;
    imageURL?: string;
}

interface CommunitySnippet {
    communityId: string;
    isModerator?: boolean;
    imageUrl?: string;
}

interface CommunityState {
    mySnippets: CommunitySnippet[];
    // viisited communities
}