import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.Scanner;

public class TCPClient {
    private static final String SERVER_IP = "localhost";
    private static final int SERVER_PORT = 6789;
    
    public static void main(String[] args) {
        try (Socket socket = new Socket(SERVER_IP, SERVER_PORT);
             PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
             BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
             Scanner scanner = new Scanner(System.in)) {
            
            System.out.println("Connected to server at " + SERVER_IP + ":" + SERVER_PORT);
            
            // Start a thread to receive messages from server
            Thread receiveThread = new Thread(() -> {
                try {
                    String response;
                    while ((response = in.readLine()) != null) {
                        System.out.println("Server: " + response);
                    }
                } catch (Exception e) {
                    System.out.println("Error receiving message: " + e.getMessage());
                }
            });
            receiveThread.start();
            
            // Send messages to server
            System.out.println("Enter messages (type 'exit' to quit):");
            String message;
            while (!(message = scanner.nextLine()).equalsIgnoreCase("exit")) {
                out.println(message);
            }
            
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
} 