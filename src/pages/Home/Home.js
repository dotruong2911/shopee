import AppBar from './AppBar/AppBar';
import styles from './Home.module.scss';
import Content from './Content/Content';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { addList } from '../../redux/reducer';
import ProductInfo from './Content/Products/Product/ProductInfo/ProductInfo';
import { Routes, Route, Link, NavLink, Outlet } from 'react-router-dom';
import Cart from 'pages/Cart/Cart';

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          'https://api-ecom.duthanhduoc.com/products?page=1&limit=20'
        );
        dispatch(addList(response.data.data.products));
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.appbar}>
        <AppBar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="/home" element={<Content />} />
          <Route path="/" element={<Content />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/id" element={<ProductInfo />} />
        </Routes>
      </div>
    </div>
  );
}

export default Home;
