public class TypeCastingDemo {
    public static void main(String[] args) {
        // Implicit casting (Widening)
        int intValue = 100;
        long longValue = intValue;    // int to long
        float floatValue = longValue; // long to float
        double doubleValue = floatValue; // float to double
        
        System.out.println("Implicit Casting:");
        System.out.println("int to long: " + longValue);
        System.out.println("long to float: " + floatValue);
        System.out.println("float to double: " + doubleValue);
        
        // Explicit casting (Narrowing)
        double doubleNum = 100.04;
        long longNum = (long) doubleNum;    // double to long
        int intNum = (int) longNum;         // long to int
        byte byteNum = (byte) intNum;       // int to byte
        
        System.out.println("\nExplicit Casting:");
        System.out.println("double to long: " + longNum);
        System.out.println("long to int: " + intNum);
        System.out.println("int to byte: " + byteNum);
        
        // Data loss in explicit casting
        double largeDouble = 123456.789;
        int intFromDouble = (int) largeDouble;
        System.out.println("\nData Loss Example:");
        System.out.println("Original double: " + largeDouble);
        System.out.println("After casting to int: " + intFromDouble);
    }
} 