package com.amp3rr.library.domain

import javax.persistence.*

/**
 * @author szend
 */
@Entity
data class Author(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long?,
        @Column(name = "first_name" , nullable = false)
        var firstName: String,
        @Column(name = "last_name" , nullable = false)
        var lastName: String
)