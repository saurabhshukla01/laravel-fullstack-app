// src/components/sub categories/SubCategoryList.js
import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/Layout';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Pagination from '../common/Pagination';
import SubCategoryService from '../../services/SubCategoryService';
import SubCategoryDetailModal from './SubCategoryDetailModal';
import CategoryService from '../../services/CategoryService';
const SubCategoryList = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', category_id: '' });
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSubCategory, setselectedSubCategory] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [filter, setFilter] = useState('option-1');
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    if (showModal) {
      fetchDropdownCategories();
    }
  }, [showModal]);

  const fetchDropdownCategories = async () => {
    try {
      const data = await CategoryService.getDropdownCategories();
      console.log(data)
      if (data.success) {
        setCategories(data.data);
      } else {
        console.error('Failed to fetch categories:', data.message);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };



  const fetchSubCategories = async (page = 1, selectedFilter = filter, searchTerm = search) => {
    try {
      const response = await SubCategoryService.getAllSubCategories(page, selectedFilter, searchTerm);
      setSubCategories(response.data);
      setCurrentPage(response.meta.current_page);
      setLastPage(response.meta.last_page);
    } catch (error) {
      console.error('Failed to fetch sub categories:', error);
    }
  };

  useEffect(() => {
    fetchSubCategories(currentPage, filter, search);
    // eslint-disable-next-line
  }, [currentPage, filter, search]);


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on search
    fetchSubCategories(1, filter, search);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1); // Reset to first page on filter
  };


  const handleShowDetailView = (user) => {
    setselectedSubCategory(user);
    setShowDetailModal(true);
  };

  const closeShowDetailModal = () => {
    setShowDetailModal(false);
    setselectedSubCategory(null);
  };

  const resetForm = () => {
    setForm({ name: '', description: '' , category_id: '' });
    setEditId(null);
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!form.name || !form.description) {
        toast.error('Please fill in all required fields');
        return;
      }

      if (editId) {
        await SubCategoryService.updateSubCategory(editId, form);
        toast.success('Category updated successfully');
      } else {
        await SubCategoryService.createSubCategory(form);
        toast.success('Category created successfully');
      }
      resetForm();
      fetchSubCategories();
    } catch (err) {
      toast.error('Failed to save user');
    }
  };

  const handleEdit = async (category) => {
    try {
      setEditId(category.id); // set edit mode
      setForm({
        name: category.name || '',
        description: category.description || '',
        category_id: category.category_id || ''
      });
      setShowModal(true);
    } catch (err) {
      toast.error('Failed to fetch user details');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await SubCategoryService.deleteSubCategory(id);
        toast.success('Category deleted successfully');
        fetchSubCategories();
      } catch (err) {
        toast.error('Failed to delete category');
      }
    }
  };

  return (
    <Layout>
      <div className="app-content pt-3 p-md-3 p-lg-4">
        <div className="container-xl">
          <div className="row g-3 mb-4 align-items-center justify-content-between">
            <div className="col-auto">
              <h1 className="app-page-title mb-0">Sub Categories</h1>
            </div>
            <div className="col-auto">
              <div className="page-utilities">
                <div className="row g-2 justify-content-start justify-content-md-end align-items-center">
                  <div className="col-auto">
                    <form className="table-search-form row gx-1 align-items-center" onSubmit={handleSearchSubmit}>
                      <div className="col-auto">
                        <input type="text" id="search-orders" name="searchorders" className="form-control search-orders"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="Search" />
                      </div>
                      <div className="col-auto">
                        <button type="submit" className="btn app-btn-secondary">Search</button>
                      </div>
                    </form>
                  </div>
                  <div className="col-auto">
                    <select className="form-select w-auto" value={filter} onChange={handleFilterChange}>
                      <option selected value="option-1">All</option>
                      <option value="option-2">This week</option>
                      <option value="option-3">This month</option>
                      <option value="option-4">Last 3 months</option>
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
                    <button onClick={() => setShowModal(true)} className="btn app-btn-primary">Add Sub Category</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <nav id="orders-table-tab" className="orders-table-tab app-nav-tabs nav shadow-sm flex-column flex-sm-row mb-4">
            <Link className="flex-sm-fill text-sm-center nav-link active" id="orders-all-tab" data-bs-toggle="tab" to="#orders-all" role="tab" aria-controls="orders-all" aria-selected="true">All</Link>
            <Link className="flex-sm-fill text-sm-center nav-link" id="category-active-tab" data-bs-toggle="tab" to="#category-active" role="tab" aria-controls="category-active" aria-selected="false">Active</Link>
            <Link className="flex-sm-fill text-sm-center nav-link" id="category-inactive-tab" data-bs-toggle="tab" to="#category-inactive" role="tab" aria-controls="category-inactive" aria-selected="false">Inactive</Link>
          </nav>

          <div className="tab-content" id="orders-table-tab-content">
            <div className="tab-pane fade show active" id="orders-all" role="tabpanel" aria-labelledby="orders-all-tab">
              <div className="app-card app-card-orders-table shadow-sm mb-5">
                <div className="app-card-body">
                  <div className="table-responsive">
                    <table className="table app-table-hover mb-0 text-left">
                      <thead>
                        <tr>
                          <th className="cell">#Sr.</th>
                          <th className="cell">Name</th>
                          <th className="cell">Description</th>
                          <th className="cell">Category</th>
                          <th className="cell">Status</th>
                          <th className="cell">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subCategories.length > 0 ? (
                          subCategories.map((sub_category, index) => (
                            <tr key={sub_category.id}>
                              <td className="cell">#{index + 1}</td>
                              <td className="cell">{sub_category.name}</td>
                              <td className="cell"><span className="truncate">{sub_category.description}</span></td>
                              <td className="cell">{sub_category.category.name}</td>
                              <td className="cell"><span className="badge bg-success">Active</span></td>
                              <td className="cell">
                                <button onClick={() => handleEdit(sub_category)} className="btn-sm btn-outline-primary me-1">Edit</button>
                                <button onClick={() => handleShowDetailView(sub_category)} className="btn-sm btn-outline-secondary me-1">Show</button>
                                <button onClick={() => handleDelete(sub_category.id)} className="btn-sm btn-outline-danger">Delete</button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td className="cell text-center" colSpan="5">No sub categories found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>

            <div className="tab-pane fade" id="category-active" role="tabpanel" aria-labelledby="category-active-tab">
              <div className="app-card app-card-orders-table mb-5">
                <div className="app-card-body text-center">
                  <strong>Filter by Active sub categories coming soon...</strong>
                </div>
              </div>
            </div>

            <div className="tab-pane fade" id="category-inactive" role="tabpanel" aria-labelledby="category-inactive-tab">
              <div className="app-card app-card-orders-table mb-5">
                <div className="app-card-body text-center">
                  <strong>Filter by Inactive sub categories coming soon...</strong>
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
                    <h5 className="modal-title">{editId ? 'Edit Sub Category' : 'Add Sub Category'}</h5>
                    <button type="button" className="btn-close" onClick={resetForm}></button>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                      <div className="row g-3">
                        <div className="col-md-12">
                          <label className="form-label">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                          />
                        </div>
                        <div className="col-md-12">
                          <label className="form-label">Category</label>
                          <select
                            className="form-select"
                            value={form.category_id || ''}
                            onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                          >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                              <option key={cat.id} value={cat.id}>
                                {cat.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="col-md-12">
                          <label className="form-label">Description</label>
                          <textarea
                            className="form-control"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            required
                          />
                          <div className="form-text">
                            Please update the description to reflect the latest details of this sub category.
                          </div>
                        </div>

                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={resetForm}>
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        {editId ? 'Update' : 'Add'} Sub Category
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
          <SubCategoryDetailModal subCategory={selectedSubCategory} show={showDetailModal} onClose={closeShowDetailModal} />
        </div>
      </div>
    </Layout>
  );
};

export default SubCategoryList;
