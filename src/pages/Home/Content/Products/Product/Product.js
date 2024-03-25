import { Grid, Paper, Rating, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Product.module.scss';

function Product() {
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          'https://api-ecom.duthanhduoc.com/products?page=1&limit=10'
        );
        setProducts(response.data.data.products);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const [products, setProducts] = useState([]);

  return (
    <Grid container>
      {products.map((data) => {
        return (
          <Grid item md={3}>
            <Paper
              elevation={10}
              sx={{ width: '200px', p: '10px', gap: '20px', cursor: 'pointer' }}
              className={styles.paper}
            >
              <img
                src={data.image}
                style={{ width: '100%' }}
                alt="images"
              ></img>
              <Typography
                component="h5"
                variant="small"
                sx={{
                  fontWeight: '400',
                  mb: '5px',
                  height: '40px',
                  display: '-webkit-box',
                  WebkitLineClamp: '2',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {data.name}
              </Typography>
              <Typography
                component="span"
                variant="small"
                sx={{ textDecoration: 'line-through', mr: '10px', mb: '5px' }}
              >
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(data.price_before_discount)}
              </Typography>
              <Typography
                component="span"
                variant="small"
                sx={{ color: 'var(--orange)', mb: '10px' }}
              >
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(data.price)}
              </Typography>
              <Rating
                name="read-only"
                value={Math.round(data.rating)}
                readOnly
                sx={{ fontSize: '10px', ml: '70px' }}
              />
              <Typography
                component="span"
                variant="small"
                sx={{ mb: '10px', fontSize: '10px' }}
              >
                {data.sold} đã bán
              </Typography>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default Product;
