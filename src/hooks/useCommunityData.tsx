import React from 'react';
import { useRecoilState } from 'recoil';

import { communityState } from '../atoms/communityAtoms';

const useCommunityData = () => {

    const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState);
    
    const joinCommunity = () => {}
    const leaveCommunity = () => {}

    return {
        // data and functions
        communityStateValue,
        joinCommunity,
        leaveCommunity
    }
}
export default useCommunityData;