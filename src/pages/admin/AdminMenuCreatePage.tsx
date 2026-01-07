import { useState } from "react";
import AdminHeader from "../../layouts/header/AdminHeader";
import {
  Button,
  Card,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { createMenu } from "../../api/menu";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface ValidationErrorsType {
  name?: string;
  description?: string;
  price?: string;
  image?: string;
  isActive?: string;
}

const AdminMenuCreatePage = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number | "">("");
  const [image, setImage] = useState<File | null>(null);
  const [isActive, setIsActive] = useState(true);
  const [errors, setErrors] = useState<ValidationErrorsType>({});

  const navigate = useNavigate();

  const handleCreateMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await createMenu(
        name,
        price,
        isActive,
        description,
        image
      );
      setErrors({});
      toast.success(result.message);

      navigate("/admin/menus");
    } catch (error: any) {
      if ("status" in error && error.status === 422) {
        const apiErrors = error.errors ?? {};
        setErrors({
          name: apiErrors.name?.[0] ?? "",
          price: apiErrors.price?.[0] ?? "",
          isActive: apiErrors.is_active?.[0] ?? "",
          ...(apiErrors.description
            ? { description: apiErrors.description[0] }
            : {}),
          ...(apiErrors.image ? { image: apiErrors.image[0] } : {}),
        });
        return;
      }
      toast.error(error.message);
    }
  };

  return (
    <div>
      <AdminHeader></AdminHeader>
      <Flex minH="100vh" justify="center" align="center" bg="gray.50">
        <Card w="full" maxW="600px" p={10} bg="white" rounded="md" shadow="md">
          <Text fontWeight="bold" fontSize="2xl" mb={8}>
            メニュー作成
          </Text>
          <form onSubmit={handleCreateMenu} noValidate>
            <VStack spacing={6} align="stretch">
              <FormControl isInvalid={!!errors.name}>
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
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.description}>
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
                <FormErrorMessage>{errors.description}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.price}>
                <FormLabel>価格</FormLabel>
                <InputGroup>
                  <InputLeftAddon>¥</InputLeftAddon>
                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => {
                      const num = e.target.value === "" ? "" : Number(e.target.value);
                      setPrice(num);
                    }}
                    placeholder="価格"
                  />
                </InputGroup>
                <FormErrorMessage>{errors.price}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.image}>
                <FormLabel>画像アップロード</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    setImage(file);
                  }}
                  w="full"
                />
                <FormErrorMessage>{errors.image}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.isActive}>
                <Checkbox
                  isChecked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                >
                  公開中
                </Checkbox>
                <FormErrorMessage>{errors.isActive}</FormErrorMessage>
              </FormControl>
              <Button type="submit" rounded="md" colorScheme="blue" mt={4}>
                メニューを作成する
              </Button>
            </VStack>
          </form>
        </Card>
      </Flex>
    </div>
  );
};

export default AdminMenuCreatePage;
