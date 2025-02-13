package com.todo_app.controller;

import com.todo_app.model.Task;
import com.todo_app.model.TaskRequest;
import com.todo_app.model.UpdateRequest;
import com.todo_app.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/load")
    public List<Task> loadTasks() {
        return taskService.load();
    }

    @GetMapping("/count")
    public Integer getCount() {
        return taskService.getCount();
    }

    @PostMapping("/add")
    public ResponseEntity<?> addTask(@RequestBody TaskRequest request) {
        return taskService.add(request);
    }

    @PutMapping("/update/{taskId}")
    public ResponseEntity<?> updateTask(@RequestBody UpdateRequest request, @PathVariable String taskId) {
        return taskService.update(Long.parseLong(taskId), request);
    }

    @DeleteMapping("/delete/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable String taskId) {
        return taskService.delete(Long.parseLong(taskId));
    }
}
