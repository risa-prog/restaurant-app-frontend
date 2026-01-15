import { Box, Button, Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import CustomerHeader from "../../layouts/header/CustomerHeader";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrderItems } from "../../api/orderItem";
import type { OrderItemType } from "../../types/orderItem";
import { getTotalPrice } from "../../lib/utils";
import toast from "react-hot-toast";

const OrderCompletePage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [searchParams] = useSearchParams();
  const tableParam = searchParams.get("table");
  const parsedTableNumber = Number(tableParam);

  const tableNumber =
    tableParam && Number.isInteger(parsedTableNumber) && parsedTableNumber > 0
      ? parsedTableNumber
      : null;

  const [orderItems, setOrderItems] = useState<Array<OrderItemType>>([]);

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchOrderItems = async () => {
      if (!orderId) return;

      setLoading(true);

      try {
        const items = await getOrderItems(orderId);
        setOrderItems(items);
      } catch (error: any) {
        navigate("/select-table", { replace: true });
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderItems();
  }, [orderId]);

  return (
    <>
      <CustomerHeader></CustomerHeader>
      {loading ? (
        <Flex justify="center" py={10}>
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Flex
          minH="calc(100vh - 80px)"
          align="center"
          justify="center"
          bg="gray.50"
          px={4}
        >
          <Box maxW="600px" w="full" p={6} bg="white" rounded="md" shadow="md">
            <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={2}>
              ご注文ありがとうございました！
            </Text>
            <Text fontSize="lg" textAlign="center" mb={4}>
              注文番号：#{orderId}
            </Text>
            {tableNumber && (
              <Text fontSize="sm" color="gray.500" textAlign="center" mb={4}>
                テーブル番号：{tableNumber}
              </Text>
            )}
            <Stack spacing={2}>
              {orderItems.map((item) => (
                <Flex key={item.id} justify="space-between">
                  <Box>
                    <Text fontWeight="bold">{item.menu.name}</Text>
                    <Text fontSize="sm" color="gray.600">
                      ¥{item.price_at_order} × {item.quantity}
                    </Text>
                  </Box>
                  <Text fontWeight="bold">
                    ¥{item.price_at_order * item.quantity}
                  </Text>
                </Flex>
              ))}

              <Flex justify="space-between" fontWeight="bold" mt={4}>
                <Text fontWeight="bold">合計</Text>
                <Text fontWeight="bold" fontSize="lg">
                  ¥{getTotalPrice(orderItems)}
                </Text>
              </Flex>
            </Stack>
            <Flex mt={6} justify="center">
              <Button
                colorScheme="blue"
                onClick={() => {
                  if (!tableNumber) return;
                  navigate(`/?table=${tableNumber}`, { replace: true });
                }}
              >
                追加注文する
              </Button>
            </Flex>
          </Box>
        </Flex>
      )}
      {/* <CustomerHeader></CustomerHeader>
      <Flex
        minH="calc(100vh - 80px)"
        align="center"
        justify="center"
        bg="gray.50"
        px={4}
      >
        <Box maxW="600px" w="full" p={6} bg="white" rounded="md" shadow="md">
          <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={2}>
            ご注文ありがとうございました！
          </Text>
          <Text fontSize="lg" textAlign="center" mb={4}>
            注文番号：#{orderId}
          </Text>
          {tableNumber && (
            <Text fontSize="sm" color="gray.500" textAlign="center" mb={4}>
              テーブル番号：{tableNumber}
            </Text>
          )}
          <Stack spacing={2}>
            {orderItems.map((item) => (
              <Flex key={item.id} justify="space-between">
                <Box>
                  <Text fontWeight="bold">{item.menu.name}</Text>
                  <Text fontSize="sm" color="gray.600">
                    ¥{item.price_at_order} × {item.quantity}
                  </Text>
                </Box>
                <Text fontWeight="bold">
                  ¥{item.price_at_order * item.quantity}
                </Text>
              </Flex>
            ))}

            <Flex justify="space-between" fontWeight="bold" mt={4}>
              <Text fontWeight="bold">合計</Text>
              <Text fontWeight="bold" fontSize="lg">
                ¥{getTotalPrice(orderItems)}
              </Text>
            </Flex>
          </Stack>
          <Flex mt={6} justify="center">
            <Button
              colorScheme="blue"
              onClick={() => {
                if (!tableNumber) return;
                navigate(`/?table=${tableNumber}`, { replace: true });
              }}
            >
              追加注文する
            </Button>
          </Flex>
        </Box>
      </Flex> */}
    </>
  );
};

export default OrderCompletePage;
