import AppBar from './AppBar/AppBar';
import styles from './Home.module.scss';
import Content from './Content/Content';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { addList } from '../../redux/reducer';
import ProductInfo from './Content/Products/Product/ProductInfo/ProductInfo';
import { Routes, Route } from 'react-router-dom';
import Cart from 'pages/Cart/Cart';
import LinearProgress from '@mui/material/LinearProgress';

function Home() {
  const dispatch = useDispatch();
  const [ld, setLd] = useState(true);
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          'https://api-ecom.duthanhduoc.com/products?page=1&limit=24'
        );

        await dispatch(addList(response.data.data.products));
        console.log(response.data.data.products);
        setLd(false);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);
  return (
    <div className={styles.container}>
      {ld && <LinearProgress sx={{ width: '100%' }} />}
      <div className={styles.appbar}>
        <AppBar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/home" element={<Content />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/id" element={<ProductInfo />} />
        </Routes>
      </div>
    </div>
  );
}

export default Home;
