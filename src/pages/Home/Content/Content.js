import { Container, Grid } from '@mui/material';
import Product from './Products/Product/Product';
import Tab from './Tab/Tab';

function Content() {
  return (
    <Container>
      <Grid container>
        <Grid item md={12}>
          <Tab />
          <Product />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Content;
