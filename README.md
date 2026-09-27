# 🤖 AI Data Copilot

> An AI-powered full-stack platform for exploring, analyzing, and interacting with datasets using natural language.

AI Data Copilot is a web application designed to make data analysis easier by allowing users to upload datasets, explore their data, view analytics, and interact with their data through an AI-powered copilot.

🚧 **Status: In Active Development**

---

## ✨ Features

### 📊 Data Management

- Upload CSV, JSON, XLSX and XLS datasets
- Explore dataset information
- Dataset metadata and statistics
- Dataset management
- File validation and upload workflow

### 🤖 AI Copilot

- Ask questions about datasets using natural language
- AI-powered data insights
- Conversational data exploration
- Structured AI responses
- Dataset-aware analysis

### 📈 Analytics

- Dataset statistics
- Revenue metrics
- Order metrics
- Category analysis
- Data visualizations
- AI-generated insights
- Top-performing product analysis

### 🔐 Authentication

- User registration and login
- JWT-based authentication
- Protected API routes
- User-specific dataset access
- Password hashing

### 🎨 Modern Dashboard

- Responsive SaaS-style interface
- Dashboard
- AI Copilot
- Upload Data
- Analytics
- Settings
- Reusable UI components

---

## 🏗️ Architecture

```text
                         AI DATA COPILOT
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Frontend       │
                    │    React + Vite     │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │       Backend       │
                    │   Node.js + Express │
                    └──────────┬──────────┘
                               │
               ┌───────────────┼───────────────┐
               │               │               │
               ▼               ▼               ▼
          ┌─────────┐    ┌─────────────┐   ┌────────────┐
          │ MongoDB │    │ Data        │   │ AI / LLM   │
          │ / Atlas │    │ Processing  │   │ Layer      │
          └─────────┘    └─────────────┘   └────────────┘