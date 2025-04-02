import React,{useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import AddProduct from '../components/AddProduct';
import { createProduct,getProducts } from '../Services/productService';




const Product = ({inventoryId}) => {
    const [products, setProducts] = useState([]);
    const [showAddProduct, setShowAddProduct] = useState(false);

    useEffect(()=>{
        const fetchProducts = async() => {
            const res = await getProducts(inventoryId);
           setProducts(res.data.products);
        }
        fetchProducts();
    },[])
    const handleAddProduct = async(newProduct) => {
        const productData = {...newProduct, inventory : inventoryId};
        const res = await createProduct(productData);
        setShowAddProduct(false);
        window.location.reload();
    };

    return (
        <div className="p-6  h-screen overflow-scroll rounded-xl relative">
            <motion.h1
                className="text-2xl font-medium mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Product Management
            </motion.h1>
            <div className="mb-6">
                <button
                    onClick={() => setShowAddProduct(!showAddProduct)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    Add New Product
                </button>
            </div>
            {showAddProduct && <AddProduct onAddProduct={handleAddProduct} close= {setShowAddProduct} />}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: {
                        opacity: 1,
                        scale: 1,
                        transition: {
                            delayChildren: 0.3,
                            staggerChildren: 0.2,
                        },
                    },
                }}
            >
                {products&&products.map((product) => (
                    <motion.div key={product._id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                        <ProductCard
                            id = {product._id}
                            productName={product.productName}
                            sku={product.sku}
                            price={product.price}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Product;