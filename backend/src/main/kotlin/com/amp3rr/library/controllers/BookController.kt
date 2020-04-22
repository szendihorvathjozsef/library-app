package com.amp3rr.library.controllers

import com.amp3rr.library.domain.Book
import com.amp3rr.library.repositories.BookRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

/**
 * @author szend
 */
@RestController
@RequestMapping("/books")
class BookController(private val bookRepository: BookRepository) {

    @GetMapping
    fun list(): ResponseEntity<List<Book>> = ResponseEntity.ok(bookRepository.findAll())

    @GetMapping("/{id}")
    fun get(@PathVariable id: Long?): ResponseEntity<Book> {
        if (id == null) {
            return ResponseEntity.notFound().build()
        }

        return ResponseEntity.of(bookRepository.findById(id));
    }

    @GetMapping("/publisher/{id}")
    fun listByPublisher(@PathVariable id: Long?): ResponseEntity<List<Book>> {
        if (id == null) {
            return ResponseEntity.notFound().build()
        }

        return ResponseEntity.ok(bookRepository.findAllByPublisherId(id))
    }

    @PostMapping
    fun create(@Valid @RequestBody book: Book): ResponseEntity<Book> {
        if (book.id != null) {
            return ResponseEntity.badRequest().build();
        }

        val saved = bookRepository.save(book)

        return ResponseEntity.ok(saved)
    }

    @PutMapping("/{id}")
    fun update(@PathVariable id: Long?, @Valid @RequestBody book: Book): ResponseEntity<Book> {
        if (id == null) {
            return ResponseEntity.badRequest().build();
        }

        val saved = bookRepository.save(book)

        return ResponseEntity.ok(saved)
    }

}