import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.Predicate;

public class LambdaDemo {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();
        names.add("Alice");
        names.add("Bob");
        names.add("Charlie");
        names.add("David");
        names.add("Eve");
        
        // Using lambda with Consumer
        System.out.println("Using Consumer lambda:");
        Consumer<String> printName = name -> System.out.println("Name: " + name);
        names.forEach(printName);
        
        // Using lambda with Predicate
        System.out.println("\nNames starting with 'A':");
        Predicate<String> startsWithA = name -> name.startsWith("A");
        names.stream()
             .filter(startsWithA)
             .forEach(printName);
        
        // Using lambda with Comparator
        System.out.println("\nSorted names:");
        names.sort((name1, name2) -> name1.compareTo(name2));
        names.forEach(printName);
        
        // Using lambda with Runnable
        System.out.println("\nUsing Runnable lambda:");
        Runnable task = () -> {
            for (int i = 0; i < 3; i++) {
                System.out.println("Running task " + (i + 1));
            }
        };
        task.run();
    }
} 