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

  componentDidMount = async () => {

    const response = await listUsers({});

    if (response.status) {
      this.setState({ ...response.data });
      this.setState({ loading: false });
    } else {
      alert(response.errorMessage);
      this.setState({ loading: false });
    }
  }

  fetchData = async (currentPage) => {
    this.setState({ loading: true });

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

    this.fetchData(Number(event.target.id));
  }

  render() {
    const { content, totalPages, loading , totalElements} = this.state;

    if (loading) {
      return null;
    }

    if (!content) {
      return <div className="jumbotron">No Data Available or Encountered some error</div>
    }
    const renderUsers = content && content.map(({ id, userName, gender, password }, index) => {
      return (<tr key={id}>
            <th scope="row">{id}</th>
            <td>{userName}</td>
            <td>{password}</td>
            <td>{gender}</td>
          </tr>);
    });

    const pageNumbers = [];
    for (let i = 0; i <= Math.ceil(totalPages); i++) {
      pageNumbers.push(i + 1);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li className="page-item"
              key={number}
              id={number}
              onClick={this.handleClick}
            >
              {number}
            </li>
      );
    });

    return (
      <div className="jumbotron">
      <div className="row">
      <p>Total Users: {totalElements}</p>
      </div>
        <table className="table bg-white">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">userName</th>
              <th scope="col">password</th>
              <th scope="col">gender</th>
            </tr>
          </thead>
          <tbody>
            {renderUsers}
          </tbody>
        </table>

        <ul id="page-numbers" className="pagination">
          {renderPageNumbers}
        </ul>
    </div>
    );
  }
}

export default Users;
