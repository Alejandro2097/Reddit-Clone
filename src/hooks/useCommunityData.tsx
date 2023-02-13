import { auth, fireStore } from '@/src/Firebase/ClientApp';
import { collection, doc, getDocs, increment, writeBatch } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { CommaListExpression } from 'typescript';

import { authModalState } from '../atoms/authModalAtom';
import { Community, CommunitySnippet, communityState } from '../atoms/communityAtoms';

const useCommunityData = () => {
    const [user] = useAuthState(auth);
    const [communityStateValue, setCommunityStateValue, ] = useRecoilState(communityState);
    const setAuthModalState = useSetRecoilState(authModalState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const onJoinOrLeaveCommunity = (communityData: Community, isJoined: boolean) => {
        // is the user sign in
        //if not => open auth modal
        if(!user){
            // open modal
            setAuthModalState({open: true, view: 'login'})
        }
        if(isJoined) {
            leaveCommunity(communityData.id);
            return;
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
        } catch (error: any) {
            console.log('getMySnippetError', error);
            setError(error.message);
        }
        setLoading(false);
    }

    const joinCommunity = async (communityData: Community) => {

        //Batch write
            // create a new community snippet

            // updating the numberOfMembers
            try {
                const batch = writeBatch(fireStore);
                const newSnippet: CommunitySnippet = {
                    communityId: communityData.id,
                    imageUrl: communityData.imageURL || "",
                };
                batch.set(
                    doc(
                        fireStore, 
                        `users/${user?.uid}/communitySnippets`, 
                        communityData.id
                    ),
                    newSnippet
                );
                batch.update(doc(fireStore, "communities", communityData.id), {
                    numberOfMembers: increment(1),
                });
                await batch.commit();
                setCommunityStateValue(prev => ({
                    ...prev,
                    mySnippets: [...prev.mySnippets, newSnippet],
                }));
            } catch (error: any) {
                console.log('joinCommunity error', error);
                setError(error.message);
            }
            setLoading(false);
        // update recoil state - communityState.mySnippets
    };


    const leaveCommunity = async (communityid: string) => {
        //Batch write
            // delete a new community snippet

            // deleting the numberOfMembers
        try {
            const batch =  writeBatch(fireStore);
            batch.delete(
                doc(
                    fireStore, `users/${user?.uid}/communitySnippets` , communityid
                )
            );
            batch.update(doc(fireStore, "communities", communityid), {
                numberOfMembers: increment(-1),
            }); 
            await batch.commit();
            setCommunityStateValue((prev) => ({
                ...prev,
                mySnippets: prev.mySnippets.filter(
                    (item) => item.communityId !== communityid
                ),
            }));
        } catch (error: any) {
            console.log('Leave community error', error.message);
            setError(error.message);
        }
        setLoading(false);
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