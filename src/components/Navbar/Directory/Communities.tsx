import { Flex, Icon, MenuItem } from '@chakra-ui/react';
import React, { useState } from 'react';
import { GrAdd } from 'react-icons/gr';

'react-icons/gr';

import CreateComunityModal from '../../Modal/CreateCommunity/CreateComunityModal';

type CommunitiesProps = {
    
};

const Communities:React.FC<CommunitiesProps> = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <CreateComunityModal open={open} handleClose={() => setOpen(false)}/>
            <MenuItem width="100%" 
                      fontSize="10pt"
                      _hover={{ bg: "gray.100"}}
                      onClick={() => setOpen(true)}>
                <Flex align="center">
                    <Icon as={GrAdd}/>
                    Create community 
                </Flex>
            </MenuItem>
        </> 
    )
}
export default Communities;