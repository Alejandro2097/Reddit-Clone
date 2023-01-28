import { Flex, Image } from '@chakra-ui/react';
import React from 'react';

import RightContent from './RightContent/RightContent';
import SearchInput from './SearchInput';

type NavbarProps = {
    
};

const Navbar:React.FC<NavbarProps> = () => {
    
    return (
        <Flex bg="white" height="44px" padding="6px 12px">
            <Flex align='center'>
                <Image src="/images/redditFace.svg" alt="reddit image" height='30px' />
                <Image src="/images/redditText.svg"
                       alt="reddit text" 
                       height='46px' 
                       display={{ base: 'none', md: "unset"}}/>
            </Flex>
            <SearchInput/>
            <RightContent/> 
            {/* <Directory/>
            */}
        </Flex>
    )
}
export default Navbar;