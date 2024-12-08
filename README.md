
  

#  RoleMaster: Documentation

  

RoleMaster is a powerful admin panel designed to streamline role-based access control (RBAC) by offering intuitive tools for user management, role management, and dynamic permissions. This documentation provides a comprehensive guide to RoleMaster, covering its core features, functionalities, project overview, and step-by-step setup instructions.

  

---

***This project currently supports light mode only. Please ensure that your system theme is set to light mode to avoid any UI inconsistencies.*** 

#  Getting Started with RoleMaster

  

This guide will walk you through the process of cloning the RoleMaster repository, setting up the necessary dependencies, and running the project along with a mock REST API using `json-server`. `json-server` is a lightweight tool that quickly creates a mock REST API by serving data from a JSON file through RESTful endpoints.

##  Cloning the Repository

  

1. Open a terminal or command prompt.

2. Clone the RoleMaster repository using the following command:

  

```bash

git clone https://github.com/Algoture/RoleMaster.git

```

3. Navigate to the project directory:

```bash

cd RoleMaster

```

##  Installing Dependencies

Before running the application, ensure all required dependencies are installed.

1. Install the project's dependencies:

```bash

npm install

```

2. Install `json-server` for the mock REST API:

-  **Globally :**

```bash

npm install -g json-server

```

4. Start the JSON Server:

```bash

npx json-server --watch db.json --port 3001

```

#####  Explanation:

-  `npx`: Executes the `json-server` package temporarily.

-  `--watch db.json`: Specifies the JSON file to be used as the data source.

-  `--port 3001`: Specifies the port number for the server (default is `3000`).

  

- The mock API will now be available at `http://localhost:3001`.

  

Once you run the above `npx` command, `json-server` will create RESTful endpoints for the data in `db.json` (e.g., `/users`, `/permissions` and `/roles`).

##  Running RoleMaster

  

1. Start the RoleMaster application:

```bash

npm run dev

```

2. Open your browser and navigate to `http://localhost:3000`.

  

----------

  

##  Running Both Servers Simultaneously

  

1. Open two terminal windows or tabs.

2. In the first terminal, run the JSON Server:

```bash

npx json-server --watch db.json --port 3001

```

3. In the second terminal, start the Next.js application:

```bash

npm run dev

```
You now have both the mock API (`http://localhost:3001`) and the RoleMaster application (`http://localhost:3000`) running.


##  Features Overview

  

###  1. **User Management**

  

RoleMaster provides robust user management capabilities, allowing administrators to:

-  **View Users**: Display a list of all users with their details, including name, email, role, status, and actions etc.

-  **Search and Sort**: Quickly find users with the search bar and sort them by status.

-  **Add Users**: Add new users by clicking the "Add User" button and filling out the required details.

-  **Edit Users**: Modify user details such as name, email, role, or status using the edit button.

-  **Delete Users**: Remove users from the system with a confirmation modal to prevent accidental deletions.

-  **Manage User Status**: Toggle between Active and Inactive statuses.


###  2. **Role Management**

Administrators can efficiently manage roles with the following functionalities:

-  **View Roles**: Display a list of all defined roles and their associated permissions.

-  **Add Roles**: Create new roles using the "Add Role" button and define their permissions.

-  **Edit Roles**: Modify role names or associated permissions using the edit button.

-  **Delete Roles**: Remove roles from the system with a confirmation modal.

  

###  3. **Dynamic Permissions**

RoleMaster supports dynamic permission assignment for flexible role management:

-  **Permission Overview**: Display a clear list of permissions such as Read, Write, Delete, Modify, View etc.

-  **Assign Permissions**: Assign permissions to roles dynamically using the "Add Permission" button.

-  **Modify Permissions**: Edit existing permissions for any role.

-  **Delete Permissions**: Remove permissions with confirmation modals.

###  4. **Custom API Simulation**

RoleMaster includes mock API simulation to validate CRUD operations:
-  **User Management API**: Simulates server responses for adding, editing, and deleting users.

-  **Role Management API**: Mocks role creation, editing, and deletion processes.

-  **Permission Management API**: Enables testing permission assignment and removal functionalities.

### 5. **Sidebar Navigation**
Effortlessly navigate between pages with a responsive sidebar.
-  **Dashboard**: Quick access to system metrics and role statistics.
-  **Users**: Navigate to the user management screen.
-  **Settings**: Access system and role management configurations.


## Dashboard Overview

The **Admin Panel Dashboard** provides administrators with a high-level summary of the system's user and role statistics.

### **Key Features**

#### **1. Metrics Summary**
- **Total Users**: Displays the total number of users in the system.
- **Active Users**: Shows the count of currently active users.
- **Inactive Users**: Highlights the number of users who are currently inactive.
- These metrics are displayed in a card layout with distinct styles for easy identification.

#### **2. Role-Based Statistics**
- Provides a breakdown of user roles along with:
  - **Role Name**: Displays roles such as Admin, Editor, Viewer, etc.
  - **Users Count**: Number of users assigned to each role.
  - **Permissions Count**: Total number of permissions associated with each role.
- Color-coded labels for roles enhance visual clarity.

---
  
##  Key UI Features

###  **1. Search Bar**  
- Present across User Management and Role Management.
- Allows administrators to quickly find specific users or roles by typing keywords.

###  **2. Sorting**
- Enables sorting data by fields such as Name, or Status for improved usability.

###  **3. Confirmation Modals**
- Displayed when deleting users, roles, or permissions to ensure no accidental actions occur.

###  **4. Toast Notifications**
- Shown after performing actions like adding, editing, or deleting users, roles, or permissions.

- Indicate success, failure, or validation errors for enhanced feedback.
###  **5. Responsive Layout**
- Fully optimized for both desktop and mobile devices, ensuring functionality on any screen size.

###  **6. Dashboard Metrics Cards**
- Display summary statistics such as Total Users, Active Users, and Inactive Users in visually distinct cards.

###  **6. Role-Based Summary Panels**
- Shows key data for each role, including:
    -   Role Name
    -   User Count per Role
    -   Permissions Count

---
##  How to Use RoleMaster

 1.  **View Users and Roles**:
- Navigate to the "Users" or "Settings" tab to view lists of users and roles.

2.  **Add a New User**:
- Click the "Add User" button, fill out the form with user details, and assign a role.

3.  **Edit User Details**:
- Click the edit button next to a user’s entry and update the required information.

4.  **Delete a User**:
- Click the delete icon next to a user’s entry, confirm the deletion in the modal.

5.  **Manage Roles**:
- Use the "Add Role" or "Edit" options under the "Settings" tab to modify role configurations.

6.  **Assign Permissions**:
- Click "Add Permission" to assign new permissions to roles or edit existing ones.

7.  **Access the Dashboard**:
  - The Dashboard provides an overview of key system metrics, including total users, active users, and inactive users.
    - **View Metrics**: Check the cards on the Dashboard for an at-a-glance summary of user statistics.
    -   **Role-Based Statistics**: See a breakdown of roles and the number of users assigned to each role.

8.  **API Simulation**:
- Mock server calls can be tested by performing CRUD actions and viewing the simulated server responses.
---


###  **User Management Screen**

-  **Search Bar**: At the top for quick filtering by name or email.
  
-  **User List**: Displays user details such as name, email, role, status, and actions.

-  **Actions**: Buttons for editing or deleting users.

-  **Add User Button**: Top-right button for adding a new user.

-  **Status Indicators**: Highlight whether users are active or inactive.

###  **Role Management Screen**

-  **Roles Table**: Displays a list of roles and their associated permissions.

-  **Actions Column**: Provides buttons for editing or deleting roles and permissions.

-  **Add Role/Permission Buttons**: Top-right buttons to add roles or permissions.

###  **Dashboard Screen**

-  **Metrics Cards**: Displays key statistics such as Total Users, Active Users, and Inactive Users for a quick overview.

-  **Role-Based Statistics**: Displays a breakdown of roles with the number of users and permissions assigned to each.

-  **Real-Time Data**: Automatically updates the data displayed to reflect the most current information.

-  **Navigation Links**: Easy access to deeper management pages such as Users, Roles, and Settings.
---
