# PageBloom

PageBloom is a bookshop admin portal where the shop owner manages what customers see. The admin can sign in, search and filter books, add a new book, change a book's price, delete a book, view customer orders and see analytics.


## Features

- **Sign in and sign up**.
- **Home** page with a welcome banner, store stats and quick actions.
- **Products** page with live search, a category filter, a price range, Edit(change the price) and Delete.
- **Add Product** form with validation.
- **Orders** 
- **Analytics** 

## Built with

- React (Vite)
- React Router for page navigation
- Zustand for shared state (login and products)
- Tailwind CSS for styling
- json-server as a fake backend (`db.json`)
- Vitest and React Testing Library for tests

## Getting started

You need Node.js and npm installed.

1. Clone the repository and go into the folder:
   ```bash
   git clone <your-repo-url>
   cd pagebloom
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the fake backend in one terminal :
   ```bash
   npm run server
   ```
4. Start the app in a second terminal:
   ```bash
   npm run dev
   ```
5. Open the address that Vite prints and sign in.

Test login:`admin@pagebloom.com` / `admin123`, or create your own account with Sign up.

Both terminals must stay running, because the app gets its data from the fake backend.

## Deploying

The frontend and fake API must both be deployed; the frontend alone only displays the login page.

1. On Render, create a **Web Service** from this repository. Use `npm install` as the build command and `npm start` as the start command. Render supplies the port automatically.
2. On Netlify, deploy the same repository as a Vite site with `npm run build` as the build command and `dist` as the publish directory.
3. In Netlify's environment variables, set `VITE_API_URL` to the Render service's public base URL (for example, `https://your-api.onrender.com`, with no `/users` suffix), then trigger a new deploy. Vite embeds this value during the build.

For local development, leave `VITE_API_URL` unset and run `npm run server` and `npm run dev`. If sign-in cannot reach the API, the login form displays a connection/configuration error.

## Scripts

- `npm run dev`: starts the app
- `npm run server`: starts the fake backend 
- `npm start`: starts the fake backend on the port provided by a hosting service
- `npm test -- --run`: runs the tests once


## Pages

- `/login`: sign in and sign up
- `/`: Home
- `/products`: Products
- `/add-product`: Add Product
- `/orders`: Orders
- `/analytics`: Analytics

## Project structure

```
pagebloom/
├── .gitignore                       
├── README.md                        
├── db.json                          
├── eslint.config.js                 
├── index.html                       
├── package.json             
├── package-lock.json                
├── vite.config.js                   
├── public/
│   └── images    
└── src/
    ├── main.jsx                     
    ├── App.jsx                      
    ├── index.css                    
    ├── setupTests.js                
    ├── constants.js                 
    ├── utils.js                     
    ├── components/
    │   ├── ProtectedRoute.jsx       
    │   ├── StatCard.jsx             
    │   ├── Login.jsx                
    │   ├── Home.jsx                 
    │   ├── Layout.jsx               
    │   ├── Products.jsx             
    │   ├── ProductCard.jsx          
    │   ├── AddProduct.jsx           
    │   ├── Orders.jsx               
    │   └── Analytics.jsx            
    ├── hooks/
    │   ├── useFetch.js              
    │   └── useProductFilters.js    
    ├── store/
    │   ├── useAuthStore.js          
    │   └── useProductStore.js       
    └── tests/
        ├── Login.test.jsx           
        ├── Home.test.jsx                   
        ├── Products.test.jsx       
        ├── AddProduct.test.jsx      
        └── Analytics.test.jsx       
```


## Data and requests

The app talks to the fake backend with all four kinds of request:

- **GET** loads books, orders, revenue and top books.
- **POST** adds a book (Add Product) or an account (Sign up).
- **PATCH** changes a book's price.
- **DELETE** removes a book.

Changes are saved in `db.json`, so they are still there after a refresh.

## Running the tests

Run `npm test -- --run`. The tests use a fake `fetch`, so they do not need the backend running. Each feature has its own test file in `src/tests/`.

## Team

- **Anita:** project setup, Login, Home, README
- **Shalyn:** Products page
- **Daniel:** sidebar layout, Orders page, data
- **Victor:** Add Product form, Analytics page

## Known limitations

- Passwords are stored as plain text in `db.json`, so login is not secure. 
- Orders, revenue and top-seller figures are mock data.
- `json-server` is a demo backend, not a production database. Hosted file changes may be lost when the service restarts, and this setup does not provide production-grade authentication.