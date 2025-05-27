import java.util.Scanner;

public class StringReversal {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter a string: ");
        String input = scanner.nextLine();
        
        // Method 1: Using StringBuilder
        StringBuilder reversed = new StringBuilder(input).reverse();
        System.out.println("Reversed string (using StringBuilder): " + reversed);
        
        // Method 2: Using character array
        char[] charArray = input.toCharArray();
        int left = 0;
        int right = charArray.length - 1;
        
        while (left < right) {
            // Swap characters
            char temp = charArray[left];
            charArray[left] = charArray[right];
            charArray[right] = temp;
            
            // Move pointers
            left++;
            right--;
        }
        
        String reversed2 = new String(charArray);
        System.out.println("Reversed string (using char array): " + reversed2);
        
        scanner.close();
    }
} 