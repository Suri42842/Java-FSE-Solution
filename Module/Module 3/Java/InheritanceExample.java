// Base class
class Animal {
    protected String name;
    
    public Animal(String name) {
        this.name = name;
    }
    
    public void makeSound() {
        System.out.println("Some generic animal sound");
    }
    
    public void displayInfo() {
        System.out.println("Name: " + name);
    }
}

// Derived class
class Dog extends Animal {
    private String breed;
    
    public Dog(String name, String breed) {
        super(name);
        this.breed = breed;
    }
    
    @Override
    public void makeSound() {
        System.out.println("Woof! Woof!");
    }
    
    public void displayDogInfo() {
        displayInfo();
        System.out.println("Breed: " + breed);
    }
}

public class InheritanceExample {
    public static void main(String[] args) {
        // Create Animal object
        Animal animal = new Animal("Generic Animal");
        System.out.println("Animal:");
        animal.displayInfo();
        animal.makeSound();
        
        System.out.println("\nDog:");
        // Create Dog object
        Dog dog = new Dog("Buddy", "Golden Retriever");
        dog.displayDogInfo();
        dog.makeSound();
    }
} 