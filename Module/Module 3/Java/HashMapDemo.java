import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class HashMapDemo {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Map<Integer, String> studentMap = new HashMap<>();
        
        System.out.println("Enter student details (ID and Name):");
        System.out.println("Enter 'done' to finish");
        
        while (true) {
            System.out.print("Enter student ID (or 'done'): ");
            String input = scanner.nextLine();
            
            if (input.equalsIgnoreCase("done")) {
                break;
            }
            
            try {
                int id = Integer.parseInt(input);
                System.out.print("Enter student name: ");
                String name = scanner.nextLine();
                
                studentMap.put(id, name);
            } catch (NumberFormatException e) {
                System.out.println("Invalid ID! Please enter a number.");
            }
        }
        
        // Display all students
        System.out.println("\nStudent Records:");
        for (Map.Entry<Integer, String> entry : studentMap.entrySet()) {
            System.out.println("ID: " + entry.getKey() + ", Name: " + entry.getValue());
        }
        
        // Search for a student
        System.out.print("\nEnter student ID to search: ");
        try {
            int searchId = Integer.parseInt(scanner.nextLine());
            String studentName = studentMap.get(searchId);
            
            if (studentName != null) {
                System.out.println("Found student: " + studentName);
            } else {
                System.out.println("Student not found!");
            }
        } catch (NumberFormatException e) {
            System.out.println("Invalid ID format!");
        }
        
        scanner.close();
    }
} 