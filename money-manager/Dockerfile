# ---------- BUILD STAGE ----------
FROM eclipse-temurin:25-jdk AS builder
WORKDIR /app

# Copy Maven wrapper & pom first (for caching)
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

# Download dependencies
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

# Copy source code
COPY src src

# Build jar (skip tests)
RUN ./mvnw clean package -DskipTests


# ---------- RUNTIME STAGE ----------
FROM eclipse-temurin:25-jre
WORKDIR /app

# Copy jar from build stage
COPY --from=builder /app/target/money-manager-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 9090
ENTRYPOINT ["java", "-jar", "app.jar"]
