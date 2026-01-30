# Simple Web Application – Java Servlets & MySQL

A full-stack Java web application that demonstrates **CRUD operations**, **AJAX communication**, and **database integration** using Java Servlets and MySQL.

This project was built to showcase backend–frontend interaction, database handling, and dynamic UI updates without page reloads.

---

##  Features

-  Register new users via web form  
-  Display all users from the database  
-  Expand a user row to see more details  
-  Delete users dynamically  
-  No page refresh (AJAX-based)  
-  JSON data exchange between client & server  

---

## Tech Stack

| Layer       | Technology |
|------------|------------|
| Backend     | Java Servlets (JSP/Servlet API) |
| Database    | MySQL |
| Frontend    | HTML, CSS, JavaScript |
| Communication | AJAX (XMLHttpRequest) |
| Server      | Apache Tomcat |
| DB Access   | JDBC |

---

## Architecture Overview

**Frontend → AJAX → Servlet → JDBC → MySQL**

1. User interacts with the UI  
2. JavaScript sends JSON to the server using AJAX  
3. Servlets process the request  
4. JDBC executes SQL queries  
5. JSON response updates the UI dynamically  

---

## Database Structure

**Table: `new_users`**

| Column      | Type |
|------------|------|
| user_id     | INT (Primary Key, Auto Increment) |
| name        | VARCHAR |
| surname     | VARCHAR |
| birthdate   | DATE |
| gender      | VARCHAR |
| homeaddress | VARCHAR |
| workaddress | VARCHAR |

