
# Node_Project

Movies project with Angular / Node.js


This project is a movie management application built with Angular for the frontend and Node.js for the backend. It allows users to explore a list of movies, view detailed information about each film, and interact through features like adding ratings, posting comments, and managing favorite movies. The application supports CRUD operations for movies, users, and comments, offering role-based permissions to update or delete content. Additionally, it provides a dedicated page for top-rated movies using Highcharts and includes functionalities like search with autocompletion and user authentication.



## To Start the Project:

### Backend:  
```bash
cd backend  
npx ts-node src/server.ts
```

### Angular:  
```bash
cd frontend/frontend  
ng serve
```

---

## **CRUD Operations**

### **Movies**
- **GET** `/movies/` - Retrieve the list of all movies  
- **POST** `/movies/` - Create a new movie  
- **GET** `/movies/:id` - Retrieve details of a specific movie  
- **PUT** `/movies/:id` - Update a specific movie  
- **DELETE** `/movies/:id` - Delete a specific movie  

### **Comments**
- **GET** `/movies/:id/comments` - Retrieve comments for a specific movie  
- **POST** `/movies/:id/comments` - Add a comment to a specific movie  

### **Ratings**
- **POST** `/movies/rate` - Rate a specific movie  
- **GET** `/movies/top-rated` - Retrieve the top-rated movies  

### **Users**
- **GET** `/users/` - Retrieve the list of all users  
- **POST** `/users/` - Create a new user  
- **PUT** `/users/:id` - Update a specific user  
- **DELETE** `/users/:id` - Delete a specific user  
- **PUT** `/update-director-status` - Update the value of the `isdirector` field  
- **POST** `/users/register` or `/users/login` - Register or login a user  
- **GET** `/users/:id-director` - Check if a user has the "director" status  

---

## **Pages**

- `/auth` - For registration or login  
- `/movies` - For the list of movies  
- `/movies/:id` - To view details of a specific movie, update it, rate it, or add comments  
- `/top-rated-movies` - Page displaying a chart of the top-rated movies (using Highcharts)  
- `/add` - To add a new movie  
- `/status` - To update the "director" role  

---

## **Features**

1. **Movie List**: View a list of all movies.  
2. **Movie Details**: Click on a movie to see its details, including:  
   - Title  
   - Year  
   - Runtime  
   - Genre  
   - Director  
   - Main Stars (up to 4)  
   - IMDb Rating  
   - User Rating  
   - Comments  

3. **Interactions**:
   - Add a rating  
   - Add comments  
   - Update or delete movies (role-based permissions)  
   - Add movies to a favorites list and filter only those movies  
   - Search for a specific movie with autocompletion  

4. **Top Rated Movies**: View a dedicated page with the best-rated movies (displayed using Highcharts).  

---

## Notes:

- **OAuth2 Attempt**: Initial attempt to implement OAuth2 failed due to issues obtaining the token.
- **ag-grid Attempt**: Initial attempt to implement ag-grid but blank pages.  
  

---

##  **SQL**: 

1. **Configuration Used** :

- NAME: postgres
- USER:postgres
- PASSWORD: postgres
- host : localhost , PORT : 5432

2. **Using the Kaggle File for Data:**

```bash
https://www.kaggle.com/datasets/harshitshankhdhar/imdb-dataset-of-top-1000-movies-and-tv-shows
```


3. **TABLES** : 
- USERS
- comments
- movies
- ratings

4. **For Table Creation**: 

file : `backend/creationstables.sql`

5. **Data Insertion into Tables**:

fichier :  `backend/src/insertMovies.ts` 

---

## Images

1. Main Page
![image12 2](https://github.com/user-attachments/assets/b71a23ed-3334-424d-90c7-c0775596cf9b)

2. Favorites
![image12 3](https://github.com/user-attachments/assets/94a15835-505c-4b72-8e28-3931f99accb5)

.3 Movies Infos
![image12 5](https://github.com/user-attachments/assets/c8a2b33c-05f0-43df-afbc-6ebaf2fcf3fd)

.4 Highchart
![image12 4](https://github.com/user-attachments/assets/69097da0-6a2b-46ec-968f-bdcbc6622235)

.5 SWagger
![image12 6](https://github.com/user-attachments/assets/aeced6fa-4b1d-469f-a4e1-c846a1879eb0)
