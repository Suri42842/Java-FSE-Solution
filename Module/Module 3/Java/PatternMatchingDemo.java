public class PatternMatchingDemo {
    public static void processObject(Object obj) {
        // Pattern matching with instanceof
        if (obj instanceof String s) {
            System.out.println("String: " + s.toUpperCase());
        } else if (obj instanceof Integer i) {
            System.out.println("Integer: " + (i * 2));
        } else if (obj instanceof Double d) {
            System.out.println("Double: " + (d + 1.0));
        } else if (obj instanceof Boolean b) {
            System.out.println("Boolean: " + (!b));
        } else {
            System.out.println("Unknown type: " + obj.getClass().getName());
        }
    }
    
    public static void main(String[] args) {
        // Test with different types
        System.out.println("Testing pattern matching with different types:");
        
        processObject("Hello");
        processObject(42);
        processObject(3.14);
        processObject(true);
        processObject(new Object());
        
        // Pattern matching in switch expression (Java 21+)
        System.out.println("\nTesting pattern matching in switch:");
        Object[] objects = {"Hello", 42, 3.14, true, new Object()};
        
        for (Object obj : objects) {
            String result = switch (obj) {
                case String s -> "String: " + s;
                case Integer i -> "Integer: " + i;
                case Double d -> "Double: " + d;
                case Boolean b -> "Boolean: " + b;
                default -> "Unknown type";
            };
            System.out.println(result);
        }
    }
} 