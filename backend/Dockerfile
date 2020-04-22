FROM openjdk:8-alpine
VOLUME /tmp
ADD target/library.jar library.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/library.jar"]
