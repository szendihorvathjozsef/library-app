package com.amp3rr.library.controllers

import com.amp3rr.library.domain.Category
import com.amp3rr.library.repositories.CategoryRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

/**
 * @author szend
 */
@RestController
@RequestMapping("/categories")
class CategoryController(private val categoryRepository: CategoryRepository) {

    @GetMapping
    fun list(): ResponseEntity<List<Category>> = ResponseEntity.ok(categoryRepository.findAll())

    @GetMapping("/{id}")
    fun get(@PathVariable id: Long?): ResponseEntity<Category> {
        if (id == null) {
            return ResponseEntity.notFound().build()
        }

        return ResponseEntity.of(categoryRepository.findById(id));
    }

    @PostMapping
    fun create(@Valid @RequestBody category: Category): ResponseEntity<Category> {
        if (category.id != null) {
            return ResponseEntity.badRequest().build();
        }

        val saved = categoryRepository.save(category)

        return ResponseEntity.ok(saved)
    }

    @PutMapping("/{id}")
    fun update(@PathVariable id: Long?, @Valid @RequestBody category: Category): ResponseEntity<Category> {
        if (id == null) {
            return ResponseEntity.badRequest().build();
        }

        val saved = categoryRepository.save(category)

        return ResponseEntity.ok(saved)
    }

}