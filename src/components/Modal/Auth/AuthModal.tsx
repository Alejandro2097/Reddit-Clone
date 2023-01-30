import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { useRecoilState } from 'recoil';

import { authModalState } from '../../../atoms/authModalAtom';

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
                <ModalHeader>
                    {modalState.view == 'login' && 'login'}
                    {modalState.view == 'signup' && 'Sign up'}
                    {modalState.view == 'resetPassword' && 'Reset  Password'}
                </ModalHeader>
                <ModalCloseButton />
                    <ModalBody display='flex'
                               flexDirection='column'
                               alignItems='center'
                               justifyContent='center'
                    >   
                        <Flex flexDirection='column'
                              align='center'
                              justify='center'
                              width='70%'
                              border='1px solid red'
                        >

                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
export default AuthModal;

