package com.utils;

// RecordDemo.java - Demonstrating Java Records
public class RecordDemo {
    // Define a record for a Point
    record Point(int x, int y) {
        // Records can have additional methods
        public double distanceFromOrigin() {
            return Math.sqrt(x * x + y * y);
        }
    }

    // Define a record for a Person
    record Person(String name, int age, String address) {
        // Records can have static fields
        public static final String DEFAULT_ADDRESS = "Unknown";
        
        // Records can have compact constructors
        public Person {
            if (age < 0) {
                throw new IllegalArgumentException("Age cannot be negative");
            }
            if (name == null || name.trim().isEmpty()) {
                throw new IllegalArgumentException("Name cannot be empty");
            }
        }
    }

    public static void main(String[] args) {
        // Create and use Point record
        Point p1 = new Point(3, 4);
        System.out.println("Point: " + p1);
        System.out.println("X coordinate: " + p1.x());
        System.out.println("Y coordinate: " + p1.y());
        System.out.println("Distance from origin: " + p1.distanceFromOrigin());

        // Create and use Person record
        Person person = new Person("John Doe", 30, "123 Main St");
        System.out.println("\nPerson: " + person);
        System.out.println("Name: " + person.name());
        System.out.println("Age: " + person.age());
        System.out.println("Address: " + person.address());

        // Demonstrate record immutability
        Point p2 = new Point(5, 6);
        System.out.println("\nOriginal Point: " + p2);
        // Records are immutable, so we can't modify their fields
        // Instead, we create a new instance
        Point p3 = new Point(p2.x() + 1, p2.y() + 1);
        System.out.println("Modified Point: " + p3);

        // Demonstrate record equality
        Point p4 = new Point(3, 4);
        System.out.println("\nPoint equality:");
        System.out.println("p1: " + p1);
        System.out.println("p4: " + p4);
        System.out.println("p1 equals p4: " + p1.equals(p4));
        System.out.println("p1 hashCode: " + p1.hashCode());
        System.out.println("p4 hashCode: " + p4.hashCode());
    }
} 