public class DecompileDemo {
    private String message;
    private int count;
    private static final double PI = 3.14159;

    public DecompileDemo(String message) {
        this.message = message;
        this.count = 0;
    }

    public void incrementCount() {
        count++;
    }

    public String getMessage() {
        return message;
    }

    public int getCount() {
        return count;
    }

    public double calculateArea(double radius) {
        return PI * radius * radius;
    }

    public static void main(String[] args) {
        DecompileDemo demo = new DecompileDemo("Hello from DecompileDemo");
        demo.incrementCount();
        System.out.println("Message: " + demo.getMessage());
        System.out.println("Count: " + demo.getCount());
        System.out.println("Area of circle with radius 5: " + demo.calculateArea(5.0));
    }
} 