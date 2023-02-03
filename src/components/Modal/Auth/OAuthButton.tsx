import { Button, Flex, Image, Text } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

import { auth } from '../../../Firebase/ClientApp'

type OAuthButtonProps = {
    children?: ReactNode;
};

const OAuthButton:React.FC<OAuthButtonProps> = () => {
    const [signInWithGoogle, user, loading, error] =  useSignInWithGoogle(auth);
    return (
        <Flex direction='column'
              width='100%'
              mb={4}>
            <Button variant='oauth'
                    mb={2} width="100%" 
                    isLoading={loading} 
                    onClick={() => signInWithGoogle()}>
                <Image src="/images/googlelogo.png" alt='google logo' height="20px" mr={4}/>
                Continue whith Google
            </Button>
            <Button variant='oauth'>Some other provider</Button>
            {error && <Text>error</Text>}
        </Flex>
    )
}
export default OAuthButton;