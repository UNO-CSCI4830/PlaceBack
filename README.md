# PlaceBack

PlaceBack is a memory system for physical objects. It helps users remember where they put their belongings and why they put them there.

**Project Status:** Sprint 1 frontend prototype  
**Course:** CSCI 4830 – Introduction to Software Engineering

## Current Features

The frontend currently supports:

- Viewing saved objects on the dashboard
- Adding, editing, and deleting objects
- Saving object names, locations, categories, and notes
- Searching and filtering saved objects
- Viewing object details and locations
- Viewing notes associated with objects
- Saving object information locally between browser refreshes

## Prerequisites

Before running PlaceBack, install:

- Git
- Node.js (version 20.19+ or 22.12+)
- npm (included with Node.js)
- A modern web browser, such as Google Chrome or Microsoft Edge

Verify that Git, Node.js, and npm are installed by running the following commands in a terminal:

`git --version`

`node --version`

`npm --version`

## Running the Frontend

**Step 1: Clone the repository**

Open PowerShell or another terminal and enter:

`git clone https://github.com/UNO-CSCI4830/PlaceBack.git`

**Step 2: Navigate to the frontend**

`cd PlaceBack/frontend`

**Step 3: Install dependencies**

`npm ci`

This installs the packages needed to run the frontend.

**Step 4: Start the development server**

`npm run dev`

**Step 5: Open the application**

Open the local URL displayed in the terminal, usually:

`http://localhost:5173/`

Keep the terminal running while using the application. Press Ctrl+C to stop the development server.

## Running the Backend (Optional)

The backend currently uses Node.js and Express.

Open a separate terminal and navigate to the repository's backend directory.

Run:

`npm ci`

Then start the server:

`node server.js`

The backend runs at:

`http://localhost:3000/`

Opening this address should display:

"PlaceBack backend is running!"

The backend is not yet connected to the frontend, so running it is not required for the Sprint 1 frontend demonstration.

## Frontend Testing

After launching PlaceBack, users can verify the application's main features by:

1. Opening the dashboard and confirming that the starter objects appear.
2. Creating a new object with a name and location.
3. Editing the object's information and saving the changes.
4. Searching for saved objects and testing an unsuccessful search.
5. Navigating between Dashboard, Locations, and Notes & Reminders.
6. Testing object deletion and its confirmation dialog.
7. Refreshing the browser to verify that saved changes persist.

## Known Limitations

PlaceBack is still under development, and some planned features are not yet implemented.

- **Authentication:** User registration and login are not yet available.
- **Database:** Saved objects currently use browser local storage instead of a connected database. They are not synchronized between devices or browsers.
- **Reminders:** Users can view saved notes, but scheduled notifications are not implemented.
- **Images:** Users can select emoji icons, but uploading images of physical objects is not supported yet.
- **Backend integration:** The frontend is not yet connected to the backend API.

## Troubleshooting

**Node.js or npm isn't recognized:** Verify that Node.js is installed. Close and reopen the terminal after installation.

**The frontend won't start:** Make sure the terminal is inside the `frontend` directory. Run `npm ci` before `npm run dev`.

**Port 5173 is unavailable:** Check the terminal for the actual local URL. Vite may select another available port.

**Saved objects are missing:** Objects currently use browser local storage. Changing browsers or clearing site data may cause saved information to be unavailable.

## Project Development

PlaceBack is being developed as a team project for CSCI 4830: Introduction to Software Engineering.

Development tasks, known issues, and sprint progress are documented in the project's GitHub repository.
