import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

import { Community } from '../../atoms/communityAtoms';

type HeaderProps = {
    communityData: Community;
};

const Header:React.FC<HeaderProps> = ({communityData}) => {
    
    return (
        <Flex direction='column' width='100%' height='146px'>
            <Box></Box>
        </Flex>
    )
}
export default Header;