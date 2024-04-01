import { Box, Paper, TextField, Typography } from '@mui/material';
import styles from './Form.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser, addPhone } from '../../../../redux/reducer';

function Form() {
  const dispatch = useDispatch();
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get('http://localhost:3000/user');
        setListUser(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    getUser();
  }, []);

  const listPhone = listUser.map((item) => {
    return item.data.phone;
  });

  const listPassword = listUser.map((item) => {
    return item.data.password;
  });

  const [input, setInput] = useState({
    phone: '',
    password: '',
  });

  const [error, setError] = useState({
    phone: '',
    password: '',
  });

  const inputError = {};

  const checkPhone = () => {
    if (!input.phone) {
      inputError.phone = 'không được để trống';
    }
    if (input.phone && !listPhone.includes(input.phone)) {
      inputError.phone = 'số điện thoại chưa đăng ký';
    }
  };

  const checkPassword = () => {
    if (!input.password) {
      inputError.password = 'không được để trống';
    }
    if (input.password && !listPassword.includes(input.password)) {
      inputError.password = 'sai mật khẩu';
    }
  };

  const handleInput = (e) => {
    return setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkPhone();
    checkPassword();
    if (Object.keys(inputError).length) {
      setError(inputError);
    }

    if (Object.keys(inputError).length === 0) {
      const getNameUser = listUser.find((item) => {
        return item.data.phone === input.phone;
      });
      dispatch(addUser(getNameUser.data.name));
      dispatch(addPhone(getNameUser.data.phone));
      navigate('/home');
    }
  };

  const navigate = useNavigate();

  return (
    <Paper className={styles.container}>
      <Typography component="h1" variant="h6">
        Đăng nhập
      </Typography>
      <Box sx={{ width: '100%', p: '0 10%', position: 'relative', mb: '15px' }}>
        <TextField
          placeholder="Số điện thoại"
          fullWidth
          size="small"
          name="phone"
          value={input.phone}
          onChange={handleInput}
        ></TextField>
        <Typography component="p" className={styles.error}>
          {error.phone}
        </Typography>
      </Box>
      <Box sx={{ width: '100%', p: '0 10%', position: 'relative', mb: '15px' }}>
        <TextField
          placeholder="Mật khẩu"
          fullWidth
          size="small"
          name="password"
          value={input.password}
          onChange={handleInput}
        ></TextField>
        <Typography component="p" className={styles.error}>
          {error.password}
        </Typography>
      </Box>
      <button className={styles.btn} onClick={handleSubmit}>
        Đăng nhập
      </button>
      <Typography component="p" variant="small">
        Bạn mới biết đến shoppe ?
        <Link to="/signup" style={{ textDecoration: 'none' }}>
          <span style={{ color: 'rgb(238, 77, 45)' }}>Đăng ký</span>
        </Link>
      </Typography>
    </Paper>
  );
}

export default Form;
