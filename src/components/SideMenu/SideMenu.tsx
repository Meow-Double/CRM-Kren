import React, { useEffect, useState } from 'react';
import styles from './SideMenu.module.scss';
import LogoIcon from '../../assets/logo.svg?react';
import ExitIcon from '../../assets/exit.svg?react';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../store/slices/userSlice/userSlice';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

const menuItem: string[] = [
  'Home',
  'Products',
  'Payments',
  'Orders',
  'Customers',
  'Feedback',
  'Settings',
  'Help center',
];

export const SideMenu: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(0);

  const onOutsideLogin = () => {
    window.localStorage.removeItem('user');
    dispatch(removeUser());
    navigate('/');
  };

  useEffect(() => {
    const path = location.pathname.substring(1);
    const result = path.charAt(0).toUpperCase() + path.slice(1);

    const index = menuItem.indexOf(result);

    if (index > 0) {
      setActiveItem(index);
    }
  }, []);

  // const renderItem = (): JSX.Element[] => {
  //   return menuItem.map((item) => (
  //     <li key={item}>
  //       <NavLink
  //         to={`${item.toLowerCase()}`}
  //         className={({ isActive }) => (isActive ? styles.activeLink : '')}
  //       >
  //         {item}
  //       </NavLink>
  //     </li>
  //   ));
  // };

  const renderItem = (): JSX.Element[] => {
    return menuItem.map((item, index) => (
      <li key={item} onClick={() => setActiveItem(index)}>
        <Link
          to={item === 'Home' ? '/' : `${item.toLowerCase()}`}
          className={activeItem === index ? styles.activeLink : ''}
        >
          {item}
        </Link>
      </li>
    ));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <LogoIcon className={styles.logoImg} />
        <h4 className={styles.logoText}>KRen</h4>
        <button onClick={onOutsideLogin} className={styles.exit}>
          <ExitIcon className={styles.exitImg} />
        </button>
      </div>

      <ul className={styles.menu}>
        {renderItem()}
        {/* <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/orders">Orders</Link>
        </li>
        <li>
          <Link to="/customers">Customers</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li> */}
      </ul>
    </div>
  );
};
