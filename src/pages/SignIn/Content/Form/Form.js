import { Button, Paper, TextField, Typography } from '@mui/material';
import styles from './Form.module.scss';

function Form() {
  return (
    <>
      <Paper className={styles.container}>
        <Typography component="h1" variant="h6">
          Đăng nhập
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
        <button className={styles.btn}>Đăng nhập</button>
        <Typography component="p" variant="small">
          Bạn mới biết đến shoppe ?
          <span style={{ color: 'rgb(238, 77, 45)' }}>Đăng ký</span>
        </Typography>
      </Paper>
    </>
  );
}

export default Form;
