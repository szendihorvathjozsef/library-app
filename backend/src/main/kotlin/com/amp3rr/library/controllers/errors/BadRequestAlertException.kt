package com.amp3rr.library.controllers.errors

import org.zalando.problem.AbstractThrowableProblem
import org.zalando.problem.Exceptional
import org.zalando.problem.Status
import java.net.URI
import java.util.*

/**
 * @author szend
 */

private fun getAlertParameters(entityName: String, errorKey: String): Map<String, Any> {
    val parameters: MutableMap<String, Any> = HashMap()
    parameters["message"] = "error.$errorKey"
    parameters["params"] = entityName
    return parameters
}

abstract class BadRequestAlertException(type: URI?, defaultMessage: String?, entityName: String, errorKey: String) :
        AbstractThrowableProblem(type, defaultMessage, Status.BAD_REQUEST, null, null, null, getAlertParameters(entityName, errorKey)) {
    constructor(defaultMessage: String?, entityName: String, errorKey: String) : this(null, defaultMessage, entityName, errorKey)
}