import React from "react";
import Search from "./Search";
import AddBookingGuestForm from "./AddBookingGuestForm";
import { SearchResults } from "./SearchResults";

class Bookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      filteredarray: [],
      bookings: [],
      error: null,
      searching: false,
      selectedEditRowId: null
    };
  }
  componentDidMount() {
    fetch("https://cyf-react.glitch.me")
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          return res;
        } else {
          throw new Error("HTTP error");
        }
      })
      .then(res => res.json())
      .then(data => this.setState({ bookings: data, isLoading: false }))
      .catch(error => this.setState({ isLoading: false, error: error }));
  }
  search = searchVal => {
    this.setState({
      filteredarray: this.state.bookings.filter(item => {
        return (
          String(item.firstName).toLowerCase() ===
            String(searchVal)
              .trim()
              .toLowerCase() ||
          String(item.surname).toLowerCase() ===
            String(searchVal)
              .trim()
              .toLowerCase()
        );
      })
    });
  };
  editRow = id => {
    this.setState({
      selectedEditRowId: id
    });
  };
  saveRow = (id, firstName, surname, email) => {
    const newData = this.state.bookings.filter(row => row.id !== id);
    const updatedRow = { id, firstName, surname, email };
    newData.splice(id - 1, 0, updatedRow);

    this.setState({
      bookings: newData
    });
  };
  //to make the table displayed in case of not searching and disappear in case searching and then display the result on submit
  searching = startTyping => {
    if (startTyping === true) this.setState({ searching: true });
  };
  // to push the new array transfered from input file
  addBooking = booking => {
    console.log("New booking: " + booking);
    const updatedBookings = this.state.bookings;
    updatedBookings.push(booking);
    this.setState({ bookings: updatedBookings });
  };
  // deleteEntry = (entry) => {
  //   console.log("Delete")
  //   this.setState({ bookings: this.state.bookings.filter((user) => user !== entry) });
  // };
  render() {
    if (this.state.isLoading) return <span>LOADING.....</span>;
    else if (this.state.error) return <span>500 HTTP error.</span>;
    else
      return (
        <div className="App-content">
          <div className="container">
            <Search search={this.search} searching={this.searching} />
            {/* to make the table displayed in case of not searching and disappear in case searching and then display the result on submit */}
            {this.state.searching ? (
              <SearchResults fakeBookingsList={this.state.filteredarray} />
            ) : (
              <SearchResults
                fakeBookingsList={this.state.bookings}
                deleteEntry={this.deleteEntry}
                saveRow={this.saveRow}
                selectedEditRowId={this.state.selectedEditRowId}
                editRow={this.editRow}
              />
            )}
            {/* to insert New booking details Row to the table */}
            <AddBookingGuestForm
              addBooking={this.addBooking}
              fakeBookingsList={this.state.bookings}
            />
          </div>
        </div>
      );
  }
}

export default Bookings;
