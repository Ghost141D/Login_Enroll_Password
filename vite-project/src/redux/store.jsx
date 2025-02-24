// 从 @reduxjs/toolkit 导入 configureStore 函数，用于配置和创建 Redux store
import { configureStore } from "@reduxjs/toolkit";
// 导入在 authSlice 中定义的 reduce,用于管理与用户认证相关的状态
import authReducer from "./authSlice";

// 使用 configureStore 创建 Redux store
const store = configureStore({
  reducer: {
    // 在 store 中添加名为 "auth" 的 reducer,负责管理与用户认证相关的状态
    // authReducer 是从 authSlice 中导入的 reducer,处理用户认证的状态更新
    auth: authReducer, 
  },
});

// 导出 store 供外部使用
export default store;
