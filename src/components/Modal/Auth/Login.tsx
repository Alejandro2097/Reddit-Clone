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
            <Input/>
            <Input/>
        </form>
    )
}
export default Login;