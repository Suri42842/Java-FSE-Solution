import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;

public class ExecutorServiceDemo {
    public static void main(String[] args) {
        // Create a fixed thread pool with 3 threads
        ExecutorService executor = Executors.newFixedThreadPool(3);
        List<Future<Integer>> futures = new ArrayList<>();

        try {
            // Submit multiple tasks
            for (int i = 1; i <= 5; i++) {
                final int taskId = i;
                Future<Integer> future = executor.submit(new Callable<Integer>() {
                    @Override
                    public Integer call() throws Exception {
                        System.out.println("Task " + taskId + " started");
                        // Simulate some work
                        Thread.sleep(1000 * taskId);
                        System.out.println("Task " + taskId + " completed");
                        return taskId * 10;
                    }
                });
                futures.add(future);
            }

            // Get results from futures
            System.out.println("\nGetting results from tasks:");
            for (int i = 0; i < futures.size(); i++) {
                try {
                    Integer result = futures.get(i).get();
                    System.out.println("Task " + (i + 1) + " result: " + result);
                } catch (InterruptedException | ExecutionException e) {
                    System.out.println("Error getting result for task " + (i + 1) + ": " + e.getMessage());
                }
            }

        } finally {
            // Shutdown the executor
            System.out.println("\nShutting down executor...");
            executor.shutdown();
            try {
                // Wait for all tasks to complete
                if (!executor.awaitTermination(60, TimeUnit.SECONDS)) {
                    System.out.println("Forcing shutdown...");
                    executor.shutdownNow();
                }
            } catch (InterruptedException e) {
                System.out.println("Shutdown interrupted: " + e.getMessage());
                executor.shutdownNow();
            }
        }
    }
} 