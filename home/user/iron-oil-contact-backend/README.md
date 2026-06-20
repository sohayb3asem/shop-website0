# IRON & OIL Garage – Contact API

Spring Boot 3.3.2 / Java 17

## Run

```bash
cd iron-oil-contact-backend
./mvnw spring-boot:run
# or
mvn spring-boot:run
```

API runs at: http://localhost:8080

## Endpoints

POST /api/contact
Content-Type: application/json

Body:
```json
{
  "name": "Alex Rivera",
  "email": "alex@example.com",
  "message": "Twin-turbo LS swap for my C10?"
}
```

Optional fields also accepted:
- `vehicle`
- `service`

Response 200 OK:
```json
{
  "success": true,
  "message": "Thanks Alex Rivera! We got your message and will get back within 24h.",
  "timestamp": "2026-06-20T..."
}
```

Console output:
```
========== NEW CONTACT SUBMISSION ==========
Name:    Alex Rivera
Email:   alex@example.com
Message: Twin-turbo LS swap for my C10?
Vehicle: 1972 Chevy C10
Service: Engine Tuning
============================================
```

GET /api/contact → health check
