# User Feedback System

A full-stack MERN application for collecting and displaying user feedback with advanced filtering and search capabilities.

## Live Demo

[View Live Demo](https://github.com/abhi844735/liaplus-feedback-system.git)

## Features

- **User-friendly Feedback Submission**: Intuitive form with validation
- **Advanced Dashboard**: View, filter, and sort feedback entries
- **Search Functionality**: Server-side search across all feedback fields
- **Categorization**: Sort feedback by suggestion, bug report, feature request, etc.
- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **Material UI Components**: Modern, accessible user interface
- **Mock Data Generation**: One-click demo data loading for testing
- **Clear Filters**: Reset all search filters with a single click
- **Pagination**: Handle large volumes of feedback efficiently
- **RESTful API**: Well-structured backend with clean architecture

## Tech Stack

- **Frontend**:
  - React.js with functional components and hooks
  - Material UI for responsive, accessible design
  - Context API for state management
  - Axios for API communication

- **Backend**:
  - Node.js with Express.js
  - MongoDB with Mongoose ODM
  - RESTful API architecture
  - Service-Repository pattern for clean code organization

## Project Structure

```
feedback-system/
├── client/                 # React frontend
│   ├── public/             # Static files
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── pages/          # Page components
│       └── services/       # API service layer
│
├── server/                 # Node.js backend
│   ├── controllers/        # Request handlers
│   ├── data/               # Mock data for demo
│   ├── models/             # Mongoose schemas
│   ├── repositories/       # Data access layer
│   ├── routes/             # API endpoints
│   └── services/           # Business logic
│
└── README.md               # Project documentation
```

## Quick Start

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/abhi844735/liaplus-feedback-system.git
cd liaplus-feedback-system
```

2. Install dependencies:
```bash
# Server dependencies
cd server
npm install

# Client dependencies
cd ../client
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the server directory
   - Add the following variables:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     NODE_ENV=development
     ```

4. Run the application:
```bash
# Start the server (from server directory)
npm run dev

# Start the client (from client directory)
npm start
```

5. Open your browser and navigate to: `http://localhost:3000`

## For Recruiters and Demonstration

To quickly evaluate the application's functionality:

1. Start the application following the instructions above
2. Navigate to the Dashboard page
3. Click the "Load Mock Data" button to populate the system with sample feedback entries
4. Explore the filtering, searching, and sorting capabilities:
   - Use the search bar to find feedback by keywords
   - Filter by category using the dropdown
   - Sort by different fields in ascending or descending order
   - Use the "Clear Filters" button to reset all filters at once
5. Submit new feedback through the feedback form

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/feedback` | Submit new feedback |
| GET | `/api/feedback` | Get all feedback with filters |
| GET | `/api/feedback/:id` | Get feedback by ID |
| POST | `/api/seed/mock` | Load mock feedback data |

## Query Parameters for Feedback Endpoint

| Parameter | Description | Example |
|-----------|-------------|---------|
| `searchTerm` | Search across name, email, and feedback text | `?searchTerm=feature` |
| `category` | Filter by category | `?category=Bug%20Report` |
| `sortBy` | Field to sort by | `?sortBy=createdAt` |
| `sortOrder` | Order of sorting (asc/desc) | `?sortOrder=desc` |
| `page` | Page number for pagination | `?page=1` |
| `limit` | Number of items per page | `?limit=10` |

## License

This project is licensed under the MIT License.

