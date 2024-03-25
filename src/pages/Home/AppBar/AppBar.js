import { image } from 'assets/image';
import styles from './AppBar.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';

function AppBar() {
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

        <ShoppingCartIcon sx={{ color: 'white', fontSize: '35px' }} />

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
      </div>
    </div>
  );
}

export default AppBar;
