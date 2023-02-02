import { authModalState } from '@/src/atoms/authModalAtom';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';

import { auth } from '../../../Firebase/ClientApp';

type SignUpProps = {
    
};

const SignUp:React.FC<SignUpProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const [SignUpForm, setSignUpForm] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        userError,
      ] = useCreateUserWithEmailAndPassword(auth);
    // Firebase Login
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(error) setError('');
        if(SignUpForm.password !== SignUpForm.confirmPassword){
            setError("Passwords do not match");
            return;
        }
        // Passwords Match
        createUserWithEmailAndPassword(SignUpForm.email, SignUpForm.password);
    };
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // update from state
        setSignUpForm((prev: any) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    return (
        <form onSubmit={onSubmit}>
            <Input name="email"
                   required
                   placeholder="email"
                   type="email"
                   mb={2}
                   fontSize="10pt"
                   _placeholder={{ color: "gray.500"}}
                   _hover={{
                        bg: 'white',
                        border: '1px solid',
                        borderColor: 'blue.500'
                   }}
                   _focus={{
                        outline: 'none',
                        bg: 'white',
                        border: '1px solid',
                        borderColor: 'blue.500'
                    }}
                    bg="gray.50"
                   onChange={onChange}/>
            <Input name="password"
                   required
                   placeholder="password"
                   type="password"
                   mb={2}
                   fontSize="10pt"
                   _placeholder={{ color: "gray.500"}}
                   _hover={{
                        bg: 'white',
                        border: '1px solid',
                        borderColor: 'blue.500'
                   }}
                   _focus={{
                        outline: 'none',
                        bg: 'white',
                        border: '1px solid',
                        borderColor: 'blue.500'
                    }}
                    bg="gray.50"
                   onChange={onChange}/>
            <Input name="confirmPassword"
                   required
                   placeholder="confirm password"
                   type="password"
                   mb={2}
                   fontSize="10pt"
                   _placeholder={{ color: "gray.500"}}
                   _hover={{
                        bg: 'white',
                        border: '1px solid',
                        borderColor: 'blue.500'
                   }}
                   _focus={{
                        outline: 'none',
                        bg: 'white',
                        border: '1px solid',
                        borderColor: 'blue.500'
                    }}
                    bg="gray.50"
                   onChange={onChange}/>
            <Text textAlign='center' color="red" fontSize="10pt">{error}</Text>
            <Button type='submit'
                    width='100%'
                    height='36px'
                    mt={2}
                    mb={2}
            >Sign up</Button>
            <Flex fontSize='9pt' justifyContent="center"> 
                    <Text mr={1}>Already a redditor?</Text>
                    <Text color="blue.500"
                          fontWeight={700}
                          cursor="pointer"
                          onClick={() => setAuthModalState(prev => ({
                            ...prev,
                            view: "login"
                          }))}
                    >
                        LOG IN </Text>
            </Flex>
        </form>
    )
}
export default SignUp;

