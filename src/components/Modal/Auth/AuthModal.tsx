import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';

import { authModalState } from '../../../atoms/authModalAtom';
import { auth } from "../../../Firebase/ClientApp";
import AuthInputs from './AuthInputs';
import OAuthButton from './OAuthButton';
import ResetPassword from './ResetPassword';

type AuthModalProps = {
    
};

const AuthModal:React.FC<AuthModalProps> = () => {
    const [modalState, setModalState] = useRecoilState(authModalState)
    const [user, loading, error] = useAuthState(auth)
    const handleClose = () => {
        setModalState((prev: any) => ({
            ...prev,
            open: false,
        }))
    }
    useEffect(() => {
        if(user) handleClose();
        console.log('user', user);
    }, [user]);
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
                            {modalState.view === 'login' || modalState.view === 'signup' ? (
                                <>
                                    <OAuthButton/>
                                    <Text color="gray.500" fontWeight={700}>
                                        OR
                                    </Text>
                                    <AuthInputs/>
                                </>
                                
                            ) : <ResetPassword/> }
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
export default AuthModal;

