import { AnimatePresence, motion } from 'framer-motion';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Enroll from './views/Enroll/enroll';
import Login from './views/Login/Login';
import Password from './views/Password/password';

// 定义页面切换动画
const pageVariants = (direction) => ({
  initial: { opacity: 0, x: direction === 'left' ? '100%' : '-100%' }, // 根据方向来设置初始位置
  in: { opacity: 1, x: 0 }, // 页面进入时的动画
  out: { opacity: 0, x: direction === 'left' ? '-100%' : '100%' }, // 根据方向来设置退出位置
});

const pageTransition = {
  type: 'tween', // 使用补间动画
  ease: 'anticipate', // 缓动效果
  duration: 0.5, // 动画时长
};

// 包裹路由的组件
function AnimatedRoutes() {
  const location = useLocation(); 
  let direction = ''; 

  // 根据路由的变化来确定滑动方向
  if (location.pathname === '/password') {
    direction = 'right';
  } else if (location.pathname === '/enroll') {
    direction = 'left';
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants('right')}
              transition={pageTransition}
            >
              <Login />
            </motion.div>
          }
        />
        <Route
          path="/enroll"
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants('left')}
              transition={pageTransition}
            >
              <Enroll />
            </motion.div>
          }
        />
        <Route
          path="/password"
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants('right')}
              transition={pageTransition}
            >
              <Password />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
