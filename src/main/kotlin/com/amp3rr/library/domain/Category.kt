package com.amp3rr.library.domain

import javax.persistence.*

/**
 * @author szend
 */
@Entity
data class Category(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long? = null,
        @Column(name = "name", nullable = false)
        var name: String?
)