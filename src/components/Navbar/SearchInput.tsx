/* eslint-disable react/no-children-prop */
import { Flex, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { PhoneIcon, SearchIcon } from "@chakra-ui/icons"

type SearchInputProps = {
  children?: ReactNode;
  //user:
};

const SearchInput: React.FC<SearchInputProps> = () => {
  return (
    <Flex>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input type="tel" placeholder="Phone number" />
      </InputGroup>
    </Flex>
  );
};
export default SearchInput;
