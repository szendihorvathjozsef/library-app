package com.amp3rr.library.config

import com.amp3rr.library.controllers.errors.BadRequestAlertException
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.context.request.NativeWebRequest
import org.zalando.problem.DefaultProblem
import org.zalando.problem.Problem
import org.zalando.problem.spring.web.advice.ProblemHandling
import org.zalando.problem.spring.web.advice.security.SecurityAdviceTrait
import org.zalando.problem.violations.ConstraintViolationProblem
import javax.servlet.http.HttpServletRequest


/**
 * @author szend
 */

@ControllerAdvice
class ExceptionTranslator : ProblemHandling, SecurityAdviceTrait {

    /**
     * Post-process the Problem payload to add the message key for the front-end if needed.
     */
    override fun process(entity: ResponseEntity<Problem>, request: NativeWebRequest): ResponseEntity<Problem>? {
        if (entity == null) {
            return entity
        }
        val problem = entity.body
        if (!(problem is ConstraintViolationProblem || problem is DefaultProblem)) {
            return entity
        }
        val builder = Problem.builder()
                .withStatus(problem.status)
                .withTitle(problem.title)
                .with("path", request.getNativeRequest(HttpServletRequest::class.java)!!.requestURI)
        if (problem is ConstraintViolationProblem) {
            builder
                    .with(VIOLATIONS_KEY, problem.violations)
                    .with(MESSAGE_KEY, "error.validation")
        } else {
            builder
                    .withCause((problem as DefaultProblem).cause)
                    .withDetail(problem.getDetail())
                    .withInstance(problem.getInstance())
            problem.getParameters().forEach { (key: String?, value: Any?) -> builder.with(key!!, value!!) }
        }
        return ResponseEntity(builder.build(), entity.headers, entity.statusCode)
    }

    @ExceptionHandler
    fun handleBadRequestAlertException(ex: BadRequestAlertException, request: NativeWebRequest): ResponseEntity<Problem> {
        return create(ex, request)
    }

    companion object {
        const val VIOLATIONS_KEY = "violations";
        const val MESSAGE_KEY = "message";
    }
}