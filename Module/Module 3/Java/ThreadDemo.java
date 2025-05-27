class MessagePrinter implements Runnable {
    private String message;
    private int count;
    
    public MessagePrinter(String message, int count) {
        this.message = message;
        this.count = count;
    }
    
    @Override
    public void run() {
        for (int i = 0; i < count; i++) {
            System.out.println(message + " " + (i + 1));
            try {
                Thread.sleep(1000); // Sleep for 1 second
            } catch (InterruptedException e) {
                System.out.println("Thread interrupted!");
            }
        }
    }
}

public class ThreadDemo {
    public static void main(String[] args) {
        // Create two threads
        Thread thread1 = new Thread(new MessagePrinter("Thread 1 message", 5));
        Thread thread2 = new Thread(new MessagePrinter("Thread 2 message", 5));
        
        System.out.println("Starting threads...");
        
        // Start the threads
        thread1.start();
        thread2.start();
        
        try {
            // Wait for both threads to complete
            thread1.join();
            thread2.join();
        } catch (InterruptedException e) {
            System.out.println("Main thread interrupted!");
        }
        
        System.out.println("All threads completed!");
    }
} 