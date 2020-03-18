import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTable } from '../../actions/actionCreators';
import TableForm from '../shared/TableForm';

import './AddTable.css';

class AddTable extends PureComponent {
  state = {
    expanded: false,
  }

  onSubmit = (table) => {
    const { dispatchAddTable, tables } = this.props;

    dispatchAddTable({
      after_id: tables[tables.length - 1].id,
      table
    });

    this.setState({ expanded: false });
  }

  expand = () => this.setState({ expanded: true })

  render() {
    return this.state.expanded ? (
      <TableForm
        onSubmit={this.onSubmit}
        headerText="Table creation"
        btnText="Create new table"
      />
    ) : (
      <button
        className="btn AddTable__expand"
        onClick={this.expand}
      >
        Add new table
      </button>
    );
  }
}

AddTable.propTypes = {
  dispatchAddTable: PropTypes.func.isRequired,
  tables: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
};

const mapStateToProps  = (state) => {
  return {
    tables: state.tables,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
     dispatchAddTable: (params) => {
       dispatch(addTable(params));
     }
  };
};

const AddTableConnected = connect(mapStateToProps, mapDispatchToProps)(AddTable);

export default AddTableConnected;