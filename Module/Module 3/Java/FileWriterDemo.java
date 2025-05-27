import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class FileWriterDemo {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        try {
            // Create FileWriter object
            FileWriter writer = new FileWriter("output.txt");
            
            System.out.println("Enter text to write to file (type 'exit' to finish):");
            String line;
            
            while (true) {
                line = scanner.nextLine();
                if (line.equalsIgnoreCase("exit")) {
                    break;
                }
                writer.write(line + "\n");
            }
            
            // Close the writer
            writer.close();
            System.out.println("Data has been written to output.txt successfully!");
            
        } catch (IOException e) {
            System.out.println("Error writing to file: " + e.getMessage());
        } finally {
            scanner.close();
        }
    }
} 