import { image } from 'assets/image';
import styles from './AppBar.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Avatar, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LogOut from './Menu/LogOut';
import { addUser } from '../../../redux/reducer';

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
  const logOut = () => {
    setTimeout(() => {
      dispatch(addUser(''));
    }, 1000);
  };

  const abc = useSelector((state) => state.userCurrent.name);
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <div className={styles.container}>
        <img src={image.logo} alt="shopee" className={styles.logo}></img>
        <Box className={styles.search}>
          <input
            className={styles.inputs}
            placeholder="Tìm kiếm sản phẩm"
            style={{
              border: 'none',
              outline: 'none',
              height: '100%',
              flex: '1',
            }}
          ></input>

          <Box className={styles.icon}>
            <SearchIcon />
          </Box>
        </Box>

        {abc && (
          <>
            <ShoppingCartIcon sx={{ color: 'white', fontSize: '35px' }} />

            <LogOut
              name={
                <>
                  <Stack>
                    <Avatar {...stringAvatar(`${abc.toUpperCase()}`)} />
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
