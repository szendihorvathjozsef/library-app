package com.amp3rr.library.controllers

import com.amp3rr.library.controllers.rest.ImageUploadResponse
import com.amp3rr.library.controllers.rest.ResponseStatus
import com.amp3rr.library.domain.Book
import com.amp3rr.library.repositories.BookRepository
import com.amp3rr.library.services.StorageService
import org.apache.commons.io.FilenameUtils
import org.apache.commons.lang3.RandomStringUtils
import org.springframework.core.io.Resource
import org.springframework.http.HttpHeaders
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.io.File
import java.text.MessageFormat
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import javax.imageio.ImageIO
import javax.validation.Valid

/**
 * @author szend
 */
@RestController
@RequestMapping("/books")
class BookController(
        private val bookRepository: BookRepository,
        private val storageService: StorageService) {

    @GetMapping
    fun list(): ResponseEntity<List<Book>> = ResponseEntity.ok(bookRepository.findAll())

    @GetMapping("/{id}")
    fun get(@PathVariable id: Long?): ResponseEntity<Book> {
        if (id == null) {
            return ResponseEntity.notFound().build()
        }

        return ResponseEntity.of(bookRepository.findById(id));
    }

    @GetMapping("/publisher/{id}")
    fun listByPublisher(@PathVariable id: Long?): ResponseEntity<List<Book>> {
        if (id == null) {
            return ResponseEntity.notFound().build()
        }

        return ResponseEntity.ok(bookRepository.findAllByPublisherId(id))
    }

    @PostMapping
    fun create(@Valid @RequestBody book: Book): ResponseEntity<Book> {
        if (book.id != null) {
            return ResponseEntity.badRequest().build();
        }

        val saved = bookRepository.save(book)

        return ResponseEntity.ok(saved)
    }

    @PostMapping("/image")
    fun uploadImage(@RequestParam("file") file: MultipartFile, @RequestParam("bookName") bookName: String): ResponseEntity<ImageUploadResponse> {
        val bookOptional = bookRepository.findByTitle(bookName)

        if (!bookOptional.isPresent) {
            return ResponseEntity.notFound().build()
        }

        val extension: String = FilenameUtils.getExtension(file.originalFilename)
        val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd")
        val newName = MessageFormat.format(
                "{0}-{1}.{2}",
                RandomStringUtils.randomAlphabetic(8),
                LocalDateTime.now().format(formatter),
                extension
        )

        val book = bookOptional.get()
        book.imageName = newName
        bookRepository.save(book)
        storageService.store(file, newName)

        return ResponseEntity.ok(ImageUploadResponse(ResponseStatus.OK, "The image was successfully uploaded"))
    }

    @GetMapping("/image/{filename:.+}")
    fun serveFile(@PathVariable filename: String?): ResponseEntity<Resource?>? {
        val file = storageService.loadAsResource(filename!!)
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + file!!.filename + "\"").body(file)
    }

    @PutMapping("/{id}")
    fun update(@PathVariable id: Long?, @Valid @RequestBody book: Book): ResponseEntity<Book> {
        if (id == null) {
            return ResponseEntity.badRequest().build();
        }

        val saved = bookRepository.save(book)

        return ResponseEntity.ok(saved)
    }

}