import { Grid, Paper, Rating, Typography } from '@mui/material';
import styles from './Product.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct } from '../../../../../redux/reducer';
import { useNavigate } from 'react-router-dom';
import { listItems } from '../../../../../redux/selector';

function Product() {
  const products = useSelector(listItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSelect = (e) => {
    dispatch(selectProduct(e.target.parentElement.getAttribute('name')));
    navigate('/id');
  };

  return (
    <Grid container>
      {products.map((data) => {
        return (
          <Grid item key={data._id}>
            <Paper
              onClick={handleSelect}
              name={data._id}
              elevation={10}
              sx={{
                p: '10px',
                cursor: 'pointer',
                mb: '20px',
                ml: '5px',
              }}
              className={styles.paper}
            >
              <img
                src={data.image}
                style={{ width: '100%', height: '160px' }}
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
                sx={{
                  textDecoration: 'line-through',
                  mr: '10px',
                  mb: '5px',
                  fontSize: '12px',
                }}
              >
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(data.price_before_discount)}
              </Typography>
              <Typography
                component="span"
                variant="small"
                sx={{ color: 'var(--orange)', mb: '10px', fontSize: '15px' }}
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
