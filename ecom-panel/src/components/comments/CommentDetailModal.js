import React from "react";

const CommentDetailModal = ({ comment, show, onClose }) => {
  if (!comment) return null;

  // Helper to format dates
  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className={`modal fade ${show ? "show d-block" : "d-none"}`} tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Comment Details</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6 mb-3">
                <strong>Comment:</strong>
                <div>{comment.comment || "—"}</div>
              </div>
              <div className="col-md-6 mb-3">
                <strong>User:</strong>
                <div>{comment.user?.name || "—"}</div>
              </div>
              <div className="col-md-6 mb-3">
                <strong>Post:</strong>
                <div>{comment.post?.title || "—"}</div>
              </div>
              <div className="col-md-6 mb-3">
                <strong>Created At:</strong>
                <div>{formatDate(comment.created_at)}</div>
              </div>
              <div className="col-md-6 mb-3">
                <strong>Updated At:</strong>
                <div>{formatDate(comment.updated_at)}</div>
              </div>
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

export default CommentDetailModal;
