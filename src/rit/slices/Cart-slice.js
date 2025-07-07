import { createSlice } from "@reduxjs/toolkit";

// تحديث localStorage بأمان مع تتبع
const updateLocalStorage = (items) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
      console.log("تم تحديث localStorage بنجاح:", items);
    } catch (error) {
      console.error("فشل تحديث localStorage:", error);
    }
  }
};

// قراءة السلة من localStorage بأمان مع تتبع
const getInitialCart = () => {
  // إذا كنا على السيرفر، رجّع سلة فارغة مباشرة
  if (typeof window === "undefined") {
    console.log("SSR: تهيئة سلة فارغة");
    return [];
  }

  try {
    const stored = localStorage.getItem("cart");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        const filteredItems = parsed.filter((item) => item?.slug && item?.qty > 0);
        console.log("تم قراءة السلة من localStorage:", filteredItems);
        return filteredItems;
      }
    }
  } catch (error) {
    console.error("فشل قراءة بيانات السلة:", error);
  }
  console.log("لا توجد بيانات في localStorage، تهيئة سلة فارغة");
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
      console.log("جارٍ إضافة منتج:", action.payload);
      const existing = state.items.find((item) => item.slug === action.payload.slug);
      if (existing) {
        existing.qty += 1; // زيادة الكمية بـ 1 لو المنتج موجود
      } else {
        state.items.push({ ...action.payload, qty: 1 }); // إضافة منتج جديد بـ qty: 1
      }
      updateLocalStorage(state.items);
    },
    deleteFromCart: (state, action) => {
      console.log("جارٍ حذف منتج بـ slug:", action.payload.slug);
      state.items = state.items.filter((item) => item.slug !== action.payload.slug);
      updateLocalStorage(state.items);
    },
    clearCart: (state) => {
      console.log("جارٍ إفراغ السلة");
      state.items = [];
      updateLocalStorage([]);
    },
    setCart: (state, action) => {
      console.log("جارٍ تعيين بيانات جديدة للسلة:", action.payload);
      state.items = Array.isArray(action.payload) ? action.payload : [];
      updateLocalStorage(state.items);
    },
    increaseQuantity: (state, action) => {
      console.log("جارٍ زيادة الكمية لـ slug:", action.payload.slug);
      const item = state.items.find((item) => item.slug === action.payload.slug);
      if (item && item.qty < 99) {
        item.qty += 1;
      }
      updateLocalStorage(state.items);
    },
    decreaseQuantity: (state, action) => {
      console.log("جارٍ تقليل الكمية لـ slug:", action.payload.slug);
      const item = state.items.find((item) => item.slug === action.payload.slug);
      if (item) {
        if (item.qty > 1) {
          item.qty -= 1;
        } else {
          state.items = state.items.filter((pro) => pro.slug !== action.payload.slug);
        }
      }
      updateLocalStorage(state.items);
    },
    setCartOpen: (state, action) => {
      console.log("تحديث حالة السلة:", action.payload);
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