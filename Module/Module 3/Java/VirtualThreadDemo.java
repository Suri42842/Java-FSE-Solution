import java.time.Duration;
import java.util.concurrent.atomic.AtomicInteger;

public class VirtualThreadDemo {
    private static final int THREAD_COUNT = 100_000;
    private static final AtomicInteger completedTasks = new AtomicInteger(0);

    public static void main(String[] args) {
        System.out.println("Starting Virtual Thread Demo");
        long startTime = System.currentTimeMillis();

        // Create and start virtual threads
        for (int i = 0; i < THREAD_COUNT; i++) {
            final int threadNum = i;
            Thread.startVirtualThread(() -> {
                try {
                    // Simulate some work
                    Thread.sleep(Duration.ofMillis(100));
                    System.out.println("Virtual Thread " + threadNum + " completed");
                    completedTasks.incrementAndGet();
                } catch (InterruptedException e) {
                    System.out.println("Thread " + threadNum + " interrupted");
                }
            });
        }

        // Wait for all threads to complete
        while (completedTasks.get() < THREAD_COUNT) {
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                System.out.println("Main thread interrupted");
            }
        }

        long endTime = System.currentTimeMillis();
        System.out.println("\nAll virtual threads completed!");
        System.out.println("Total time: " + (endTime - startTime) + "ms");
        System.out.println("Total threads completed: " + completedTasks.get());

        // Compare with platform threads
        System.out.println("\nNow testing with platform threads...");
        testPlatformThreads();
    }

    private static void testPlatformThreads() {
        completedTasks.set(0);
        long startTime = System.currentTimeMillis();

        // Create and start platform threads
        Thread[] threads = new Thread[THREAD_COUNT];
        for (int i = 0; i < THREAD_COUNT; i++) {
            final int threadNum = i;
            threads[i] = new Thread(() -> {
                try {
                    // Simulate some work
                    Thread.sleep(100);
                    System.out.println("Platform Thread " + threadNum + " completed");
                    completedTasks.incrementAndGet();
                } catch (InterruptedException e) {
                    System.out.println("Thread " + threadNum + " interrupted");
                }
            });
            threads[i].start();
        }

        // Wait for all threads to complete
        for (Thread thread : threads) {
            try {
                thread.join();
            } catch (InterruptedException e) {
                System.out.println("Main thread interrupted while joining");
            }
        }

        long endTime = System.currentTimeMillis();
        System.out.println("\nAll platform threads completed!");
        System.out.println("Total time: " + (endTime - startTime) + "ms");
        System.out.println("Total threads completed: " + completedTasks.get());
    }
} 