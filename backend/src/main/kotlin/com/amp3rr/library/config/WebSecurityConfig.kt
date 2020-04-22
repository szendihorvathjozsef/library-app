package com.amp3rr.library.config

import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.web.filter.CorsFilter
import org.zalando.problem.spring.web.advice.security.SecurityProblemSupport

/**
 * @author szend
 */

@Configuration
@EnableWebSecurity
@Import(SecurityProblemSupport::class)
class WebSecurityConfig(val corsFilter: CorsFilter, val problemSupport: SecurityProblemSupport) : WebSecurityConfigurerAdapter() {

    override fun configure(http: HttpSecurity?) {
        http
            ?.csrf()
            ?.disable()
            ?.addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter::class.java)
            ?.exceptionHandling()
                ?.authenticationEntryPoint(problemSupport)
                ?.accessDeniedHandler(problemSupport)
        ?.and()
            ?.authorizeRequests()
            ?.antMatchers("/**")?.permitAll()
        ?.and()
            ?.httpBasic()
            ?.disable()
    }
}