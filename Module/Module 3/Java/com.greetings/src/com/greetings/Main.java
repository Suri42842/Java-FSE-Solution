package com.greetings;

import com.utils.StringUtils;

public class Main {
    public static void main(String[] args) {
        String message = "Hello, Java Modules!";
        
        System.out.println("Original message: " + message);
        System.out.println("Reversed: " + StringUtils.reverse(message));
        System.out.println("Word count: " + StringUtils.wordCount(message));
        
        String palindrome = "A man, a plan, a canal: Panama";
        System.out.println("\nIs '" + palindrome + "' a palindrome? " + 
            StringUtils.isPalindrome(palindrome));
    }
}

/*
To compile and run the modules:
1. Compile utils module:
   javac -d mods/com.utils com.utils/src/module-info.java com.utils/src/com/utils/StringUtils.java

2. Compile greetings module:
   javac --module-path mods -d mods/com.greetings com.greetings/src/module-info.java com.greetings/src/com/greetings/Main.java

3. Run the application:
   java --module-path mods -m com.greetings/com.greetings.Main
*/ 