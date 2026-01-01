import { useEffect, useState } from "react";
import AdminHeader from "../../layouts/header/AdminHeader";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";
import { getOrders, updateOrderStatus } from "../../api/order";
import type { OrderType } from "../../types/order";
import { formatDate, getTotalPrice } from "../../lib/utils";
import toast from "react-hot-toast";

type OrderStatus = "pending" | "completed";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<Array<OrderType>>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await getOrders();
        setOrders(orders);
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    };

    fetchOrders();
  }, []);

  const statusLabelMap: Record<OrderStatus, string> = {
    pending: "受付中",
    completed: "提供完了",
  };

  const handleChangeOrderStatus = async (orderId: number) => {
    try {
      await updateOrderStatus(orderId);

      const orders = await getOrders();
      setOrders(orders);

      toast.success("注文ステータスを更新しました");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  const items = orders.flatMap(order => order.items.map(item => ({
    price_at_order: item.price_at_order,
    quantity: item.quantity,
  })));
  const totalSales = getTotalPrice(items);

  return (
    <>
      <AdminHeader></AdminHeader>
      {!errorMessage ? (
        <Flex justify="center" px={6} py={8}>
          <Box w="100%" maxW="1000px">
            <TableContainer>
              <Text fontSize="2xl" fontWeight="bold" mb={4}>
                注文一覧
              </Text>
              <Table variant="simple" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th>注文番号</Th>
                    <Th>テーブル番号</Th>
                    <Th>注文内容</Th>
                    <Th isNumeric>合計金額</Th>
                    <Th>ステータス</Th>
                    <Th>注文日時</Th>
                    <Th>アクション</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {orders.map((order) => (
                    <Tr key={order.id}>
                      <Td>#{order.id}</Td>
                      <Td>{order.table_number}</Td>
                      <Td>
                        {order.items.map((item) => (
                          <Text key={item.id}>
                            {item.menu.name} × {item.quantity}
                          </Text>
                        ))}
                      </Td>
                      <Td isNumeric>{order.total_price}</Td>
                      <Td>
                        {statusLabelMap[order.status as OrderStatus] ??
                          order.status}
                      </Td>
                      <Td>{formatDate(order.created_at)}</Td>
                      <Td>
                        <Button
                          colorScheme="green"
                          onClick={() => {
                            handleChangeOrderStatus(order.id);
                          }}
                          isDisabled={order.status === "completed"}
                        >
                          提供完了
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>

                <Tfoot p={4}>
                  <Tr>
                    <Th fontSize="md">合計</Th>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td fontSize="md">¥{totalSales}</Td>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </Box>
        </Flex>
      ) : (
        <Flex justify="center" mt={10}>
          <Text color="red.500">{errorMessage}</Text>
        </Flex>
      )}
    </>
  );
};

export default AdminOrdersPage;
