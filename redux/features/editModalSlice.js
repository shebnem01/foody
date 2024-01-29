import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isActiveModal: "",
  isActiveAddProductModal: false,
  isActiveAddResModal: false,
  isActiveResModal: "",
  isActiveCategoryModal: "",
  isActiveAddCategoryModal: false,
  isActiveOfferModal: "",
  isActiveAddOfferModal: false,
  isActiveAddOrderModal:false,
};

export const editModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModalEdit: (state, action) => {
      state.isActiveModal = action.payload;
    },
    closeModalEdit: (state) => {
      state.isActiveModal = false;
    },
    openAddProductModal: (state) => {
      state.isActiveAddProductModal = true;
    },
    closeAddProductModal: (state) => {
      state.isActiveAddProductModal = false;
    },
    openAddResModal: (state) => {
      state.isActiveAddResModal = true;
    },
    closeAddResModal: (state) => {
      state.isActiveAddResModal = false;
    },
    openResModalEdit: (state, action) => {
      state.isActiveResModal = action.payload;
    },
    closeResModalEdit: (state) => {
      state.isActiveResModal = false;
    },
    openAddCategoryModal: (state) => {
      state.isActiveAddCategoryModal = true;
    },
    closeAddCategoryModal: (state) => {
      state.isActiveAddCategoryModal = false;
    },
    openCategoryModalEdit: (state,action) => {
      state.isActiveCategoryModal = action.payload;
    },
    closeCategoryModalEdit: (state) => {
      state.isActiveCategoryModal = false;
    },
    openAddOfferModal: (state) => {
      state.isActiveAddOfferModal = true;
    },
    closeAddOfferModal: (state) => {
      state.isActiveAddOfferModal = false;
    },
    openOfferModalEdit: (state,action) => {
      state.isActiveOfferModal = action.payload;
    },
    closeOfferModalEdit: (state) => {
      state.isActiveOfferModal = false;
    },
  },
});

export const {
  openModalEdit,
  closeModalEdit,
  openAddProductModal,
  closeAddProductModal,
  openAddResModal,
  closeAddResModal,
  openResModalEdit,
  closeResModalEdit,
  openAddCategoryModal,
  closeAddCategoryModal,
  openCategoryModalEdit,
  closeCategoryModalEdit,
  openAddOfferModal,
  closeAddOfferModal,
  openOfferModalEdit,
  closeOfferModalEdit,
  openAddOrderModal,
  closeAddOrderModal,
  openOrderModalEdit,
  closeOrderModalEdit
} = editModalSlice.actions;

export default editModalSlice.reducer;
