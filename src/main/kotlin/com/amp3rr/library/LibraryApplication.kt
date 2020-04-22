package com.amp3rr.library

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.jpa.repository.config.EnableJpaRepositories

@SpringBootApplication
@EnableJpaRepositories
class LibraryApplication

fun main(args: Array<String>) {
    runApplication<LibraryApplication>(*args)
}
