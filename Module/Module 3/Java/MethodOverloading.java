public class MethodOverloading {
    // Method to add two integers
    public static int add(int a, int b) {
        return a + b;
    }
    
    // Method to add two doubles
    public static double add(double a, double b) {
        return a + b;
    }
    
    // Method to add three integers
    public static int add(int a, int b, int c) {
        return a + b + c;
    }
    
    public static void main(String[] args) {
        // Test the overloaded methods
        System.out.println("Adding two integers: " + add(5, 10));
        System.out.println("Adding two doubles: " + add(5.5, 10.5));
        System.out.println("Adding three integers: " + add(5, 10, 15));
        
        // Demonstrate automatic type conversion
        System.out.println("Adding int and double: " + add(5, 10.5));
    }
} 