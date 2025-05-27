import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;

public class TransactionDemo {
    private static final String URL = "jdbc:mysql://localhost:3306/bankdb";
    private static final String USER = "root";
    private static final String PASSWORD = "password";
    
    public static void main(String[] args) {
        try {
            // Register JDBC driver
            Class.forName("com.mysql.cj.jdbc.Driver");
            
            // Establish connection
            try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD)) {
                // Create accounts table
                createAccountsTable(conn);
                
                // Insert initial data
                insertAccount(conn, 1, "John", 1000.0);
                insertAccount(conn, 2, "Jane", 500.0);
                
                // Perform transfer
                transferMoney(conn, 1, 2, 300.0);
            }
        } catch (ClassNotFoundException e) {
            System.out.println("MySQL JDBC Driver not found: " + e.getMessage());
        } catch (SQLException e) {
            System.out.println("Database error: " + e.getMessage());
        }
    }
    
    private static void createAccountsTable(Connection conn) throws SQLException {
        String sql = "CREATE TABLE IF NOT EXISTS accounts (" +
                    "id INT PRIMARY KEY, " +
                    "name VARCHAR(100), " +
                    "balance DOUBLE)";
        
        try (Statement stmt = conn.createStatement()) {
            stmt.execute(sql);
            System.out.println("Accounts table created successfully");
        }
    }
    
    private static void insertAccount(Connection conn, int id, String name, double balance) throws SQLException {
        String sql = "INSERT INTO accounts (id, name, balance) VALUES (?, ?, ?)";
        
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            pstmt.setString(2, name);
            pstmt.setDouble(3, balance);
            pstmt.executeUpdate();
            System.out.println("Account created successfully");
        }
    }
    
    private static void transferMoney(Connection conn, int fromId, int toId, double amount) throws SQLException {
        try {
            // Start transaction
            conn.setAutoCommit(false);
            
            // Debit from first account
            String debitSql = "UPDATE accounts SET balance = balance - ? WHERE id = ?";
            try (PreparedStatement pstmt = conn.prepareStatement(debitSql)) {
                pstmt.setDouble(1, amount);
                pstmt.setInt(2, fromId);
                pstmt.executeUpdate();
            }
            
            // Credit to second account
            String creditSql = "UPDATE accounts SET balance = balance + ? WHERE id = ?";
            try (PreparedStatement pstmt = conn.prepareStatement(creditSql)) {
                pstmt.setDouble(1, amount);
                pstmt.setInt(2, toId);
                pstmt.executeUpdate();
            }
            
            // Commit transaction
            conn.commit();
            System.out.println("Transfer completed successfully");
            
        } catch (SQLException e) {
            // Rollback transaction on error
            try {
                conn.rollback();
                System.out.println("Transaction rolled back due to error: " + e.getMessage());
            } catch (SQLException ex) {
                System.out.println("Error during rollback: " + ex.getMessage());
            }
            throw e;
        } finally {
            // Reset auto-commit
            conn.setAutoCommit(true);
        }
    }
} 