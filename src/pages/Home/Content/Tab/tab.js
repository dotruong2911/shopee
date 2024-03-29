import styles from './Tab.module.scss';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../../../redux/reducer';
import { useState } from 'react';

function Tab() {
  const dispatch = useDispatch();
  const [type, setType] = useState('');
  const handleCategory = (e) => {
    e.target.id === 'Tất cả'
      ? dispatch(addCategory(''))
      : dispatch(addCategory(e.target.id));
    setType(e.target.id);
  };
  const arr = [
    { name: 'Tất cả' },
    { name: 'Điện thoại' },
    { name: 'Đồng hồ' },
    { name: 'Áo thun' },
  ];

  return (
    <div className={styles.container}>
      <span style={{ marginRight: '20px' }}>Sắp xếp theo</span>
      {arr.map((item) => {
        return (
          <div
            key={item.name}
            className={styles.select}
            id={item.name}
            onClick={handleCategory}
            style={
              type === item.name
                ? { backgroundColor: 'var(--orange)', color: 'white' }
                : {}
            }
          >
            {item.name}
          </div>
        );
      })}
    </div>
  );
}

export default Tab;
