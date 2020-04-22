package com.amp3rr.library.controllers

import com.amp3rr.library.domain.Publisher
import com.amp3rr.library.repositories.PublisherRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

/**
 * @author szend
 */
@RestController
@RequestMapping("/publishers")
class PublisherController(val publisherRepository: PublisherRepository) {

    @GetMapping
    fun list(): ResponseEntity<List<Publisher>> = ResponseEntity.ok(publisherRepository.findAll())

    @GetMapping("/{id}")
    fun get(@PathVariable id: Long?): ResponseEntity<Publisher> {
        if (id == null) {
            return ResponseEntity.notFound().build()
        }

        return ResponseEntity.of(publisherRepository.findById(id));
    }

    @PostMapping
    fun create(@Valid @RequestBody publisher: Publisher): ResponseEntity<Publisher> {
        if (publisher.id != null) {
            return ResponseEntity.badRequest().build();
        }

        val saved = publisherRepository.save(publisher)

        return ResponseEntity.ok(saved)
    }

    @PutMapping("/{id}")
    fun update(@PathVariable id: Long?, @Valid @RequestBody publisher: Publisher): ResponseEntity<Publisher> {
        if (id == null) {
            return ResponseEntity.badRequest().build();
        }

        val saved = publisherRepository.save(publisher)

        return ResponseEntity.ok(saved)
    }

}