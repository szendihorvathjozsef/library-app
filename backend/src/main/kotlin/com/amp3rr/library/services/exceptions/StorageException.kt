package com.amp3rr.library.services.exceptions

/**
 * @author szend
 */
open class StorageException : RuntimeException {
    constructor(message: String?) : super(message) {}
    constructor(message: String?, cause: Throwable?) : super(message, cause) {}
}