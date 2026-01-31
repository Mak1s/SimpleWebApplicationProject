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

---

## How to run the project

  1. Clone the repository "git clone https://github.com/Mak1s/SimpleWebApplicationProject.git"
  2. Install MySQL Server (or use XAMPP/WAMP)
      Make sure MySQL is running and note your username(root), password, and port(default 3306)
  3. Open the Project in NetBeans
  4. Configure Database Credentials on DB_Connection.java
      ```java
      private static final String USERNAME = "root";
      private static final String PASSWORD = "your_password";
      private static final String URL = "jdbc:mysql://localhost:3306/";
      ```
  5. Run init_Database.java that creates the required database
  6. Configure Apache Tomcat
      1. Install Apache Tomcat 9
      2. In Netbeans go to Services → Servers to install Tomcat
      3. Set the Tomcat installation folder
      4. Provide username/password if requested
             
  7. Build and Deploy the Project
  8. Start Tomcat Server
  9. Run index.html
  10. View the database from http://localhost/phpmyadmin or MySQL workbench 
 

