package com.amp3rr.library.repositories

import com.amp3rr.library.domain.Category
import org.springframework.data.jpa.repository.JpaRepository

/**
 * @author szend
 */
interface CategoryRepository: JpaRepository<Category, Long> {
}