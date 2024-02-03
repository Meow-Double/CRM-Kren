import { useEffect, useRef, useState } from 'react';
import styles from './Message.module.scss';
import axios from 'axios';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
// import {
//   addMessage,
//   createMessage,
//   fetchMessage,
// } from '../../../store/slices/messageSlice/messageSlice';
import { useSelector } from 'react-redux';
import DeleteIcon from '../../../assets/delete.svg?react';
import { addMessage, removeMessage } from '../../../store/slices/aboutSlice/aboutSlice';

import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { getNowDate } from '../../../utils/getNowDate';

// type MessageProps = {
//   id: number;
//   boardId: number;
// };
dayjs.extend(relativeTime);

export const Message: React.FC<{ id: number | null }> = ({ id }) => {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  const [message, setMessage] = useState(null);
  // const [message, setMessage] = useState();
  const dispatch = useAppDispatch();

  // const message = useSelector((state) => state.message.message);

  // const addComment = () => {
  //   if (Object.keys(message).length) {
  //     const id = message.comments.length ? message.comments.length + 1 : 1;
  //     const newComment = { id: id, text: value };

  //     const newObj = {
  //       ...message,
  //       comments: [...message.comments, newComment],
  //     };
  //     dispatch(addMessage(newObj));
  //   } else {
  //     const newObj = {
  //       id: id,
  //       boardId: boardId,
  //       comments: [
  //         {
  //           id: 1,
  //           text: value,
  //         },
  //       ],
  //     };
  //     dispatch(createMessage(newObj));
  //   }

  //   // axios.patch(`http://localhost:3000/comments/${message[0].id}`, newObj);
  //   setValue('');
  // };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  }, []);

  // useEffect(() => {
  //   // axios
  //   //   .get(`http://localhost:3000/comments?id=${id}&boardId=${boardId}`)
  //   //   .then((res) => setMessage(res.data))
  //   //   .catch((err) => console.error(err));
  //   dispatch(
  //     fetchMessage({
  //       id,
  //       boardId,
  //     }),
  //   );
  // }, []);

  // const removeMessage = (id) => {
  //   const newMessage = message.comments.filter((item) => item.id !== id);
  //   const mess = newMessage.map((item) => (item.id > id ? { ...item, id: item.id - 1 } : item));
  //   const newObj = {
  //     ...message,
  //     comments: mess,
  //   };
  //   dispatch(addMessage(newObj));
  // };

  // console.log(message);

  // useEffect(() => {
  //   axios
  //     .get(`https://1df99c0c2ae7768d.mokky.dev/message/${id}`)
  //     .then((res) => setMessage(res.data));
  // }, [id]);

  const data = useSelector((state) => state.about.messages);

  useEffect(() => {
    if (data) {
      const newObject = data.find((item) => item.id === id);
      setMessage(newObject);
    }
  }, [data]);

  const renderMessage = (): JSX.Element[] => {
    // console.log(message)

    return message.messages.map((item) => (
      <li key={item.id} className={styles.comment}>
        <div>
          <h4>Комментраий: {dayjs(item.date).fromNow()}</h4>
          <span>{item.text}</span>
        </div>
        <button onClick={() => removeMessageToForm(item.id)} className={styles.commentBtn}>
          <DeleteIcon />
        </button>
      </li>
    ));
  };

  useEffect(() => {}, []);

  const addMessageToForm = () => {
    const { date } = getNowDate();
    const obj = {
      id: message ? message.messages.length + 1 : 1,
      text: value,
      date,
    };
    dispatch(addMessage({ id, obj }));
    setValue('');
  };

  const removeMessageToForm = (messageId) => {
    dispatch(removeMessage({ id, messageId }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.inputForm}>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={styles.input}
            placeholder="Оставьте коментарий"
            type="text"
          />
          <input onClick={addMessageToForm} className={styles.inputBtn} type="submit" />
        </div>
        <ul className={styles.commentsWrapper}>
          {message && renderMessage()}
          {/* {message?.comments ? renderMessage() : <li></li>} */}
        </ul>
      </div>
    </div>
  );
};
