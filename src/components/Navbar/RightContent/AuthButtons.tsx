import { Button } from '@chakra-ui/react';
import React from 'react';

type AuthButtonsProps = {
    
};

const AuthButtons:React.FC<AuthButtonsProps> = () => {
    
    return (
        <>
            <Button>Log In</Button>
            <Button>Sign In</Button>
        </>
    )
}
export default AuthButtons;