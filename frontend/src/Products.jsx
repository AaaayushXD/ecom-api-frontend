import React, { useEffect, useState } from "react";
import { db } from "./base";
import { getDocs, collection } from "firebase/firestore";

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const docData = getDocs(collection(db, "products"));
        if (!docData) return;
        const productsData = [];
        const allProducts = (await docData).docs;
        allProducts.forEach((doc) => productsData.push(doc.data()));
        setProducts(productsData);
        console.log(productsData);
      } catch (e) {
        console.log("error", e);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-screen overflow-hidden">
      {products.map((product) => {
        return (
          <div
            key={Math.random()}
            className="flex items-center w-full gap-4 p-2 border "
          >
            <img
              src={product.picture}
              alt={product.name}
              className="w-[50px] h-[50px]"
            ></img>
            <p>→ {product.name}</p>
            <p>→ Rs {product.price}</p>
            <p>→ {product.quantity} units</p>
            <p>→ {product.category}</p>
            <p>→ {product.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
