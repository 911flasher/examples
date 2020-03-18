import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table from './Table';
import scrollRenderer, { tableWidth } from './scrollRenderer';
import './TableList.css';

class TablesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      start: 0,
      end: 10,
    };
  }

  onScroll = ({ target: { scrollLeft } }) => {
    this.setState(scrollRenderer(scrollLeft));
  }

  render() {
    const { tables } = this.props;
    const { start, end } = this.state;

    return (
      <ul
        className="TableList"
        onScroll={this.onScroll}
      >
        <li style={{ minWidth: start * tableWidth }} />
        {tables.slice(start, end).map(table => (
          <Table
            {...table}
            key={table.id}
          />
        ))}
        <li style={{ minWidth: (tables.length - end) * tableWidth }} >.</li>
      </ul>
    );
  }
}

TablesList.propTypes = {
  tables: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    participants: PropTypes.number.isRequired,
  })).isRequired,
};

export default connect(({ tables }) => ({ tables }))(TablesList);
