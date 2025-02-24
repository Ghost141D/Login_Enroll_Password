// 从 @reduxjs/toolkit 导入 createSlice 函数，用于创建 Redux 的 slice切片
import { createSlice } from "@reduxjs/toolkit";

// 定义 authSlice 的初始状态
const initialState = {
  // 从 localStorage 获取用户信息，若没有则为 null
  user: JSON.parse(localStorage.getItem("user")) || null,
  
  // 从 localStorage 获取是否已认证的标识，若没有则为 false
  isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")) || false,

  // 存储登录失败的错误信息，初始值为 null
  error: null,
};

// 创建 authSlice,定义与认证相关的 Redux 状态和 actions
const authSlice = createSlice({
  // slice 的名字，用于 Redux devTools 中的命名
  name: "auth",

  // 设置 authSlice 的初始状态
  initialState,

  // 定义 reducers,用于处理不同的动作actions
  reducers: {
    // 登录成功的 action,接收一个 payload,存储用户信息并设置已认证状态
    loginSuccess: (state, action) => {
      state.user = action.payload; // 将登录时的用户信息存储到 state.user
      state.isAuthenticated = true; // 设置为已登录状态
      state.error = null; // 清除任何错误信息
    },

    // 登录失败的 action,接收一个 payload,存储错误信息
    loginFailed: (state, action) => {
      state.error = action.payload; // 将错误信息存储到 state.error
    },

    // 注销的 action,清空用户信息并设置为未认证状态
    logout: (state) => {
      state.user = null; // 清空用户信息
      state.isAuthenticated = false; // 设置为未登录状态
      state.error = null; // 清除错误信息
    },
  },
});

// 导出 actions登录成功、登录失败、注销以便在组件中使用
export const { loginSuccess, loginFailed, logout } = authSlice.actions;

// 导出 reducer,以便在 store 中使用
export default authSlice.reducer;
