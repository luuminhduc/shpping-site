import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Alert from "../../components/Alert";
import ProductList from "../../components/ProductList";
import Reviews from "../../components/Reviews";
import Stars from "../../components/Stars";
import { firestore } from "../../firebase/config";
import { addToCart } from "../../redux/action/cartAction/actions";
import { checkItemInCart } from "../../utils/cartUtil";
const Product = () => {
  const params = useParams();
  const { productId } = params;

  const [product, setProduct] = useState("");
  const { reviewList } = useSelector((state) => state.reviewReducer);

  const { cartList } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  const onAddToCart = () => {
    if (cartList.length > 0) {
      checkItemInCart({ item: product, cartList, dispatch });
    } else {
      dispatch(addToCart(product));
    }
  };

  const fetchProduct = async () => {
    try {
      const res = await firestore.collection("products").doc(productId).get();
      setProduct({ ...res.data(), id: res.id });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (productId) fetchProduct();
  }, [productId]);

  const getRating = () => {
    let num = 0;
    if (reviewList.length > 0) {
      const all = reviewList.map((el) => +el.rating).reduce((a, b) => (a += b));
      num = Math.round(all / reviewList.length);
    }
    return num;
  };

  const renderProduct = () => {
    const { photo, title, price, category } = product;
    return (
      <div className="md:grid mt-5 grid-cols-10">
        <div className="col-span-6">
          <img src={photo} alt="" />
        </div>
        <div className="col-span-4">
          <div className="rounded p-5 shadow-2xl">
            <div className="mb-3 flex flex-row justify-start items-start">
              <span className="px-3 mr-3 py-1 rounded-sm text-blue-800 border border-solid border-blue-800 text-xs">
                Best seller
              </span>
              <span className="px-3 mr-3 py-1 rounded-sm text-blue-800 border border-solid border-blue-800 text-xs">
                Popular pick
              </span>
            </div>
            <h1 className="font-bold mb-3 text-xl">{title}</h1>
            <div className="mb-5 flex flex-row justify-start items-center">
              <Stars rating={getRating()} />
              <span className="text-xs ml-1">
                {reviewList.length}
                reviews
              </span>
            </div>
            <p className="text-xl font-bold mb-3">{price} $</p>
            <button
              onClick={onAddToCart}
              className="bg-blue-600 font-semibold text-white px-4 py-2 rounded-3xl"
            >
              Add to cart
            </button>
            <div className="mt-5 border-t text-sm border-solid border-gray-100 pt-5">
              <p className="mb-3">Color: Black</p>
              <p className="mb-3">Origin: USA</p>
              <p>Inventory: 50</p>
            </div>
            <div className="mt-5 border-t text-sm border-solid border-gray-100 pt-5">
              <div className="flex flex-row mb-3 justify-start items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
                <p>Pick up at your closet store</p>
              </div>
              <div className="flex flex-row mb-3 justify-start items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
                <p>Highest quality</p>
              </div>
              <div className="flex flex-row mb-3 justify-start items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
                <p>Free delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const productCategory = () => {
    const { category, subCategory } = product;
    return (
      <div className="flex text-gray-700 flex-row justify-start items-center text-sm mt-5">
        <p className="mr-2">Product / </p>
        <p className="mr-2">{category} / </p>
        <p>{subCategory}</p>
      </div>
    );
  };

  const renderDescription = () => {
    const { description } = product;
    return (
      <div className="mt-5">
        <h3 className="font-bold text-xl mb-3">About this product</h3>
        <p className="text-sm">{description}</p>
      </div>
    );
  };

  return (
    <div>
      <Alert
        msg={{ text: "The membership that helps you save more time & money." }}
      />
      {product && (
        <React.Fragment>
          {productCategory()}
          {renderProduct()}
          {renderDescription()}
          <div className="mt-10"></div>
          <Reviews productId={product.id} />
        </React.Fragment>
      )}
    </div>
  );
};

export default Product;
