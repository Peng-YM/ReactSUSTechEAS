import React, { Component } from 'react';
import {getList, getManyReference, isIdExists, setManyReference} from '../utils/api';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';


import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';


function getSorting(order, orderBy) {
    return order === 'desc' ?
        (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1):
        (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}


const columnData = [
    { id: 'Id', numeric: false, disablePadding: false,  label: 'Id'},
    { id: 'Avatar', numeric: false, disablePadding: false, label: 'Avatar' },
    { id: 'First Name', numeric: false, disablePadding: false, label: 'First Name'},
    { id: 'Last Name', numeric: false, disablePadding: false, label: 'Last Name' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};


const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="title" id="tableTitle">
            All
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          < Tooltip title = "CheckCircle" >
            <IconButton aria-label="CheckCircle">
              <CheckCircleIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});


class StudentManager extends Component{
    constructor(props){
        super(props);
        this.course = props.source;
        this.state = {
            // all users
            users: [],
            //default order 
            order: 'asc',
            //key for order
            orderBy: 'id',
            //page number
            page: 0,
            //rows number per page
            rowsPerPage: 5,
             // users that already choose this course
            selected: [],
        };
    }

    componentDidMount(){
        getList("users")
            .then(users => this.setState({users: users}));
        // get user that already choose this course
        getManyReference("courses", "users", this.course)
            .then(selected => this.setState({selected: selected[0]}));
    }


    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
        order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            let selected = this.state.selected;
            for(var i = 0; i < this.state.users.length; ++i) {
                 let index = isIdExists(this.state.selected, this.state.users[i].id);
                 if (index === -1) {
                     selected.push(this.state.users[i]);
                 }
            }
            this.setState({ selected: selected }, this.submit );
            return;
        }
        this.setState({ selected: [] }, this.submit);
    };

    handleChangePage = (event, page) => {
        this.setState({ page: page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    render(){
        const classes = this.props;
        const { users, order, orderBy, page, rowsPerPage, selected } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);
        return (
            <Paper className={classes.root}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
                <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={users.length}
                />
                <TableBody>
                {users
                    .sort(getSorting(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map( user => {
                    const isSelected = isIdExists(users, user.id) !== -1 ? true : false;
                    return (
                        <TableRow
                        hover
                        //   onClick={event => this.handleClick(event, user.id)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={user.id}
                        selected={isSelected}
                        >
                        <TableCell padding="checkbox">
                            <Checkbox
                                onChange={
                                () => { 
                                    let index = isIdExists(selected, user.id);
                                    if (index === -1) {
                                        selected.push(user);
                                        this.setState({selected: selected}, this.submit);
                                    }
                                    else if (index !== -1) {
                                        selected.splice(index, 1);
                                        this.setState({selected: selected}, this.submit);
                                    }
                                }
                            }
                            checked={isIdExists(this.state.selected, user.id) !== -1 ? true : false}
                            />
                        </TableCell>
                        <TableCell numeric={false}>{user.id}</TableCell>
                        <TableCell numeric={false}><Avatar src={user.avatar} /></TableCell>
                        <TableCell numeric={false}>{user.firstName}</TableCell>
                        <TableCell numeric={false}>{user.lastName}</TableCell>
                        </TableRow>
                    );
                    })}
                {emptyRows > 0 && (
                    <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                    </TableRow>
                )}
                </TableBody>
            </Table>
            </div>
            <TablePagination
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
                'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
                'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
        </Paper>       
        );
    }

    submit(){
        setManyReference("users", this.course, this.state.selected);
    }
}

StudentManager.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(StudentManager);