import { Community, communityState } from '@/src/atoms/communityAtoms';
import CreatePostLinks from '@/src/components/community/CreatePostLinks';
import Header from '@/src/components/community/Header';
import CommunityNotFound from '@/src/components/community/NotFound';
import Post from '@/src/components/Post/Post';
import { fireStore } from '@/src/Firebase/ClientApp';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React, { useEffect } from 'react';
import safeJsonStringify from 'safe-json-stringify';

import PageContent from '../../../components/Layout/PageContent';
import { useSetRecoilState } from 'recoil';
import CreatePostLink from '../../../components/community/CreatePostLinks';
import About from '@/src/components/community/About';

type CommunityPageProps = {
    communityData: Community;
};

const CommunityPage:React.FC<CommunityPageProps> = ({communityData}) => {
    console.log('here is data', communityData);
    console.log("here is data", communityData);
    const setCommunityStateValue = useSetRecoilState(communityState);
 

    useEffect(() => {
        setCommunityStateValue((prev) => ({
          ...prev,
          currentCommunity: communityData,
        }));
      }, [communityData]);

    if(!communityData){
        return <CommunityNotFound/>
    }
    return (
        <>
          <Header communityData={communityData} />
          <PageContent>
            <>
              <CreatePostLink />
              <Post communityData={communityData} />
            </>
            <>
              <About communityData={communityData} />
            </>
          </PageContent>
        </>
      );
   
}


export async function getServerSideProps(context: GetServerSidePropsContext){
    // get community data and pass it to client 

    try {
        const communityDocRef = doc(
            fireStore, 
            'communities', 
            context.query.communityId as string);
        const communityDoc = await  getDoc(communityDocRef);

        return  {
            props: {
                communityData: communityDoc.exists() ? JSON.parse(safeJsonStringify({id: communityDoc.id, ...communityDoc.data()})
                ): "", 
            }

        }
    } catch (error) {

        // Culd add error page here
        console.log('getServersideProps error',  error);
    }
}    

export default CommunityPage;