import { Box, Flex, Link as ChakraLink, Button } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";
import toast from "react-hot-toast";

const AdminHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!localStorage.getItem("token")
  );

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const logoutResult = await logout();
      toast.success(logoutResult.message);
      setIsLoggedIn(false);
      navigate('/login');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "ログアウトに失敗しました");
    }
  };

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
        {isLoggedIn ? (
          <ChakraLink
            onClick={handleLogout}
            cursor="pointer"
            color="white"
            _hover={{ textDecoration: "underline" }}
          >
            ログアウト
          </ChakraLink>
        ) : (
          <ChakraLink as={Link} to="/login" color="white">
            ログイン
          </ChakraLink>
        )}
      </Box>
    </Flex>
  );
};

export default AdminHeader;
