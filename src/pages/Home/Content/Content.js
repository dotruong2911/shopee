import { Container, Grid } from '@mui/material';
import Product from './Products/Product/Product';

function Content() {
  return (
    <div>
      <Container sx={{ display: 'flex' }}>
        <Grid container>
          <Grid item md={3} sx={{ border: '1px solid black' }}>
            abc
          </Grid>
          <Grid item md={9} sx={{ flex: '1' }}>
            <Product />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Content;
