package com.todo_app.repository;

import com.todo_app.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByDone(Boolean done);
    boolean existsByText(String text);
}
