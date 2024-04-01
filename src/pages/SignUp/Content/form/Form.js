import { Box, Paper, TextField, Typography } from '@mui/material';
import styles from './Form.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Form() {
  const notify = () => toast('Đăng ký tài khoản thành công');

  const [phone, setPhone] = useState([]);

  const [isSuccess, setIsSuccess] = useState('false');

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get('http://localhost:3000/user');
        setPhone(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    getData();
  }, [isSuccess]);

  const list = phone.map((item) => {
    return item.data.phone;
  });

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
      inputError.phone = 'số điện thoại không hợp lệ';
    }

    if (list.includes(input.phone)) {
      inputError.phone = 'số điện thoại đã tồn tại';
    }
  };

  const checkName = () => {
    if (!input.name) {
      inputError.name = 'không được để trống';
    }
  };

  const checkPassword = () => {
    if (!input.password) {
      inputError.password = 'không được để trống';
    }

    const check =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;

    if (input.password && !check.test(input.password)) {
      inputError.password = 'mật khẩu không hợp lệ';
    }
  };

  const post = (data) => {
    axios.post('http://localhost:3000/user', {
      id: input.phone,
      data,
    });
    axios.post('http://localhost:3000/shop', {
      id: input.phone,
    });
  };

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    checkPhone();
    checkName();
    checkPassword();

    if (Object.keys(inputError)) {
      setError({ ...inputError });
    }

    if (
      input.name &&
      input.phone &&
      input.password &&
      Object.keys(inputError).length === 0
    ) {
      post(input);

      setInput({
        phone: '',
        name: '',
        password: '',
      });
      notify();
      setIsSuccess('true');
      setTimeout(() => {
        navigate('/signin');
      }, 1500);
    }
  };
  return (
    <>
      <Paper className={styles.container}>
        <ToastContainer />
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
        <Typography component="p" variant="small" mb="15px">
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
