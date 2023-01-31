import { Input } from '@chakra-ui/react';
import React, { useState } from 'react';

type LoginProps = {
    
};

const Login:React.FC<LoginProps> = () => {
    const [LoginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });
    return (
        <form>
            <Input name="email"
                   placeholder="email"
                   type="email"
                   mb={2}
                   onChange={() => {}}/>
            <Input name="password"
                   placeholder="password"
                   type="password"/>
        </form>
    )
}
export default Login;