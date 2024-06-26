import { Box, Grid, Paper, Rating, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import styles from './ProductInfo.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from '../../../../../../redux/reducer';
import { toast, ToastContainer } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

function ProductInfo() {
  const dispatch = useDispatch();
  const userCurrent = useSelector((state) => state.userCurrent.name);
  const idProduct = useSelector((state) => state.productCurrent.id);
  const listProduct = useSelector((state) => state.listProduct.list);

  const productCurrent = listProduct.find((item) => {
    return item._id === idProduct;
  });

  useEffect(() => {
    setData(productCurrent);
    setDatas(productCurrent.images);
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

  const notify = () => toast('Đã thêm sản phẩm vào giỏ hàng');
  const notify1 = () => toast('Chọn số lượng sản phẩm');

  const handleProduct = () => {
    let totalPrice = productCurrent.price * count;
    if (count) {
      dispatch(
        addProduct({
          _id: uuidv4(),
          name: productCurrent.name,
          image: productCurrent.image,
          price: productCurrent.price,
          quantity: count,
          totalPrice,
        })
      );
      notify();
    } else {
      notify1();
    }
  };

  return (
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
              ml: '15px',
              height: '55px',
              width: '91%',
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
              <span onClick={up} style={{ padding: '20px', cursor: 'pointer' }}>
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
          {userCurrent && (
            <div className={styles.btn} onClick={handleProduct}>
              <AddShoppingCartIcon /> Thêm vào giỏ hàng
              <ToastContainer />
            </div>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ProductInfo;
