import React, { Component } from 'react';
import './App.css';

export default class EmailList extends Component {
  constructor(props) {
    super(props);
    this.disableRef = [];
  }
  render() {
    return (
      <div>
        <div className="search-div">
          <button className="list-button"
            onClick={(e) => this.props.HandleSelectAll(e, this.disableRef)}
            disabled={this.props.disableSelectAll}
          >
            Select All
          </button>
          <input type="text"
            className="search-input"
            placeholder="Search item in the list"
            onChange={this.props.filterList} />
          <button className="list-button" disabled={this.props.disabled} onClick={() => this.props.handleDeleteAll(this.disableRef)}>Delete All</button>
          <button className="list-button"
            disabled={this.props.disabled}
            onClick={(e) => this.props.handleDisableAll(e, this.disableRef)}>
            Disable All
          </button>
        </div>
        {this.props.List.length !== 0 ? this.props.List.map((data, index) => {
          return (
            <div key={index} className="render-list">
              <input type="checkbox" className="checkbox"
                ref={disableRef => this.disableRef[index] = disableRef}
              />
              <div key={index}
                className="list-text">
                {data}
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button onClick={() => this.props.handleRowdelete(data, index)} className="list-button">
                  Delete
              </button>
                <button onClick={(e) => this.props.handleDisable(e, data, index, this.disableRef)}
                  className="list-button">
                  Disable
              </button>

              </div>
            </div>
          )
        }) : "no records exist"}
      </div>
    );
  }
}
