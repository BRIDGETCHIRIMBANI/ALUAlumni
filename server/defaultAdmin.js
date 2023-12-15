const mongoose = require("mongoose");
require("dotenv").config();

// Assuming your Signup model schema is defined
const Signup = require("./Models/Signup");

// Function to create an admin user with default credentials
async function createDefaultAdmin() {
  try {
    // Check if an admin user already exists
    const existingAdmin = await Signup.findOne({ userType: 'admin' });

    // If an admin user doesn't exist, create one
    if (!existingAdmin) {
      const defaultAdminData = {
        fullName: "Admin",
        email: "admin@admin.com",
        password: admin,
        userType: "admin",
      };

      // Create a new admin user instance
      const newAdmin = new Signup({
        fullName: defaultAdminData.fullName,
        email: defaultAdminData.email,
        password: defaultAdminData.password,
        userType: defaultAdminData.userType,
      });

      // Save the new admin user to the database
      await newAdmin.save();
      console.log('Default admin user created successfully.');
    } else {
      console.log('Admin user already exists.');
    }
  } catch (error) {
    console.error('Error creating default admin user:', error.message);
  }
}

// Call the function to create the default admin user
createDefaultAdmin();
