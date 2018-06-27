import React, {
  Component
} from "react";
import Button from '@material-ui/core/Button';
import {
  uploadCourseFiles,
  getManyReference
} from '../utils/api';
import DropZone from 'react-dropzone';


import classNames from 'classnames';
import PropTypes from 'prop-types';
import {
  withStyles
} from '@material-ui/core/styles';
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
import FilterListIcon from '@material-ui/icons/FilterList';
import {
  lighten
} from '@material-ui/core/styles/colorManipulator';
import { fil } from "date-fns/locale";


function getSorting(order, orderBy) {
  return order === 'desc' ?
    (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1) :
    (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}


const columnData = [
    { id: 'File Name', numeric: false, disablePadding: false, label: 'File Name' },
    { id: 'File Type', numeric: false, disablePadding: false, label: 'File Type' },
    { id: 'Size', numeric: false, disablePadding: false, label: 'Size'},
    { id: 'Preview', numeric: false, disablePadding: false, label: 'Preview' },
];


class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;
    return (
      <TableHead>
        <TableRow>
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
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
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
            Selected
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        }
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


var buttonStyle = {
  width: "100%"
}

var cardStyle = {
  height: "200px"
}

class ResourcesManager extends Component{
    constructor(props){
        super(props);
        this.course = props.source;
        this.state = {
            files: [],
            page: 0, 
            rowsPerPage: 5,
            order: 'asc',
            orderBy: 'name',
        }
    }

    componentDidMount(){ 
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
        order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleChangePage = (event, page) => {
        this.setState({ page: page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };


    render(){
        const classes = this.props;
        const { files, order, orderBy, page, rowsPerPage} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, files.length - page * rowsPerPage);
        return (
        <div>
            <DropZone multiple={true} onDrop={this.onDrop.bind(this)} className="card" style={cardStyle}>
                <div className="card-body align-items-center justify-content-center d-flex">Drops files here</div>
            </DropZone>
           <Paper className={classes.root}>
            <EnhancedTableToolbar numSelected={files.length} />
            <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
                <EnhancedTableHead
                numSelected={files.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
                rowCount={files.length}
                />
                <TableBody>
                {files
                    .sort(getSorting(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map( file => {
                    return (
                        <TableRow key={file.name}>
                        <TableCell numeric={false}>{file.name}</TableCell>
                        <TableCell numeric={false}>{file.type}</TableCell>
                        <TableCell numeric={false}>{file.size}</TableCell>
                        <TableCell numeric={false}><a href={file.preview}>Preview</a></TableCell>
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
            count={files.length}
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
        <Button variant="outlined" color="primary" style={buttonStyle} onClick={() => this.upload()}>Upload</Button>
        </div>
    );
    }

    onDrop(files){
        this.setState({files: files});
    }

    upload(){
        uploadCourseFiles(this.course, this.state.files);
    }
}

ResourcesManager.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResourcesManager);