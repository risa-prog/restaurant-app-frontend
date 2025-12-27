import AdminHeader from "../../layouts/header/AdminHeader";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const AdminOrdersPage = () => {
  return (
    <>
      <AdminHeader></AdminHeader>
      <TableContainer>
        <Table variant="simple" colorScheme="gray">
          <TableCaption>注文一覧</TableCaption>

          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>メニュー名</Th>
              <Th>数量</Th>
              <Th>価格</Th>
            </Tr>
          </Thead>

          <Tbody>
            <Tr>
              <Td>1</Td>
              <Td>ラーメン</Td>
              <Td>2</Td>
              <Td>¥1200</Td>
            </Tr>
          </Tbody>

          <Tfoot>
            <Tr>
              <Th>合計</Th>
              <Td></Td>
              <Td></Td>
              <Td>¥1200</Td>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
}

export default AdminOrdersPage
