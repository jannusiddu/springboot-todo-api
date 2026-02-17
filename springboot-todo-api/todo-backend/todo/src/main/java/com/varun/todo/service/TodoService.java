package com.varun.todo.service;

import com.varun.todo.model.Todo;
import com.varun.todo.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    private final TodoRepository repo;

    public TodoService(TodoRepository repo) {
        this.repo = repo;
    }

    public Todo create(Todo todo) {
        return repo.save(todo);
    }

    public List<Todo> getAll() {
        return repo.findAll();
    }

    public Todo update(Long id, Todo updated) {
        Todo todo = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        todo.setTitle(updated.getTitle());
        todo.setDescription(updated.getDescription());
        todo.setCompleted(updated.isCompleted());

        return repo.save(todo);
    }

    public void delete(Long id) {

        if (!repo.existsById(id)) {
            throw new RuntimeException("Todo not found");
        }

        repo.deleteById(id);
    }

    public List<Todo> filterByStatus(Boolean completed) {
        return repo.findByCompleted(completed);
    }

}
