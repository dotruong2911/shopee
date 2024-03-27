import { Box, Paper, TextField, Typography } from '@mui/material';
import styles from './Form.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Form() {
  const [input, setInput] = useState({
    phone: '',
    name: '',
    password: '',
  });

  const inputError = {};
  const [error, setError] = useState({
    phone: '',
    name: '',
    password: '',
  });

  const checkPhone = () => {
    if (!input.phone) {
      inputError.phone = 'không được để trống';
    }
    if (input.phone.includes(' ')) {
      inputError.phone = 'không được có dấu cách';
    }
    const check = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    if (!check.test(input.phone)) {
      inputError.phone = 'không hợp lệ';
    }
  };

  const checkName = () => {
    if (!input.name) {
      inputError.name = 'không được để trống';
    }
  };

  const checkPassword = () => {
    if (!input.name) {
      inputError.name = 'không được để trống';
    }
  };

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkPhone();
    checkName();
    if (Object.keys(!inputError)) {
      setError({ ...inputError });
    }
  };
  return (
    <>
      <Paper className={styles.container}>
        <Typography component="h1" variant="h6">
          Đăng ký
        </Typography>
        <Box
          sx={{ width: '100%', p: '0 10%', position: 'relative', mb: '15px' }}
        >
          <TextField
            sx={{ width: '100%' }}
            placeholder="Số điện thoại"
            size="small"
            value={input.phone}
            name="phone"
            onChange={handleInput}
          ></TextField>
          <Typography component="p" className={styles.error}>
            {error.phone}
          </Typography>
        </Box>
        <Box
          sx={{ width: '100%', p: '0 10%', position: 'relative', mb: '15px' }}
        >
          <TextField
            placeholder="Họ tên"
            sx={{ width: '100%' }}
            size="small"
            name="name"
            value={input.name}
            onChange={handleInput}
          ></TextField>
          <Typography component="p" className={styles.error}>
            {error.name}
          </Typography>
        </Box>
        <Box
          sx={{ width: '100%', p: '0 10%', position: 'relative', mb: '15px' }}
        >
          <TextField
            placeholder="Mật khẩu"
            size="small"
            sx={{ width: '100%' }}
            name="password"
            value={input.password}
            onChange={handleInput}
          ></TextField>
          <Typography component="p" className={styles.error}>
            {error.password}
          </Typography>
        </Box>
        <button className={styles.btn} type="submit" onClick={handleSubmit}>
          Đăng ký
        </button>
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
