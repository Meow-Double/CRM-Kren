import './index.scss';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Customers, EditPage, Home, Login, Register } from './pages';

import { useAuth } from './hooks/useAuth';
import { useEffect } from 'react';
import { setUser } from './store/slices/userSlice/userSlice';
import { useAppDispatch } from './hooks/useAppDispatch';
import { SideMenu } from './components';

import styles from './App.module.scss';

export const App = () => {
  const { isAuth } = useAuth();
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const path = useLocation();

  useEffect(() => {
    const date = window.localStorage.getItem('user');
    if (date) {
      dispatch(setUser(JSON.parse(date)));
      nav(`${path.search}`);
    }
  }, []);

  return (
    <>
      {isAuth ? (
        <div className="container">
          <div className={styles.inner}>
            <SideMenu />
            <div className={styles.window}>
              <Routes>
                <Route path="/*" element={<Home />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/customers/edit/:company" element={<EditPage />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/*" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </>
  );
};
