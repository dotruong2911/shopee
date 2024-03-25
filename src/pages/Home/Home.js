import { Link } from 'react-router-dom';
import AppBar from './AppBar/AppBar';
import styles from './Home.module.scss';
import Content from './Content/Content';
import { Box, Container } from '@mui/material';
import ProductInfo from './Content/Products/Product/ProductInfo/ProductInfo';
import Product from './Content/Products/Product/Product';

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.appbar}>
        <AppBar />
      </div>
      <div className={styles.content}>
        <Content />
      </div>
    </div>
  );
}

export default Home;
