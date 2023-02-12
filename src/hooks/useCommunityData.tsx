import { auth, fireStore } from '@/src/Firebase/ClientApp';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';

import { Community, communityState } from '../atoms/communityAtoms';

const useCommunityData = () => {
    const [user] = useAuthState(auth);
    const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const onJoinOrLeaveCommunity = (communityData: Community, isJoined: boolean) => {
        // is the user sign in
        //if not => open auth modal

        if(isJoined) {
            leaveCommunity(communityData.id);
        }
        joinCommunity(communityData)
    }
    const getMySnippets = async () => {
        setLoading(true);
        try {
            // get the user snippets
            const snippetDocs = await getDocs(
                collection(fireStore, `users/${user?.uid}/communitySnippets`)
            );
            const snippets = snippetDocs.docs.map(doc => ({ ...doc.data()}));
            console.log("here are snippets", snippets);
        } catch (error) {
            console.log('getMySnippetError', error);
        }
    }

    const joinCommunity = (communityData: Community) => {}
    const leaveCommunity = (communityid: string) => {}

    useEffect(() => {
        getMySnippets();
    }, [user]);
    return {
        // data and functions
        communityStateValue,
        onJoinOrLeaveCommunity
    }
}
export default useCommunityData;