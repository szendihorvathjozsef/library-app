package com.amp3rr.library.controllers

import org.springframework.http.ResponseEntity
import com.amp3rr.library.domain.Author
import com.amp3rr.library.repositories.AuthorRepository
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

/**
 * @author szend
 */

@RestController
@RequestMapping("/authors")
class AuthorController(private val authorRepository: AuthorRepository) {

    @GetMapping
    fun list(): ResponseEntity<List<Author>> {
        return ResponseEntity.ok(authorRepository.findAll())
    }

    @GetMapping("/{id}")
    fun get(@PathVariable id: Long?): ResponseEntity<Author> {
        if (id == null) {
            return ResponseEntity.notFound().build()
        }

        return ResponseEntity.of(authorRepository.findById(id));
    }

    @PostMapping
    fun create(@Valid @RequestBody author: Author): ResponseEntity<Author> {
        if (author.id != null) {
            return ResponseEntity.badRequest().build();
        }

        val saved = authorRepository.save(author)

        return ResponseEntity.ok(saved)
    }

    @PutMapping("/{id}")
    fun update(@PathVariable id: Long?, @Valid @RequestBody author: Author): ResponseEntity<Author> {
        if (id == null) {
            return ResponseEntity.badRequest().build();
        }

        val saved = authorRepository.save(author)

        return ResponseEntity.ok(saved)
    }

}