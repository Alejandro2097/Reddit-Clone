import { border, Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

type LoginProps = {
    
};

const Login:React.FC<LoginProps> = () => {
    const [LoginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });
    const onSubmit = () => {};
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // update from state
        setLoginForm((prev: any) => ({
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
            <Button type='submit'
                    width='100%'
                    height='36px'
                    mt={2}
                    mb={2}
            >Log in</Button>
            <Flex fontSize='9pt' justifyContent="center"> 
                    <Text mr={1}>New here?</Text>
                    <Text color="blue.500"
                          fontWeight={700}
                          cursor="pointer"
                    >
                        SIGN UP</Text>
            </Flex>
        </form>
    )
}
export default Login;