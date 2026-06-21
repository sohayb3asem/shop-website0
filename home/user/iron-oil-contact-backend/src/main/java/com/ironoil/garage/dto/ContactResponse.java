package com.ironoil.garage.dto;

import java.time.Instant;

public class ContactResponse {
    private boolean success;
    private String message;
    private Instant timestamp;

    public ContactResponse() {}

    public ContactResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
        this.timestamp = Instant.now();
    }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
}
