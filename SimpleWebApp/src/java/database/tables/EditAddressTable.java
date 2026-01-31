package database.tables;

import mainClasses.Address;
import database.DB_Connection;
import java.sql.*;

public class EditAddressTable {

    public void createAddressTable() throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        String query = "CREATE TABLE addresses ("
                + "address_id INT AUTO_INCREMENT PRIMARY KEY,"
                + "user_id INT,"
                + "type VARCHAR(10),"
                + "address VARCHAR(100),"
                + "FOREIGN KEY (user_id) REFERENCES new_users(user_id) ON DELETE CASCADE"
                + ")";
        stmt.execute(query);
        stmt.close();
    }

    public void addAddress(Address addr) throws ClassNotFoundException, SQLException {
        Connection con = DB_Connection.getConnection();
        PreparedStatement stmt = con.prepareStatement(
                "INSERT INTO addresses (user_id, type, address) VALUES (?, ?, ?)");

        stmt.setInt(1, addr.getUser_Id());
        stmt.setString(2, addr.getType());
        stmt.setString(3, addr.getAddress());

        stmt.executeUpdate();
        stmt.close();
    }
}
