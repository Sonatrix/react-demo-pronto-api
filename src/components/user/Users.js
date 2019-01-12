import React from 'react';
import { listUsers } from '../../actions/user';

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      content: null,
      currentPage: 0,
      currentPageSize: 3,
      totalElements: null,
      totalPages: null,
      loading: true
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount = async () => {

    const response = await listUsers({});

    if (response.status) {
      this.setState({ ...response.data });
      this.setState({ loading: false });
    } else {
      alert(response.errorMessage);
      this.setState({ loading: false });
    }
  }

  fetchData = async () => {
    this.setState({ loading: true });
    const { currentPage } = this.state;
    const response = await listUsers({ page: currentPage });

    if (response.status) {
      this.setState({ ...response.data });
      this.setState({ loading: false });
    } else {
      this.setState({ loading: false });
    }
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });

    this.fetchData();
  }

  render() {
    const { content, currentPage, totalPages, loading } = this.state;

    if (loading) {
      return null;
    }

    if (!content) {
      return <div>No Data Available or Encountered some error</div>
    }
    const renderUsers = content && content.map(({ userName, gender }, index) => {
      return <li key={index}>{userName}: {gender}</li>;
    });

    const pageNumbers = [];
    for (let i = 0; i <= Math.ceil(totalPages); i++) {
      pageNumbers.push(i + 1);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
              key={number}
              id={number}
              onClick={this.handleClick}
            >
              {number}
            </li>
      );
    });

    return (
      <div>
            <ul>
              {renderUsers}
            </ul>
            <ul id="page-numbers">
              {renderPageNumbers}
            </ul>
          </div>
    );
  }
}

export default Users;
