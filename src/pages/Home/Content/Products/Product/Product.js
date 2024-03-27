import { Grid, Paper, Rating, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './Product.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct } from '../../../../../redux/reducer';
import { Link, useNavigate } from 'react-router-dom';

function Product() {
  const listProduct = useSelector((state) => state.listProduct.list);

  useEffect(() => {
    setProducts(listProduct);
  }, [listProduct]);

  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSelect = (e) => {
    dispatch(selectProduct(e.target.parentElement.getAttribute('name')));
    console.log(e.target.parentElement.getAttribute('name'));
    navigate('productinfo');
  };

  return (
    <Grid container>
      {products.map((data) => {
        return (
          <Grid item md={3} onClick={handleSelect}>
            <Paper
              name={data._id}
              elevation={10}
              sx={{
                width: '200px',
                p: '10px',
                gap: '20px',
                cursor: 'pointer',
                mb: '20px',
              }}
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
                  height: '39px',
                  display: '-webkit-box',
                  WebkitLineClamp: '2',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
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
                sx={{ fontSize: '10px' }}
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
