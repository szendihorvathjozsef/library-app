package com.amp3rr.library.repositories

import com.amp3rr.library.domain.Publisher
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

/**
 * @author szend
 */
@Repository
interface PublisherRepository: JpaRepository<Publisher, Long>