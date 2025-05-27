import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class StreamDemo {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        // Filter even numbers
        System.out.println("Even numbers:");
        numbers.stream()
               .filter(n -> n % 2 == 0)
               .forEach(n -> System.out.print(n + " "));
        
        // Map to squares
        System.out.println("\n\nSquares of numbers:");
        numbers.stream()
               .map(n -> n * n)
               .forEach(n -> System.out.print(n + " "));
        
        // Sum of all numbers
        int sum = numbers.stream()
                        .mapToInt(Integer::intValue)
                        .sum();
        System.out.println("\n\nSum of all numbers: " + sum);
        
        // Find maximum
        int max = numbers.stream()
                        .mapToInt(Integer::intValue)
                        .max()
                        .orElse(0);
        System.out.println("Maximum number: " + max);
        
        // Collect to new list
        List<Integer> doubledNumbers = numbers.stream()
                                            .map(n -> n * 2)
                                            .collect(Collectors.toList());
        System.out.println("\nDoubled numbers: " + doubledNumbers);
        
        // Count numbers greater than 5
        long count = numbers.stream()
                           .filter(n -> n > 5)
                           .count();
        System.out.println("Count of numbers > 5: " + count);
    }
} 