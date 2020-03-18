import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './TableForm.css';

const selectInputText = (e) => {
  e.target.select();
};

class TableForm extends PureComponent {
  onSubmit = (e) => {
    e.preventDefault();
    const table = {
      name: this.nameInput.value,
      participants: +this.participantsInput.value,
    };

    this.nameInput.value = '';
    this.participantsInput.value = '';
    this.props.onSubmit(table);
  }

  render() {
    const {
      headerText, btnText, defaultName, defaultParticipants,
    } = this.props;

    return (
      <div className="TableForm">
        <h3 className="TableForm__header">{headerText}</h3>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="name-input">
            Table name:
            <input
              className="input text-input"
              type="text"
              placeholder="New table name"
              pattern=".{3,}"
              title="3 characters minimum"
              required
              autoFocus
              onFocus={selectInputText}
              ref={(input) => { this.nameInput = input; }}
              defaultValue={defaultName}
              id="name-input"
            />
          </label>
          <label htmlFor="participants-input">
            Participants:
            <input
              className="input"
              type="number"
              min="1"
              max="10"
              required
              ref={(input) => { this.participantsInput = input; }}
              defaultValue={defaultParticipants}
              id="participants-input"
            />
          </label>
          <button type="submit" className="btn">
            {btnText}
          </button>
        </form>
      </div>
    );
  }
}

TableForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  defaultName: PropTypes.string,
  defaultParticipants: PropTypes.number,
};

export default TableForm;
