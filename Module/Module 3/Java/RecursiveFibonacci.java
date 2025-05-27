import java.util.Scanner;

public class RecursiveFibonacci {
    public static int fibonacci(int n) {
        if (n <= 1) {
            return n;
        }
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter a positive integer: ");
        int n = scanner.nextInt();
        
        if (n < 0) {
            System.out.println("Error: Please enter a non-negative number.");
        } else {
            System.out.println("Fibonacci number at position " + n + " is: " + fibonacci(n));
            
            // Display the Fibonacci sequence up to n
            System.out.println("\nFibonacci sequence up to position " + n + ":");
            for (int i = 0; i <= n; i++) {
                System.out.print(fibonacci(i) + " ");
            }
        }
        
        scanner.close();
    }
} 