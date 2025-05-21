// src/pages/OtherPage.js
import React from 'react';
import Layout from '../../layouts/Layout';
import { Link } from 'react-router-dom';
const CategoryList = () => {
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
                    <Link class="btn app-btn-secondary" to="#">
                      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-download me-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                        <path fill-rule="evenodd" d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                      </svg>
                      Download CSV
                    </Link>
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
                          <th class="cell">Order</th>
                          <th class="cell">Product</th>
                          <th class="cell">Customer</th>
                          <th class="cell">Date</th>
                          <th class="cell">Status</th>
                          <th class="cell">Total</th>
                          <th class="cell"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="cell">#15346</td>
                          <td class="cell"><span class="truncate">Lorem ipsum dolor sit amet eget volutpat erat</span></td>
                          <td class="cell">John Sanders</td>
                          <td class="cell"><span>17 Oct</span><span class="note">2:16 PM</span></td>
                          <td class="cell"><span class="badge bg-success">Paid</span></td>
                          <td class="cell">$259.35</td>
                          <td class="cell"><Link class="btn-sm app-btn-secondary" to="#">View</Link></td>
                        </tr>

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
            </div>

            <div class="tab-pane fade" id="category-active" role="tabpanel" aria-labelledby="category-active-tab">
              <div class="app-card app-card-orders-table mb-5">
                <div class="app-card-body">
                  <div class="table-responsive">
                    <table class="table mb-0 text-left">
                      <thead>
                        <tr>
                          <th class="cell">Order</th>
                          <th class="cell">Product</th>
                          <th class="cell">Customer</th>
                          <th class="cell">Date</th>
                          <th class="cell">Status</th>
                          <th class="cell">Total</th>
                          <th class="cell"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="cell">#15346</td>
                          <td class="cell"><span class="truncate">Lorem ipsum dolor sit amet eget volutpat erat</span></td>
                          <td class="cell">John Sanders</td>
                          <td class="cell"><span>17 Oct</span><span class="note">2:16 PM</span></td>
                          <td class="cell"><span class="badge bg-success">Paid</span></td>
                          <td class="cell">$259.35</td>
                          <td class="cell"><Link class="btn-sm app-btn-secondary" to="#">View</Link></td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div class="tab-pane fade" id="category-inactive" role="tabpanel" aria-labelledby="category-inactive-tab">
              <div class="app-card app-card-orders-table mb-5">
                <div class="app-card-body">
                  <div class="table-responsive">
                    <table class="table mb-0 text-left">
                      <thead>
                        <tr>
                          <th class="cell">Order</th>
                          <th class="cell">Product</th>
                          <th class="cell">Customer</th>
                          <th class="cell">Date</th>
                          <th class="cell">Status</th>
                          <th class="cell">Total</th>
                          <th class="cell"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="cell">#15346</td>
                          <td class="cell"><span class="truncate">Lorem ipsum dolor sit amet eget volutpat erat</span></td>
                          <td class="cell">John Sanders</td>
                          <td class="cell"><span>17 Oct</span><span class="note">2:16 PM</span></td>
                          <td class="cell"><span class="badge bg-success">Paid</span></td>
                          <td class="cell">$259.35</td>
                          <td class="cell"><Link class="btn-sm app-btn-secondary" to="#">View</Link></td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryList;
