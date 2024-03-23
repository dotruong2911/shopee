import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { image } from 'assets/image';
import styles from './AppBar.module.scss';

export default function AppBarr() {
  console.log(image.logo);
  return (
    <Box className={styles.container}>
      <div className={styles.logo}>
        <img
          src={image.logo}
          alt="shopee"
          style={{
            height: '40px',
            translate: '0 -5px',
          }}
        />
        <Typography variant="h6" component="p">
          Đăng nhập
        </Typography>
      </div>
      <Typography
        variant="small"
        component="span"
        sx={{ color: 'rgb(238, 77, 45)' }}
      >
        Bạn cần giúp đỡ?
      </Typography>
    </Box>
  );
}
