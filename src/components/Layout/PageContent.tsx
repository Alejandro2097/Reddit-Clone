import { Flex } from '@chakra-ui/react';
import React from 'react';

type PageContentProps = {
    children: any
};

const PageContent:React.FC<PageContentProps> = ({children}) => {
    console.log('Here is children', children)
    return (
        <Flex border="1px solid red">
            <Flex border="1px solid green">
                {/* LHS */}
                <Flex border="1px solid blue">
                    {children && children[0 as keyof typeof children]}
                </Flex>
                {/* RHS */}
                <Flex border="1px solid orange">
                    {children && children[1 as keyof typeof children]}
                </Flex>
            </Flex>
        </Flex>
    )
}
export default PageContent;