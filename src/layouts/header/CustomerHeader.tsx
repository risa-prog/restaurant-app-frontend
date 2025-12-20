import { Box, Flex } from "@chakra-ui/react";

const CustomerHeader = () => {
  return (
    <Flex
      bg="blue.400"
      color="white"
      p={4}
      justify="space-between"
      align="center"
    >
      <Box fontWeight="bold" fontSize="xl">
        美食亭
      </Box>
    </Flex>
  );
};

export default CustomerHeader;
