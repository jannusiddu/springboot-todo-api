package com.varun.todo.controller;

import com.varun.todo.model.Todo;
import com.varun.todo.service.TodoService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin("*")
public class TodoController {

    private final TodoService service;

    public TodoController(TodoService service) {
        this.service = service;
    }

    @PostMapping
    public Todo create(@Valid @RequestBody Todo todo) {
        return service.create(todo);
    }

    @GetMapping
    public List<Todo> getTodos(
            @RequestParam(required = false) Boolean completed) {

        if (completed != null) {
            return service.filterByStatus(completed);
        }

        return service.getAll();
    }

    @PutMapping("/{id}")
    public Todo update(@PathVariable Long id,
            @RequestBody Todo todo) {
        return service.update(id, todo);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
