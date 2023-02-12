import { auth, fireStore } from '@/src/Firebase/ClientApp';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';
import { CommaListExpression } from 'typescript';

import { Community, CommunitySnippet, communityState } from '../atoms/communityAtoms';

const useCommunityData = () => {
    const [user] = useAuthState(auth);
    const [communityStateValue, setCommunityStateValue, ] = useRecoilState(communityState);
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
            setCommunityStateValue((prev) => ({
                ...prev,
                mySnippets: snippets as CommunitySnippet[]
            }))
            console.log("here are snippets", snippets);
        } catch (error) {
            console.log('getMySnippetError', error);
        }
        setLoading(false);
    }

    const joinCommunity = (communityData: Community) => {

        //Batch write
            // create a new community snippet

            // updating the numberOfMembers
        
        // update recoil state - communityState.mySnippets
    };


    const leaveCommunity = (communityid: string) => {
        //Batch write
            // delete a new community snippet

            // deleting the numberOfMembers
        
        // update recoil state - communityState.mySnippets
    }

    useEffect(() => {
        if(!user) return;
        getMySnippets();
    }, [user]);
    return {
        // data and functions
        communityStateValue,
        onJoinOrLeaveCommunity,
        loading,
    }
}
export default useCommunityData;