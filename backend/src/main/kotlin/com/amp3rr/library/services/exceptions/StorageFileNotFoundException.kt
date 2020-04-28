package com.amp3rr.library.services.exceptions

/**
 * @author szend
 */
class StorageFileNotFoundException : StorageException {
    constructor(message: String?) : super(message) {}
    constructor(message: String?, cause: Throwable?) : super(message, cause) {}
}