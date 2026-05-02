import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Grid, Container, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box } from "@mui/material";
import MachineryRentalCard from "../components/MachineryRentalCard";
import HoldersModal from "../components/HoldersModal";
import AOS from "aos";
import "aos/dist/aos.css";
import toast from "react-hot-toast";
import config from "../config";

// Dummy data for testing
const dummyApplications = [
  {
    id: 1,
    title: "Excavator",
    category: ["Heavy Machinery", "Construction"],
    description: "A powerful excavator for heavy-duty tasks.",
    unitsAvailable: 5,
    unitsRented: 2,
    holders: ["user1", "user2", "user3"],
  },
  // Add more dummy data as needed
];

const ViewRentApplications = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [currApplicationId, setCurrApplicationId] = useState(null);

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    quantity_available: "",
    category: "",
  });
  const [formErrors, setFormErrors] = useState({
    title: false,
    description: false,
    quantity_available: false,
    category: false,
  });

  const fetchApplications = async () => {
    // Simulate fetching applications with dummy data
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      };

      const results = await axios.get(
        (process.env.BACKEND_API || "http://localhost:8000") +
          `/view-rent-applications/`,
        { headers }
      );

      setApplications(results.data.applications);
      
      // console.log(results.data);
      // console.log("Form submitted:", response.data);
      // toast.success("Application deleted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error deleting application. Please try again.");
    }

    // setApplications(dummyApplications);
  };

  const handleShowHolders = (application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  const handleFormChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {
      title: !formValues.title,
      description: !formValues.description,
      quantity_available: formValues.quantity_available <= 0,
      category: !formValues.category,
    };
    setFormErrors(errors);
    return !Object.values(errors).includes(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        };

        const results = await axios.post(
          (config.BACKEND_API || "http://localhost:8000") +
            `/update-rent-application/${currApplicationId}`,
          formValues,
          { headers }
        );

        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app.rent_id === currApplicationId
              ? {
                  ...app,
                  title: formValues.title,
                  description: formValues.description,
                  quantity_available: formValues.quantity_available,
                  category: formValues.category,
                }
              : app
          )
        );

        setFormValues({
          title: "",
          description: "",
          quantity_available: "",
          category: "",
        });

        toast.success("Application updated successfully!");
        handleFormClose();
      } catch (error) {
        console.error("Error updating application:", error);
        toast.error("Error updating application. Please try again.");
        handleFormClose();
      }
    }
  };

  const handleEdit = (application) => {
    setFormOpen(true);
    setCurrApplicationId(application.rent_id);
    setFormValues({
      title: application.title,
      description: application.description,
      quantity_available: application.quantity_available,
      category: Array.isArray(application.category) ? application.category.join(", ") : application.category,
    });
  };
  const handleDelete = async (application_id)=>{
    console.log(application_id);
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      };

      const results = await axios.get(
        (process.env.BACKEND_API || "http://localhost:8000") +
          `/delete-rent-application/${application_id}`,
        { headers }
      );

      setApplications((apps) =>
        apps.filter((app) => app.rent_id !== application_id)
      );

      console.log("Form submitted:", results.data);
      // toast.success("Application deleted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error deleting application. Please try again.");
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleUnitsAvailableChange = (updatedApplication) => {
    setApplications((prevApplications) =>
      prevApplications.map((app) =>
        app.id === updatedApplication.id ? updatedApplication : app
      )
    );
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });

    fetchApplications();
  }, []);

  return (
    <>
      <Container sx={{ pt: "5em" }}>
        <Grid container spacing={4}>
          {applications.map((app) => (
            <Grid item xs={12} key={app.id} data-aos="fade-up">
              <MachineryRentalCard
                title={app.title}
                category={app.category}
                description={app.description}
                unitsAvailable={app.quantity_available                }
            
                onShowHolders={() => handleShowHolders(app)}
                onEdit = {()=> handleEdit(app)}
                onDelete = {()=> handleDelete(app.rent_id)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {selectedApplication && (
        <HoldersModal
          open={isModalOpen}
          onClose={handleModalClose}
          application={selectedApplication}
          onUnitsAvailableChange={handleUnitsAvailableChange}
        />
      )}

      <Dialog open={formOpen} onClose={handleFormClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Rental Application</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleFormSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              padding: 3,
            }}
          >
            <TextField
              label="Title"
              name="title"
              type="text"
              value={formValues.title}
              onChange={handleFormChange}
              fullWidth
              error={formErrors.title}
              helperText={formErrors.title && "This field is required"}
            />
            <TextField
              label="Description"
              name="description"
              type="text"
              value={formValues.description}
              onChange={handleFormChange}
              fullWidth
              error={formErrors.description}
              helperText={formErrors.description && "This field is required"}
            />
            <TextField
              label="Quantity Available"
              name="quantity_available"
              type="number"
              value={formValues.quantity_available}
              onChange={handleFormChange}
              fullWidth
              error={formErrors.quantity_available}
              helperText={
                formErrors.quantity_available &&
                "This field is required and must be greater than 0"
              }
            />
            <TextField
              label="Category"
              name="category"
              type="text"
              value={formValues.category}
              onChange={handleFormChange}
              fullWidth
              error={formErrors.category}
              helperText={formErrors.category && "This field is required"}
            />
            <DialogActions>
              <Button type="submit" color="primary">
                Submit
              </Button>
              <Button onClick={handleFormClose} color="secondary">
                Cancel
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewRentApplications;
