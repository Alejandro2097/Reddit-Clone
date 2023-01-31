import { Button, Flex, Image } from '@chakra-ui/react';
import React from 'react';

type OAuthButtonProps = {
    
};

const OAuthButton:React.FC<OAuthButtonProps> = () => {
    
    return (
        <Flex direction='column'
              width='100%'
              mb={4}>
            <Button variant='oauth' mb={2}>
                <Image src="/images/googlelogo.png" alt='google logo' height="20px" mr={4}/>
                Continue whith Google
            </Button>
            <Button variant='oauth'>Some other provider</Button>
        </Flex>
    )
}
export default OAuthButton;