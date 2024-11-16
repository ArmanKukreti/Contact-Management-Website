import User from "../models/user.model.js";

export const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, company, jobTitle } =
      req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !company ||
      !jobTitle
    ) {
      return res.status(422).json({ message: "Please fill all the fields" });
    }

    if (!emailRegex.test(email)) {
      return res.status(422).json({ error: "Invalid Email format" });
    }

    if (!phoneRegex.test(phoneNumber)) {
      return res.status(422).json({ error: "Invalid Phone Number" });
    }

    const newEmail = email.toLowerCase();

    const isDuplicate = await User.findOne({
      $or: [{ email: newEmail }, { phoneNumber: phoneNumber }],
    });

    if (isDuplicate) {
      return res.status(422).json({ error: "Contact already saved" });
    }

    const user = req.user;

    const newContact = {
      firstName,
      lastName,
      email: newEmail,
      phoneNumber,
      company,
      jobTitle,
    };

    user.contacts.push(newContact);
    await user.save();

    return res
      .status(201)
      .json({ message: "Contact created successfully", contact: newContact });
  } catch (error) {
    console.error("Error creating contact:", error);
    return res.status(500).json({ message: "Error creating contact" });
  }
};

export const getContacts = async (req, res) => {
  try {
    const user = req.user;

    if (!user || !user.contacts) {
      return res.status(404).json({ message: "No contacts found" });
    }

    const userContacts = req.user.contacts;

    res.status(200).json(userContacts);
  } catch (error) {
    console.error("Error in getting contacts:", error);
    return res.status(500).json({ message: "Error fetching contact" });
  }
};

export const editContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const { firstName, lastName, email, phoneNumber, company, jobTitle } =
      req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (email && !emailRegex.test(email)) {
      return res.status(422).json({ error: "Invalid Email format" });
    }

    if (phoneNumber && !phoneRegex.test(phoneNumber)) {
      return res.status(422).json({ error: "Invalid Phone Number" });
    }

    const user = req.user;
    const contact = user.contacts.find((c) => c._id.toString() === contactId);

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    if (firstName) contact.firstName = firstName;
    if (lastName) contact.lastName = lastName;
    if (email) contact.email = email.toLowerCase();
    if (phoneNumber) contact.phoneNumber = phoneNumber;
    if (company) contact.company = company;
    if (jobTitle) contact.jobTitle = jobTitle;

    await user.save();

    return res
      .status(200)
      .json({ message: "Contact modified successfully", user });
  } catch (error) {
    console.error("Error editing contact:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while modifying the contact" });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    const user = req.user;
    const contactIndex = user.contacts.find(
      (c) => c._id.toString() === contactId
    );

    if (contactIndex === -1) {
      return res.status(404).json({ error: "Contact not found" });
    }

    user.contacts.splice(contactIndex, 1);

    await user.save();

    return res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the contact" });
  }
};
