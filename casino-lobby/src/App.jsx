import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './components/Header/Header';
import TableList from './components/TableList/TableList';
import AddTable from './components/AddTable/AddTable';
import EditTable from './components/EditTable/EditTable';

const App = ({ connection, editableTable }) => (
  <div className="App">
    <Header />
    { connection ? (
      <main>
        <AddTable />
        <TableList />
        {editableTable && <EditTable id={editableTable} />}
      </main>
    ) : (
      <b>Trying to connect to server</b>
    )}
  </div>
);

App.propTypes = {
  connection: PropTypes.bool.isRequired,
  editableTable: PropTypes.number
};

export default connect(
  ({ connection, editableTable }) => ({ connection, editableTable }),
)(App);
