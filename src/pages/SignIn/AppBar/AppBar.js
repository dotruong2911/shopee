import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { image } from 'assets/image';
import styles from './AppBar.module.scss';
import { Link } from 'react-router-dom';

export default function AppBarr() {
  console.log(image.logo);
  return (
    <Box className={styles.container}>
      <div className={styles.logo}>
        <Link to="/">
          <img
            className={styles.img}
            src={image.logo}
            alt="shopee"
            style={{
              height: '40px',
              translate: '0 -5px',
            }}
          />
        </Link>
        <Typography variant="h6" component="p">
          Đăng nhập
        </Typography>
      </div>
      <Typography
        variant="small"
        component="span"
        sx={{ color: 'var(--orange)' }}
      >
        Bạn cần giúp đỡ?
      </Typography>
    </Box>
  );
}
