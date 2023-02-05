import { auth } from '@/src/Firebase/ClientApp';
import { Flex, Image } from '@chakra-ui/react';
import React from 'react';
import { useAuthState } from "react-firebase-hooks/auth"

import Directory from './Directory/Directory';
import RightContent from './RightContent/RightContent';
import SearchInput from './SearchInput';

type NavbarProps = {
    
};

const Navbar:React.FC<NavbarProps> = () => {
    const [ user, loading, error ] = useAuthState(auth)
    return (
        <Flex bg="white" height="44px" padding="6px 12px">
            <Flex align='center'>
                <Image src="/images/redditFace.svg" alt="reddit image" height='30px' />
                <Image src="/images/redditText.svg"
                       alt="reddit text" 
                       height='46px' 
                       display={{ base: 'none', md: "unset"}}/>
            </Flex>
            <Directory/>
            <SearchInput/>
            <RightContent user={user}/> 
            
            
        </Flex>
    )
}
export default Navbar;