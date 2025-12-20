import { Box, Flex, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";


const AdminHeader = () => {
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
      <Box display="flex" gap={4}>
        <ChakraLink as={Link} to="/menus" color="white">
          メニュー一覧
        </ChakraLink>
        <ChakraLink as={Link} to="/menus/management" color="white">
          メニュー管理
        </ChakraLink>
        <ChakraLink as={Link} to="/login" color="white">
          ログイン
        </ChakraLink>
      </Box>
    </Flex>
  );
};

export default AdminHeader;
