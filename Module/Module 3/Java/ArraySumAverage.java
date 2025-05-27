import java.util.Scanner;

public class ArraySumAverage {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter the number of elements: ");
        int n = scanner.nextInt();
        
        if (n <= 0) {
            System.out.println("Error: Please enter a positive number of elements.");
            return;
        }
        
        int[] numbers = new int[n];
        int sum = 0;
        
        // Read array elements
        for (int i = 0; i < n; i++) {
            System.out.print("Enter element " + (i + 1) + ": ");
            numbers[i] = scanner.nextInt();
            sum += numbers[i];
        }
        
        // Calculate average
        double average = (double) sum / n;
        
        // Display results
        System.out.println("\nArray elements:");
        for (int number : numbers) {
            System.out.print(number + " ");
        }
        
        System.out.println("\nSum: " + sum);
        System.out.println("Average: " + average);
        
        scanner.close();
    }
} 