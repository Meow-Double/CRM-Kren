import React from 'react';
import styles from './SideMenu.module.scss';
import LogoIcon from '../../assets/logo.svg?react';
import ExitIcon from '../../assets/exit.svg?react';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../store/slices/userSlice/userSlice';
import { Link, useNavigate } from 'react-router-dom';

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
  
  const onOutsideLogin = () => {
    window.localStorage.removeItem('user');
    dispatch(removeUser());
    navigate("/")
  };

  const renderItem = (): JSX.Element[] => {
    return menuItem.map((item) => <li key={item}><Link to={`${item.toLowerCase()}`}>{item}</Link></li>);
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

      <ul className={styles.menu}>{renderItem()}</ul>
    </div>
  );
};
