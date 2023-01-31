import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { useRecoilState } from 'recoil';

import { authModalState } from '../../../atoms/authModalAtom';
import AuthInputs from './AuthInputs';
import OAuthButton from './OAuthButton';

type AuthModalProps = {
    
};

const AuthModal:React.FC<AuthModalProps> = () => {
    const [modalState, setModalState] = useRecoilState(authModalState)
    const handleClose = () => {
        setModalState((prev: any) => ({
            ...prev,
            open: false,
        }))
    }
    return (
        <>
            <Modal isOpen={modalState.open} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader textAlign='center'>
                    {modalState.view == 'login' && 'login'}
                    {modalState.view == 'signup' && 'Sign up'}
                    {modalState.view == 'resetPassword' && 'Reset  Password'}
                </ModalHeader>
                <ModalCloseButton />
                    <ModalBody display='flex'
                               flexDirection='column'
                               alignItems='center'
                               justifyContent='center'
                               pb={6}
                    >   
                        <Flex flexDirection='column'
                              align='center'
                              justify='center'
                              width='70%'
                        >
                            <OAuthButton/>
                            <Text color="gray.500" fontWeight={700}>
                                OR
                            </Text>
                            <AuthInputs/>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
export default AuthModal;

