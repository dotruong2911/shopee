import { image } from 'assets/image';
import styles from './AppBar.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Avatar, Stack } from '@mui/material';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LogOut from './Menu/LogOut';
import { addSearch, addUser } from '../../../redux/reducer';
import { useState } from 'react';
import { listCartProducts } from '../../../redux/selector';

function AppBar() {
  const stringToColor = (string) => {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  };

  const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    setTimeout(() => {
      dispatch(addUser(''));
      navigate('/');
    }, 1000);
  };

  const abc = useSelector((state) => state.userCurrent.name);
  const count = useSelector(listCartProducts);

  const [search, setSearch] = useState({
    input: '',
  });

  const handleSearch = () => {
    dispatch(addSearch(search.input));
  };
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <div className={styles.container}>
        <Link to="/">
          <img src={image.logo} alt="shopee" className={styles.logo}></img>
        </Link>
        <Box className={styles.search}>
          <input
            type="text"
            className={styles.inputs}
            placeholder="Tìm kiếm sản phẩm"
            style={{
              border: 'none',
              outline: 'none',
              height: '100%',
              flex: '1',
            }}
            name="input"
            value={search.input}
            onChange={(e) => {
              setSearch({
                ...search,
                [e.target.name]: e.target.value,
              });
            }}
          ></input>

          <Box className={styles.icon} onClick={handleSearch}>
            <SearchIcon />
          </Box>
        </Box>

        {abc && (
          <>
            <Link to="/cart" style={{ textDecoration: 'none' }}>
              <Box className={styles.shop}>
                <ShoppingCartIcon sx={{ color: 'white', fontSize: '35px' }} />
                <span className={styles.count}>{count.length}</span>
              </Box>
            </Link>

            <LogOut
              name={
                <>
                  <Stack>
                    <Avatar {...stringAvatar(abc.toUpperCase())} />
                  </Stack>
                </>
              }
              logOut={logOut}
            ></LogOut>
          </>
        )}

        {!abc && (
          <div style={{ display: 'flex', gap: '10px', color: 'white' }}>
            <NavLink
              to="signup"
              className={styles.abc}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              Đăng ký
            </NavLink>
            <NavLink
              to="signin"
              style={{ textDecoration: 'none', color: 'white' }}
            >
              Đăng nhập
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default AppBar;
