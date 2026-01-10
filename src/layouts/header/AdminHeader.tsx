import { Box, Flex, Link as ChakraLink } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const AdminHeader = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const logoutResult = await logout();
      toast.success(logoutResult.message);
      setIsLoggedIn(false);
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message);
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
        <ChakraLink as={Link} to="/admin/orders" color="white">
          注文一覧
        </ChakraLink>
        <ChakraLink as={Link} to="/admin/menus" color="white">
          メニュー一覧
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
