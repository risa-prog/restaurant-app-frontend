import { useState } from "react";
import AdminHeader from "../../layouts/header/AdminHeader";
import {
  Button,
  Card,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react";

const AdminMenuCreatePage = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <div>
      <AdminHeader></AdminHeader>
      {!errorMessage ? (
        <Flex minH="100vh" justify="center" align="center" bg="gray.50">
          <Card
            w="full"
            maxW="600px"
            p={10}
            bg="white"
            rounded="md"
            shadow="md"
          >
            <Text fontWeight="bold" fontSize="2xl" mb={8}>
              メニュー作成
            </Text>
            <VStack spacing={6} align="stretch">
              <FormControl isRequired>
                <FormLabel>名前</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="名前"
                  w="full"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>説明</FormLabel>
                <Input
                  type="text"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  placeholder="説明"
                  w="full"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>価格</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.500"
                    width="3rem"
                  >
                    ¥
                  </InputLeftElement>
                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => {
                      setPrice(Number(e.target.value));
                    }}
                    placeholder="0"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>画像アップロード</FormLabel>
                <Input type="file" accept="image/*" w="full" />
              </FormControl>
              <Checkbox defaultChecked>公開中</Checkbox>
              <Button rounded="md" colorScheme="blue" mt={4}>
                メニューを作成する
              </Button>
            </VStack>
          </Card>
        </Flex>
      ) : (
        <Text color="red.500" fontWeight="bold" textAlign="center" mt={4}>
          {errorMessage}
        </Text>
      )}
    </div>
  );
};

export default AdminMenuCreatePage;
