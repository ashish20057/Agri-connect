# Agri-Connect

A comprehensive digital platform connecting agricultural professionals, machinery owners, and farmers. Agri-Connect facilitates hiring of agricultural workers, renting farm machinery, and provides AI-powered plant disease detection capabilities.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Plant Disease Detection](#plant-disease-detection)
- [Database Models](#database-models)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [License](#license)

## 🌾 Overview

Agri-Connect is a full-stack web application designed to bridge the gap between agricultural workers, machinery owners, and farmers. The platform enables:

- **Worker Hiring**: Post job opportunities and manage worker applications
- **Machinery Rental**: Rent or offer farm equipment and machinery
- **Plant Disease Detection**: AI-powered image recognition to identify plant diseases
- **User Profiles**: Comprehensive user management with ratings and reviews
- **Email Notifications**: Automated notifications for applications and rentals

## ✨ Features

### Worker Hiring & Management
- Post agricultural work opportunities
- Browse and apply for job positions
- Track work applications with status updates
- Rate and review worker performance
- Accept/reject applications with notifications

### Machinery Rental System
- List machinery available for rent
- Browse and filter equipment by type
- View rental terms and pricing
- Manage rental applications
- Track rental history

### Plant Disease Detection
- Upload plant images for disease detection
- AI-powered classification using deep learning
- Instant disease diagnosis and recommendations
- Support for multiple plant types and diseases
- Image preprocessing and model inference

### User Management
- User registration and authentication
- Role-based access (Worker, Equipment Owner, Farmer)
- Profile customization
- Rating and review system
- Email verification

## 🛠 Tech Stack

### Frontend
- **React.js** - UI framework
- **CSS3** - Styling
- **JavaScript** - Core language
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Nodemailer** - Email service

### Machine Learning
- **Python** - ML scripting
- **PyTorch** - Deep learning framework
- **ONNX** - Model format for inference
- **Flask** - Python web framework (optional)

## 📁 Project Structure

The project is organized into three main directories:

**Client (Frontend)**
- Contains the React-based user interface
- Includes reusable UI components for common elements like navigation and cards
- Page components for different sections: Home, Login, Registration, Profiles, Work Applications, Machinery Rentals, and Plant Disease Detection
- Context system for managing authentication state
- Stylesheet organization for consistent styling across the application

**Server (Backend)**
- Express.js web server handling all API requests
- Configuration modules for authentication, JWT management, database connections, and email service
- Business logic controllers for hiring and machinery rental features
- Database models defining schemas for users, work applications, machinery rentals, and hirings
- Email notification system with templates for various user actions
- Plant disease detection routes for image upload and processing

**Plant Disease Classifier (Machine Learning)**
- Deep learning models for plant disease identification
- Model files in both PyTorch and ONNX formats for cross-platform compatibility
- Sample images and image preprocessing utilities
- Model configuration and class name mappings
- Python-based inference engine for disease detection

**Configuration Files**
- Package management files for dependencies
- Presentation generation scripts
- Documentation and guide files

## 🚀 Installation

The application consists of three main components that need to be installed:

### Prerequisites
Before starting, ensure you have:
- Node.js installed (v14 or higher) for JavaScript/React development
- Python installed (v3.8 or higher) for machine learning components
- MongoDB database setup (local or cloud instance like MongoDB Atlas)
- Git for version control

### Frontend Setup
The React-based client application needs to be installed in the `client` directory with all dependencies, followed by starting the development server. The frontend will be accessible through a local development port.

### Backend Setup
The Node.js/Express backend server requires dependency installation in the `server` directory. You'll need to configure environment variables for database connection, JWT authentication, and email service settings. Once configured, the server can be started and will listen on a specified port.

### ML Model Setup
The plant disease detection model is located in the `Plant-Disease-Classifier-main` directory. Install Python dependencies and start the machine learning service. This will enable image processing and disease classification features.

## 📱 Usage

### For Workers
1. Register/Login as a Worker
2. Browse available work opportunities
3. Apply for positions matching your skills
4. Track application status
5. View profile and ratings

### For Equipment Owners
1. Register/Login as Equipment Owner
2. List machinery/equipment for rent
3. Set rental terms and pricing
4. Manage rental applications
5. Track rental history

### For Farmers
1. Register/Login as Farmer
2. Post agricultural work opportunities or upload plant images
3. Use plant disease detection feature
4. Manage applications and rentals
5. Rate workers and equipment

## 🌱 Plant Disease Detection

The application features an intelligent plant disease detection system that leverages advanced machine learning technology. This system is powered by deep learning models trained on extensive plant disease datasets, enabling accurate and reliable disease identification.

The disease detection process involves uploading a plant image through the user interface, which is then processed using advanced image preprocessing techniques. The system applies various transformations to ensure optimal model performance. The processed image is analyzed by the trained neural network model, which has been optimized and deployed in ONNX format for efficient cross-platform inference. Results are returned with confidence scores for each possible disease classification, and the system provides actionable recommendations based on the detected disease type.

### Technology Stack
- **PyTorch Model**: Deep learning neural network trained on plant disease datasets
- **ONNX Format**: Cross-platform model deployment for broad compatibility
- **Image Processing**: Advanced preprocessing for enhanced detection accuracy
- **Classification**: Multi-class disease identification with confidence scoring

## 💾 Database Models

### User Model
- Email, password (hashed)
- Profile information
- User type (Worker, Owner, Farmer)
- Ratings and reviews
- Verification status

### Work Application Model
- Applicant details
- Position details
- Application status
- Timestamps

### Rent Machinery Model
- Equipment details
- Owner information
- Rental terms and pricing
- Availability calendar

### Hirer-Worker Model
- Hiring records
- Worker performance data
- Payment information
- Ratings and feedback

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for secure authentication:

- Tokens are issued on login
- Tokens include user ID and role
- Middleware validates tokens on protected routes
- Automatic token refresh mechanism
- Secure password hashing using bcrypt

## 🤝 Contributing

Contributions are welcome! Whether you're fixing bugs, adding new features, or improving documentation, your help is appreciated. To contribute:

1. Fork the repository on GitHub
2. Create a new branch for your feature or bugfix
3. Make your changes and test thoroughly
4. Commit your changes with clear, descriptive messages
5. Push your changes to your fork
6. Open a Pull Request with a detailed description of your changes

Please ensure your code follows the project's existing patterns and includes appropriate documentation.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact & Support

For support or inquiries, please reach out to the development team.

---

**Made with ❤️ for the agricultural community**