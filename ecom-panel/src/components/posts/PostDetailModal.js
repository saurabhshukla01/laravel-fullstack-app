import React from "react";

const PostDetailModal = ({ post, show, onClose }) => {
  if (!post) return null;

  // Format keys and values
  const renderValue = (key, value) => {
    if (value === null || value === "") {
      return "—";
    }

    // Handle specific known nested fields
    if (key === "category" && typeof value === "object") {
      return value.name || "—";
    }

    // Handle other objects generically
    if (typeof value === "object") {
      return JSON.stringify(value); // or customize further
    }

    return value.toString();
  };

  return (
    <div className={`modal fade ${show ? "show d-block" : "d-none"}`} tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Post Details</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              {Object.entries(post).map(([key, value]) => (
                <div className="col-md-6 mb-3" key={key}>
                  <strong>
                    {key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}:
                  </strong>
                  <div>{renderValue(key, value)}</div>
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

export default PostDetailModal;
