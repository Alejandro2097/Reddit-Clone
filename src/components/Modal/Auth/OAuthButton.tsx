import { Button, Flex } from '@chakra-ui/react';
import React from 'react';

type OAuthButtonProps = {
    
};

const OAuthButton:React.FC<OAuthButtonProps> = () => {
    
    return (
        <Flex>
            <Button>Continue whith Google</Button>
        </Flex>
    )
}
export default OAuthButton;