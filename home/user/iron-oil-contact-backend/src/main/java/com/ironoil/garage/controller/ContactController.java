package com.ironoil.garage.controller;

import com.ironoil.garage.dto.ContactRequest;
import com.ironoil.garage.dto.ContactResponse;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*") // For dev – restrict in production!
public class ContactController {

    private static final Logger log = LoggerFactory.getLogger(ContactController.class);

    @PostMapping
    public ResponseEntity<ContactResponse> submitContact(
            @Valid @RequestBody ContactRequest request
    ) {
        // 1. Print to console, as requested
        System.out.println("\n========== NEW CONTACT SUBMISSION ==========");
        System.out.println("Name:    " + request.getName());
        System.out.println("Email:   " + request.getEmail());
        System.out.println("Message: " + request.getMessage());
        if (request.getVehicle() != null) {
            System.out.println("Vehicle: " + request.getVehicle());
        }
        if (request.getService() != null) {
            System.out.println("Service: " + request.getService());
        }
        System.out.println("============================================\n");

        log.info("Contact form received from {} <{}>", request.getName(), request.getEmail());

        // 2. Return 200 OK
        ContactResponse response = new ContactResponse(
                true,
                "Thanks " + request.getName() + "! We got your message and will get back within 24h."
        );
        return ResponseEntity.ok(response);
    }

    // Simple health check
    @GetMapping
    public ResponseEntity<ContactResponse> health() {
        return ResponseEntity.ok(new ContactResponse(true, "IRON & OIL Contact API is up"));
    }
}
