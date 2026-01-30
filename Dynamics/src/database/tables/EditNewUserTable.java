/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package database.tables;

import mainClasses.NewUser;
import com.google.gson.Gson;
import database.DB_Connection;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author gerry
 */
public class EditNewUserTable {
    public void addNewUserFromJSON(String json) throws ClassNotFoundException {
        NewUser user = jsonToNewUser(json);
        addNewUser(user);
    }

    public NewUser jsonToNewUser(String json) {
        Gson gson = new Gson();

        NewUser user = gson.fromJson(json, NewUser.class);
        return user;
    }

    public String NewUserToJSON(NewUser user) {
        Gson gson = new Gson();

        String json = gson.toJson(user, NewUser.class);
        return json;
    }

    public String usersToJSON(ArrayList<NewUser> users) {
        Gson gson = new Gson();
        return gson.toJson(users);
    }

    public void createNewUserTable() throws SQLException, ClassNotFoundException {

        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        String query = "CREATE TABLE new_users "
                + "(user_id INTEGER not NULL AUTO_INCREMENT, "
                + "    name VARCHAR(30) not null unique,"
                + "    surname VARCHAR(30) not null,"
                + "    birthdate DATE not null,"
                + "    gender VARCHAR(7) not null,"
                + "    homeaddress VARCHAR(50) not null,"
                + "    workaddress VARCHAR(50) not null,"
                + " PRIMARY KEY ( user_id))";
        stmt.execute(query);
        stmt.close();
    }

    /**
     * Establish a database connection and add in the database.
     *
     * @param user
     * @throws ClassNotFoundException
     */
    public void addNewUser(NewUser user) throws ClassNotFoundException {
        try {
            Connection con = DB_Connection.getConnection();

            Statement stmt = con.createStatement();

            String insertQuery = "INSERT INTO "
                    + " new_users (name,surname,birthdate,gender,homeaddress,workaddress)"
                    + " VALUES ("
                    + "'" + user.getName() + "',"
                    + "'" + user.getSurname() + "',"
                    + "'" + user.getBirthdate() + "',"
                    + "'" + user.getGender() + "',"
                    + "'" + user.getHomeAddress() + "',"
                    + "'" + user.getWorkAddress() + "'"
                    + ")";
            //stmt.execute(table);
            System.out.println(insertQuery);
            stmt.executeUpdate(insertQuery);
            System.out.println("# The user was successfully added in the database.");

            /* Get the member id from the database and set it to the member */
            stmt.close();

        } catch (SQLException ex) {
            Logger.getLogger(EditNewUserTable.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    public ArrayList<NewUser> getAllUsers() throws ClassNotFoundException {
        ArrayList<NewUser> users = new ArrayList<>();

        try {
            Connection con = DB_Connection.getConnection();
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM new_users");

            while (rs.next()) {
                NewUser user = new NewUser();
                user.setUser_Id(rs.getInt("user_id"));
                user.setName(rs.getString("name"));
                user.setSurname(rs.getString("surname"));
                user.setBirthdate(rs.getString("birthdate"));
                user.setGender(rs.getString("gender"));
                user.setHomeAddress(rs.getString("homeaddress"));
                user.setWorkAddress(rs.getString("workaddress"));
                users.add(user);
            }

            rs.close();
            stmt.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }

        return users;
    }

    public void deleteUser(NewUser user) throws ClassNotFoundException {
        try {
            Connection con = DB_Connection.getConnection();

            Statement stmt = con.createStatement();

            String deleteQuery = "DELETE FROM "
                    + " new_users WHERE user_id= " + user.getUser_Id();

            //stmt.execute(table);
            System.out.println(deleteQuery);
            stmt.executeUpdate(deleteQuery);
            System.out.println("# The user was successfully deleted from the database.");

            /* Get the member id from the database and set it to the member */
            stmt.close();

        } catch (SQLException ex) {
            Logger.getLogger(EditNewUserTable.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
