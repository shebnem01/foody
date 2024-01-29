"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "components/common/EditModal/editmodal.module.css";
import axios from "axios";
import uploadImg from "../../../assets/icons/upload.svg";
import closeBtn from "../../../assets/icons/closeBtn.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  closeAddProductModal,
  closeAddResModal,
  closeAddCategoryModal,
  closeModalEdit,
  closeOfferModalEdit,
  closeResModalEdit,
  closeCategoryModalEdit,
  closeAddOfferModal,
  closeAddOrderModal,
} from "../../../redux/features/editModalSlice";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import EditSelectBox from "../EditSelectBox/EditSelectBox";
import EditRestSelectBox from "../EditRestSelectBox/EditRestSelectBox";
import AddResCategoryBox from "../AddResCategoryBox/AddResCategoryBox";
import { useTranslation } from "next-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uuidGenerator } from "../../../utils/uuidGenerator";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { fileStorage } from "../../../server/configs/firebase";
import { toast } from "react-toastify";

const EditModal = () => {
  const { t } = useTranslation("common");
  const queryClient = useQueryClient();

  const [addProductImg, setAddProductImg] = useState(null);
  const [isCurrentRest, setIsCurrentRest] = useState(null);
  const [lastProductImg, setLastProductImg] = useState(null);
  const [currentProductData, setCurrentProductData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [currentRestData, setCurrentRestData] = useState({
    cuisine: "",
    delivery_price: "",
    delivery_min: "",
    address: "",
    name: "",
  });

  const [currentCatData, setCurrenCatData] = useState({
    name: "",
  });

  const [currentOfferData, setCurrenOfferData] = useState({
    name: "",
    description: "",
  });

  const productName = useRef();
  const productDesc = useRef();
  const productPrice = useRef();

  const restName = useRef();
  const restDesc = useRef();
  const restDelPrice = useRef();
  const restDelMin = useRef();
  const restAddress = useRef();

  const catName = useRef();

  const offerName = useRef();
  const offerDesc = useRef();

  const productNameRef = productName.current;
  const productDescRef = productDesc.current;
  const productPriceRef = productPrice.current;

  const restNameRef = restName.current;
  const restDescRef = restDesc.current;
  const restDelPriceRef = restDelPrice.current;
  const restDelMinRef = restDelMin.current;
  const restAddressRef = restAddress.current;

  const catNameRef = catName.current;

  const offerNameRef = offerName.current;
  const offerDescRef = offerDesc.current;
  const selEditModal = useSelector((state) => state.modal.isActiveModal);
  const selAddProductModal = useSelector(
    (state) => state.modal.isActiveAddProductModal
  );
  const selAddResModal = useSelector(
    (state) => state.modal.isActiveAddResModal
  );
  const selResEditModal = useSelector((state) => state.modal.isActiveResModal);
  const selCategoryAddModal = useSelector(
    (state) => state.modal.isActiveAddCategoryModal
  );
  const selCategoryEditModal = useSelector(
    (state) => state.modal.isActiveCategoryModal
  );
  const selOfferAddModal = useSelector(
    (state) => state.modal.isActiveAddOfferModal
  );
  const selOfferEditModal = useSelector(
    (state) => state.modal.isActiveOfferModal
  );


  const selProductRestID = useSelector(
    (state) => state.restaurant.isActiveRestID
  );
  const selRestCategoryID = useSelector(
    (state) => state.restaurant.isActiveRestCategory
  );
  const dispatch = useDispatch();

  // *Product Data Handling

  const { mutate: addProduct } = useMutation({
    mutationFn: async () =>
      await axios.post("/api/products", {
        name: productNameRef.value,
        description: productDescRef.value,
        img_url: lastProductImg,
        rest_id: selProductRestID,
        price: productPriceRef.value,
      }),
    onSuccess: () => {
      toast.success("Added Product with Successfully!")
      setAddProductImg(null);
      queryClient.invalidateQueries(['products'])
    },
    onError: () => {
      toast.error("Couldn't Add Product!")
    },
  });

  const { mutate: updateProduct } = useMutation({
    mutationFn: async () =>
      await axios.put(`/api/products/${selEditModal.id}`, {
        name: currentProductData.name,
        description: currentProductData.description,
        img_url: lastProductImg ? lastProductImg : selEditModal.img_url,
        rest_id: selProductRestID ? selProductRestID : selEditModal.rest_id,
        price: currentProductData.price,
      }),
    onSuccess: () => {
      toast.success("Updated Product with Successfully!")
      dispatch(closeModalEdit());
      setLastProductImg(null);
      setAddProductImg(null);
      queryClient.invalidateQueries(["products"]);
    },
    onError: () => {
      toast.error("Couldn't Update Product!")
    },
  });

  // !Restaurant Data Handling

  const { mutate: addRest } = useMutation({
    mutationFn: async () =>
      await axios.post("/api/restuarants", {
        cuisine: restDescRef.value,
        delivery_price: +restDelPriceRef.value,
        category_id: selProductRestID,
        delivery_min: +restDelMinRef.value,
        address: restAddressRef.value,
        name: restNameRef.value,
        img_url: lastProductImg,
      }),
    onSuccess: () => {
      toast.success("Added Restaurant with Successfully!")
      dispatch(closeAddResModal());
      setLastProductImg(null);
      setAddProductImg(null);
      queryClient.invalidateQueries(["restaurants"]);
    },
    onError: () => {
      toast.error("Couldn't Add Restaurant!")
    },
  });

  const { mutate: updateRest } = useMutation({
    mutationFn: async () =>
      await axios.put(`/api/restuarants/${selResEditModal?.id}`, {
        name: currentRestData.name,
        category_id: selRestCategoryID
          ? selRestCategoryID
          : currentRestData.category_id,
        img_url: lastProductImg ? lastProductImg : currentRestData.img_url,
        cuisine: currentRestData.cuisine,
        address: currentRestData.address,
        delivery_min: +currentRestData.delivery_min,
        delivery_price: +currentRestData.delivery_price,
      }),
    onSuccess: () => {
      toast.success("Updated Restaurant with Successfully!")
      dispatch(closeResModalEdit());
      setAddProductImg(null);
      queryClient.invalidateQueries(["restaurants"]);
    },
    onError: () => {
      toast.error("Couldn't Update Restaurant!")
    },
  });

  // *Category Data Handling

  const { mutate: addCategory } = useMutation({
    mutationFn: async () =>
      await axios.post("/api/category", {
        name: catNameRef.value,
        img_url: lastProductImg,
      }),

    onSuccess: () => {
      toast.success("Added Category with Successfully!")
      dispatch(closeAddCategoryModal())
      setAddProductImg(null);
      queryClient.invalidateQueries(["category"]);
    },
    onError: () => {
      toast.success("Couldn't Add Category!")
    },
  });

  const { mutate: updateCategory } = useMutation({
    mutationFn: async () =>
      await axios.put(`/api/category/${selCategoryEditModal.id}`, {
        name: currentCatData.name,
        img_url: lastProductImg ? lastProductImg : selCategoryEditModal.img_url,
      }),
    onSuccess: () => {
      toast.success("Updated Category with Successfully!")
      dispatch(closeCategoryModalEdit());
      setAddProductImg(null);
      queryClient.invalidateQueries(["category"]);
    },
    onError: () => {
      toast.error("Couldn't Update Category!")
    },
  });
  // *offer Data Handling

  const { mutate: addOffer } = useMutation({
    mutationFn: async () =>
      await axios.post("/api/offer", {
        name: offerNameRef.value,
        description: offerDescRef.value,
        img_url: lastProductImg,
      }),

    onSuccess: () => {
      toast.success("Added Offer with Successfully!")
      dispatch(closeAddOfferModal())
      setAddProductImg(null);
      queryClient.invalidateQueries(["offer"]);
    },
    onError: () => {
      toast.error("Couldn't Added Offer!")
    },
  });

  const { mutate: updateOffer } = useMutation({
    mutationFn: async () =>
      await axios.put(`/api/offer/${selOfferEditModal.id}`, {
        name: currentOfferData.name,
        description: currentOfferData.description,
        img_url: lastProductImg ? lastProductImg : selOfferEditModal.img_url,
      }),
    onSuccess: () => {
      toast.success("Updated Offer with Successfully!")
      dispatch(closeOfferModalEdit());
      setAddProductImg(null);
      queryClient.invalidateQueries(["offer"]);
    },
    onError: () => {
      toast.error("Couldn't Update Offer!")
    },
  });


  useEffect(() => {
    AOS.init();
    setCurrentProductData(selEditModal);
    setCurrentRestData(selResEditModal);
    setCurrenCatData(selCategoryEditModal);
    setCurrenOfferData(selOfferEditModal);
    const htmlEl = document.querySelector("html");
    if (selEditModal) {
      htmlEl.style.overflow = "hidden";
    } else {
      htmlEl.style.overflow = "auto";
    }
  }, [selEditModal, selResEditModal, selCategoryEditModal, selOfferEditModal]);

  const handleNewProductImg = (e) => {
    const selectedFile = e.target.files[0];
    setAddProductImg(URL.createObjectURL(selectedFile));
    const newUUID = uuidGenerator();
    const imageRef = ref(fileStorage, `images/${selectedFile.name + newUUID}`);
    uploadBytes(imageRef, selectedFile)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((downloadURL) => {
            setLastProductImg(downloadURL);
            console.log("Dosyanın Firebase Storage URL'si: ", downloadURL);
          })
          .catch((error) => {
            console.error("Download URL alınırken bir hata oluştu: ", error);
          });
      })
      .catch((error) => {
        console.error("Dosya yüklenirken bir hata oluştu: ", error);
      });
  };

  const handleAddProduct = () => {
      addProduct();
  };

  const handleUpdateProduct = () => {
    updateProduct();
  };
  const handleAddCategory = () => {
    addCategory();
  };
  const handleUpdateCategory = () => {
    updateCategory();
  };
  const handleAddOffer = () => {
    addOffer();
  };
  const handleUpdateOffer = () => {
    updateOffer();
  };

  const handleAddBasket = () => {
    addBasket();
  };

  const handleChangeProductName = (e) => {
    const updatedProductData = { ...currentProductData };
    updatedProductData.name = e.target.value;
    setCurrentProductData(updatedProductData);
  };

  const handleChangeProductDesc = (e) => {
    const updatedProductData = { ...currentProductData };
    updatedProductData.description = e.target.value;
    setCurrentProductData(updatedProductData);
  };

  const handleChangeProductPrice = (e) => {
    const updatedProductData = { ...currentProductData };
    updatedProductData.price = e.target.value;
    setCurrentProductData(updatedProductData);
  };

  const handleCreateRest = () => {
    addRest();
  };

  const handleUpdateRest = () => {
    updateRest();
  };

  const handleChangeRestName = (e) => {
    const updatedRestData = { ...currentRestData };
    updatedRestData.name = e.target.value;
    setCurrentRestData(updatedRestData);
  };

  const handleChangeCuisineName = (e) => {
    const updatedRestData = { ...currentRestData };
    updatedRestData.cuisine = e.target.value;
    setCurrentRestData(updatedRestData);
  };

  const handleChangeDelPriceName = (e) => {
    const updatedRestData = { ...currentRestData };
    updatedRestData.delivery_price = e.target.value;
    setCurrentRestData(updatedRestData);
  };

  const handleChangeDelMinName = (e) => {
    const updatedRestData = { ...currentRestData };
    updatedRestData.delivery_min = e.target.value;
    setCurrentRestData(updatedRestData);
  };

  const handleChangeAddressName = (e) => {
    const updatedRestData = { ...currentRestData };
    updatedRestData.address = e.target.value;
    setCurrentRestData(updatedRestData);
  };
  const handleChangeCategoryName = (e) => {
    const updatedCatData = { ...currentCatData };
    updatedCatData.name = e.target.value;
    setCurrenCatData(updatedCatData);
  };
  const handleChangeOfferName = (e) => {
    const updatedOfferData = { ...currentOfferData };
    updatedOfferData.name = e.target.value;
    setCurrenOfferData(updatedOfferData);
  };
  const handleChangeOfferDesc = (e) => {
    const updatedOfferData = { ...currentOfferData };
    updatedOfferData.description = e.target.value;
    setCurrenOfferData(updatedOfferData);
  };

  return (
    <>
      {selEditModal ? (
        <>
          <div className={styles.overlay}>
            <div
              className={styles["show-editmodal"]}
              data-aos="fade-left"
              data-aos-duration="500"
            >
              <div className={styles["editmodal-head"]}>
                <h3>{t("Edit product")}</h3>
              </div>
              <div className={styles["editmodal-top"]}>
                <div className={styles["editmodal-left-contain"]}>
                  <div className={styles["editmodal-left-top"]}>
                    <h3>{t("Edit product")}</h3>
                    <span>{t("Upload your product image")}</span>
                    {selEditModal.img_url && !addProductImg ? (
                      <Image
                        src={selEditModal.img_url}
                        width={200}
                        height={200}
                        alt="product"
                      />
                    ) : (
                      <Image
                        src={addProductImg}
                        width={200}
                        height={200}
                        alt="product"
                      />
                    )}
                  </div>
                  <div className={styles["editmodal-left-bot"]}>
                    <span>
                      {t(
                        "Edit your Product description and necessary information"
                      )}
                    </span>
                  </div>
                </div>
                <div className={styles["editmodal-right-contain"]}>
                  <div className={styles["mob-upload-text"]}>
                    <span>{t("Upload your product image")}</span>
                  </div>
                  <div className={styles["editmodal-right-top"]}>
                    <button className="flex flex-col items-center relative">
                      <Image src={uploadImg} alt="upload" />
                      {t("upload")}
                      <input
                        onChange={(e) => handleNewProductImg(e)}
                        className="absolute -top-4 w-[100px] h-[120px]"
                        type="file"
                        style={{ opacity: 0, cursor: "pointer" }}
                      />
                    </button>
                  </div>
                  <div className={styles["editmodal-right-bot"]}>
                    <div className={styles["mob-restaurant-info"]}>
                      <span>
                        {t(
                          "Add your Product description and necessary information"
                        )}
                      </span>
                    </div>
                    <form>
                      <div className={styles["product-name"]}>
                        <label htmlFor="name">{t("Name")}</label>
                        <input
                          type="text"
                          id="price"
                          onChange={(e) => handleChangeProductName(e)}
                          value={currentProductData?.name}
                          placeholder={t("Product Name")}
                        />
                      </div>
                      <div className={styles["product-description"]}>
                        <label htmlFor="description">{t("Description")}</label>
                        <textarea
                          name="description"
                          onChange={(e) => handleChangeProductDesc(e)}
                          value={currentProductData?.description}
                          id={styles["desc"]}
                          placeholder={t("Description")}
                        ></textarea>
                      </div>
                      <div className={styles["product-price"]}>
                        <label htmlFor="price">{t("Price")}</label>
                        <input
                          type="text"
                          onChange={(e) => handleChangeProductPrice(e)}
                          value={currentProductData?.price}
                          id="price"
                          placeholder={t("Price")}
                        />
                      </div>
                      <div className={styles["product-selectbox"]}>
                        <label
                          className={styles.restaurants}
                          htmlFor="restaurants"
                        >
                          {t("Restaurants")}
                        </label>
                        <EditSelectBox />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className={styles["editmodal-bot"]}>
                <button
                  onClick={() => dispatch(closeModalEdit())}
                  className={styles["edit-cancel"]}
                >
                  {t("Cancel")}
                </button>
                <button
                  onClick={() => handleUpdateProduct()}
                  className={styles["edit-update"]}
                >
                  {t("Update Product")}
                </button>
              </div>
            </div>
            <div className={styles["close-contain"]}>
              <button
                onClick={() => dispatch(closeModalEdit())}
                className={styles["close-btn"]}
              >
                <Image src={closeBtn} alt="close-button" />
              </button>
            </div>
          </div>
        </>
      ) : selAddProductModal ? (
        <>
          <div className={styles.overlay}>
            <div
              className={styles["show-editmodal"]}
              data-aos="fade-left"
              data-aos-duration="500"
            >
              <div className={styles["editmodal-head"]}>
                <h3>{t("Add Product")}</h3>
              </div>
              <div className={styles["editmodal-top"]}>
                <div className={styles["editmodal-left-contain"]}>
                  <div className={styles["editmodal-left-top"]}>
                    <h3>{t("Add Product")}</h3>
                    <span>{t("Upload your product image")}</span>
                    {addProductImg && (
                      <Image
                        src={addProductImg}
                        width={200}
                        height={200}
                        alt="product"
                      />
                    )}
                  </div>
                  <div className={styles["editmodal-left-bot"]}>
                    <span>
                      {t(
                        "Add your Product description and necessary information"
                      )}
                    </span>
                  </div>
                </div>
                <div className={styles["editmodal-right-contain"]}>
                  <div className={styles["mob-upload-text"]}>
                    <span>{t("Upload your restaurants image")}</span>
                  </div>
                  <div className={styles["editmodal-right-top"]}>
                    <button className="flex flex-col items-center relative">
                      <Image src={uploadImg} alt="upload" />
                      {t("upload")}
                      <input
                        onChange={(e) => handleNewProductImg(e)}
                        className="absolute -top-4 w-[100px] h-[120px]"
                        type="file"
                        style={{ opacity: 0, cursor: "pointer" }}
                      />
                    </button>
                  </div>
                  <div className={styles["editmodal-right-bot"]}>
                    <div className={styles["mob-restaurant-info"]}>
                      <span>
                        {t(
                          "Add your Product description and necessary information"
                        )}
                      </span>
                    </div>
                    <form>
                      <div className={styles["product-name"]}>
                        <label htmlFor="name">{t("Name")}</label>
                        <input
                          ref={productName}
                          type="text"
                          id="price"
                          placeholder={t("Product Name")}
                        />
                      </div>
                      <div className={styles["product-description"]}>
                        <label htmlFor="description">{t("Description")}</label>
                        <textarea
                          ref={productDesc}
                          name="description"
                          id={styles["desc"]}
                          placeholder={t("Description")}
                        ></textarea>
                      </div>
                      <div className={styles["product-price"]}>
                        <label htmlFor="price">{t("Price")}</label>
                        <input
                          ref={productPrice}
                          type="text"
                          id="price"
                          placeholder={t("Price")}
                        />
                      </div>
                      <div className={styles["product-selectbox"]}>
                        <label
                          className={styles.restaurants}
                          htmlFor="restaurants"
                        >
                          {t("Restaurants")}
                        </label>
                        <EditSelectBox />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div
                onClick={() => dispatch(closeAddProductModal())}
                className={styles["editmodal-bot"]}
              >
                <button className={styles["edit-cancel"]}>{t("Cancel")}</button>
                <button
                  onClick={() => handleAddProduct()}
                  className={styles["edit-update"]}
                >
                  {t("Add Product")}
                </button>
              </div>
            </div>
            <div className={styles["close-contain"]}>
              <button
                onClick={() => dispatch(closeAddProductModal())}
                className={styles["close-btn"]}
              >
                <Image src={closeBtn} alt="close-button" />
              </button>
            </div>
          </div>
        </>
      ) : selAddResModal ? (
        <>
          <div className={styles.overlay}>
            <div
              className={styles["show-editmodal"]}
              data-aos="fade-left"
              data-aos-duration="500"
            >
              <div className={styles["editmodal-head"]}>
                <h3>{t("Add restaurants")}</h3>
              </div>
              <div className={styles["editmodal-top"]}>
                <div className={styles["editmodal-left-contain"]}>
                  <div className={styles["editmodal-left-top"]}>
                    <h3>{t("Add restaurants")}</h3>
                    <span>{t("Upload image")}</span>
                    {addProductImg && (
                      <Image
                        src={addProductImg}
                        width={200}
                        height={200}
                        alt="product"
                      />
                    )}
                  </div>
                  <div className={styles["editmodal-left-bot"]}>
                    <span>{t("Add your Restaurant information")}</span>
                  </div>
                </div>
                <div className={styles["editmodal-right-contain"]}>
                  <div className={styles["mob-upload-text"]}>
                    <span>{t("Upload your restaurants image")}</span>
                  </div>
                  <div className={styles["editmodal-right-top"]}>
                    <button className="flex flex-col items-center relative">
                      <Image src={uploadImg} alt="upload" />
                      {t("upload")}
                      <input
                        onChange={(e) => handleNewProductImg(e)}
                        className="absolute -top-4 w-[100px] h-[120px]"
                        type="file"
                        style={{ opacity: 0, cursor: "pointer" }}
                      />
                    </button>
                  </div>
                  <div className={styles["editmodal-right-bot"]}>
                    <div className={styles["mob-restaurant-info"]}>
                      <span>{t("Edit your Restaurants information")}</span>
                    </div>
                    <form>
                      <div className={styles["product-name"]}>
                        <label htmlFor="name">{t("Name")}</label>
                        <input
                          ref={restName}
                          type="text"
                          id="name"
                          placeholder={t("Restaurant Name")}
                        />
                      </div>
                      <div className={styles["product-description"]}>
                        <label htmlFor="description">{t("Cuisine")}</label>
                        <textarea
                          ref={restDesc}
                          name="description"
                          id={styles["desc"]}
                          placeholder={t("Description")}
                        ></textarea>
                      </div>
                      <div className={styles["product-price"]}>
                        <label htmlFor="deliveryprice">
                          {t("Delivery Price")} $
                        </label>
                        <input
                          ref={restDelPrice}
                          type="text"
                          id="deliveryprice"
                          placeholder={t("Price")}
                        />
                      </div>
                      <div className={styles["product-price"]}>
                        <label htmlFor="deliverymin">{t("Delivery Min")}</label>
                        <input
                          ref={restDelMin}
                          type="text"
                          id="deliverymin"
                          placeholder={t("Minimum Delivery")}
                        />
                      </div>
                      <div className={styles["product-price"]}>
                        <label htmlFor="address">{t("Address")}</label>
                        <input
                          ref={restAddress}
                          type="text"
                          id="address"
                          placeholder={t("Address")}
                        />
                      </div>
                      <div className={styles["product-selectbox"]}>
                        <label
                          className={styles.restaurants}
                          htmlFor="restaurants"
                        >
                          {t("Category")}
                        </label>
                        <AddResCategoryBox />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className={styles["editmodal-bot"]}>
                <button
                  onClick={() => dispatch(closeAddResModal())}
                  className={styles["edit-cancel"]}
                >
                  {t("Cancel")}
                </button>
                <button
                  onClick={() => handleCreateRest()}
                  className={styles["edit-update"]}
                >
                  {t("Create Restaurant")}
                </button>
              </div>
            </div>

            <div className={styles["close-contain"]}>
              <button
                onClick={() => dispatch(closeAddResModal())}
                className={styles["close-btn"]}
              >
                <Image src={closeBtn} alt="close-button" />
              </button>
            </div>
          </div>
        </>
      ) : selResEditModal ? (
        <>
          <div className={styles.overlay}>
            <div
              className={styles["show-editmodal"]}
              data-aos="fade-left"
              data-aos-duration="500"
            >
              <div className={styles["editmodal-head"]}>
                <h3>{t("Edit restaurants")}</h3>
              </div>
              <div className={styles["editmodal-top"]}>
                <div className={styles["editmodal-left-contain"]}>
                  <div className={styles["editmodal-left-top"]}>
                    <h3>{t("Edit Restaurant")}</h3>
                    <span>{t("Upload Image")}</span>
                    {selResEditModal.img_url && !addProductImg ? (
                      <Image
                        src={selResEditModal.img_url}
                        width={200}
                        height={200}
                        alt="restaurant"
                      />
                    ) : (
                      <Image
                        src={addProductImg}
                        width={200}
                        height={200}
                        alt="restaurant"
                      />
                    )}
                  </div>
                  <div className={styles["editmodal-left-bot"]}>
                    <span>{t("Edit your Restaurant information")}</span>
                  </div>
                </div>
                <div className={styles["editmodal-right-contain"]}>
                  <div className={styles["mob-upload-text"]}>
                    <span>{t("Upload your restaurants image")}</span>
                  </div>
                  <div className={styles["editmodal-right-top"]}>
                    <button className="flex flex-col items-center relative">
                      <Image src={uploadImg} alt="upload" />
                      {t("upload")}
                      <input
                        onChange={(e) => handleNewProductImg(e)}
                        className="absolute -top-4 w-[100px] h-[120px]"
                        type="file"
                        style={{ opacity: 0, cursor: "pointer" }}
                      />
                    </button>
                  </div>
                  <div className={styles["editmodal-right-bot"]}>
                    <div className={styles["mob-restaurant-info"]}>
                      <span>{t("Edit your Restaurants information")}</span>
                    </div>
                    <form>
                      <div className={styles["product-name"]}>
                        <label htmlFor="restaurant">{t("Name")}</label>
                        <input
                          type="text"
                          id="restaurant"
                          onChange={(e) => handleChangeRestName(e)}
                          value={currentRestData?.name}
                          placeholder={t("Restaurant Name")}
                        />
                      </div>
                      <div className={styles["product-description"]}>
                        <label htmlFor="description">{t("Cuisine")}</label>
                        <textarea
                          name="description"
                          id={styles["desc"]}
                          onChange={(e) => handleChangeCuisineName(e)}
                          value={currentRestData?.cuisine}
                          placeholder={t("Cuisine")}
                        ></textarea>
                      </div>
                      <div className={styles["product-price"]}>
                        <label htmlFor="deliveryprice">
                          {t("Delivery Price")} $
                        </label>
                        <input
                          type="text"
                          id="deliveryprice"
                          onChange={(e) => handleChangeDelPriceName(e)}
                          value={currentRestData?.delivery_price}
                          placeholder={t("Deliverey Price")}
                        />
                      </div>
                      <div className={styles["product-price"]}>
                        <label htmlFor="deliverymin">{t("Delivery Min")}</label>
                        <input
                          type="text"
                          id="deliverymin"
                          onChange={(e) => handleChangeDelMinName(e)}
                          value={currentRestData?.delivery_min}
                          placeholder={t("Minimum Delivery")}
                        />
                      </div>
                      <div className={styles["product-price"]}>
                        <label htmlFor="address">{t("Address")}</label>
                        <input
                          type="text"
                          id="address"
                          onChange={(e) => handleChangeAddressName(e)}
                          value={currentRestData?.address}
                          placeholder={t("Address")}
                        />
                      </div>
                      <div className={styles["product-selectbox"]}>
                        <label
                          className={styles.restaurants}
                          htmlFor="restaurants"
                        >
                          {t("Restaurants")}
                        </label>
                        <EditRestSelectBox />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className={styles["editmodal-bot"]}>
                <button
                  onClick={() => dispatch(closeResModalEdit())}
                  className={styles["edit-cancel"]}
                >
                  {t("Cancel")}
                </button>
                <button
                  onClick={() => handleUpdateRest()}
                  className={styles["edit-update"]}
                >
                  {t("Update Restaurant")}
                </button>
              </div>
            </div>

            <div className={styles["close-contain"]}>
              <button
                onClick={() => dispatch(closeResModalEdit())}
                className={styles["close-btn"]}
              >
                <Image src={closeBtn} alt="close-button" />
              </button>
            </div>
          </div>
        </>
      ) : selCategoryEditModal ? (
        <>
          <div className={styles.overlay}>
            <div
              className={styles["show-editmodal"]}
              data-aos="fade-left"
              data-aos-duration="500"
            >
              <div className={styles["editmodal-head"]}>
                <h3>{t("Add Category")}</h3>
              </div>
              <div className={styles["editmodal-top"]}>
                <div className={styles["editmodal-left-contain"]}>
                  <div className={styles["editmodal-left-top"]}>
                    <h3>{t("Edit Category")}</h3>
                    <span>{t("Upload image")}</span>
                    {selCategoryEditModal.img_url && !addProductImg ? (
                      <Image
                        src={selCategoryEditModal.img_url}
                        width={200}
                        height={200}
                        alt="product"
                      />
                    ) : (
                      <Image
                        src={addProductImg}
                        width={100}
                        height={100}
                        alt="product"
                      />
                    )}
                  </div>
                  <div
                    className={`${styles["editmodal-left-bot"]} mt-52 w-[260px]`}
                  >
                    <span>Edit your Category information</span>
                  </div>
                </div>
                <div className={styles["editmodal-right-contain"]}>
                  <div className={styles["mob-upload-text"]}>
                    <span>{t("Upload your restaurants image")}</span>
                  </div>
                  <div className={styles["editmodal-right-top"]}>
                    <button className="flex flex-col items-center relative">
                      <Image src={uploadImg} alt="upload" />
                      {t("upload")}
                      <input
                        onChange={(e) => handleNewProductImg(e)}
                        className="absolute -top-4 w-[100px] h-[120px]"
                        type="file"
                        style={{ opacity: 0, cursor: "pointer" }}
                      />
                    </button>
                  </div>
                  <div className={styles["editmodal-right-bot"]}>
                    <div className={styles["mob-restaurant-info"]}>
                      <span>
                        {t(
                          "Edit your Category description and necessary information"
                        )}
                      </span>
                    </div>
                    <form>
                      <div className={styles["product-name"]}>
                        <label htmlFor="name">{t("Name")}</label>
                        <input
                          onChange={(e) => handleChangeCategoryName(e)}
                          value={currentCatData?.name}
                          type="text"
                          id="name"
                          placeholder={t("Category Name")}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className={`${styles["editmodal-bot"]} pt-16`}>
                <button
                  onClick={() => dispatch(closeCategoryModalEdit())}
                  className={styles["edit-cancel"]}
                >
                  {t("Cancel")}
                </button>
                <button
                  onClick={() => handleUpdateCategory()}
                  className={styles["edit-update"]}
                >
                  {t("Update Category")}
                </button>
              </div>
            </div>
            <div className={styles["close-contain"]}>
              <button
                onClick={() => dispatch(closeCategoryModalEdit())}
                className={styles["close-btn"]}
              >
                <Image src={closeBtn} alt="close-button" />
              </button>
            </div>
          </div>
        </>
      ) : selCategoryAddModal ? (
        <>
          <div className={styles.overlay}>
            <div
              className={styles["show-editmodal"]}
              data-aos="fade-left"
              data-aos-duration="500"
            >
              <div className={styles["editmodal-head"]}>
                <h3>{t("Add Category")}</h3>
              </div>
              <div className={styles["editmodal-top"]}>
                <div className={styles["editmodal-left-contain"]}>
                  <div className={styles["editmodal-left-top"]}>
                    <h3>{t("Add Category")}</h3>
                    <span>{t("Upload image")}</span>
                    {addProductImg && (
                      <Image
                        src={addProductImg}
                        width={200}
                        height={200}
                        alt="product"
                      />
                    )}
                  </div>
                  <div
                    className={`${styles["editmodal-left-bot"]} mt-52 w-[260px]`}
                  >
                    <span>Add your Category information</span>
                  </div>
                </div>
                <div className={styles["editmodal-right-contain"]}>
                  <div className={styles["mob-upload-text"]}>
                    <span>{t("Upload your restaurants image")}</span>
                  </div>
                  <div className={styles["editmodal-right-top"]}>
                    <button className="flex flex-col items-center relative">
                      <Image src={uploadImg} alt="upload" />
                      {t("upload")}
                      <input
                        onChange={(e) => handleNewProductImg(e)}
                        className="absolute -top-4 w-[100px] h-[120px]"
                        type="file"
                        style={{ opacity: 0, cursor: "pointer" }}
                      />
                    </button>
                  </div>
                  <div className={styles["editmodal-right-bot"]}>
                    <div className={styles["mob-restaurant-info"]}>
                      <span>
                        {t(
                          "Add your Product description and necessary information"
                        )}
                      </span>
                    </div>
                    <form>
                      <div className={styles["product-name"]}>
                        <label htmlFor="name">{t("Name")}</label>
                        <input
                          ref={catName}
                          type="text"
                          id="name"
                          placeholder={t("Category Name")}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className={`${styles["editmodal-bot"]} pt-16`}>
                <button
                  onClick={() => dispatch(closeAddCategoryModal())}
                  className={styles["edit-cancel"]}
                >
                  {t("Cancel")}
                </button>
                <button
                  onClick={() => handleAddCategory()}
                  className={styles["edit-update"]}
                >
                  {t("Create Category")}
                </button>
              </div>
            </div>
            <div className={styles["close-contain"]}>
              <button
                onClick={() => dispatch(closeAddCategoryModal())}
                className={styles["close-btn"]}
              >
                <Image src={closeBtn} alt="close-button" />
              </button>
            </div>
          </div>
        </>
      ) : selOfferAddModal ? (
        <div className={styles.overlay}>
          <div
            className={styles["show-editmodal"]}
            data-aos="fade-left"
            data-aos-duration="500"
          >
            <div className={styles["editmodal-head"]}>
              <h3>{t("Add Offer")}</h3>
            </div>
            <div className={styles["editmodal-top"]}>
              <div className={styles["editmodal-left-contain"]}>
                <div className={styles["editmodal-left-top"]}>
                  <h3>{t("Add Offer")}</h3>
                  <span>{t("Upload image")}</span>
                  {addProductImg && (
                    <Image
                      src={addProductImg}
                      width={200}
                      height={200}
                      alt="product"
                    />
                  )}
                </div>
                <div
                  className={`${styles["editmodal-left-bot"]} mt-52 w-[260px]`}
                >
                  <span>{t("Add your Offer information")}</span>
                </div>
              </div>
              <div className={styles["editmodal-right-contain"]}>
                <div className={styles["mob-upload-text"]}>
                  <span>{t("Upload your offer image")}</span>
                </div>
                <div className={styles["editmodal-right-top"]}>
                  <button className="flex flex-col items-center relative">
                    <Image src={uploadImg} alt="upload" />
                    {t("upload")}
                    <input
                      onChange={(e) => handleNewProductImg(e)}
                      className="absolute -top-4 w-[100px] h-[120px]"
                      type="file"
                      style={{ opacity: 0, cursor: "pointer" }}
                    />
                  </button>
                </div>
                <div className={styles["editmodal-right-bot"]}>
                  <div className={styles["mob-restaurant-info"]}>
                    <span>
                      {t(
                        "Add your Offer description and necessary information"
                      )}
                    </span>
                  </div>
                  <form>
                    <div className={styles["product-name"]}>
                      <label htmlFor="name">{t("Name")}</label>
                      <input
                        ref={offerName}
                        type="text"
                        id="price"
                        placeholder="Title Name"
                      />
                    </div>
                    <div className={styles["product-description"]}>
                      <label htmlFor="description">{t("Description")}</label>
                      <textarea
                        ref={offerDesc}
                        name="description"
                        id={styles["desc"]}
                        placeholder={t("Description")}
                      ></textarea>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className={`${styles["editmodal-bot"]} pt-16`}>
              <button
                onClick={() => dispatch(closeAddOfferModal())}
                className={styles["edit-cancel"]}
              >
                {t("Cancel")}
              </button>
              <button
                className={styles["edit-update"]}
                onClick={() => handleAddOffer()}
              >
                {t("Create Offer")}
              </button>
            </div>
          </div>
          <div className={styles["close-contain"]}>
            <button
              onClick={() => dispatch(closeAddOfferModal())}
              className={styles["close-btn"]}
            >
              <Image src={closeBtn} alt="close-button" />
            </button>
          </div>
        </div>
      ) : selOfferEditModal ? (
        <div className={styles.overlay}>
          <div
            className={styles["show-editmodal"]}
            data-aos="fade-left"
            data-aos-duration="500"
          >
            <div className={styles["editmodal-head"]}>
              <h3>{t("Edit Offer")}</h3>
            </div>
            <div className={styles["editmodal-top"]}>
              <div className={styles["editmodal-left-contain"]}>
                <div className={styles["editmodal-left-top"]}>
                  <h3>{t("Add Offer")}</h3>
                  <span>{t("Upload image")}</span>
                  {selOfferEditModal.img_url && !addProductImg ? (
                    <Image
                      src={selOfferEditModal.img_url}
                      width={200}
                      height={200}
                      alt="product"
                    />
                  ) : (
                    <Image
                      src={addProductImg}
                      width={100}
                      height={100}
                      alt="product"
                    />
                  )}
                </div>
                <div
                  className={`${styles["editmodal-left-bot"]} mt-52 w-[260px]`}
                >
                  <span>{t("Edit your Offer information")}</span>
                </div>
              </div>
              <div className={styles["editmodal-right-contain"]}>
                <div className={styles["mob-upload-text"]}>
                  <span>{t("Upload your offer image")}</span>
                </div>
                <div className={styles["editmodal-right-top"]}>
                  <button className="flex flex-col items-center relative">
                    <Image src={uploadImg} alt="upload" />
                    {t("upload")}
                    <input
                      onChange={(e) => handleNewProductImg(e)}
                      className="absolute -top-4 w-[100px] h-[120px]"
                      type="file"
                      style={{ opacity: 0, cursor: "pointer" }}
                    />
                  </button>
                </div>
                <div className={styles["editmodal-right-bot"]}>
                  <div className={styles["mob-restaurant-info"]}>
                    <span>
                      {t(
                        "Add your Product description and necessary information"
                      )}
                    </span>
                  </div>
                  <form>
                    <div className={styles["product-name"]}>
                      <label htmlFor="name">{t("Title")}</label>
                      <input
                        onChange={(e) => handleChangeOfferName(e)}
                        value={currentOfferData?.name}
                        type="text"
                        id="price"
                        placeholder="Title Name"
                      />
                    </div>
                    <div className={styles["product-description"]}>
                      <label htmlFor="description">{t("Description")}</label>
                      <textarea
                        onChange={(e) => handleChangeOfferDesc(e)}
                        value={currentOfferData?.description}
                        name="description"
                        id={styles["desc"]}
                        placeholder={t("Description")}
                      ></textarea>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className={`${styles["editmodal-bot"]} pt-16`}>
              <button
                onClick={() => dispatch(closeOfferModalEdit())}
                className={styles["edit-cancel"]}
              >
                {t("Cancel")}
              </button>
              <button
                onClick={() => handleUpdateOffer()}
                className={styles["edit-update"]}
              >
                {t("Update Product")}
              </button>
            </div>
          </div>
          <div className={styles["close-contain"]}>
            <button
              onClick={() => dispatch(closeOfferModalEdit())}
              className={styles["close-btn"]}
            >
              <Image src={closeBtn} alt="close-button" />
            </button>
          </div>
        </div>
      ) :
        (""
        )}
    </>
  );
};

export default EditModal;
