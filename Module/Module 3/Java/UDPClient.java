import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.util.Scanner;

public class UDPClient {
    private static final String SERVER_IP = "localhost";
    private static final int SERVER_PORT = 9876;
    
    public static void main(String[] args) {
        try (DatagramSocket socket = new DatagramSocket();
             Scanner scanner = new Scanner(System.in)) {
            
            InetAddress serverAddress = InetAddress.getByName(SERVER_IP);
            
            System.out.println("UDP Client started. Enter messages (type 'exit' to quit):");
            
            while (true) {
                // Get message from user
                String message = scanner.nextLine();
                if (message.equalsIgnoreCase("exit")) {
                    break;
                }
                
                // Send message to server
                byte[] sendData = message.getBytes();
                DatagramPacket sendPacket = new DatagramPacket(
                    sendData, sendData.length, serverAddress, SERVER_PORT);
                socket.send(sendPacket);
                
                // Receive response from server
                byte[] receiveData = new byte[1024];
                DatagramPacket receivePacket = new DatagramPacket(
                    receiveData, receiveData.length);
                socket.receive(receivePacket);
                
                // Display response
                String response = new String(receivePacket.getData(), 0, receivePacket.getLength());
                System.out.println("Server response: " + response);
            }
            
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
} 