package com.amp3rr.library.controllers

import com.amp3rr.library.controllers.rest.StatisticsResponse
import com.amp3rr.library.repositories.AuthorRepository
import com.amp3rr.library.repositories.BookRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

/**
 * @author szend
 */
@RestController
@RequestMapping("/dashboard")
class Dashboard(
        private val bookRepository: BookRepository,
        private val authorRepository: AuthorRepository) {

    @GetMapping("/statistics")
    fun statistics(): ResponseEntity<StatisticsResponse> {
        return ResponseEntity.ok(StatisticsResponse(bookRepository.count(), authorRepository.count()))
    }

}