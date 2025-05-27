import java.util.ArrayList;
import java.util.Scanner;

public class ArrayListDemo {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        ArrayList<String> names = new ArrayList<>();
        
        System.out.println("Enter student names (type 'done' to finish):");
        
        // Add names to ArrayList
        while (true) {
            String name = scanner.nextLine();
            if (name.equalsIgnoreCase("done")) {
                break;
            }
            names.add(name);
        }
        
        // Display all names
        System.out.println("\nStudent Names:");
        for (String name : names) {
            System.out.println(name);
        }
        
        // Demonstrate ArrayList operations
        System.out.println("\nArrayList Operations:");
        System.out.println("Size: " + names.size());
        
        if (!names.isEmpty()) {
            System.out.println("First name: " + names.get(0));
            System.out.println("Last name: " + names.get(names.size() - 1));
            
            // Remove first name
            String removed = names.remove(0);
            System.out.println("Removed: " + removed);
            
            System.out.println("\nUpdated list:");
            for (String name : names) {
                System.out.println(name);
            }
        }
        
        scanner.close();
    }
} 