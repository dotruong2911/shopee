import { Container, Grid } from '@mui/material';
import Product from './Products/Product/Product';

function Content() {
  return (
    <Container>
      <Grid container>
        <Grid item md={2.5} sx={{ border: '1px solid black' }}>
          abc
        </Grid>
        <Grid item md={9.5}>
          <Product />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Content;
