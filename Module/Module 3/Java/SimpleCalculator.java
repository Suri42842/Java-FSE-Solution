import java.util.Scanner;

public class SimpleCalculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // Get first number
        System.out.print("Enter first number: ");
        double num1 = scanner.nextDouble();
        
        // Get second number
        System.out.print("Enter second number: ");
        double num2 = scanner.nextDouble();
        
        // Display operation choices
        System.out.println("\nChoose operation:");
        System.out.println("1. Addition (+)");
        System.out.println("2. Subtraction (-)");
        System.out.println("3. Multiplication (*)");
        System.out.println("4. Division (/)");
        
        System.out.print("Enter choice (1-4): ");
        int choice = scanner.nextInt();
        
        double result = 0;
        
        // Perform calculation based on user's choice
        switch (choice) {
            case 1:
                result = num1 + num2;
                System.out.printf("%.2f + %.2f = %.2f", num1, num2, result);
                break;
            case 2:
                result = num1 - num2;
                System.out.printf("%.2f - %.2f = %.2f", num1, num2, result);
                break;
            case 3:
                result = num1 * num2;
                System.out.printf("%.2f * %.2f = %.2f", num1, num2, result);
                break;
            case 4:
                if (num2 != 0) {
                    result = num1 / num2;
                    System.out.printf("%.2f / %.2f = %.2f", num1, num2, result);
                } else {
                    System.out.println("Error: Cannot divide by zero!");
                }
                break;
            default:
                System.out.println("Invalid choice!");
        }
        
        scanner.close();
    }
} 