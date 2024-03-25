import { Box, Grid, Paper, Rating, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import styles from './ProductInfo.module.scss';

function ProductInfo() {
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          'https://api-ecom.duthanhduoc.com/products?page=1&limit=10'
        );
        console.log(response.data.data.products[1]);
        setData(response.data.data.products[3]);
        setDatas(response.data.data.products[3].images);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  const [data, setData] = useState([]);
  const [datas, setDatas] = useState([]);
  const [id, setId] = useState('');
  const arr = [...datas];

  const checkId = (e) => {
    setId(e.target.name);
  };

  const [count, setCount] = useState(0);

  const up = () => {
    setCount(count + 1);
  };

  const down = () => {
    if (0 < count) {
      setCount(count - 1);
    } else {
      setCount(0);
    }
  };

  return (
    <>
      <Paper sx={{ p: '20px 10px' }}>
        <Grid container>
          <Grid item md={5} sx={{ m: '0 auto' }}>
            <img
              src={id || data.image}
              alt="img"
              style={{ width: '95%', marginBottom: '20px' }}
            ></img>
            <Box
              sx={{
                height: '55px',
                width: '95%',
                overflow: 'hidden',
                display: 'flex',
              }}
            >
              {arr.map((item) => {
                return (
                  <img
                    key={item}
                    name={item}
                    src={item}
                    alt="item"
                    onClick={checkId}
                    style={{
                      cursor: 'pointer',
                      marginRight: '10px',
                      border: '1px solid #ddd',
                    }}
                  ></img>
                );
              })}
            </Box>
          </Grid>
          <Grid item md={7}>
            <Typography component="h1" variant="h4" sx={{ mb: '20px' }}>
              {data.name}
            </Typography>

            <Typography component="p" variant="h6" sx={{ fontWeight: '400' }}>
              <Rating
                name="read-only"
                value={Math.round(data.rating)}
                readOnly
                sx={{ fontSize: '20px', mb: '40px' }}
              />
              | {data.sold} đã bán
            </Typography>
            <Typography
              component="span"
              variant="h4"
              sx={{
                textDecoration: 'line-through',
                mr: '10px',
                opacity: '0.4',
              }}
            >
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(data.price_before_discount)}
            </Typography>
            <Typography
              component="span"
              variant="h3"
              sx={{ color: 'var(--orange)', mb: '30px' }}
            >
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(data.price)}
            </Typography>
            <Box component="div" sx={{ display: 'flex', m: '30px 0' }}>
              <span
                style={{
                  fontSize: '20px',
                  marginRight: '80px',
                  translate: '0 5px',
                }}
              >
                Số lượng
              </span>

              <div
                style={{
                  border: '1px solid #ddd',
                  overflow: 'hidden',
                  borderRadius: '5px',
                }}
              >
                <span
                  onClick={down}
                  style={{ padding: '20px', cursor: 'pointer' }}
                >
                  <HorizontalRuleIcon />
                </span>
                <span
                  style={{
                    fontSize: '30px',
                    border: '1px solid #ddd',
                    padding: '20px',
                  }}
                >
                  {0 <= count && count < 10 ? '0' + count : count}
                </span>
                <span
                  onClick={up}
                  style={{ padding: '20px', cursor: 'pointer' }}
                >
                  <AddIcon />
                </span>
              </div>
              <span
                style={{
                  fontSize: '20px',
                  translate: '0 5px',
                  marginLeft: '30px',
                }}
              >
                {data.quantity} sản phẩm có sẵn
              </span>
            </Box>
            <div className={styles.btn}>
              <AddShoppingCartIcon /> Thêm vào giỏ hàng
            </div>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default ProductInfo;
