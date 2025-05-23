import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../layouts/Layout';
import 'react-toastify/dist/ReactToastify.css';
import UserService from '../../services/UserService';
import { Link } from 'react-router-dom';
import UserDetailModal from './UserDetailModal';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '', gender: '', age: '', dob: '', is_admin: false });
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleShowDetailView = (user) => {
    setSelectedUser(user);
    setShowDetailModal(true);
  };

  const closeShowDetailModal = () => {
    setShowDetailModal(false);
    setSelectedUser(null);
  };

  const fetchUsers = async () => {
    try {
      const res = await UserService.getAllUsers();
      setUsers(res.data.data || res.data);
    } catch (err) {
      toast.error('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  const resetForm = () => {
    setForm({ name: '', email: '', password: '', gender: '', age: '', dob: '', is_admin: false });
    setEditId(null);
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!form.name || !form.email || (!editId && !form.password)) {
        toast.error('Please fill in all required fields');
        return;
      }

      if (editId) {
        await UserService.updateUser(editId, form);
        toast.success('User updated successfully');
      } else {
        await UserService.createUser(form);
        toast.success('User created successfully');
      }
      resetForm();
      fetchUsers();
    } catch (err) {
      toast.error('Failed to save user');
    }
  };

  const handleEdit = async (user) => {
    try {
      setEditId(user.id); // set edit mode
      setForm({
        name: user.name || '',
        email: user.email || '',
        password: '', // keep empty for security
        gender: user.gender || '',
        age: user.age || '',
        dob: user.dob || '',
        is_admin: !!user.is_admin,
      });
      setShowModal(true);
    } catch (err) {
      toast.error('Failed to fetch user details');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await UserService.deleteUser(id);
        toast.success('User deleted successfully');
        fetchUsers();
      } catch (err) {
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
              <h1 className="app-page-title mb-0">Users 🤫</h1>
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
                  <div className="col-auto">
                    <button onClick={() => setShowModal(true)} className="btn app-btn-primary">Add User</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <nav className="users-table-tab app-nav-tabs nav shadow-sm flex-column flex-sm-row mb-4">
            <a className="flex-sm-fill text-sm-center nav-link active" data-bs-toggle="tab" href="#users-all">All</a>
            <a className="flex-sm-fill text-sm-center nav-link" data-bs-toggle="tab" href="#admins">Admins</a>
            <a className="flex-sm-fill text-sm-center nav-link" data-bs-toggle="tab" href="#non-admins">Users</a>
            <a className="flex-sm-fill text-sm-center nav-link" data-bs-toggle="tab" href="#user-active">Active</a>
            <a className="flex-sm-fill text-sm-center nav-link" data-bs-toggle="tab" href="#user-inactive">Inactive</a>
          </nav>
          {/* User Table */}
          <div className="tab-content">
            <div className="tab-pane fade show active" id="users-all">
              <div className="app-card app-card-users-table shadow-sm mb-5">
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
                          <th className="cell">Status</th>
                          <th className="cell">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.length > 0 ? (
                          users.map((user, index) => (
                            <tr key={user.id}>
                              <td className="cell">{index + 1}</td>
                              <td className="cell">
                                <img src={`${process.env.PUBLIC_URL}/assets/images/user.png`} className="rounded-circle" width="40" height="40" alt="Profile" />
                              </td>
                              <td className="cell">{user.name}</td>
                              <td className="cell">{user.email}</td>
                              <td className="cell">{user.gender}</td>
                              <td className="cell">{user.age}</td>
                              <td className="cell">{user.dob}</td>
                              <td className="cell">
                                <span className={`badge ${user.is_admin ? 'bg-primary' : 'bg-secondary'}`}>{user.is_admin ? 'Admin' : 'User'}</span>
                              </td>
                              <td className="cell">
                                <span className={`badge ${user.email_verified_at ? 'bg-primary' : 'bg-secondary'}`}>{user.email_verified_at ? 'Inactive' : 'Active'}</span>
                              </td>
                              <td className="cell">
                                <button onClick={() => handleEdit(user)} className="btn-sm btn-outline-primary me-1">Edit</button>
                                <button onClick={() => handleShowDetailView(user)} className="btn-sm btn-outline-secondary me-1">Show</button>
                                <button onClick={() => handleDelete(user.id)} className="btn-sm btn-outline-danger">Delete</button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td className="cell text-center" colSpan="10">No users found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-content" id="users-table-tab-content">

              <div className="tab-pane fade" id="admins" role="tabpanel" aria-labelledby="user-active-tab">
                <div className="app-card app-card-users-table mb-5">
                  <div className="app-card-body">
                    <div className="table-responsive">
                      <table className="table mb-0 text-left">
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
                            <th className="cell">Status</th>
                            <th className="cell">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.filter(user => user.is_admin === 1).length > 0 ? (
                            users
                              .filter(user => user.is_admin === 1)
                              .map((user, index) => (
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
                                    <span className={`badge ${user.email_verified_at ? 'bg-primary' : 'bg-secondary'}`}>
                                      {user.email_verified_at ? 'Inactive' : 'Active'}
                                    </span>
                                  </td>
                                  <td className="cell">
                                    <button onClick={() => handleEdit(user)} className="btn-sm btn-outline-primary me-1">Edit</button>
                                    <button onClick={() => handleShowDetailView(user)} className="btn-sm btn-outline-secondary me-1">Show</button>
                                    <button onClick={() => handleDelete(user.id)} className="btn-sm btn-outline-danger">Delete</button>
                                  </td>
                                </tr>
                              ))
                          ) : (
                            <tr>
                              <td className="cell text-center" colSpan="10">No users found</td>
                            </tr>
                          )}
                        </tbody>

                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tab-pane fade" id="non-admins" role="tabpanel" aria-labelledby="user-inactive-tab">
                <div className="app-card app-card-users-table mb-5">
                  <div className="app-card-body">
                    <div className="table-responsive">
                      <table className="table mb-0 text-left">
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
                            <th className="cell">Status</th>
                            <th className="cell">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.filter(user => user.is_admin === 0).length > 0 ? (
                            users
                              .filter(user => user.is_admin === 0)
                              .map((user, index) => (
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
                                    <span className={`badge ${user.email_verified_at ? 'bg-primary' : 'bg-secondary'}`}>
                                      {user.email_verified_at ? 'Inactive' : 'Active'}
                                    </span>
                                  </td>
                                  <td className="cell">
                                    <button onClick={() => handleEdit(user)} className="btn-sm btn-outline-primary me-1">Edit</button>
                                    <button onClick={() => handleShowDetailView(user)} className="btn-sm btn-outline-secondary me-1">Show</button>
                                    <button onClick={() => handleDelete(user.id)} className="btn-sm btn-outline-danger">Delete</button>
                                  </td>
                                </tr>
                              ))
                          ) : (
                            <tr>
                              <td className="cell text-center" colSpan="10">No users found</td>
                            </tr>
                          )}
                        </tbody>

                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="user-active" role="tabpanel" aria-labelledby="user-active-tab">
                <div className="app-card app-card-users-table mb-5">
                  <div className="app-card-body">
                    <div className="table-responsive">
                      <table className="table mb-0 text-left">
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
                            <th className="cell">Status</th>
                            <th className="cell">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.filter(user => user.email_verified_at === null).length > 0 ? (
                            users
                              .filter(user => user.email_verified_at === null)
                              .map((user, index) => (
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
                                    <span className={`badge ${user.email_verified_at ? 'bg-primary' : 'bg-secondary'}`}>
                                      {user.email_verified_at ? 'Inactive' : 'Active'}
                                    </span>
                                  </td>
                                  <td className="cell">
                                    <button onClick={() => handleEdit(user)} className="btn-sm btn-outline-primary me-1">Edit</button>
                                    <button onClick={() => handleShowDetailView(user)} className="btn-sm btn-outline-secondary me-1">Show</button>
                                    <button onClick={() => handleDelete(user.id)} className="btn-sm btn-outline-danger">Delete</button>
                                  </td>
                                </tr>
                              ))
                          ) : (
                            <tr>
                              <td className="cell text-center" colSpan="10">No users found</td>
                            </tr>
                          )}
                        </tbody>

                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tab-pane fade" id="user-inactive" role="tabpanel" aria-labelledby="user-inactive-tab">
                <div className="app-card app-card-users-table mb-5">
                  <div className="app-card-body">
                    <div className="table-responsive">
                      <table className="table mb-0 text-left">
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
                            <th className="cell">Status</th>
                            <th className="cell">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.filter(user => user.email_verified_at !== null).length > 0 ? (
                            users
                              .filter(user => user.email_verified_at !== null)
                              .map((user, index) => (
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
                                    <span className={`badge ${user.email_verified_at ? 'bg-primary' : 'bg-secondary'}`}>
                                      {user.email_verified_at ? 'Inactive' : 'Active'}
                                    </span>
                                  </td>
                                  <td className="cell">
                                    <button onClick={() => handleEdit(user)} className="btn-sm btn-outline-primary me-1">Edit</button>
                                    <button onClick={() => handleShowDetailView(user)} className="btn-sm btn-outline-secondary me-1">Show</button>
                                    <button onClick={() => handleDelete(user.id)} className="btn-sm btn-outline-danger">Delete</button>
                                  </td>
                                </tr>
                              ))
                          ) : (
                            <tr>
                              <td className="cell text-center" colSpan="10">No users found</td>
                            </tr>
                          )}
                        </tbody>

                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Add/Edit Modal */}
          {showModal && (
            <div
              className="modal fade show d-block"
              tabIndex="-1"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            >
              <div className="modal-dialog modal-xl">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">{editId ? 'Edit User' : 'Add User'}</h5>
                    <button type="button" className="btn-close" onClick={resetForm}></button>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                          />
                        </div>
                        {!editId && (
                          <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                              type="password"
                              className="form-control"
                              value={form.password}
                              onChange={(e) => setForm({ ...form, password: e.target.value })}
                              required
                            />
                          </div>
                        )}

                        {editId && (
                          <div className="col-md-6">
                            <label className="form-label">Password (optional)</label>
                            <input
                              type="password"
                              className="form-control"
                              value={form.password}
                              onChange={(e) => setForm({ ...form, password: e.target.value })}
                            />
                          </div>
                        )}
                        <div className="col-md-6">
                          <label className="form-label">Gender</label>
                          <select
                            className="form-select"
                            value={form.gender}
                            onChange={(e) => setForm({ ...form, gender: e.target.value })}
                          >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Age</label>
                          <input
                            type="number"
                            className="form-control"
                            value={form.age}
                            onChange={(e) => setForm({ ...form, age: e.target.value })}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Date of Birth</label>
                          <input
                            type="date"
                            className="form-control"
                            value={form.dob}
                            onChange={(e) => setForm({ ...form, dob: e.target.value })}
                          />
                        </div>
                        <div className="col-12">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="isAdmin"
                              checked={form.is_admin}
                              onChange={(e) => setForm({ ...form, is_admin: e.target.checked })}
                            />
                            <label className="form-check-label" htmlFor="isAdmin">Is Admin</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={resetForm}>
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        {editId ? 'Update' : 'Add'} User
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          <UserDetailModal user={selectedUser} show={showDetailModal} onClose={closeShowDetailModal} />
        </div>
      </div>
    </Layout>
  );
};

export default UserList;
