import { auth } from '@/src/Firebase/ClientApp';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Flex, Icon, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';
import { signOut, User } from 'firebase/auth';
import React from 'react';
import { CgProfile } from "react-icons/cg";
import { FaRedditSquare } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { MdOutlineLogin } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";

type UserMenuProps = {
    user?: User | null;
};

const UserMenu:React.FC<UserMenuProps> = ({user}) => {
    
    return (
        <Menu>
            <MenuButton cursor='pointer' padding='0px 6px'
                        borderRadius={4}
                        _hover={{outline: '1px solid' , outlineColor: 'gray.200'}}>
                    <Flex align="center">
                        <Flex align="center">
                            {user ? (
                                
                                        <>
                                            <Icon fontSize={24} mr={1} color='gray.300' as={FaRedditSquare}></Icon>
                                        </>
                                    
                            ) : (
                                <Icon fontSize={24} color="gray.400" mr={1} as={VscAccount}>  </Icon>
                            )}
                        </Flex>
                        <ChevronDownIcon/>
                    </Flex>
            </MenuButton>
            <MenuList>
                <MenuItem fontSize="10pt"
                          fontWeight={700}
                          _hover={{bg: 'blue.500', color: 'white'}}>
                    <Flex align="center">
                        <Icon as={CgProfile} fontSize={20} mr={2}/>
                        Profile
                    </Flex>
                </MenuItem>
                <MenuDivider/>
                <MenuItem fontSize="10pt"
                          fontWeight={700}
                          _hover={{bg: 'blue.500', color: 'white'}}
                          onClick={() => signOut(auth)}>
                    <Flex align="center">
                        <Icon as={MdOutlineLogin} fontSize={20} mr={2}/>
                        Log Out
                    </Flex>
                </MenuItem>
            </MenuList>
        </Menu>
    )
}
export default UserMenu;