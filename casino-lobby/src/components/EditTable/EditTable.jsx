import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateTable } from '../../actions/actionCreators';
import TableForm from '../shared/TableForm';

import './EditTable.css';

const EditTable = ({ tables, dispatchUpdateTable, id }) => {
  const { name, participants } =
    tables.find(t => t.id === id) || {};

  return (
    <TableForm
      onSubmit={table => dispatchUpdateTable({ ...table, id })}
      headerText="Edit Table"
      btnText="Save"
      defaultName={name}
      defaultParticipants={participants}
    />
  );
};


EditTable.propTypes = {
  id: PropTypes.number.isRequired,
  dispatchUpdateTable: PropTypes.func.isRequired,
  tables: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired
  })).isRequired,
};

export default connect(
  ({ tables }) => ({ tables }),
  { dispatchUpdateTable: updateTable }
)(EditTable);
