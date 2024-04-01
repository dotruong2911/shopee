import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Cart.module.scss';
import { listCartProducts } from '../../redux/selector';
import { deleteProduct } from '../../redux/reducer';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import AlertDialog from './Dialog/Dialog';

export default function Cart() {
  const headCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Sản phẩm',
    },
    {
      id: 'price',
      numeric: true,
      disablePadding: false,
      label: 'Đơn Giá',
    },
    {
      id: 'quantity',
      numeric: true,
      disablePadding: false,
      label: 'Số Lượng',
    },
    {
      id: 'totalPrice',
      numeric: true,
      disablePadding: false,
      label: 'Số Tiền',
    },
    {
      id: 'action',
      numeric: true,
      disablePadding: false,
      label: 'Thao Tác',
    },
  ];

  function EnhancedTableHead(props) {
    const { onSelectAllClick, numSelected, rowCount, headCells } = props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
            >
              {headCell.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const products = useSelector(listCartProducts);

  useEffect(() => {
    setAbc(products);
  }, [products]);

  const [abc, setAbc] = useState([]);

  const arrId = products.map((item) => {
    return item._id;
  });

  const dispatch = useDispatch();

  function EnhancedTableToolbar(props) {
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <Typography
          sx={{
            flex: '1 1 100%',
            fontSize: '30px',
            m: '15px',
            color: 'var(--orange)',
          }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Giỏ hàng
        </Typography>

        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    );
  }

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  const [selected, setSelected] = React.useState([]);
  const [totalProduct, setTotalProduct] = React.useState([]);
  const [totalQuantity, setTotalQuantity] = React.useState(0);
  const [count, setCount] = React.useState([]);
  const [totalPrices, setTotalPrices] = React.useState(0);

  let newSelecteds = [];
  let newQuantity = [];
  let newPrice = [];

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      newSelecteds = products.map((n) => n._id);
      newQuantity = products.map((n) => n.quantity);
      newPrice = products.map((n) => n.totalPrice);
      setSelected(newSelecteds);
      setTotalProduct(newQuantity);
      setCount(newPrice);
      let x = 0;
      newQuantity.length
        ? (x = newQuantity.reduce((a, b) => {
            return a + b;
          }, 0))
        : (x = 0);
      setTotalQuantity(x);
      let i = 0;
      newPrice.length
        ? (i = newPrice.reduce((a, b) => {
            return a + b;
          }, 0))
        : (x = 0);
      setTotalPrices(i);
    } else {
      setSelected([]);
      setTotalQuantity(0);
      setTotalPrices(0);
    }
  };
  const handleClick = (event, id, quantity, price) => {
    const selectedIndex = selected.indexOf(id);
    const selectedQuantity = selected.indexOf(id);
    const selectedPrice = selected.indexOf(id);
    if (selectedIndex === -1) {
      newSelecteds = newSelecteds.concat(selected, id);
      newQuantity = newQuantity.concat(totalProduct, quantity);
      newPrice = newPrice.concat(count, price);
    } else if (selectedIndex === 0) {
      newSelecteds = newSelecteds.concat(selected.slice(1));
      newQuantity = newQuantity.concat(totalProduct.slice(1));
      newPrice = newPrice.concat(count.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelecteds = newSelecteds.concat(selected.slice(0, -1));
      newQuantity = newQuantity.concat(totalProduct.slice(0, -1));
      newPrice = newPrice.concat(count.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelecteds = newSelecteds.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
      newQuantity = newQuantity.concat(
        totalProduct.slice(0, selectedQuantity),
        totalProduct.slice(selectedQuantity + 1)
      );
      newPrice = newPrice.concat(
        count.slice(0, selectedPrice),
        count.slice(selectedPrice + 1)
      );
    }
    setSelected(newSelecteds);
    setTotalProduct(newQuantity);
    setCount(newPrice);
    let x = 0;
    newQuantity.length
      ? (x = newQuantity.reduce((a, b) => {
          return a + b;
        }, 0))
      : (x = 0);
    setTotalQuantity(x);
    let i = 0;
    newPrice.length
      ? (i = newPrice.reduce((a, b) => {
          return a + b;
        }, 0))
      : (x = 0);
    setTotalPrices(i);
  };

  function handleDelete(e, id, quantity, price) {
    dispatch(deleteProduct(e.target.id));
    handleClick(e, id, quantity, price);
  }

  function handleDeleteAll(e) {
    dispatch(deleteProduct(arrId.join(',')));
  }

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const userPhone = useSelector((state) => state.userCurrent.phone);

  const handleCart = () => {
    axios.put(`http://localhost:3000/shop/${userPhone}`, { data: products });
    notify();
  };

  const notify = () => toast('Lưu giỏ hàng thành công!');
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%' }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer sx={{ height: '473px' }}>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={products.length}
              headCells={headCells}
            />

            <TableBody>
              {abc.map((row, index) => {
                const isItemSelected = isSelected(row._id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        onClick={(event) =>
                          handleClick(
                            event,
                            row._id,
                            row.quantity,
                            row.totalPrice
                          )
                        }
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell id={labelId} sx={{ width: '500px', p: '5px' }}>
                      <Typography
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        <img
                          src={row.image}
                          alt="name"
                          style={{ width: '70px', marginRight: '10px' }}
                        />
                        <span style={{ fontSize: '15px' }}>{row.name}</span>
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontSize: '15px', color: 'red' }}
                    >
                      {new Intl.NumberFormat('vn-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(row.price)}
                    </TableCell>
                    <TableCell align="right" sx={{ fontSize: '15px' }}>
                      {row.quantity}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontSize: '15px', color: 'red' }}
                    >
                      {new Intl.NumberFormat('vn-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(row.totalPrice)}
                    </TableCell>
                    <TableCell align="right" sx={{ fontSize: '20px' }}>
                      <IconButton
                        id={row._id}
                        onClick={(e) =>
                          handleDelete(e, row._id, row.quantity, row.totalPrice)
                        }
                      >
                        <DeleteIcon sx={{ pointerEvents: 'none' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Box className={styles.box}>
          <Typography className={styles.footer}>
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={products.length}
              headCells={[]}
            />
            Chọn tất cả ({totalQuantity})
            <span
              // aria-disabled="true"
              id={arrId}
              style={{ cursor: 'pointer' }}
            >
              <AlertDialog name="xoá" id={arrId} deletes={handleDeleteAll} />
            </span>
            <span
              aria-disabled="true"
              style={{ cursor: 'pointer' }}
              onClick={handleCart}
            >
              Lưu giỏ hàng
              <ToastContainer />
            </span>
          </Typography>

          <Typography
            sx={{
              mr: '50px',
              color: 'var(--orange)',
              fontSize: '18px',
            }}
          >
            Tổng thanh toán ({totalQuantity || 0} sản phẩm) : {'  '}
            {new Intl.NumberFormat('vn-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(totalPrices || 0)}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
