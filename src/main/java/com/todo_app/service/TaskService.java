package com.todo_app.service;

import com.todo_app.model.Task;
import com.todo_app.model.TaskRequest;
import com.todo_app.model.UpdateRequest;
import com.todo_app.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> load() {
        return taskRepository.findAll();
    }

    public Integer getCount() {
        return taskRepository.findAllByDone(false).toArray().length;
    }

    public ResponseEntity<?> add(TaskRequest request) {
        if (taskRepository.existsByText(request.getText()))
            return ResponseEntity.badRequest().body("Task with the same name already exists!");

        Task task = new Task();
        task.setText(request.getText());
        task.setDone(false);
        taskRepository.save(task);
        return ResponseEntity.ok("Task created successfully!");
    }

    public ResponseEntity<?> update(Long taskId, UpdateRequest request) {
        if (!taskRepository.existsById(taskId))
            return ResponseEntity.badRequest().body("Task with this id does not exist!");

        Task task = taskRepository.findById(taskId).get();
        task.setDone(request.isDone());
        taskRepository.save(task);

        return ResponseEntity.ok("Task updated successfully!");
    }

    public ResponseEntity<?> delete(Long taskId) {
        if (!taskRepository.existsById(taskId))
            return ResponseEntity.badRequest().body("Task with this id does not exist!");

        taskRepository.deleteById(taskId);
        return ResponseEntity.ok("Task deleted successfully!");
    }
}
