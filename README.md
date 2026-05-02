# Agri-Connect

A comprehensive digital platform connecting agricultural professionals, machinery owners, and farmers. Agri-Connect facilitates hiring of agricultural workers, renting farm machinery, and provides AI-powered plant disease detection capabilities.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
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

```
Agri-Connect/
├── client/                          # Frontend React application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ApplicationCard.jsx
│   │   │   ├── MachineryRentalCard.jsx
│   │   │   └── ...
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── WorkApplications.jsx
│   │   │   ├── RentApplications.jsx
│   │   │   ├── DetectDisease.jsx
│   │   │   └── ...
│   │   ├── context/                 # React Context for state
│   │   │   └── auth.jsx
│   │   ├── CSS/                     # Stylesheets
│   │   └── App.js
│   └── package.json
│
├── server/                          # Backend Express application
│   ├── config/                      # Configuration files
│   │   ├── authMiddleware.js
│   │   ├── jwtConfig.js
│   │   ├── jwtUtils.js
│   │   ├── mongoose.js
│   │   └── nodemailer.js
│   ├── controller/                  # Business logic
│   │   ├── hiring.js
│   │   ├── renting.js
│   │   └── index.js
│   ├── models/                      # Database schemas
│   │   ├── user.js
│   │   ├── work_application.js
│   │   ├── rent_machinery.js
│   │   └── hirer_worker.js
│   ├── routes/                      # API routes
│   │   ├── index.js
│   │   └── detection.js
│   ├── mailer/                      # Email templates
│   │   ├── application_accepted.js
│   │   ├── worker_rating.js
│   │   └── ...
│   ├── mailTemplates/               # EJS email templates
│   │   └── *.ejs files
│   ├── server.js
│   ├── predict.py
│   └── package.json
│
├── Plant-Disease-Classifier-main/   # ML model directory
│   ├── app.py
│   ├── plant_disease_classifier.py
│   ├── models/
│   │   ├── best_model.pth           # PyTorch model
│   │   ├── plant_disease_model.onnx
│   │   ├── class_names.json
│   │   └── model_config.json
│   ├── sample_images/
│   └── requirements.txt
│
├── generate_presentation.py         # Presentation generator script
├── package.json
├── PRESENTATION_GUIDE.md
└── README.md
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- MongoDB (local or cloud instance)
- Git

### Frontend Setup

```bash
cd client
npm install
npm start
```

The frontend will run on `http://localhost:3000`

### Backend Setup

```bash
cd server
npm install
```

Configure environment variables in a `.env` file:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_SERVICE=your_email_service
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
NODE_ENV=development
PORT=5000
```

Start the server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### ML Model Setup

```bash
cd Plant-Disease-Classifier-main
pip install -r requirements.txt
python app.py
```

The ML service will run on `http://localhost:5001` (or specified port)

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

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Work Applications
- `GET /api/work` - Get all work opportunities
- `POST /api/work` - Create work opportunity
- `GET /api/work/:id` - Get specific work
- `POST /api/work/:id/apply` - Apply for work
- `GET /api/applications` - Get user applications
- `PATCH /api/applications/:id` - Update application status

### Machinery Rental
- `GET /api/machinery` - Get all machinery
- `POST /api/machinery` - Add machinery
- `GET /api/machinery/:id` - Get specific machinery
- `POST /api/machinery/:id/rent` - Rent machinery
- `GET /api/rentals` - Get user rentals
- `PATCH /api/rentals/:id` - Update rental status

### Plant Disease Detection
- `POST /api/detect` - Upload image and detect disease
- `GET /api/detection/history` - Get detection history

### User Management
- `GET /api/user/profile` - Get user profile
- `PATCH /api/user/profile` - Update profile
- `POST /api/user/rate` - Rate a user

## 🌱 Plant Disease Detection

The application includes an AI-powered plant disease detection system using:

- **PyTorch Model**: Deep learning model trained on plant disease datasets
- **ONNX Format**: Cross-platform model deployment
- **Image Processing**: Preprocessing for accurate detection
- **Classification**: Multi-class disease identification

### How It Works

1. User uploads a plant image
2. Image is preprocessed (resizing, normalization)
3. ONNX model performs inference
4. Results are returned with confidence scores
5. Recommendations are provided based on detected disease

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

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact & Support

For support or inquiries, please reach out to the development team.

---

**Made with ❤️ for the agricultural community**