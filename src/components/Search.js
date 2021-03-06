import React from "react";
import Button from "./Buttons";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      searchingActive: false
    };
  }

  handleSearcInput = event => {
    this.props.searching(this.state.searchingActive);
    this.setState({
      searchingActive: !this.state.searchingActive,
      searchInput: event.target.value
    });
  };
  handelSubmit = e => {
    e.preventDefault();
    this.props.search(this.state.searchInput);
  };
  render() {
    return (
      <div className="search">
        <div className="page-header">
          <h4 className="text-left">Search Bookings</h4>
        </div>
        <div className="row search-wrapper">
          <div className="col">
            <form
              className="form-group search-box"
              onSubmit={this.handelSubmit}
            >
              <label htmlFor="customerName">Customer name</label>
              <div className="search-row">
                <input
                  type="text"
                  id="customerName"
                  className="form-control"
                  onChange={this.handleSearcInput}
                  placeholder="Customer"
                  value={this.state.searchInput}
                />
                <Button name="Search" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
