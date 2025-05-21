import {
  Container,
  useColorModeValue,
  VStack,
  Heading,
  Box,
  Input,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

export default function CreatePage() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const handleNewProduct = () => {
    console.log("New Product Created", newProduct);
    // Later: send this to backend with fetch/axios
  };

  return (
    <Container maxW="container.sm">
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center" mb={8}>
          Create New Product
        </Heading>

        <Box
          w="full"
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded="lg"
          shadow="md"
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Product Price"
              type="number"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Product Image"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button colorScheme="blue" onClick={handleNewProduct} w="full">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
