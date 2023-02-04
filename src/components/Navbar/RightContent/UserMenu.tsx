import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Flex, Icon, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import React from 'react';
import { FaRedditSquare } from "react-icons/fa";

type UserMenuProps = {
    user?: User | null;
};

const UserMenu:React.FC<UserMenuProps> = ({user}) => {
    
    return (
        <Menu>
            <MenuButton cursor='pointer' padding='0px 6px'
                        borderRadius={4}
                        _hover={{outline: '1px solid' , outlineColor: 'gray.200'}}>
                {user ? (
                    <Flex>
                        <Flex>
                            <>
                                <Icon fontSize={24} mr={1} color='gray.300' as={FaRedditSquare}></Icon>
                            </>
                            <ChevronDownIcon/>
                        </Flex>
                    </Flex>
                ) : <div>no user</div>}
            </MenuButton>
            <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
        </Menu>
    )
}
export default UserMenu;