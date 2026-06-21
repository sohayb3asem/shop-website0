package com.ironoil.garage.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ContactRequest {

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100)
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;

    @NotBlank(message = "Message is required")
    @Size(min = 5, max = 2000)
    private String message;

    // Optional fields – won't break if frontend sends them
    private String vehicle;
    private String service;

    public ContactRequest() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getVehicle() { return vehicle; }
    public void setVehicle(String vehicle) { this.vehicle = vehicle; }

    public String getService() { return service; }
    public void setService(String service) { this.service = service; }

    @Override
    public String toString() {
        return "ContactRequest{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", vehicle='" + vehicle + '\'' +
                ", service='" + service + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}
