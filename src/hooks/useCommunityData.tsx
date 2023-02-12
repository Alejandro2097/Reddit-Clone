import React from 'react';
import { useRecoilState } from 'recoil';

import { Community, communityState } from '../atoms/communityAtoms';

const useCommunityData = () => {

    const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState);

    const onJoinOrLeaveCommunity = (communityData: Community, isJoined: boolean) => {
        // is the user sign in
        //if not => open auth modal

        if(isJoined) {
            leaveCommunity(communityData.id);
        }
        joinCommunity(communityData)
    }
    
    const joinCommunity = (communityData: Community) => {}
    const leaveCommunity = (communityid: string) => {}

    return {
        // data and functions
        communityStateValue,
        onJoinOrLeaveCommunity
    }
}
export default useCommunityData;