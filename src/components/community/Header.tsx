import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

import { Community } from '../../atoms/communityAtoms';

type HeaderProps = {
    communityData: Community;
};

const Header:React.FC<HeaderProps> = ({communityData}) => {
    
    return (
        <Flex direction='column' width='100%' height='146px'>
            <Box height='50%' bg='blue.400'></Box>
            <Flex justify='center' bg='white' flexGrow={1}>
                <Flex width='95%' maxWidth='860px' border="1px solid red">

                </Flex>
            </Flex>
        </Flex>
    )
}
export default Header;