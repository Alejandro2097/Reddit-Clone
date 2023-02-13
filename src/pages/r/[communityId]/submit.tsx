import PageContent from '@/src/components/Layout/PageContent';
import NewPostForm from '@/src/components/Post/NewPostForm';
import { auth } from '@/src/Firebase/ClientApp';
import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { useAuthState } from "react-firebase-hooks/auth";

const SubmitPostPage:React.FC = () => {
    const [user] = useAuthState(auth) 
    return (
        <PageContent>
            <>
                <Box p='14px 0px' borderBottom='1px solid' borderColor='white'>
                    <Text>Create post</Text>
                </Box>
                <NewPostForm user={user}/>
            </>
            <>
             {/* About */}
            </>
        </PageContent>
    )
}
export default SubmitPostPage;