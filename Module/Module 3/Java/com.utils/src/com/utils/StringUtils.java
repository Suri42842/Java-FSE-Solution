package com.utils;

public class StringUtils {
    public static String reverse(String input) {
        return new StringBuilder(input).reverse().toString();
    }

    public static boolean isPalindrome(String input) {
        String clean = input.toLowerCase().replaceAll("[^a-z0-9]", "");
        return clean.equals(reverse(clean));
    }

    public static int wordCount(String input) {
        return input.trim().split("\\s+").length;
    }
} 