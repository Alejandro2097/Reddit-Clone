import { auth } from '@/src/Firebase/ClientApp';
import { Button, Flex } from '@chakra-ui/react';
import { signOut, User } from 'firebase/auth';
import React from 'react';

import AuthModal from '../../Modal/Auth/AuthModal';
import AuthButtons from './AuthButtons';
import Icons from './icons'
import UserMenu from './UserMenu';

type RightContentProps = {
    user?: User | null;
};

const RightContent:React.FC<RightContentProps> = ({user}) => {
    
    return (
        <>
            <AuthModal/> 
            <Flex justify='center' align='center'>
                {user ?  <Icons/> :<AuthButtons/>}
                <UserMenu user={user}/>
            </Flex>
        </>
    )
}
export default RightContent;