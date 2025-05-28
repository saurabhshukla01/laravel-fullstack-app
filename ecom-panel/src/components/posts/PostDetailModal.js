import React from "react";

const PostDetailModal = ({ post, show, onClose }) => {
  if (!post) return null;

  const renderValue = (key, value) => {
    if (value === null || value === "") {
      return "—";
    }

    // Handle 'category' object
    if (key === "category" && typeof value === "object") {
      return value.name || "—";
    }

    // Handle 'user' object inside post
    if (key === "user" && typeof value === "object") {
      return value.name || "—";
    }

    // Handle generic object
    if (typeof value === "object") {
      return JSON.stringify(value);
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
              {Object.entries(post).map(([key, value]) => {
                if (key === "comments" && Array.isArray(value)) {
                  return (
                    <div className="col-12 mb-3" key={key}>
                      <strong>Comments:</strong>
                      <ul className="mt-2">
                        {value.map((comment, index) => (
                          <li key={index}>
                            <strong>{comment.user?.name || "Unknown User"}:</strong> {comment.comment}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }

                return (
                  <div className="col-md-6 mb-3" key={key}>
                    <strong>
                      {key
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}:
                    </strong>
                    <div>{renderValue(key, value)}</div>
                  </div>
                );
              })}
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
