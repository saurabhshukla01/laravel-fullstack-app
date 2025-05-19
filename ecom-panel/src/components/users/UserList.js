import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Layout from '../../layouts/Layout';
import UserService from '../../services/UserService';
import 'react-toastify/dist/ReactToastify.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await UserService.getAllUsers();
      setUsers(response.data.data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditUser(user);
    toast.info(`Edit mode for ${user.name}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await UserService.deleteUser(id);
        toast.success('User deleted successfully');
        fetchUsers();
      } catch (error) {
        console.error('Delete error:', error);
        toast.error('Failed to delete user');
      }
    }
  };

  return (
    <Layout>
      <div className="app-content pt-3 p-md-3 p-lg-4">
        <div className="container-xl">
          <div className="row g-3 mb-4 align-items-center justify-content-between">
            <div className="col-auto">
              <h1 className="app-page-title mb-0">Users</h1>
            </div>
            <div className="col-auto">
              <div className="page-utilities">
                <div className="row g-2 justify-content-start justify-content-md-end align-items-center">
                  <div className="col-auto">
                    <form className="table-search-form row gx-1 align-items-center">
                      <div className="col-auto">
                        <input type="text" className="form-control search-orders" placeholder="Search" />
                      </div>
                      <div className="col-auto">
                        <button type="submit" className="btn app-btn-secondary">Search</button>
                      </div>
                    </form>
                  </div>
                  <div className="col-auto">
                    <select className="form-select w-auto">
                      <option value="all">All</option>
                      <option value="week">This week</option>
                      <option value="month">This month</option>
                      <option value="3months">Last 3 months</option>
                    </select>
                  </div>
                  <div className="col-auto">
                    <Link className="btn app-btn-secondary" to="#">
                      <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-download me-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                        <path fillRule="evenodd" d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                      </svg>
                      Download CSV
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <nav className="orders-table-tab app-nav-tabs nav shadow-sm flex-column flex-sm-row mb-4">
            <a className="flex-sm-fill text-sm-center nav-link active" data-bs-toggle="tab" href="#users-all">All</a>
            <a className="flex-sm-fill text-sm-center nav-link" data-bs-toggle="tab" href="#admins">Admins</a>
            <a className="flex-sm-fill text-sm-center nav-link" data-bs-toggle="tab" href="#non-admins">Users</a>
          </nav>

          <div className="tab-content">
            <div className="tab-pane fade show active" id="users-all">
              <div className="app-card app-card-orders-table shadow-sm mb-5">
                <div className="app-card-body">
                  <div className="table-responsive">
                    <table className="table app-table-hover mb-0 text-left">
                      <thead>
                        <tr>
                          <th className="cell">#ID</th>
                          <th className="cell">Profile</th>
                          <th className="cell">Name</th>
                          <th className="cell">Email</th>
                          <th className="cell">Gender</th>
                          <th className="cell">Age</th>
                          <th className="cell">DOB</th>
                          <th className="cell">Role</th>
                          <th className="cell">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.length > 0 ? (
                          users.map((user, index) => (
                            <tr key={user.id}>
                              <td className="cell">{index + 1}</td>
                              <td className="cell">
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/images/user.png`}
                                    className="rounded-circle"
                                    width="40"
                                    height="40"
                                    alt="Profile"
                                />
                              </td>
                              <td className="cell">{user.name}</td>
                              <td className="cell">{user.email}</td>
                              <td className="cell">{user.gender}</td>
                              <td className="cell">{user.age}</td>
                              <td className="cell">{user.dob}</td>
                              <td className="cell">
                                <span className={`badge ${user.is_admin ? 'bg-primary' : 'bg-secondary'}`}>
                                  {user.is_admin ? 'Admin' : 'User'}
                                </span>
                              </td>
                              <td className="cell">
                                <button onClick={() => handleEdit(user)} className="btn-sm btn-outline-primary me-1">Edit</button>
                                <button onClick={() => handleDelete(user.id)} className="btn-sm btn-outline-danger">Delete</button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td className="cell text-center" colSpan="9">No users found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Tabs (optional future filters for Admins, Users, etc.) */}
            <div className="tab-pane fade" id="admins">Coming Soon</div>
            <div className="tab-pane fade" id="non-admins">Coming Soon</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserList;
