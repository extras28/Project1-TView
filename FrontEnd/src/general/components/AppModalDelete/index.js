import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import AppResource from "../../constants/AppResource";
import AppButton from "../AppButton";

AppDeleteModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  deleteItem: PropTypes.func,
  deleteTitle: PropTypes.string,
  deleteText: PropTypes.string,
  icon: PropTypes.element
};

AppDeleteModal.defaultProps = {
  show: null,
  onClose: null,
  deleteItem: null,
  deleteTitle: null,
  deleteText: null,
  icon: (<div></div>)
};

function AppDeleteModal(props) {

  const { show, onClose, deleteItem, deleteTitle, deleteText, icon } = props;

  function handleClose() {
    if (onClose) {
      onClose();
    }
  }

  function handleDeleteItem() {
    if (deleteItem) {
      deleteItem();
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered size="md" className="p-0">
      {/* modal header */}
      <Modal.Header className="d-flex align-items-center justify-content-center">
        <span className="font-weight-bolder">{deleteTitle}</span>
      </Modal.Header>

      {/* modal content */}
      <Modal.Body className="d-flex flex-column align-items-center justify-content-center bg-light py-0">
        {deleteTitle=='Đăng xuất'
        ?icon
        :<img
          className="py-5 my-2"
          src={AppResource.icons.icTrash}
          alt="delete icon"
        />}
        <p className="font-weight-bold pb-2">{deleteText}</p>
      </Modal.Body>

      {/* modal footer */}
      <Modal.Footer className="d-flex flex-row align-items-center justify-content-center py-2 flex-nowrap ">
        <AppButton
          className="btn-grey mr-3"
          text="Hủy"
          onClick={handleClose}
          width="47%"
        />
        <AppButton
          className="btn-red ml-3"
          text="Xác nhận"
          onClick={() => {
            handleClose();
            handleDeleteItem();
          }}
          width="47%"
        />
      </Modal.Footer>
    </Modal>
  );
}

export default AppDeleteModal;
