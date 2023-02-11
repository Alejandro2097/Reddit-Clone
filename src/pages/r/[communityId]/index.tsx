import { Community } from '@/src/atoms/communityAtoms';
import { fireStore } from '@/src/Firebase/ClientApp';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import safeJsonStringify from 'safe-json-stringify';

type CommunityPageProps = {
    communityData: Community;
};

const CommunityPage:React.FC<CommunityPageProps> = ({communityData}) => {
    console.log('here is data', communityData);

    if(!communityData){
        return <div>Community does not exist</div>
    }
    return <div>Welcome to {communityData.id}</div>
   
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