import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.scss';
import store from './redux/store.jsx'; // 引入你的 store 配置

// 使用 React.lazy 懒加载 App 组件
const App = lazy(() => import('./App.jsx'));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 使用 Suspense 包裹懒加载的组件，并提供 fallback */}
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </Provider>
  </StrictMode>
);
