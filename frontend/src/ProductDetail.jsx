import React, { useEffect, useState } from "react";
import BG2 from "./assets/bg2.jpg";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "./Auth";
import { db, storage } from "./base";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, updateDoc } from "firebase/firestore";

export const ProductDetail = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [file, setFile] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImageName] = useState("");

  const toastStyle = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (!file) return;
    const imageRef = ref(storage, `products/${file.name}`);
    try {
      await uploadBytes(imageRef, file);
      const docRef = await addDoc(collection(db, "products"), {
        name: name,
        category: category,
        price: price,
        quantity: quantity,
        picture: file.name,
        description: description,
      });
      await getDownloadURL(imageRef).then((url) => {
        console.log(url);
        return updateDoc(docRef, {
          picture: url,
        });
      });
      console.log("Done", docRef.id);
      toast.success("Product added successfully", toastStyle);
    } catch {
      toast.error("Something went Wrong. Please try again.", toastStyle);
    }
    setName("");
    setCategory("");
    setDescription("");
    setFile("");
    setPrice(0);
    setQuantity(0);
    setImageName("");
  };

  return (
    <main className="flex flex-col items-center justify-center w-[100%] h-[100%]  ">
      <div className="productForm w-[80%] md:w-[60%] h-100 my-10 mx-0 lg:translate-y-[30px]">
        <form
          className="flex flex-col items-center justify-center mx-3 my-2 overflow-hidden w-100 h-100"
          onSubmit={onSubmit}
        >
          <h1 className="text-[35px] md:text-[40px] mb-6 text-center m-3 p-4">
            Enter new Product
          </h1>
          <input
            type="text"
            className="w-[90%] h-[60px] bg-transparent border border-[#292929] rounded-lg  m-2 p-3 focus:outline-none hover:bg-[#cacaca] focus:border-[#575757] focus:border-2 text-[#292929] text-lg  cursor-pointer focus:cursor-text"
            name="productName"
            placeholder="Product's Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="off"
          />
          <input
            type="text"
            className="w-[90%] h-[60px] bg-transparent border border-[#292929] rounded-lg  m-2 p-3 focus:outline-none hover:bg-[#cacaca] focus:border-[#575757] focus:border-2 text-[#292929] text-lg  cursor-pointer focus:cursor-text"
            name="category"
            placeholder="Category"
            required
            autoComplete="off"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="number"
            className="w-[90%] h-[60px] bg-transparent border border-[#292929] rounded-lg  m-2 p-3 focus:outline-none hover:bg-[#cacaca] focus:border-[#575757] focus:border-2 text-[#292929] text-lg  cursor-pointer focus:cursor-text"
            name="price"
            placeholder="Price (in NRS) "
            required
            autoComplete="off"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="number"
            className="w-[90%] h-[60px] bg-transparent border border-[#292929] rounded-lg  m-2 p-3 focus:outline-none hover:bg-[#cacaca] focus:border-[#575757] focus:border-2 text-[#292929] text-lg  cursor-pointer focus:cursor-text"
            name="quantity"
            placeholder="Quantity"
            required
            autoComplete="off"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <div className="m-2 p-3 rounded-lg border border-[#292929] w-[90%] hover:bg-[#cecaca]">
            <label
              className="block mb-2 text-[16px] text-gray-800 "
              htmlFor="file_input"
            >
              Insert Picture
            </label>
            <input
              className="block w-full text-sm text-gray-800 placeholder-gray-600 bg-transparent border border-gray-800 rounded-lg cursor-pointer focus:outline-none"
              id="file_input"
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setImageName(e.target.value);
              }}
              value={image}
            />
          </div>
          <textarea
            className="border border-[#292929] m-2 p-3 rounded-lg bg-transparent  overflow-hidde w-[90%] focus:border-[#575757] focus:border-2 hover:bg-[#cacaca] cursor-pointer focus:cursor-text"
            name="description"
            placeholder="Enter detail about the product"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="m-3 p-4 border border-[#ff697d] rounded-xl hover:bg-[#ff697d] min-w-[150px] max-w-[200px] text-xl font-bold hover:text-[#efefef]"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </main>
  );
};

export const ProductForm = () => {
  const navigate = useNavigate();
  const toastStyle = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };
  const { logOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch {
      toast.error("Something Went Wrong", toastStyle);
    }
  };

  const getData = () => {
    navigate("/all");
  };
  return (
    <div
      className="min-h-screen overflow-x-hidden bg-fixed bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${BG2})` }}
    >
      <nav className="w-[100vw] h-[80px] right-0 flex  justify-end items-center">
        <button onClick={getData}>Products</button>
        <button
          className="flex items-center justify-center gap-3 p-3 border border-[#ff697d] rounded-lg hover:bg-[#ff697d] hover:border-none mx-6"
          type="button"
          onClick={handleSignOut}
        >
          <p>Sign Out</p>
          <span className="material-symbols-outlined ">logout</span>
        </button>
      </nav>
      <div className="w-[100%] h-[100%] mb-15">
        <ProductDetail />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};
