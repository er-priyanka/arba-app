# Arba- Full Stack Web App
An e-commerce app that provides e-commerce services.

## Deployed Link
**Frontend** https://arba-app-phi.vercel.app/

**Backend** https://arba-backend-2-0j6p.onrender.com/


## Tech Stack:

### Frontend:

- React.Js
- Chakra UI
- React-router-dom(v5)

### Backend:

- Node.js
- Express
- Mongoose
- Mongodb Atlas
- Cors
- dotenv
- bcrypt
- JSON Web Token


## Setup Instructions
1. Clone the repository from GitHub.
2. Navigate to the project directory in the terminal.
3. Install dependencies:
```bash
npm install
```
4. Start the frontend development server:
```bash
npm run start
```
5. Start the backend server:
```bash
npm run start
```
6. Access the application in your web browser.


## Backend

### APIs Developed
1. *Auth Flow*
   - User Schema: fullName, userName, email, password, avatar
   - *Endpoints:*
     - auth/login
     - auth/register (with validation)
     - auth/updateProfile
     - auth/getProfile
     - auth/change-password
     - auth/logout

2. *Category CRUD*
   - Schema: name, slug, image, owner
   - *Endpoints:*
     - /category : create a category
     - /category : get all categories
     - category/:id : get single category by id
     - category/:id : update category by id
     - category/:id : delete category by id
    
3. *Product CRUD*
   - Schema: title, description, price, category, image, owner
   - *Endpoints:*
     - /product : create a product
     - /product : get all products
     - product/:id : get single product by id
     - product/:id : update product by id
     - product/:id : delete product by id


## Frontend

### Features Implemented
1. *Login & Signup*
   - User authentication with username and password
   - Redirect to Signup page on click
   - Persistent login state using normal JavaScript fetch API
2. *Home Page Terms & Condition Dialog*
   - Show dialog immediately after page load
   - Accept or Cancel options
3. *User Profile Menu*
   - Menu with options: My Store, Profile, Logout
   - Logout redirects to login
   - Profile redirects to Profile page
   - My Store redirects to My Store page
4. *Profile Page*
   - Display user image, username, and email
   - Button to see Terms & Conditions
   - Buttons for updating profile and changing password
5. *Product Home Page*
   - Display products from API
   - Add to cart functionality
6. *All Products Page*
   - See all products here
7. *My Store*
   - Add, delete, update products and categories
   - Refresh products and categories button


## Screenshots
**Login Page**
![Login Page](/frontend/src/Images/login.png)

**Signup Page**
![Signup Page](/frontend/src/Images/signup.png)

**Terms and Conditions**
![T&C](/frontend/src/Images/TnC.png)

**Home page**
![Home page ](/frontend/src/Images/home.png)

**Product**
![Product ](/frontend/src/Images/home.png)

**profile**
![profile ](/frontend/src/Images/profilePage.png)

**Change password Modal**
![Change Password ](/frontend/src/Images/changePassword.png)

**Category Table**
![Categoies Table ](/frontend/src/Images/categories.png)

**Add Product**
![Product Table ](/frontend/src/Images/addProduct.png)

