# 🛒 Campus Market — Online Marketplace for Students

![React](https://img.shields.io/badge/Frontend-React.js-61DAFB?logo=react&logoColor=white)
![Tailwind](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Framework-Express.js-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)

---

## 📌 Overview  
**Campus Market** is an **online marketplace platform** designed for college students where they can **sell** their used items and **buy** products from peers.  
It simplifies buying and selling within the campus community, ensuring affordability and convenience.

---

## ✨ Features  

### 🛍️ For Buyers  
- Browse items by category  
- Search and filter products  
- View item details with images & descriptions  

### 📦 For Sellers  
- Add products with name, price, description, and image  
- Manage listed items  
- Delete or update product details  

### 👤 User Features  
- Secure authentication using JWT  
- Personal dashboard for managing purchases and listings  
- Responsive UI for seamless experience across devices  

---

## 🛠 Tech Stack  

| **Category**      | **Technology** |
|--------------------|---------------|
| **Frontend**      | React.js, Tailwind CSS |
| **Backend**       | Node.js, Express.js |
| **Database**      | MongoDB |
| **Authentication**| JWT (JSON Web Token) |
| **Deployment**    | *(Optional: add if hosted)* |

---

## 📂 Folder Structure  

```bash
it_project/
├── client/                     # React frontend
│   ├── public/                 # Static files (favicon, index.html, logos)
│   ├── src/
│   │   ├── assets/             # Images, icons, fonts, etc.
│   │   ├── components/         # Reusable UI components
│   │   │   ├── common/         # Buttons, modals, loaders, etc.
│   │   │   ├── layout/         # Navbar, Sidebar, Footer
│   │   │   └── forms/          # Login, Signup, Product forms
│   │   ├── pages/              # All main pages (Home, Dashboard, Profile)
│   │   ├── context/            # React Context API (state management)
│   │   ├── services/           # API calls using Axios/Fetch
│   │   │   ├── authAPI.js      # Auth-related API requests
│   │   │   ├── productAPI.js   # Product-related API requests
│   │   │   └── userAPI.js      # User-related API requests
│   │   ├── hooks/              # Custom React hooks
│   │   ├── utils/              # Utility functions (validators, formatters)
│   │   ├── styles/             # Tailwind customization & global CSS
│   │   ├── App.js              # Main React component
│   │   ├── index.js            # React entry point
│   │   └── routes.js           # React Router configuration
│   ├── .env                    # Frontend environment variables
│   └── package.json            # Frontend dependencies
│
├── server/                     # Backend (Node.js + Express + MongoDB)
│   ├── config/                 # Configurations
│   │   ├── db.js               # MongoDB connection
│   │   └── cloudinary.js       # Image upload config (optional)
│   ├── controllers/            # Route logic (business layer)
│   │   ├── authController.js   # Auth functions
│   │   ├── productController.js# Product CRUD
│   │   ├── userController.js   # User profiles
│   │   └── orderController.js  # Orders (if implemented)
│   ├── middleware/             # Middleware
│   │   ├── authMiddleware.js   # JWT protection
│   │   ├── errorHandler.js     # Centralized error handling
│   │   └── uploadMiddleware.js # Image/file uploads
│   ├── models/                 # Mongoose models
│   │   ├── userModel.js        # User schema
│   │   ├── productModel.js     # Product schema
│   │   ├── orderModel.js       # Order schema
│   │   └── reviewModel.js      # Reviews (optional)
│   ├── routes/                 # API routes
│   │   ├── authRoutes.js       # Login, signup, JWT handling
│   │   ├── productRoutes.js    # Product APIs
│   │   ├── userRoutes.js       # User APIs
│   │   └── orderRoutes.js      # Orders APIs
│   ├── utils/                  # Helper functions
│   │   ├── generateToken.js    # JWT generation
│   │   ├── sendEmail.js        # Email service (optional)
│   │   └── logger.js           # Logging (optional)
│   ├── tests/                  # Unit & integration tests
│   ├── server.js               # Entry point
│   ├── .env                    # Backend environment variables
│   └── package.json            # Backend dependencies
│
├── .gitignore                  # Ignore node_modules, env, logs, etc.
├── README.md                   # Project documentation
└── LICENSE                     # License file

