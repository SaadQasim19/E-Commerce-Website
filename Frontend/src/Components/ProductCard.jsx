import React, { useState } from "react";
import {
  Box, Image, Button, Heading, Text, HStack, VStack, IconButton,
  useColorModeValue, useToast, Modal, ModalHeader, ModalBody,
  ModalOverlay, ModalContent, ModalCloseButton, ModalFooter, useDisclosure
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import ProductStore from "../Store/product";

const ProductCard = ({ product }) => {
  const [updateProduct, setUpdateProduct] = useState(product);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Correct destructure of ProductStore functions
  const { deleteProducts, updateProducts } = ProductStore();

  const handleDeleteProduct = async () => {
    try {
      const { success, message } = await deleteProducts(product._id);
      if (success) {
        toast({
          title: "Success",
          description: message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    try {
      const response = await updateProducts(id, updatedProduct);
      if (response.success) {
        toast({
          title: "Success",
          description: "Product updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
      } else {
        toast({
          title: "Error",
          description: response.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box shadow="lg" rounded="lg" overflow="hidden" transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }} bg={bg}>
      <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" />
      <Box p={4}>
        <Heading as="h3" size="md">{product.name}</Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mt={2} mb={4}>
          ${product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
          <IconButton icon={<DeleteIcon />} onClick={handleDeleteProduct} colorScheme="red" />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={updateProduct.name}
                onChange={(e) =>
                  setUpdateProduct((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <input
                type="text"
                name="price"
                placeholder="Product Price"
                value={updateProduct.price}
                onChange={(e) =>
                  setUpdateProduct((prev) => ({ ...prev, price: e.target.value }))
                }
              />
              <input
                type="text"
                name="image"
                placeholder="Product Image"
                value={updateProduct.image}
                onChange={(e) =>
                  setUpdateProduct((prev) => ({ ...prev, image: e.target.value }))
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updateProduct)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
