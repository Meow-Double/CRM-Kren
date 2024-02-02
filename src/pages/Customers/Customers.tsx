import { useEffect, useState } from 'react';
import { Card } from './Card/Card';
import styles from './Customers.module.scss';
import axios from 'axios';
import { useSelector } from 'react-redux';
import uniq from 'uniq';

const cardNames = {
  image: './',
  company: 'Наименование',
  email: 'Почта',
  place: 'Откуда пришёл',
  buttons: 'Опция',
};
export const Customers: React.FC<{}> = () => {
  // const [data, setData] = useState();

  // useEffect(() => {
  //   ( async () => {
  //     const {data} = await axios.get("http://localhost:3000/items");
  //     setData(data);
  //   })()
  // }, [])

  const [items, setItems] = useState([]);

  const boards = useSelector((state) => state.boards.boards);

  useEffect(() => {
    const array: Array<any> = [];

    boards.forEach((board) => array.push(...board.items));

    setItems(array);
  }, [boards]);

  const renderCards = (): JSX.Element[] => {
    return items.map((item: any, index) => <Card key={`${item.id}_${index}`} {...item} />);
  };

  return (
    <div>
      <h1 className="title">Наши клиенты</h1>
      <ul>
        <Card {...cardNames} />
        {renderCards()}
      </ul>
    </div>
  );
};
