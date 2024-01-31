import { useEffect, useState } from 'react';
// import { AboutCard, List, SideMenu } from '../../components';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/slices/userSlice/userSlice';
import styles from './Home.module.scss';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { fetchCards } from '../../store/slices/cardsSlice/cardsSlice';
import qs from "qs"
import { setId, setOpen } from '../../store/slices/aboutSlice/aboutSlice';
import { Boards } from '../../components/Boards/Boards';


export const Home: React.FC = () => {
  const user = useSelector(selectUser);

  // const openWindow = useSelector(state => state.about.open)


  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user.email) {
      window.localStorage.setItem('user', JSON.stringify(user));
    }
    dispatch(fetchCards());
  }, []);






  return (
    // <div className="container">
    //   <div className={styles.inner}>
    //     <SideMenu />
    //     <div className={styles.window}>
    <>
      <h1 className="title">CRM System by KRen</h1>
      <Boards />
      {/* <List /> */}
      {/* {openWindow && <AboutCard/>} */}
    </>

    /* </div>
        </div>
      </div> */
  );
};
