import { Box, Paper, Rating, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Product() {
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          'https://api-ecom.duthanhduoc.com/products?page=1&limit=10'
        );
        console.log(response.data.data.products[0]);
        setData(response.data.data.products[0]);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const [data, setData] = useState([]);

  return (
    <>
      <Paper elevation={10} sx={{ width: '200px', p: '10px', gap: '20px' }}>
        <img src={data.image} style={{ width: '100%' }} alt="images"></img>
        <Typography
          component="h5"
          variant="small"
          sx={{ fontWeight: '400', mb: '5px' }}
        >
          {data.name}
        </Typography>
        <Typography
          component="span"
          variant="small"
          sx={{ textDecoration: 'line-through', mr: '10px', mb: '5px' }}
        >
          {data.price}
        </Typography>
        <Typography
          component="span"
          variant="small"
          sx={{ color: 'var(--orange)', mb: '10px' }}
        >
          {data.price_before_discount}
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
    </>
  );
}

export default Product;
