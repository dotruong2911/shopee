import { Container, Grid } from '@mui/material';
import Product from './Products/Product/Product';

function Content() {
  return (
    <Container>
      <Grid container>
        <Grid item md={12}>
          <Product />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Content;
