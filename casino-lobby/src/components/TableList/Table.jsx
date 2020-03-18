import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import range from 'lodash/range';
import { removeTable, goToEditTable } from '../../actions/actionCreators';
import './Table.css';

const Table = ({
  id, name, participants, dispatchRemoveTable, dispatchGoToEditTable,
}) => (
  <li className="Table">
    <h1 className="Table__header">{name}</h1>
    <ul className="Table__chairList">
      {range(participants).map(item => (
        <li key={item} className="Table__chair" />
      ))}
    </ul>
    <div className="Table__btnWrap">
      <button
        className="btn Table__edit"
        onClick={() => dispatchGoToEditTable(id)}
      >
        edit
      </button>
      <button
        className="btn Table__remove"
        onClick={() => dispatchRemoveTable(id)}
      >
        remove
      </button>
    </div>
  </li>
);

Table.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  participants: PropTypes.number.isRequired,
  dispatchRemoveTable: PropTypes.func.isRequired,
  dispatchGoToEditTable: PropTypes.func.isRequired,
};

export default connect(null, {
  dispatchRemoveTable: removeTable,
  dispatchGoToEditTable: goToEditTable,
})(Table);
