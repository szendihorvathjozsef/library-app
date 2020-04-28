package com.amp3rr.library.services

import com.amp3rr.library.services.exceptions.StorageException
import com.amp3rr.library.services.exceptions.StorageFileNotFoundException
import org.apache.commons.lang3.SystemUtils
import org.springframework.beans.factory.InitializingBean
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.Resource
import org.springframework.core.io.UrlResource
import org.springframework.stereotype.Service
import org.springframework.util.FileSystemUtils
import org.springframework.util.StringUtils
import org.springframework.web.multipart.MultipartFile
import java.io.IOException
import java.net.MalformedURLException
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import java.nio.file.StandardCopyOption
import java.util.stream.Stream

/**
 * @author szend
 */
@Service
class StorageService: InitializingBean {

    @Value("\${library.image-path}")
    lateinit var folder: String

    private var rootLocation: Path? = null

    override fun afterPropertiesSet() {
        if (SystemUtils.IS_OS_WINDOWS) {
            rootLocation = Paths.get(SystemUtils.getUserDir().toString() + folder)
            if (!Files.exists(rootLocation)) {
                Files.createDirectory(rootLocation)
            }
        } else {
            rootLocation = Paths.get(folder)
        }
    }

    fun store(file: MultipartFile, newName: String?) {
        val filename = StringUtils.cleanPath(newName!!)
        try {
            if (file.isEmpty) {
                throw StorageException("Failed to store empty file $filename")
            }
            if (filename.contains("..")) {
                // This is a security check
                throw StorageException("Cannot store file with relative path outside current directory "
                        + filename)
            }
            file.inputStream.use { inputStream ->
                Files.copy(inputStream, rootLocation!!.resolve(filename),
                        StandardCopyOption.REPLACE_EXISTING)
            }
        } catch (e: IOException) {
            throw StorageException("Failed to store file $filename", e)
        }
    }

    fun loadAll(): Stream<Path>? {
        return try {
            Files.walk(rootLocation, 1)
                    .filter { path: Path -> path != rootLocation }
                    .map { other: Path? -> rootLocation!!.relativize(other) }
        } catch (e: IOException) {
            throw StorageException("Failed to read stored files", e)
        }
    }

    fun load(filename: String?): Path {
        return rootLocation!!.resolve(filename)
    }

    fun loadAsResource(filename: String): Resource? {
        return try {
            val file = load(filename)
            val resource: Resource = UrlResource(file.toUri())
            if (resource.exists() || resource.isReadable) {
                resource
            } else {
                throw StorageFileNotFoundException(
                        "Could not read file: $filename")
            }
        } catch (e: MalformedURLException) {
            throw StorageFileNotFoundException("Could not read file: $filename", e)
        }
    }

    fun deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation!!.toFile())
    }

    fun init() {
        try {
            Files.createDirectories(rootLocation)
        } catch (e: IOException) {
            throw StorageException("Could not initialize storage", e)
        }
    }
}