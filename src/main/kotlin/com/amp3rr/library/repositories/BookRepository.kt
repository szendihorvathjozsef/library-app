package com.amp3rr.library.repositories

import org.springframework.data.jpa.repository.JpaRepository
import com.amp3rr.library.domain.Book

/**
 * @author szend
 */

interface BookRepository: JpaRepository<Book, Long> {
    fun findAllByPublisherId(id: Long): List<Book>
}