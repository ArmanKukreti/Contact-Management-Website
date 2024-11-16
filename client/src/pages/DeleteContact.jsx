import React from 'react'
import CustomModal from '../components/CustomModal'
import { Button } from '@mui/material';
import axios from 'axios';

const DeleteContact = ({ data, open, onClose }) => {
    const handleDelete = async(contact) => {
        try {
            const response = await axios.delete(`/api/contact/${data._id}`)

            if (response.status === 200) {
                window.location.reload()
                console.log("Contact deleted successfully");

              } else {
                console.error("Failed to delete contact. Server returned:", response.status);
              }
            
        } catch (error) {
            console.error("An error occurred while deleting the contact:", error.message);
        }
    }

    const actions = (
        <>
            <Button color="primary" variant="outlined" onClick={onClose}>
                Cancel
            </Button>
            <Button color="error" variant="contained" onClick={() => handleDelete(data)}>
                Delete
            </Button>
        </>
    );

  return (
    <CustomModal title="Alert!" open={open} onClose={onClose} actions={actions}>
        Do you want to delete this contact?
    </CustomModal>
  )
}

export default DeleteContact
