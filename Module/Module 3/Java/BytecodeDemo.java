public class BytecodeDemo {
    private int value;
    private static final int CONSTANT = 42;

    public BytecodeDemo(int value) {
        this.value = value;
    }

    public int add(int x, int y) {
        return x + y;
    }

    public int multiply(int x, int y) {
        return x * y;
    }

    public void complexOperation() {
        int result = 0;
        for (int i = 0; i < 10; i++) {
            result += i * CONSTANT;
        }
        System.out.println("Result: " + result);
    }

    public static void main(String[] args) {
        BytecodeDemo demo = new BytecodeDemo(10);
        System.out.println("Addition: " + demo.add(5, 3));
        System.out.println("Multiplication: " + demo.multiply(4, 6));
        demo.complexOperation();
    }
}

/*
To inspect the bytecode of this class:
1. Compile the file: javac BytecodeDemo.java
2. Run javap: javap -c BytecodeDemo
3. For more detailed view: javap -v BytecodeDemo

The bytecode will show:
- Method signatures
- Local variable tables
- Constant pool entries
- Stack operations
- Branch instructions
*/ 