// src/components/categories/CategoryList.js
import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/Layout';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CategoryService from '../../services/CategoryService';
import CategoryDetailModal from './CategoryDetailModal';
import Pagination from '../common/Pagination';
const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchCategories = async (page) => {
    try {
      const response = await CategoryService.getAllCategories(page); // assume this returns data with pagination info
      setCategories(response.data);
      setCurrentPage(response.meta.current_page);
      setLastPage(response.meta.last_page);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories(currentPage);
    // eslint-disable-next-line
  }, [currentPage]);


  const handleShowDetailView = (user) => {
    setSelectedCategory(user);
    setShowDetailModal(true);
  };

  const closeShowDetailModal = () => {
    setShowDetailModal(false);
    setSelectedCategory(null);
  };

  const resetForm = () => {
    setForm({ name: '', description: '' });
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
        await CategoryService.updateCategory(editId, form);
        toast.success('Category updated successfully');
      } else {
        await CategoryService.createCategory(form);
        toast.success('Category created successfully');
      }
      resetForm();
      fetchCategories();
    } catch (err) {
      toast.error('Failed to save user');
    }
  };

  const handleEdit = async (category) => {
    try {
      setEditId(category.id); // set edit mode
      setForm({
        name: category.name || '',
        description: category.description || ''
      });
      setShowModal(true);
    } catch (err) {
      toast.error('Failed to fetch user details');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await CategoryService.deleteCategory(id);
        toast.success('Category deleted successfully');
        fetchCategories();
      } catch (err) {
        toast.error('Failed to delete category');
      }
    }
  };

  return (
    <Layout>
      <div class="app-content pt-3 p-md-3 p-lg-4">
        <div class="container-xl">
          <div class="row g-3 mb-4 align-items-center justify-content-between">
            <div class="col-auto">
              <h1 class="app-page-title mb-0">Categories</h1>
            </div>
            <div class="col-auto">
              <div class="page-utilities">
                <div class="row g-2 justify-content-start justify-content-md-end align-items-center">
                  <div class="col-auto">
                    <form class="table-search-form row gx-1 align-items-center">
                      <div class="col-auto">
                        <input type="text" id="search-orders" name="searchorders" class="form-control search-orders" placeholder="Search" />
                      </div>
                      <div class="col-auto">
                        <button type="submit" class="btn app-btn-secondary">Search</button>
                      </div>
                    </form>
                  </div>
                  <div class="col-auto">
                    <select class="form-select w-auto">
                      <option selected value="option-1">All</option>
                      <option value="option-2">This week</option>
                      <option value="option-3">This month</option>
                      <option value="option-4">Last 3 months</option>
                    </select>
                  </div>
                  <div class="col-auto">
                    <Link className="btn app-btn-secondary" to="#">
                      <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-download me-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                        <path fillRule="evenodd" d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                      </svg>
                      Download CSV
                    </Link>
                  </div>
                  <div className="col-auto">
                    <button onClick={() => setShowModal(true)} className="btn app-btn-primary">Add Category</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <nav id="orders-table-tab" class="orders-table-tab app-nav-tabs nav shadow-sm flex-column flex-sm-row mb-4">
            <Link class="flex-sm-fill text-sm-center nav-link active" id="orders-all-tab" data-bs-toggle="tab" to="#orders-all" role="tab" aria-controls="orders-all" aria-selected="true">All</Link>
            <Link class="flex-sm-fill text-sm-center nav-link" id="category-active-tab" data-bs-toggle="tab" to="#category-active" role="tab" aria-controls="category-active" aria-selected="false">Active</Link>
            <Link class="flex-sm-fill text-sm-center nav-link" id="category-inactive-tab" data-bs-toggle="tab" to="#category-inactive" role="tab" aria-controls="category-inactive" aria-selected="false">Inactive</Link>
          </nav>

          <div class="tab-content" id="orders-table-tab-content">
            <div class="tab-pane fade show active" id="orders-all" role="tabpanel" aria-labelledby="orders-all-tab">
              <div class="app-card app-card-orders-table shadow-sm mb-5">
                <div class="app-card-body">
                  <div class="table-responsive">
                    <table class="table app-table-hover mb-0 text-left">
                      <thead>
                        <tr>
                          <th className="cell">#Sr.</th>
                          <th className="cell">Name</th>
                          <th className="cell">Description</th>
                          <th className="cell">Status</th>
                          <th className="cell">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.length > 0 ? (
                          categories.map((category, index) => (
                            <tr key={category.id}>
                              <td className="cell">#{index + 1}</td>
                              <td className="cell">{category.name}</td>
                              <td class="cell"><span class="truncate">{category.description}</span></td>
                              <td class="cell"><span class="badge bg-success">Active</span></td>
                              <td className="cell">
                                <button onClick={() => handleEdit(category)} className="btn-sm btn-outline-primary me-1">Edit</button>
                                <button onClick={() => handleShowDetailView(category)} className="btn-sm btn-outline-secondary me-1">Show</button>
                                <button onClick={() => handleDelete(category.id)} className="btn-sm btn-outline-danger">Delete</button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td className="cell text-center" colSpan="5">No categories found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* <nav class="app-pagination">
                <ul class="pagination justify-content-center">
                  <li class="page-item disabled">
                    <Link class="page-link" to="#" tabindex="-1" aria-disabled="true">Previous</Link>
                  </li>
                  <li class="page-item active"><Link class="page-link" to="#">1</Link></li>
                  <li class="page-item"><Link class="page-link" to="#">2</Link></li>
                  <li class="page-item"><Link class="page-link" to="#">3</Link></li>
                  <li class="page-item">
                    <Link class="page-link" to="#">Next</Link>
                  </li>
                </ul>
              </nav> */}
<Pagination
  currentPage={currentPage}
  lastPage={lastPage}
  onPageChange={(page) => setCurrentPage(page)}
/>
            </div>

            <div class="tab-pane fade" id="category-active" role="tabpanel" aria-labelledby="category-active-tab">
              <div class="app-card app-card-orders-table mb-5">
                <div class="app-card-body text-center">
                  <strong>Filter by Active categories coming soon...</strong>
                </div>
              </div>
            </div>

            <div class="tab-pane fade" id="category-inactive" role="tabpanel" aria-labelledby="category-inactive-tab">
              <div class="app-card app-card-orders-table mb-5">
                <div class="app-card-body text-center">
                  <strong>Filter by Inactive categories coming soon...</strong>
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
                    <h5 className="modal-title">{editId ? 'Edit Category' : 'Add Category'}</h5>
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
                          <label className="form-label">Description</label>
                          <textarea
                            className="form-control"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            required
                          />
                          <div className="form-text">
                            Please update the description to reflect the latest details of this category.
                          </div>
                        </div>

                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={resetForm}>
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        {editId ? 'Update' : 'Add'} Category
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
          <CategoryDetailModal category={selectedCategory} show={showDetailModal} onClose={closeShowDetailModal} />
        </div>
      </div>
    </Layout>
  );
};

export default CategoryList;
