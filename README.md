<div align="center">

# 📊 Product Management Dashboard

### Full-Stack Ready Admin Dashboard | React · TypeScript · Redux Toolkit · MUI

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Now-4F46E5?style=for-the-badge)](https://product-management-dashboard-webapp.vercel.app/dashboard)
[![Status](https://img.shields.io/badge/Status-Live_In_Production-brightgreen?style=for-the-badge)]()
[![Deployed on](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com)

</div>

---

## 📌 Project Overview

A **production-grade Product Management Dashboard** built with React, TypeScript, and Redux Toolkit — designed to give admins full control over product data through a clean, responsive interface.

The dashboard supports complete **CRUD operations** (Create, Read, Update, Delete), advanced **search & filtering**, **data visualisation with charts**, and is fully integrated with a **REST API** via Axios. The UI is built using **Material UI** with consistent theming throughout.

This project demonstrates real-world **dashboard architecture** commonly found in HRMS, CRM, and E-Commerce admin panels.

---

## 🌐 Live Demo

👉 **[https://product-management-dashboard-webapp.vercel.app/dashboard](https://product-management-dashboard-webapp.vercel.app/dashboard)**

---

## ✨ Key Features

### 📋 Product Management (Full CRUD)
- **Product listing** — paginated table/grid view with all product records
- **Add Product** — form with validation to create new product entries
- **Edit Product** — inline or modal-based editing of existing products
- **Delete Product** — confirmation-based deletion with state sync
- **Real-time UI updates** — state reflects changes instantly without page reload

### 🔍 Search & Filter
- **Live search** — filter products by name/keyword in real time
- **Category/status filters** — narrow down product lists efficiently
- **Pagination** — handles large datasets without performance degradation

### 📈 Analytics & Charts
- **Visual data representation** using Recharts / Chart.js
- **Product stats overview** — total products, categories, stock levels
- **Trend charts** — visual insights into product data

### 🎨 UI & UX
- **Material UI (MUI)** components with consistent theming
- **Responsive design** — works across desktop, tablet, and mobile
- **Loading states** — skeleton loaders and spinners during API calls
- **Error handling** — graceful error messages for failed API requests
- **Form validation** — React Hook Form with field-level error display

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React.js |
| Language | TypeScript |
| State Management | Redux Toolkit |
| UI Library | Material UI (MUI) |
| Data Fetching | Axios + REST API |
| Forms | React Hook Form |
| Charts | Recharts / Chart.js |
| Build Tool | Vite / Webpack |
| Deployment | Vercel |
| Version Control | Git & GitHub |

---

## 🏗️ Architecture & Key Technical Decisions

### Redux Toolkit for State Management
All product data is managed via Redux Toolkit slices — ensuring a single source of truth across the dashboard. CRUD operations dispatch actions that update the global store, keeping the UI in sync without prop drilling.
```typescript
// Product slice example
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => { ... },
    updateProduct: (state, action) => { ... },
    deleteProduct: (state, action) => { ... },
  }
});
```

### Axios for API Integration
All REST API calls are handled via Axios with a centralised instance — making it easy to add auth headers, interceptors, and error handling globally.
```typescript
// Centralised Axios instance
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json' }
});
```

### React Hook Form for Validation
Product add/edit forms use React Hook Form for performant, schema-based validation — minimising unnecessary re-renders during user input.
```typescript
const { register, handleSubmit, formState: { errors } } = useForm<ProductFormData>();
```

### MUI Theming
Custom MUI theme applied globally ensuring consistent colors, typography, and component styling across the entire dashboard.

---

## 📁 Project Structure
```
product-management-dashboard/
├── src/
│   ├── app/
│   │   └── store.ts                  # Redux store configuration
│   ├── features/
│   │   └── products/
│   │       ├── productSlice.ts       # Redux slice (CRUD actions)
│   │       ├── productAPI.ts         # Axios API calls
│   │       └── productTypes.ts       # TypeScript interfaces
│   ├── components/
│   │   ├── ProductTable.tsx          # Paginated product listing
│   │   ├── ProductForm.tsx           # Add/Edit form with validation
│   │   ├── SearchFilter.tsx          # Search & filter controls
│   │   ├── StatsCards.tsx            # Overview stat cards
│   │   ├── ProductChart.tsx          # Recharts data visualisation
│   │   └── DeleteConfirm.tsx         # Delete confirmation modal
│   ├── pages/
│   │   └── Dashboard.tsx             # Main dashboard page
│   ├── hooks/
│   │   └── useProducts.ts            # Custom hook for product data
│   ├── theme/
│   │   └── muiTheme.ts               # MUI custom theme config
│   └── utils/
│       └── apiClient.ts              # Centralised Axios instance
├── public/
└── README.md
```

---

## 🚀 Getting Started Locally
```bash
# Clone the repository
git clone https://github.com/Coader-Sasmi/product-management-dashboard-webapp.git

# Navigate into the project
cd product-management-dashboard-webapp

# Install dependencies
npm install

# Add environment variables
cp .env.example .env
# Add your API base URL in .env

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Environment Variables
```env
REACT_APP_API_URL=your_api_base_url_here
```

---

## 📊 What This Project Demonstrates

| Skill | How It's Shown |
|-------|---------------|
| **Redux Toolkit** | Global state for all CRUD operations |
| **TypeScript** | Typed components, interfaces, API responses |
| **REST API Integration** | Axios with error handling & loading states |
| **Component Architecture** | Reusable, single-responsibility components |
| **Form Handling** | React Hook Form with validation |
| **Data Visualisation** | Charts for product analytics |
| **Performance** | Pagination for large datasets, minimal re-renders |
| **UI Systems** | MUI theming with consistent design language |

---

## 💼 About This Project (For Recruiters)

This dashboard was built to demonstrate **real-world admin panel development** — the kind of work I do professionally for HRMS, CRM, and E-Commerce platforms.

Key engineering decisions made:
- Chose **Redux Toolkit** over Context API for predictable state management across multiple CRUD operations
- Used **React Hook Form** instead of controlled components to avoid performance issues on large forms
- Implemented **Axios interceptors** for centralised error handling rather than per-request try/catch
- Applied **MUI theming** at the root level for consistent UI across all components

This project directly mirrors the type of dashboard work I delivered at **Searching Yard Group** (HRMS, CRM, E-Commerce dashboards) and **Netsqure** (Event Management Platform with 3,000+ users).

---

<div align="center">

Built with ❤️ by **Sasmita Mahanta**

[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-6366F1?style=for-the-badge)](https://my-portfolio-website-blond-two.vercel.app/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/sasmita-mahanta-7b24801a7/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com/Coader-Sasmi)

</div>
