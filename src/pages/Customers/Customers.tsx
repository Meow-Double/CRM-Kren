import { useEffect, useState } from 'react';
import { Card } from './Card/Card';
import styles from './Customers.module.scss';
import { useSelector } from 'react-redux';
import { boardsSelect } from '../../store/slices/boardsSlice/boardsSelectors';
import { itemTypes } from '../../store/slices/boardsSlice/boardsTypes';

const cardNames = {
  company: 'Наименование',
  email: 'Почта',
  place: 'Откуда пришёл',
  buttons: 'Опция',
  img: '/public/companyIcon-1.png',
};
export const Customers: React.FC<{}> = () => {
  // const [data, setData] = useState();

  // useEffect(() => {
  //   ( async () => {
  //     const {data} = await axios.get("http://localhost:3000/items");
  //     setData(data);
  //   })()
  // }, [])

  const [items, setItems] = useState<itemTypes[]>([]);

  const boards = useSelector(boardsSelect);

  useEffect(() => {
    const array: Array<itemTypes> = [];

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
        {items && renderCards()}
      </ul>
    </div>
  );
};
