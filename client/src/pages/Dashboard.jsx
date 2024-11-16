import React, { useContext, useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Box,
  IconButton,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import AddContact from "./AddContact";
import EditContact from "./EditContact";
import DeleteContact from "./DeleteContact";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "id", name: "Id" },
  { id: "f_name", name: "First Name" },
  { id: "l_name", name: "Last Name" },
  { id: "email", name: "Email" },
  { id: "phone", name: "Phone Number" },
  { id: "company", name: "Company" },
  { id: "job", name: "Job Title" },
  { id: "actions", name: "Actions" },
];

const Dashboard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]); // State for filtered contacts
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [error, setError] = useState("");
  const [popup, setPopup] = useState(false);
  const [editContact, setEditContact] = useState(null);
  const [deleteContact, setDeleteContact] = useState(null);

  const openPopup = () => {
    setPopup(true);
  };

  const closePopup = () => {
    setPopup(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditContact = (contact) => {
    setEditContact(contact);
  };

  const handleCloseEdit = () => {
    setEditContact(null);
  };

  const handleDeleteContact = (contact) => {
    setDeleteContact(contact);
  };

  const handleCloseDelete = () => {
    setDeleteContact(null);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = contacts.filter((contact) =>
      Object.values(contact).some((value) =>
        String(value).toLowerCase().includes(query)
      )
    );
    setFilteredContacts(filtered);
  };

  const { currentUser } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    if(!currentUser) {
      navigate('/register')
    }

    const fetchContacts = async () => {
      try {
        const response = await axios.get("/api/contact/", {
          withCredentials: true,
        });

        setContacts(response.data);
        setFilteredContacts(response.data); // Initialize filtered contacts
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setError(error.response.data.error);
        } else {
          setError(
            "An error occurred while fetching contacts. Please try again later."
          );
        }
      }
    };

    fetchContacts();
  }, []);

  let count = 1;

  return (
    <div style={{ textAlign: "center" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "90%",
          margin: "100px auto 0 auto",
          paddingBottom: 2,
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{ margin: 0, textAlign: "left" }}
        >
          Contact List
        </Typography>

        {/* Search Bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <TextField
            variant="outlined"
            label="Search Contacts"
            value={searchQuery}
            onChange={handleSearch}
          />

          <Button
            variant="contained"
            color="primary"
            sx={{
              textTransform: "none",
              whiteSpace: "nowrap",
            }}
            onClick={openPopup}
          >
            Add Contact +
          </Button>
        </Box>

        <AddContact popup={popup} closePopup={closePopup} />
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Paper sx={{ width: "90%", margin: "0 auto" }}>
        <TableContainer sx={{ maxHeight: 450 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ backgroundColor: "black", color: "white" }}
                    colSpan={column.id === "actions" ? 2 : 1}
                    sx={{
                      textAlign: column.id === "actions" ? "center" : "left",
                    }}
                  >
                    {column.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredContacts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((data) => (
                  <TableRow key={data.email}>
                    <TableCell>{count++}</TableCell>
                    <TableCell>{data.firstName}</TableCell>
                    <TableCell>{data.lastName}</TableCell>
                    <TableCell>{data.email}</TableCell>
                    <TableCell>{data.phoneNumber}</TableCell>
                    <TableCell>{data.company}</TableCell>
                    <TableCell>{data.jobTitle}</TableCell>
                    <TableCell>
                      <Box display="flex" justifyContent="center" gap={1}>
                        <IconButton
                          color="primary"
                          onClick={() => handleEditContact(data)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteContact(data)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredContacts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {editContact && (
        <EditContact
          data={editContact}
          onClose={handleCloseEdit}
          open={editContact ? true : false}
        />
      )}

      {deleteContact && (
        <DeleteContact
          data={deleteContact}
          onClose={handleCloseDelete}
          open={deleteContact ? true : false}
        />
      )}
    </div>
  );
};

export default Dashboard;
