import { Link } from 'react-router-dom';
import AppBar from './AppBar/AppBar';
import styles from './Home.module.scss';
import Content from './Content/Content';
import { Box, Container } from '@mui/material';

function Home() {
  return (
    <Container className={styles.container}>
      <Box className={styles.appbar}>
        <AppBar />
      </Box>
      <Box className={styles.content}>
        <Content />
      </Box>
    </Container>
  );
}

export default Home;
