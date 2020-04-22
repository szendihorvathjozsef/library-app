package com.amp3rr.library.controllers.errors

import org.springframework.http.HttpStatus

/**
 * @author szend
 */
class BadRequestResponse(val reason: String, val entity: String, val status: HttpStatus)