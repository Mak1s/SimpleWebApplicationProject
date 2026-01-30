
package database.init;

import database.init.InitDatabase;
import static database.DB_Connection.getInitialConnection;
import database.tables.EditNewUserTable;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

public class InitDatabase {

    public static void main(String[] args) throws SQLException, ClassNotFoundException {
        InitDatabase init = new InitDatabase();
        init.initDatabase();
        init.initTables();
        init.addToDatabaseExamples();
        init.updateRecords();
        init.databaseToJSON();

        // init.deleteRecords();
    }

    public void initDatabase() throws SQLException, ClassNotFoundException {
        Connection conn = getInitialConnection();
        Statement stmt = conn.createStatement();
        stmt.execute("CREATE DATABASE DYNAMICS");
        stmt.close();
        conn.close();
    }

    public void initTables() throws SQLException, ClassNotFoundException {
        EditNewUserTable newusertable = new EditNewUserTable();
        newusertable.createNewUserTable();

    }

    public void addToDatabaseExamples() throws ClassNotFoundException, SQLException {
        //Users

    }

    public void databaseToJSON() throws ClassNotFoundException, SQLException {
        //Users

    }

    public void updateRecords() throws ClassNotFoundException, SQLException {


    }


}
