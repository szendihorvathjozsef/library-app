package com.amp3rr.library.domain

import java.time.LocalDate
import javax.persistence.*

/**
 * @author szend
 */
@Entity
data class Author(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long?,
        @Column(name = "first_name", nullable = false)
        var firstName: String?,
        @Column(name = "last_name", nullable = false)
        var lastName: String?,
        @Column(name = "birthday")
        var birthday: LocalDate?,
        @Column(name = "died_on")
        var diedOn: LocalDate?,
        @Column(name = "nationality")
        var nationality: String?
)