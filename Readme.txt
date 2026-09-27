AI DATA COPILOT — SHARED PROJECT CONTEXT

Version: 1.0 Purpose: Shared source of truth for the AI_Data_Copilot
ChatGPT Project Status: Frontend complete / Backend starting

============================================================ 1. PROJECT
GOAL ============================================================

AI Data Copilot is an AI-powered web application that allows users to:

-   Upload CSV, JSON, XLSX/XLS datasets
-   Explore dataset information
-   Ask questions about their data in natural language
-   Generate AI-powered insights
-   View analytics and visualizations
-   Manage datasets and user settings

The final application will have:

Frontend: React + Vite

Backend: Node.js + Express

Database: MongoDB / MongoDB Atlas

Authentication: JWT

Data processing: CSV / JSON / Excel processing

AI layer: LLM + data analysis + RAG/agent architecture as required

============================================================ 2. CURRENT
PROJECT STRUCTURE
============================================================

AI_Data_Copilot/ | |– backend/ | |– node_modules/ | |– package-lock.json
| |– package.json | -- server.js | |-- frontend/ |– app/ | |– src/ | |–
assets/ | | | |– components/ | | |– Sidebar.jsx | | |– Header.jsx | | |–
StatCard.jsx | | |– DataTable.jsx | |
-- ChatMessage.jsx |           | |           |-- pages/ |           |   |-- Login.jsx |           |   |-- Dashboard.jsx |           |   |-- Copilot.jsx |           |   |-- UploadData.jsx |           |   |-- Analytics.jsx |           |–
Settings.jsx | | | |– App.jsx | |– App.css | |– index.css |
-- main.jsx |– README.txt

============================================================ 3. FRONTEND
TECHNOLOGY ============================================================

-   React
-   Vite
-   React Router
-   JavaScript / JSX
-   CSS
-   Local React state for current mock behavior

React Router routes:

/login -> Login / -> Dashboard /copilot -> AI Copilot /upload -> Upload
Data /analytics -> Analytics /settings -> Settings

============================================================ 4. FRONTEND
STATUS ============================================================

The frontend UI is substantially complete and visually polished.

Design direction:

-   Modern SaaS dashboard
-   Blue / purple / white color palette
-   Light gray application background
-   Rounded cards
-   Soft borders and shadows
-   Fixed sidebar
-   Top header
-   Responsive layout
-   AI-focused visual language

The frontend should NOT be redesigned unnecessarily during backend
integration. Existing UI should be preserved unless an API response
requires a small integration change.

============================================================ 5. FRONTEND
COMPONENTS ============================================================

Sidebar.jsx

Navigation:

-   Dashboard
-   AI Copilot
-   Upload Data
-   Analytics
-   Settings

Also contains:

-   AI Data Copilot branding
-   Upgrade card
-   User information
-   Logout UI

Header.jsx

Contains:

-   Dynamic page title
-   Page subtitle
-   Search UI
-   Notification UI
-   User avatar

Titles are based on the current route.

StatCard.jsx

Reusable dashboard statistic card.

Current mock metrics include:

-   Total Datasets
-   Total Rows
-   AI Queries
-   Insights Generated

DataTable.jsx

Mock recent dataset table.

Current sample datasets:

-   Sales Data
-   Customer Data
-   Marketing Data
-   Product Data

ChatMessage.jsx

Reusable AI/user chat message component.

Supports:

-   AI messages
-   User messages
-   Avatar
-   Timestamp

============================================================ 6. FRONTEND
PAGES ============================================================

LOGIN

Current behavior:

-   Email input
-   Password input
-   Remember me UI
-   Forgot password UI
-   Google sign-in UI
-   Create account UI
-   Sign-in currently navigates to Dashboard

IMPORTANT: Real authentication is NOT implemented yet.

DASHBOARD

Current sections:

-   Welcome banner
-   Dataset statistics
-   Data activity chart
-   AI Copilot card
-   Quick Actions
-   Recent Datasets

Current dashboard data is mock data.

AI COPILOT

Current behavior:

-   Dataset selector
-   Chat interface
-   User messages
-   AI messages
-   Suggested prompts
-   Mock analysis response
-   Revenue / Growth / Orders result card
-   Chat input

Current AI response is MOCKED.

No real LLM/API call exists yet.

UPLOAD DATA

Supported frontend file types:

-   CSV
-   JSON
-   XLSX
-   XLS

Frontend validation:

-   File extension/type validation
-   Maximum size: 50 MB
-   Drag and drop
-   Browse file
-   Selected-file preview
-   Mock upload progress
-   Dataset list

IMPORTANT: Actual server upload and data processing are NOT implemented
yet.

ANALYTICS

Current sections:

-   Total Revenue
-   Total Orders
-   Average Order
-   Conversion Rate
-   Revenue Overview chart
-   Sales by Category donut
-   AI Generated Insight
-   Top Performing Products
-   Date-range UI
-   Export UI

Current data is MOCKED.

SETTINGS

Current sections:

-   Profile
-   Full name
-   Email
-   Preferences
-   Email notifications
-   AI suggestions
-   Weekly analytics
-   Appearance
-   Light / Dark / System UI
-   Security
-   Password UI
-   Active sessions UI
-   Danger Zone
-   Delete account UI

IMPORTANT: These are currently frontend UI/mock controls. Backend
persistence is not connected yet.

============================================================ 7.
IMPORTANT FRONTEND RULES
============================================================

1.  Do not destroy the current visual design while integrating APIs.
2.  Keep reusable components where possible.
3.  Keep API calls separate from presentation logic.
4.  Use environment variables for API base URLs.
5.  Do not hard-code secrets.
6.  Backend URLs should eventually come from VITE_API_URL.
7.  Authentication state should eventually be centralized.
8.  Dataset IDs should be used instead of dataset names for API calls.
9.  Loading, success and error states should be added during
    integration.
10. Never expose API keys or database credentials in frontend code.

============================================================ 8. BACKEND
TARGET ARCHITECTURE
============================================================

Backend target stack:

Node.js Express MongoDB / MongoDB Atlas Mongoose JWT bcrypt dotenv CORS
Multer or equivalent upload middleware

Potential data-processing libraries:

-   csv parsing library
-   xlsx/excel parser
-   JSON parser
-   pandas/Python microservice only if later required for advanced
    analysis

Initial backend architecture:

backend/ | |– server.js |– package.json | |– config/ |
-- db.js | |-- models/ |   |-- User.js |   |-- Dataset.js |   |-- Query.js |–
Analysis.js | |– controllers/ | |– authController.js | |–
datasetController.js | |– copilotController.js |
-- analyticsController.js | |-- routes/ |   |-- authRoutes.js |   |-- datasetRoutes.js |   |-- copilotRoutes.js |–
analyticsRoutes.js | |– middleware/ | |– authMiddleware.js | |–
errorMiddleware.js |
-- uploadMiddleware.js | |-- services/ |   |-- authService.js |   |-- datasetService.js |   |-- analysisService.js |   |-- llmService.js |–
copilotService.js | |– utils/ | |– fileParser.js | |– dataAnalyzer.js |
-- validators.js |– uploads/

============================================================ 9. BACKEND
DEVELOPMENT ORDER
============================================================

Build backend in this order:

PHASE B1

Express server foundation

-   Express setup
-   dotenv
-   CORS
-   JSON middleware
-   Error handling
-   Health check

Example:

GET /api/health

PHASE B2

MongoDB connection

-   MongoDB Atlas
-   Mongoose
-   DB configuration
-   Environment variables

PHASE B3

User authentication

-   User model
-   Register
-   Login
-   JWT
-   Password hashing
-   Authentication middleware

PHASE B4

Dataset management

-   Upload dataset
-   Store dataset metadata
-   Dataset ownership
-   Dataset listing
-   Dataset details
-   Delete dataset

PHASE B5

File processing

Support:

-   CSV
-   JSON
-   XLSX/XLS

Process uploaded files into a normalized representation.

Store metadata such as:

-   filename
-   file type
-   file size
-   row count
-   column count
-   columns
-   owner
-   createdAt
-   status

PHASE B6

Analytics API

Generate:

-   Revenue metrics
-   Order metrics
-   Category metrics
-   Aggregations
-   Trends
-   Dataset statistics

PHASE B7

AI Copilot

Request:

-   datasetId
-   user question

Pipeline:

User question | v Dataset retrieval | v Data understanding / analysis |
v LLM | v Structured response | v Frontend

PHASE B8

Frontend-backend integration

Replace mock frontend data with API calls.

PHASE B9

Production hardening

-   validation
-   security
-   rate limiting
-   logging
-   error handling
-   file limits
-   authentication checks
-   environment configuration

============================================================ 10. INITIAL
API CONTRACT
============================================================

AUTH

POST /api/auth/register

Request: { “name”: “Keshav Pal”, “email”: “user@example.com”,
“password”: “password” }

Response: { “success”: true, “message”: “User registered successfully” }

POST /api/auth/login

Request: { “email”: “user@example.com”, “password”: “password” }

Response should eventually contain:

{ “success”: true, “token”: “…”, “user”: { “id”: “…”, “name”: “…”,
“email”: “…” } }

GET /api/auth/me

Requires JWT.

Returns current authenticated user.

DATASETS

POST /api/datasets/upload

Requires JWT.

Multipart form-data:

file=

GET /api/datasets

Requires JWT.

Returns current user’s datasets.

GET /api/datasets/:id

Requires JWT.

Returns dataset details.

DELETE /api/datasets/:id

Requires JWT.

Deletes user’s dataset.

COPILOT

POST /api/copilot/query

Requires JWT.

Request:

{ “datasetId”: “…”, “question”: “Show me the key trends in my sales
data” }

Expected response shape:

{ “success”: true, “answer”: “…”, “insights”: [], “metrics”: {},
“visualization”: null }

ANALYTICS

GET /api/analytics/:datasetId

Requires JWT.

Expected response:

{ “success”: true, “metrics”: {}, “revenue”: [], “categories”: [],
“products”: [], “insights”: [] }

============================================================ 11.
FRONTEND <-> BACKEND MAPPING
============================================================

LOGIN

Login.jsx

        |
        v

POST /api/auth/login

UPLOAD

UploadData.jsx

        |
        v

POST /api/datasets/upload

DATASET LIST

Dashboard.jsx / UploadData.jsx

        |
        v

GET /api/datasets

COPILOT

Copilot.jsx

        |
        v

POST /api/copilot/query

ANALYTICS

Analytics.jsx

        |
        v

GET /api/analytics/:datasetId

SETTINGS

Settings.jsx

Eventually:

GET /api/auth/me PATCH /api/users/me PATCH /api/users/preferences

============================================================ 12.
DATABASE MODELS — INITIAL PLAN
============================================================

USER

Fields:

_id name email passwordHash preferences createdAt updatedAt

DATASET

Fields:

_id userId name originalFileName fileType fileSize rowCount columnCount
columns storagePath status createdAt updatedAt

QUERY

Fields:

_id userId datasetId question answer createdAt

ANALYSIS

Fields:

_id datasetId type result createdAt

The exact schema can evolve during implementation.

============================================================ 13.
AUTHENTICATION ARCHITECTURE
============================================================

Target flow:

Register | v Password hashed with bcrypt | v MongoDB

Login | v Verify password | v Create JWT | v Frontend stores
authentication state | v Protected API requests include JWT

Protected backend route:

Authorization: Bearer

IMPORTANT: JWT secret must ONLY exist in backend environment variables.

============================================================ 14. FILE
UPLOAD ARCHITECTURE
============================================================

Frontend:

User selects file | v FormData | v POST /api/datasets/upload

Backend:

Multer / upload middleware | v Validate file | v Parse CSV / JSON / XLSX
| v Calculate metadata | v Store dataset metadata | v Return dataset ID

Potential future architecture:

Uploaded file | v Parser | v Normalized data | +——> Analytics engine |
+——> AI Copilot | +——> Visualization data

============================================================ 15. AI
COPILOT ARCHITECTURE
============================================================

Target conceptual flow:

User | v Copilot UI | v POST /api/copilot/query | v Backend | +–>
authenticate user | +–> verify dataset ownership | +–> load dataset |
+–> analyze question | +–> perform data operations | +–> generate
context | +–> call LLM | v Structured AI response | v Frontend
visualization / message

The AI should not blindly send raw sensitive data to an LLM. Only the
necessary context should be provided.

============================================================ 16. CURRENT
MOCK DATA ============================================================

Dashboard sample values:

Total Datasets: 24 Total Rows: 30.4K AI Queries: 1,284 Insights
Generated: 356

Analytics sample:

Revenue: $124.8K Orders: 2,840 Average Order: $43.94 Conversion Rate:
8.42%

These values are only UI demo data and MUST NOT be treated as real
production data.

============================================================ 17. CURRENT
FRONTEND LIMITATIONS
============================================================

Not implemented yet:

-   Real authentication
-   Real JWT
-   Real MongoDB
-   Real file upload API
-   Persistent datasets
-   Real analytics calculations
-   Real AI/LLM calls
-   Real chat history
-   Real user preferences persistence
-   Real password reset
-   Real Google authentication
-   Real notifications
-   Production authorization/security

============================================================ 18. BRANCH
/ CHAT WORKFLOW
============================================================

The ChatGPT Project should conceptually use:

PARENT / MAIN

Overall project architecture, decisions and shared context.

FRONTEND BRANCH

React/Vite development. Do not unnecessarily modify backend.

BACKEND BRANCH

Node/Express/MongoDB/AI development. Do not unnecessarily redesign
frontend.

IMPORTANT: ChatGPT conversation branches do not automatically
synchronize every new message with each other.

Therefore this README is the shared source of truth.

Whenever an important architecture/API/data-model decision changes,
update this README.

============================================================ 19.
DEVELOPMENT RULES
============================================================

1.  Frontend and backend should remain logically separated.
2.  Keep API contracts explicit.
3.  Never hard-code secrets.
4.  Use .env files locally.
5.  Add .env to .gitignore.
6.  Validate all user input on the backend.
7.  Verify dataset ownership on every dataset operation.
8.  Never trust client-provided user IDs.
9.  Validate uploaded file type and size on the backend.
10. Return consistent JSON responses.
11. Use proper HTTP status codes.
12. Keep controllers thin and move business logic into services.
13. Keep database logic in models/services.
14. Add centralized error handling.
15. Do not break existing frontend UI while integrating APIs.
16. Test each backend phase before moving to the next.
17. Commit major milestones separately.

============================================================ 20. CURRENT
STATUS ============================================================

Frontend: COMPLETE / UI READY

Backend: NOT YET FULLY IMPLEMENTED Backend development is the next major
phase.

Integration: NOT STARTED

Production readiness: NOT READY

============================================================ 21. NEXT
IMMEDIATE TASK
============================================================

Start Backend Phase B1:

1.  Enter backend development branch.
2.  Inspect existing backend package.json/server.js.
3.  Install required dependencies.
4.  Create Express server foundation.
5.  Add dotenv.
6.  Add CORS.
7.  Add JSON middleware.
8.  Add /api/health.
9.  Add centralized error handling foundation.
10. Test server locally.

Do NOT start AI/LLM implementation before the core backend,
authentication, dataset and data-processing foundations are stable.

============================================================ 22. SHARED
CONTEXT UPDATE RULE
============================================================

Whenever a major change happens, update this document.

Examples:

-   New API endpoint
-   Changed API response
-   New database model
-   Changed authentication flow
-   New frontend page
-   New environment variable
-   New AI architecture
-   File-processing change
-   Security decision
-   Deployment decision

This document should remain the project’s common reference for frontend,
backend and parent/main ChatGPT branches.

============================================================ END OF AI
DATA COPILOT SHARED CONTEXT
============================================================

============================================================
AI DATA COPILOT - BACKEND
============================================================

Backend Status:
B1 - Express Foundation       [COMPLETED]
B2 - MongoDB + Mongoose       [COMPLETED]
B3 - JWT Authentication       [COMPLETED]
B4 - Dataset Management       [COMPLETED]
B5 - File Processing          [NEXT]
B6 - Analytics                [PENDING]
B7 - AI Copilot               [PENDING]
B8 - Frontend Integration     [PENDING]
B9 - Production Hardening     [PENDING]


============================================================
1. BACKEND TECHNOLOGY STACK
============================================================

Runtime:
- Node.js

Framework:
- Express.js

Database:
- MongoDB Atlas

ODM:
- Mongoose

Authentication:
- JWT (JSON Web Token)

Password Security:
- bcryptjs

Development:
- Nodemon

Environment Variables:
- dotenv

API Testing:
- Postman


============================================================
2. BACKEND FOLDER STRUCTURE
============================================================

backend/
│
├── config/
│   └── db.js
│
├── models/
│   ├── User.js
│   ├── Dataset.js
│   ├── Query.js
│   └── Analysis.js
│
├── controllers/
│   ├── authController.js
│   ├── datasetController.js
│   ├── copilotController.js
│   └── analyticsController.js
│
├── routes/
│   ├── authRoutes.js
│   ├── datasetRoutes.js
│   ├── copilotRoutes.js
│   └── analyticsRoutes.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   └── uploadMiddleware.js
│
├── services/
│   ├── authService.js
│   ├── datasetService.js
│   ├── analysisService.js
│   ├── llmService.js
│   └── copilotService.js
│
├── utils/
│   ├── fileParser.js
│   ├── dataAnalyzer.js
│   └── validators.js
│
├── uploads/
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js


============================================================
3. ENVIRONMENT VARIABLES
============================================================

The backend uses environment variables through dotenv.

Required variables:

PORT=8000

MONGODB_URI=<MongoDB Atlas connection string>

JWT_SECRET=<secret JWT key>

JWT_EXPIRES_IN=7d


IMPORTANT:
- .env must never be committed to Git.
- MongoDB credentials must never be exposed publicly.
- JWT_SECRET must remain private.


============================================================
4. EXPRESS SERVER
============================================================

Backend server:

http://localhost:8000

Root endpoint:

GET /

Response:

{
    "success": true,
    "message": "Welcome to AI Data Copilot API"
}


Health check:

GET /api/health

Response:

{
    "success": true,
    "message": "AI Data Copilot backend is running",
    "timestamp": "..."
}


============================================================
5. DATABASE
============================================================

Database:
MongoDB Atlas

Connection:
Mongoose

Database connection is implemented in:

config/db.js

The server connects to MongoDB before starting the
Express server.

Connection flow:

Application Start
        ↓
Load Environment Variables
        ↓
Connect MongoDB
        ↓
Connection Successful
        ↓
Start Express Server


============================================================
6. AUTHENTICATION
============================================================

Authentication uses:

- bcryptjs
- JSON Web Token (JWT)

Authentication flow:

REGISTER:

Client
  ↓
POST /api/auth/register
  ↓
Validate input
  ↓
Check existing user
  ↓
Hash password using bcrypt
  ↓
Save user in MongoDB
  ↓
Generate JWT
  ↓
Return user + token


LOGIN:

Client
  ↓
POST /api/auth/login
  ↓
Find user by email
  ↓
Compare password using bcrypt
  ↓
Generate JWT
  ↓
Return user + token


PROTECTED REQUEST:

Client
  ↓
Authorization: Bearer <JWT>
  ↓
authMiddleware
  ↓
Verify JWT
  ↓
Extract userId
  ↓
Allow request


============================================================
7. AUTHENTICATION APIs
============================================================

REGISTER

POST /api/auth/register

Request:

{
    "name": "Keshav Pal",
    "email": "keshav@example.com",
    "password": "password123"
}


LOGIN

POST /api/auth/login

Request:

{
    "email": "keshav@example.com",
    "password": "password123"
}


CURRENT USER

GET /api/auth/me

Authentication:

Bearer Token required


Current authentication APIs have been tested successfully
using Postman.


============================================================
8. DATASET MANAGEMENT
============================================================

Dataset APIs are protected using JWT authentication.

Dataset ownership is associated with the authenticated
user.

Dataset flow:

JWT
 ↓
authMiddleware
 ↓
Authenticated User ID
 ↓
Dataset Service
 ↓
MongoDB


Current Dataset APIs:

GET /api/datasets

GET /api/datasets/:id

DELETE /api/datasets/:id


The dataset query always uses the authenticated user's ID
to prevent users from accessing another user's datasets.


Example:

User A
  ↓
Only User A's datasets

User B
  ↓
Only User B's datasets


============================================================
9. DATASET MODEL
============================================================

Dataset model contains:

- user
- name
- originalFileName
- fileType
- fileSize
- filePath
- rowCount
- columnCount
- columns
- status
- createdAt
- updatedAt


Dataset status values:

processing
ready
failed


============================================================
10. CURRENT TESTING
============================================================

API testing is performed using Postman.

Successfully tested:

[✓] MongoDB connection

[✓] User registration

[✓] Password hashing

[✓] JWT generation

[✓] User login

[✓] JWT verification

[✓] Protected /api/auth/me endpoint

[✓] Protected /api/datasets endpoint

[✓] Dataset ownership filtering


Example successful dataset response:

{
    "success": true,
    "count": 0,
    "datasets": []
}


============================================================
11. SECURITY
============================================================

Implemented:

- Password hashing with bcrypt
- JWT authentication
- Protected routes
- Dataset ownership verification
- Environment variables
- .env excluded from Git
- Centralized error handling


Passwords are never returned in authentication responses.


============================================================
12. GIT WORKFLOW
============================================================

Backend development is being maintained on:

backend

Current backend milestone commit:

7f9956d

Commit message:

feat: implement backend foundation and authentication


Remote branch:

origin/backend


Working tree status at this milestone:

Clean


============================================================
13. NEXT DEVELOPMENT PHASE
============================================================

NEXT:

B5 - File Upload & Data Processing


Planned supported file formats:

- CSV
- JSON
- XLSX
- XLS


Planned flow:

Postman / Frontend
        ↓
POST /api/datasets/upload
        ↓
JWT Authentication
        ↓
Multer
        ↓
File Validation
        ↓
File Parser
        ↓
Data Analysis
        ↓
Dataset Metadata
        ↓
MongoDB


Planned packages:

- multer
- csv-parse
- xlsx


============================================================
14. FUTURE BACKEND PHASES
============================================================

B5 - File Processing
B6 - Analytics API
B7 - AI Copilot
B8 - Frontend-Backend Integration
B9 - Production Hardening


AI Copilot planned architecture:

Frontend
   ↓
POST /api/copilot/query
   ↓
Authentication
   ↓
Dataset Ownership Check
   ↓
Load Dataset
   ↓
Analyze User Question
   ↓
Data Operations
   ↓
Generate Context
   ↓
LLM
   ↓
Structured Response
   ↓
Frontend


============================================================
15. DEVELOPMENT RULES
============================================================

1. Controllers should remain thin.

2. Business logic should be placed in services.

3. Database operations should use Mongoose models/services.

4. Every protected API must verify JWT authentication.

5. Dataset ownership must always be verified.

6. Never trust userId sent by the frontend.

7. Never store plain-text passwords.

8. Never expose secrets in frontend code.

9. Never commit .env to Git.

10. Test backend APIs with Postman before frontend
    integration.

11. Complete and test each backend phase before moving
    to the next phase.


============================================================
BACKEND DEVELOPMENT STATUS
============================================================

B1  Express Foundation        [✓ COMPLETED]
B2  MongoDB + Mongoose        [✓ COMPLETED]
B3  JWT Authentication        [✓ COMPLETED]
B4  Dataset Management        [✓ COMPLETED]
B5  File Processing           [→ NEXT]
B6  Analytics                 [PENDING]
B7  AI Copilot                [PENDING]
B8  Frontend Integration      [PENDING]
B9  Production Hardening      [PENDING]

============================================================