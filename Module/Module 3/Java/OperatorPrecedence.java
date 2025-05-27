public class OperatorPrecedence {
    public static void main(String[] args) {
        // Example 1: Basic arithmetic
        int result1 = 10 + 5 * 2;
        System.out.println("10 + 5 * 2 = " + result1); // Multiplication has higher precedence
        
        // Example 2: Parentheses override precedence
        int result2 = (10 + 5) * 2;
        System.out.println("(10 + 5) * 2 = " + result2);
        
        // Example 3: Multiple operators
        int result3 = 10 + 5 * 2 - 3 / 3;
        System.out.println("10 + 5 * 2 - 3 / 3 = " + result3);
        
        // Example 4: Logical operators
        boolean result4 = true || false && true;
        System.out.println("true || false && true = " + result4); // && has higher precedence
        
        // Example 5: Assignment with arithmetic
        int a = 5;
        a += 3 * 2; // Equivalent to: a = a + (3 * 2)
        System.out.println("a += 3 * 2 = " + a);
        
        // Example 6: Increment and decrement
        int b = 5;
        int result6 = ++b * 2; // Pre-increment has higher precedence
        System.out.println("++b * 2 = " + result6);
    }
} 