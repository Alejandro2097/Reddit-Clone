import { authModalState } from '@/src/atoms/authModalAtom';
import { auth } from '@/src/Firebase/ClientApp';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Icon, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { signOut, User } from 'firebase/auth';
import React from 'react';
import { TiHome } from "react-icons/ti";

type UserMenuProps = {
    user?: User | null;
};

const UserMenu:React.FC<UserMenuProps> = () => {
    return (
        <Menu>
            <MenuButton cursor='pointer' 
                        padding='0px 6px'
                        mr={2}
                        ml={{base: 0, md: 2}}
                        borderRadius={4}
                        _hover={{outline: '1px solid' , outlineColor: 'gray.200'}}>
                    <Flex align="center"
                        justify='space-between' 
                        width={{base: 'auto', lg: "200px"}}>
                        <Flex align="center">
                            <Icon as={TiHome}
                                mr={{base: 1, md: 2}}
                                fontSize={24}/>
                            <Flex display={{ base: 'none', lg: 'flex'}}>
                                <Text fontWeight={600}>Home</Text>
                            </Flex>
                        </Flex>
                        <ChevronDownIcon/>
                    </Flex>
            </MenuButton>
            <MenuList>
                
            </MenuList>
        </Menu>
    )
}
export default UserMenu;