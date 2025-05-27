import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;

class SampleClass {
    private String name;
    private int value;

    public SampleClass(String name, int value) {
        this.name = name;
        this.value = value;
    }

    public void display() {
        System.out.println("Name: " + name + ", Value: " + value);
    }

    private void privateMethod() {
        System.out.println("This is a private method");
    }
}

public class ReflectionDemo {
    public static void main(String[] args) {
        try {
            // Get Class object
            Class<?> clazz = SampleClass.class;
            System.out.println("Class Name: " + clazz.getName());

            // Get constructors
            System.out.println("\nConstructors:");
            Constructor<?>[] constructors = clazz.getDeclaredConstructors();
            for (Constructor<?> constructor : constructors) {
                System.out.println(constructor);
            }

            // Get methods
            System.out.println("\nMethods:");
            Method[] methods = clazz.getDeclaredMethods();
            for (Method method : methods) {
                System.out.println("Method: " + method.getName());
                System.out.println("Return Type: " + method.getReturnType());
                System.out.println("Modifiers: " + Modifier.toString(method.getModifiers()));
                System.out.println("Parameters: " + method.getParameterCount());
                System.out.println();
            }

            // Get fields
            System.out.println("Fields:");
            Field[] fields = clazz.getDeclaredFields();
            for (Field field : fields) {
                System.out.println("Field: " + field.getName());
                System.out.println("Type: " + field.getType());
                System.out.println("Modifiers: " + Modifier.toString(field.getModifiers()));
                System.out.println();
            }

            // Create instance using reflection
            Constructor<?> constructor = clazz.getDeclaredConstructor(String.class, int.class);
            SampleClass instance = (SampleClass) constructor.newInstance("Test", 42);

            // Access private field
            Field nameField = clazz.getDeclaredField("name");
            nameField.setAccessible(true);
            nameField.set(instance, "New Name");
            System.out.println("\nModified name: " + nameField.get(instance));

            // Call private method
            Method privateMethod = clazz.getDeclaredMethod("privateMethod");
            privateMethod.setAccessible(true);
            privateMethod.invoke(instance);

        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }
} 