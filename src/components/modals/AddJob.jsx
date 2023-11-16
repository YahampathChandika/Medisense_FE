import { Modal, Button, ButtonToolbar, Placeholder } from "rsuite";

// Updated function name to follow React component naming conventions
const AddJobModal = ({ onClose }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onClose(); // Call the onClose function passed as a prop to close the modal
  };

  return (
    <>
      <ButtonToolbar>
        {/* Updated onClick to open modal */}
        <Button onClick={handleOpen}>Open</Button>
      </ButtonToolbar>

      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Placeholder.Paragraph />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddJobModal;
