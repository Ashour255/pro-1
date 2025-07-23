import { createSlice } from "@reduxjs/toolkit";

// تحديث localStorage بأمان مع تتبع
const updateLocalStorage = (items) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
      // console.log("تم تحديث localStorage بنجاح:", items);
    } catch (error) {
      // console.error("فشل تحديث localStorage:", error);
    }
  }
};

// قراءة السلة من localStorage بأمان مع تتبع
const getInitialCart = () => {
  // إذا كنا على السيرفر، رجّع سلة فارغة مباشرة
  if (typeof window === "undefined") {
    // console.log("SSR: تهيئة سلة فارغة");
    return [];
  }

  try {
    const stored = localStorage.getItem("cart");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        const filteredItems = parsed.filter(
          (item) => item?.slug && item?.qty > 0
        );
        // console.log("تم قراءة السلة من localStorage:", filteredItems);
        return filteredItems;
      }
    }
  } catch (error) {
    // console.error("فشل قراءة بيانات السلة:", error);
  }
  // console.log("لا توجد بيانات في localStorage، تهيئة سلة فارغة");
  return [];
};

const initialState = {
  items: getInitialCart(),
  isCartOpen: false, // حالة السلة (مفتوحة/مغلقة)
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
 addToCart: (state, action) => {
  const existing = state.items.find(
    (item) =>
      item.slug === action.payload.slug &&
      item.price === action.payload.price &&
      item.price_before === action.payload.price_before &&
      item.selectedColor === action.payload.selectedColor &&
      item.selectedSize === action.payload.selectedSize
  );

  if (existing) {
    if (existing.qty < existing.product_quantity) {
      existing.qty += 1; // الزيادة فقط لو أقل من العدد المتاح
    }
  } else {
    state.items.push({ ...action.payload, qty: 1 }); // منتج جديد بتفاصيله
  }

  updateLocalStorage(state.items);
},

    deleteFromCart: (state, action) => {
      // Find the index of the item to delete based on all its unique properties
      const indexToDelete = state.items.findIndex(
        (item) =>
          item.slug === action.payload.slug &&
          item.selectedColor === action.payload.selectedColor &&
          item.selectedSize === action.payload.selectedSize
      );

      if (indexToDelete !== -1) {
        state.items.splice(indexToDelete, 1);
      }
      updateLocalStorage(state.items);
    },
    clearCart: (state) => {
      // console.log("جارٍ إفراغ السلة");
      state.items = [];
      updateLocalStorage([]);
    },
    setCart: (state, action) => {
      // console.log("جارٍ تعيين بيانات جديدة للسلة:", action.payload);
      state.items = Array.isArray(action.payload) ? action.payload : [];
      updateLocalStorage(state.items);
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) =>
          item.slug === action.payload.slug &&
          item.selectedColor === action.payload.selectedColor &&
          item.selectedSize === action.payload.selectedSize
      );
      if (item && item.qty < 99) {
        item.qty += 1;
      }
      updateLocalStorage(state.items);
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) =>
          item.slug === action.payload.slug &&
          item.selectedColor === action.payload.selectedColor &&
          item.selectedSize === action.payload.selectedSize
      );
      if (item) {
        if (item.qty > 1) {
          item.qty -= 1;
        } else {
          // If quantity becomes 0 or less, remove the item
          state.items = state.items.filter(
            (pro) =>
              !(
                pro.slug === action.payload.slug &&
                pro.selectedColor === action.payload.selectedColor &&
                pro.selectedSize === action.payload.selectedSize
              )
          );
        }
      }
      updateLocalStorage(state.items);
    },
    setCartOpen: (state, action) => {
      // console.log("تحديث حالة السلة:", action.payload);
      state.isCartOpen = action.payload;
    },
  },
});

export const selectCartTotal = (state) =>
  state.cart.items.reduce(
    (total, item) => total + (parseFloat(item.price) || 0) * (item.qty || 0),
    0
  );

export const selectCartCount = (state) => state.cart.items.length;

export const {
  addToCart,
  deleteFromCart,
  clearCart,
  setCart,
  increaseQuantity,
  decreaseQuantity,
  setCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;