import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/slices/userSlice/userSlice';
import styles from './Home.module.scss';
import { Boards } from '../../components/Boards/Boards';
import { AboutCard } from '../../components/AboutCard/AboutCard';
import { isOpenSelect } from '../../store/slices/aboutSlice/aboutSelectors';

export const Home: React.FC = () => {
  const user = useSelector(selectUser);

  const openWindow = useSelector(isOpenSelect);

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
