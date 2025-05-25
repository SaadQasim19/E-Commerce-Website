import { create } from 'zustand';

const ProductStore = create((set) => ({
    oldProduct: [],

    //& Add product locally
    
    addProduct: (newProduct) => {
        set((state) => ({
            oldProduct: [...state.oldProduct, newProduct]
        }));
    },

    //&Create product using async API call   

    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return { success: false, message: "Required fields are missing" };
        }

        try {
            const res = await fetch("http://localhost:8000/api/products", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct)
            });

            const data = await res.json();

            set((state) => ({
                oldProduct: [...state.oldProduct, data.data]
            }));

            return { success: true, message: "Product created successfully" };
        } catch (error) {
            console.error(error);
            return { success: false, message: "Error creating product" };
        }
    },
    //& Fetch products from API
    fetchProducts: async () => {
        try {
            const res = await fetch("http://localhost:8000/api/products");
            const data = await res.json();

            set({ oldProduct: data.data });
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    },
}));

export default ProductStore;
