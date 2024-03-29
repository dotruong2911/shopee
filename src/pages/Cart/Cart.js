import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
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
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Cart.module.scss';
import { listCartProducts } from '../../redux/selector';
import { deleteProduct } from '../../redux/reducer';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

export default function Cart() {
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

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
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

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
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
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
    console.log('abc');
  }, [products]);

  const dispatch = useDispatch();

  const abc = useSelector((state) => state.cartProduct.listDelete);

  function EnhancedTableToolbar(props) {
    const { numSelected } = props;

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

  function createData(id, image, name, price, quantity, totalPrice) {
    return {
      id,
      image,
      name,
      price,
      quantity,
      totalPrice,
    };
  }

  const rows = products.map((item) => {
    return createData(
      item._id,
      item.image,
      item.name,
      item.price,
      item.quantity,
      item.totalPrice
    );
  });
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('price');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);

  const [totalProduct, setTotalProduct] = React.useState(0);
  const [totalPrices, setTotalPrices] = React.useState(0);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  let newSelecteds = [];

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
    let count = 0;
    let price = 0;
    for (let i of newSelecteds) {
      products.forEach((item) => {
        if (item._id === i) {
          count += item.quantity;
          price += item.totalPrice;
        }
      });
    }
    setTotalProduct(count);
    setTotalPrices(price);
  };
  function handleDelete(e) {
    dispatch(deleteProduct(e.target.id));
  }

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
    let count = 0;
    let price = 0;
    for (let i of newSelected) {
      products.forEach((item) => {
        if (item._id === i) {
          count += item.quantity;
          price += item.totalPrice;
        }
      });
    }
    setTotalProduct(count);
    setTotalPrices(price);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer sx={{ height: '470px' }}>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />

            <TableBody>
              {products.map((row, index) => {
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
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        onClick={(event) => handleClick(event, row._id)}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell id={labelId} sx={{ width: '500px' }}>
                      <Typography
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        <img
                          src={row.image}
                          alt="name"
                          style={{ width: '70px', marginRight: '10px' }}
                        />
                        <span>{row.name}</span>
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontSize: '20px', color: 'red' }}
                    >
                      {new Intl.NumberFormat('vn-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(row.price)}
                    </TableCell>
                    <TableCell align="right" sx={{ fontSize: '20px' }}>
                      {row.quantity}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontSize: '20px', color: 'red' }}
                    >
                      {new Intl.NumberFormat('vn-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(row.totalPrice)}
                    </TableCell>
                    <TableCell align="right" sx={{ fontSize: '20px' }}>
                      <IconButton id={row._id} onClick={handleDelete}>
                        <DeleteIcon sx={{ pointerEvents: 'none' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box className={styles.box}>
          <Typography
            sx={{ ml: '30px', color: 'var(--orange)', fontSize: '20px' }}
          >
            Tổng thanh toán ({totalProduct} sản phẩm) : {'  '}
            {new Intl.NumberFormat('vn-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(totalPrices)}
          </Typography>
          <TablePagination
            rowsPerPageOptions={[4, 8, 12]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Paper>
    </Box>
  );
}
