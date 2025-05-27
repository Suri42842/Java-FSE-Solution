import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class TCPServer {
    private static final int PORT = 6789;
    private static final ExecutorService threadPool = Executors.newCachedThreadPool();
    
    public static void main(String[] args) {
        try (ServerSocket serverSocket = new ServerSocket(PORT)) {
            System.out.println("Server started on port " + PORT);
            
            while (true) {
                Socket clientSocket = serverSocket.accept();
                System.out.println("New client connected: " + clientSocket.getInetAddress());
                
                // Handle client in a separate thread
                threadPool.execute(() -> handleClient(clientSocket));
            }
        } catch (Exception e) {
            System.out.println("Server error: " + e.getMessage());
        } finally {
            threadPool.shutdown();
        }
    }
    
    private static void handleClient(Socket clientSocket) {
        try (PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true);
             BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()))) {
            
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                System.out.println("Received from client: " + inputLine);
                
                // Echo the message back to client
                String response = "Echo: " + inputLine;
                out.println(response);
            }
        } catch (Exception e) {
            System.out.println("Error handling client: " + e.getMessage());
        } finally {
            try {
                clientSocket.close();
            } catch (Exception e) {
                System.out.println("Error closing client socket: " + e.getMessage());
            }
        }
    }
} 