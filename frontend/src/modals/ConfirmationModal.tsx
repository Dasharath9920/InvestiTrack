import { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';

function ConfirmationModal({props}: any) {
   const { showModal, title, content, onOk, cancelText, okText } = props;
   const [open, toggle] = useState(showModal);

   const handleOk = () => {
      onOk();
      toggle(false);
   }

   useEffect(() => {
      toggle(props.showModal);
   },[props]);

  return (
    <Modal show={open} centered>
      <Modal.Body>
         <h5 className='mb-4'>{title}</h5>
         <p className='mb-5'>{content}</p>
         <div className='d-flex justify-content-end'>
            <Button variant="secondary" className='me-2' onClick={() => toggle(false)}>{cancelText}</Button>
            <Button variant="danger" onClick={handleOk}>{okText}</Button>
         </div>
      </Modal.Body>
    </Modal>
  )
}

export default ConfirmationModal;