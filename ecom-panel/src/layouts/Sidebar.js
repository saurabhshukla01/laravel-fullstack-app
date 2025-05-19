// src/components/layout/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div id="app-sidepanel" class="app-sidepanel">
            <div id="sidepanel-drop" class="sidepanel-drop"></div>
            <div class="sidepanel-inner d-flex flex-column">
                <Link to="#" id="sidepanel-close" class="sidepanel-close d-xl-none">{" "}</Link>
                <div class="app-branding">
                    <Link class="app-logo" to="/"><img class="logo-icon me-2" src="assets/images/app-logo.svg" alt="logo" /><span class="logo-text">PORTAL</span></Link>
                </div>
                <nav id="app-nav-main" class="app-nav app-nav-main flex-grow-1">
                    <ul class="app-menu list-unstyled accordion" id="menu-accordion">
                        <li class="nav-item">
                            <Link class="nav-link active" to="/">
                                <span class="nav-icon">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-house-door" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fill-rule="evenodd"
                                            d="M7.646 1.146a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5H9.5a.5.5 0 0 1-.5-.5v-4H7v4a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6zM2.5 7.707V14H6v-4a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4h3.5V7.707L8 2.207l-5.5 5.5z"
                                        />
                                        <path fill-rule="evenodd" d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                                    </svg>
                                </span>
                                <span class="nav-link-text">Overview</span>
                            </Link>
                        </li>

                        {/* Users */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/users">
                                <span className="nav-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
                                        <path d="M5.5 7a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm5 0a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                                        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm11 0h1a2 2 0 0 0 2-2c0-1-2-3-5-3h-1a5.972 5.972 0 0 1 4 5z" />
                                    </svg>
                                </span>
                                <span className="nav-link-text">Users</span>
                            </Link>
                        </li>

                        {/* Posts */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/posts">
                                <span className="nav-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-file-earmark-text" viewBox="0 0 16 16">
                                        <path d="M5.5 7a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5zm0 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5z" />
                                        <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zM13 5h-3.5a1 1 0 0 1-1-1V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5z" />
                                    </svg>
                                </span>
                                <span className="nav-link-text">Posts</span>
                            </Link>
                        </li>

                        {/* Comments */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/comments">
                                <span className="nav-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-chat-left-text" viewBox="0 0 16 16">
                                        <path d="M14 1a1 1 0 0 1 1 1v11.586l-2-2V2H2a1 1 0 0 1-1-1h13z" />
                                        <path d="M3 3h10v2H3V3zm0 3h7v2H3V6zm0 3h5v2H3V9z" />
                                    </svg>
                                </span>
                                <span className="nav-link-text">Comments</span>
                            </Link>
                        </li>

                        {/* Products */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">
                                <span className="nav-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-box-seam" viewBox="0 0 16 16">
                                        <path d="M1.5 1a1 1 0 0 1 .832-.445h11.336a1 1 0 0 1 .832.445L16 2.5l-1.5 1.5V13.5a1 1 0 0 1-1 1H2.5a1 1 0 0 1-1-1V4L0 2.5 1.5 1zM2 4.5V13h12V4.5L8 9.5 2 4.5zM1.5 2L8 7l6.5-5H1.5z" />
                                    </svg>
                                </span>
                                <span className="nav-link-text">Products</span>
                            </Link>
                        </li>

                        {/* Categories */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/categories">
                                <span className="nav-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-tags" viewBox="0 0 16 16">
                                        <path d="M3 2a1 1 0 0 0-1 1v3.586l6.293 6.293a1 1 0 0 0 1.414 0l5.586-5.586a1 1 0 0 0 0-1.414L8.414 2H3zm0 1h5.586l6 6-5.586 5.586L3 6.414V3z" />
                                        <path d="M5.5 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                    </svg>
                                </span>
                                <span className="nav-link-text">Categories</span>
                            </Link>
                        </li>

                        {/* Subcategories */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/subcategories">
                                <span className="nav-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-collection" viewBox="0 0 16 16">
                                        <path d="M2.5 0A1.5 1.5 0 0 0 1 1.5V3h14V1.5A1.5 1.5 0 0 0 13.5 0h-11zM0 4v10.5A1.5 1.5 0 0 0 1.5 16h13a1.5 1.5 0 0 0 1.5-1.5V4H0z" />
                                    </svg>
                                </span>
                                <span className="nav-link-text">Subcategories</span>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/orders">
                                <span class="nav-icon">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-card-list" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fill-rule="evenodd"
                                            d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z"
                                        />
                                        <circle cx="3.5" cy="5.5" r=".5" />
                                        <circle cx="3.5" cy="8" r=".5" />
                                        <circle cx="3.5" cy="10.5" r=".5" />
                                    </svg>
                                </span>
                                <span class="nav-link-text">Orders</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div class="app-sidepanel-footer">
                    <nav class="app-nav app-nav-footer">
                        <ul class="app-menu footer-menu list-unstyled">
                            <li class="nav-item">
                                <Link class="nav-link" to="settings.html">
                                    <span class="nav-icon">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-gear" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                fill-rule="evenodd"
                                                d="M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 0 1 4.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 0 1-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 0 1 1.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 0 1 2.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 0 1 2.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 0 1 1.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 0 1-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 0 1 8.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 0 0 1.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 0 0 .52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 0 0-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 0 0-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 0 0-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 0 0-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 0 0 .52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 0 0 1.255-.52l.094-.319z"
                                            />
                                            <path fill-rule="evenodd" d="M8 5.754a2.246 2.246 0 1 0 0 4.492 2.246 2.246 0 0 0 0-4.492zM4.754 8a3.246 3.246 0 1 1 6.492 0 3.246 3.246 0 0 1-6.492 0z" />
                                        </svg>
                                    </span>
                                    <span class="nav-link-text">Settings</span>
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="https://themes.3rdwavemedia.com/bootstrap-templates/admin-dashboard/portal-free-bootstrap-admin-dashboard-template-for-developers/">
                                    <span class="nav-icon">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-download" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                            <path fill-rule="evenodd" d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                                        </svg>
                                    </span>
                                    <span class="nav-link-text">Download</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link d-flex align-items-center gap-2" to="/logout">
                                    <span className="nav-icon d-flex align-items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 1 1-.708-.708L14.293 13H10.5a.5.5 0 0 1-.5-.5z" />
                                            <path fillRule="evenodd" d="M4.5 15A1.5 1.5 0 0 1 3 13.5v-11A1.5 1.5 0 0 1 4.5 1H10a.5.5 0 0 1 0 1H4.5A.5.5 0 0 0 4 2.5v11a.5.5 0 0 0 .5.5H10a.5.5 0 0 1 0 1H4.5z" />
                                        </svg>
                                    </span>
                                    <span className="nav-link-text">Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};
export default Sidebar;
