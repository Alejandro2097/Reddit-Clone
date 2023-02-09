import { fireStore } from '@/src/Firebase/ClientApp';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React from 'react';

type CommunityPageProps = {
    
};

const CommunityPage:React.FC<CommunityPageProps> = () => {
    
    return <div>Community Page</div>
   
}


async function getServerSideProps(context: GetServerSidePropsContext){
    // get community data and pass it to client 

    try {
        const communityDocRef = doc(
            fireStore, 
            'communities', 
            context.query.communityId as string);
        const communityDoc = await  getDoc(communityDocRef);

        return  {
            props: {
                communityData: communityDoc.data(), 
            }

        }
    } catch (error) {
        console.log('getServersideProps error',  error);
    }
}    

export default CommunityPage;