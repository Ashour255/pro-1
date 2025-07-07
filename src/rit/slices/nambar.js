// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import globalReducer, { setGlobalValue } from './globalSlice';

export const initializeStore = async () => {
  // جيب البيانات من API
  const res = await fetch('http://localhost:3000/api/my-data'); // غير حسب المسار الحقيقي
  const data = await res.json();

  const store = configureStore({
    reducer: {
      global: globalReducer,
    },
    preloadedState: {
      global: {
        globalValue: data.value, // قيمة جاية من API
      },
    },
  });

  return store;
};
