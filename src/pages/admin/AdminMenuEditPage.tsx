import {
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  VStack,
} from "@chakra-ui/react";
import AdminHeader from "../../layouts/header/AdminHeader";
import { useEffect, useRef, useState } from "react";
import { editMenu, showMenu } from "../../api/menu";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

interface ValidationErrorsType {
  name?: string;
  description?: string;
  price?: string;
  image?: string;
  isActive?: string;
}

const AdminMenuEditPage = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number | "">("");
  const [image, setImage] = useState<File | null>(null);
  const [isActive, setIsActive] = useState(true);

  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [removeImage, setRemoveImage] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [validationErrors, setValidationErrors] =
    useState<ValidationErrorsType>({});

  const { id: menuId } = useParams<{ id: string }>();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!menuId) return;
    const fetchMenu = async () => {
      try {
        const targetMenu = await showMenu(menuId);
        const menuData = targetMenu.data;
        
        setName(menuData.name);
        setDescription(menuData.description);
        setPrice(menuData.price);
        setIsActive(menuData.is_active);
        setCurrentImageUrl(targetMenu.image_url);
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    };
    fetchMenu();
  }, [menuId]);

  const navigate = useNavigate();

  const handleEditMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!menuId) return;
  
    try {
      const result = await editMenu(
        menuId,
        name,
        price,
        isActive,
        description,
        image,
        removeImage
      );
      setValidationErrors({});
      toast.success(result.message);
      navigate("/admin/menus");
    } catch (error: any) {
      if ("status" in error && error.status === 422) {
        const apiErrors = error.errors ?? {};
        setValidationErrors({
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

  const handleDeleteImage = async () => {
    if (currentImageUrl && previewImageUrl) return;

    setPreviewImageUrl(null);
    setCurrentImageUrl(null);
    setImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setRemoveImage(true);
  };

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
              メニュー編集
            </Text>
            <form onSubmit={handleEditMenu} noValidate>
              <VStack spacing={6} align="stretch">
                <FormControl isInvalid={!!validationErrors.name} isRequired>
                  <FormLabel>名前</FormLabel>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    w="full"
                  />
                  <FormErrorMessage>{validationErrors.name}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!validationErrors.description}>
                  <FormLabel>説明</FormLabel>
                  <Input
                    type="text"
                    value={description ?? ""}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    w="full"
                  />
                  <FormErrorMessage>
                    {validationErrors.description}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!validationErrors.price} isRequired>
                  <FormLabel>価格</FormLabel>
                  <InputGroup>
                    <InputLeftAddon>¥</InputLeftAddon>
                    <Input
                      type="number"
                      value={price}
                      onChange={(e) => {
                        const num =
                          e.target.value === "" ? "" : Number(e.target.value);
                        setPrice(num);
                      }}
                      placeholder="価格"
                    />
                  </InputGroup>
                  <FormErrorMessage>{validationErrors.price}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!validationErrors.image}>
                  <FormLabel>画像</FormLabel>
                  {(previewImageUrl || currentImageUrl) && (
                    <VStack align="start">
                      <Box position="relative" w="200px">
                        <Image
                          src={previewImageUrl ?? currentImageUrl!}
                          boxSize="200px"
                          objectFit="cover"
                          borderRadius="md"
                          shadow="sm"
                        />
                        <Button
                          size="xs"
                          bg="blackAlpha.600"
                          color="white"
                          _hover={{ bg: "blackAlpha.700" }}
                          position="absolute"
                          top="2"
                          right="2"
                          onClick={handleDeleteImage}
                          borderRadius="full"
                        >
                          ✕
                        </Button>
                      </Box>
                    </VStack>
                  )}
                  <Button as="label" cursor="pointer" mt={2}>
                    画像を選択
                    <Input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={(e) => {
                        const file = e.target.files?.[0] ?? null;
                        setImage(file);
                        if (file) setPreviewImageUrl(URL.createObjectURL(file));
                      }}
                      hidden
                    />
                  </Button>
                  <FormErrorMessage>{validationErrors.image}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!validationErrors.isActive}>
                  <Checkbox
                    isChecked={isActive}
                    onChange={(e) => {
                      setIsActive(e.target.checked);
                    }}
                  >
                    公開中
                  </Checkbox>
                  <FormErrorMessage>
                    {validationErrors.isActive}
                  </FormErrorMessage>
                </FormControl>

                <Button type="submit" rounded="md" colorScheme="blue" mt={4}>
                  メニューを更新する
                </Button>
              </VStack>
            </form>
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

export default AdminMenuEditPage;
