package com.amp3rr.library.repositories

import org.springframework.data.jpa.repository.JpaRepository
import com.amp3rr.library.domain.Author

/**
 * @author szend
 */
interface AuthorRepository: JpaRepository<Author, Long>