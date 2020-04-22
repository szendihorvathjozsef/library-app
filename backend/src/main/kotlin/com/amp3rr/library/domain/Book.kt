package com.amp3rr.library.domain

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import java.time.LocalDate
import javax.persistence.*
import javax.validation.constraints.NotNull

/**
 * @author szend
 */

@Entity
data class Book(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long?,
        @NotNull
        @Column
        var title: String,
        @Column(name = "page_count")
        var pageCount: Int?,
        @Column(name = "publish_date")
        var publishDate: LocalDate?,
        @Column(name = "description")
        var description: String?,
        @Column(name = "excerpt")
        var excerpt: String?,
        @Column(name = "book_identifier")
        var bookIdentifier: String?,
        @Column(name = "book_identifier_type")
        var bookIdentifierType: String?,
        @Column(name = "language")
        var language: String?,
        @ManyToOne
        var category: Category,
        @Column(name = "category_id", insertable = false, updatable = false)
        var categoryId: Int?,
        @ManyToOne
        var publisher: Publisher,
        @Column(name = "publisher_id", insertable = false, updatable = false)
        var publisherId: Int?,
        @ManyToMany
        @JoinTable(
                name = "book_author",
                joinColumns = [JoinColumn(name = "book_id", referencedColumnName = "id")],
                inverseJoinColumns = [JoinColumn(name = "author_id", referencedColumnName = "id")]
        )
        @JsonIgnoreProperties("books")
        var authors: MutableSet<Author> = mutableSetOf<Author>()
)
