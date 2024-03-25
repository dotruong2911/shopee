import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import styles from './Form.module.scss';
import { Link } from 'react-router-dom';

function Form() {
  return (
    <>
      <Paper className={styles.container}>
        <Typography component="h1" variant="h6">
          Đăng ký
        </Typography>
        <TextField
          placeholder="Số điện thoại"
          style={{ width: '80%' }}
          size="small"
        ></TextField>

        <TextField
          placeholder="Mật khẩu"
          size="small"
          style={{ width: '80%' }}
        ></TextField>
        <button className={styles.btn}>Đăng ký</button>
        <Typography component="p" variant="small">
          Bạn đã có tài khoản ?
          <Link to="/signin" style={{ textDecoration: 'none' }}>
            <span style={{ color: 'rgb(238, 77, 45)' }}>Đăng nhập</span>
          </Link>
        </Typography>
      </Paper>
    </>
  );
}

export default Form;
