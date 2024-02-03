import { useEffect, useState } from 'react';
// import { AboutCard, List, SideMenu } from '../../components';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/slices/userSlice/userSlice';
import styles from './Home.module.scss';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import qs from 'qs';
import {
  fetchMessage,
  handleOpenAbout,
  setCurrentParametrs,
  setId,
  setOpen,
} from '../../store/slices/aboutSlice/aboutSlice';
import { Boards } from '../../components/Boards/Boards';
import { AboutCard } from '../../components/AboutCard/AboutCard';
import { fetchBoards } from '../../store/slices/boardsSlice/fetchBoards';

export const Home: React.FC = () => {
  const user = useSelector(selectUser);

  const openWindow = useSelector((state) => state.about.isOpen);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user.email) {
      window.localStorage.setItem('user', JSON.stringify(user));
    }
    // dispatch(fetchCards());
  }, []);

  // const loading = useSelector((state) => state.boards.loading);

  // useEffect(() => {
  //   dispatch(fetchBoards());
  //   dispatch(fetchMessage());
  // }, []);

  // useEffect(() => {
  //   if (!loading) {
  //     if (window.location.search) {
  //       const params = qs.parse(window.location.search.substring(1));
  //       dispatch(handleOpenAbout(true));

  //       const parametrs = {
  //         id: Number(params.id),
  //         boardId: Number(params.board),
  //         itemId: Number(params.itemId),
  //       };
  //       dispatch(setCurrentParametrs(parametrs));
  //     }
  //   }
  // }, [loading]);

  return (
    // <div className="container">
    //   <div className={styles.inner}>
    //     <SideMenu />
    //     <div className={styles.window}>
    <>
      <h1 className="title">CRM System by KRen</h1>
      <Boards />
      {openWindow && <AboutCard />}
      {/* <AboutCard /> */}
      {/* <List /> */}
      {/* {openWindow && <AboutCard/>} */}
    </>

    /* </div>
        </div>
      </div> */
  );
};
