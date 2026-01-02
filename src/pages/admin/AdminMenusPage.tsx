import { useEffect, useState } from "react";
import AdminHeader from "../../layouts/header/AdminHeader";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Box,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";
import { getMenus } from "../../api/menu";
import type { MenuType } from "../../types/menu";
import { formatDate } from "../../lib/utils";
import { Link as RouterLink } from "react-router-dom";

const AdminMenusPage = () => {
  const [menus, setMenus] = useState<Array<MenuType>>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const menuItems: Array<MenuType> = await getMenus({
          sort: "created_at_desc",
        });
        setMenus(menuItems);
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    };
    fetchMenus();
  }, []);

  return (
    <Flex minH="100vh" bg="gray.50" direction="column">
      <AdminHeader />
      {!errorMessage ? (
        <Flex justify="center" px={6} py={8}>
          <Box
            w="100%"
            maxW="1000px"
            bg="white"
            p={4}
            borderRadius="md"
            boxShadow="sm"
          >
            <TableContainer>
              <Flex justify="space-between" align="center" mb={8}>
                <Text fontSize="2xl" fontWeight="bold">
                  メニュー一覧
                </Text>
                <Button
                  as={RouterLink}
                  to="/admin/menus/create"
                  colorScheme="blue"
                  size="sm"
                >
                  メニュー作成
                </Button>
              </Flex>
              <Table variant="simple" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th>メニュー名</Th>
                    <Th>価格</Th>
                    <Th>状態</Th>
                    <Th>作成日</Th>
                    <Th>操作</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {menus.map((menu) => (
                    <Tr key={menu.id} _last={{ td: { borderBottom: "none" } }}>
                      <Td>{menu.name}</Td>
                      <Td>{menu.price}</Td>
                      <Td>{menu.is_active ? "公開" : "非公開"}</Td>
                      <Td>{formatDate(menu.created_at)}</Td>
                      <Td>
                        <HStack spacing={2}>
                          <Button
                            as={RouterLink}
                            to={`/admin/menus/${menu.id}/edit`}
                            size="sm"
                          >
                            編集
                          </Button>
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Flex>
      ) : (
        <Flex justify="center" mt={10}>
          <Text color="red.500">{errorMessage}</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default AdminMenusPage;
