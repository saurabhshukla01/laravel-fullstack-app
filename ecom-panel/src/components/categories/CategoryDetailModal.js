import React from "react";

const CategoryDetailModal = ({ category, show, onClose }) => {
  if (!category) return null;

  return (
    <div className={`modal fade ${show ? "show d-block" : "d-none"}`} tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Category Details</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              {Object.entries(category).map(([key, value]) => (
                <div className="col-md-6 mb-3" key={key}>
                  <strong>{key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}:</strong>
                  <div>{value !== null && value !== "" ? value.toString() : "—"}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailModal;
