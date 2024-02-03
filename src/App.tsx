import './index.scss';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Customers, EditPage, Home, Login, Register } from './pages';

import { useAuth } from './hooks/useAuth';
import { useEffect } from 'react';
import { setUser } from './store/slices/userSlice/userSlice';
import { useAppDispatch } from './hooks/useAppDispatch';
import { SideMenu } from './components';
import qs from 'qs';
import styles from './App.module.scss';
import {
  fetchMessage,
  handleOpenAbout,
  setCurrentParametrs,
} from './store/slices/aboutSlice/aboutSlice';
import { fetchBoards } from './store/slices/boardsSlice/fetchBoards';
import { useSelector } from 'react-redux';

export const App = () => {
  const { isAuth } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const path = useLocation();

  const loading = useSelector((state) => state.boards.loading);

  useEffect(() => {
    const currentPath = path.pathname;
    const currentSearch = path.search;

    const date = window.localStorage.getItem('user');
    if (date) {
      dispatch(setUser(JSON.parse(date)));

      if (window.location.search || currentSearch){
        navigate(`${currentSearch}`);
      }else{
        navigate(`${currentPath}`);
      }
    }
  }, []);

  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1));
  //     dispatch(handleOpenAbout(true));
  //     // dispatch(fetchMessage());
  //     const parametrs = {
  //       id: Number(params.id),
  //       boardId: Number(params.board),
  //       itemId: Number(params.itemId),
  //     };
  //     dispatch(setCurrentParametrs(parametrs));
  //     // const sort = sortNames.find((item) => item.sortProperty === params.sortProperty);

  //     // dispatch(
  //     //   setFilters({
  //     //     ...params,
  //     //     sort,
  //     //   }),
  //     // );
  //     // isSearch.current = true;
  //   }
  // }, []);

  useEffect(() => {
    dispatch(fetchBoards());
    dispatch(fetchMessage());
  }, []);

  useEffect(() => {
    if (!loading) {
      if (window.location.search) {
        const params = qs.parse(window.location.search.substring(1));
        dispatch(handleOpenAbout(true));

        const parametrs = {
          id: Number(params.id),
          boardId: Number(params.board),
          itemId: Number(params.itemId),
        };
        dispatch(setCurrentParametrs(parametrs));
      }
    }
  }, [loading]);

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
