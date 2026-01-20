package com.roni.money_manager.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class EmailService {

    @Value("${brevo.api.key}")
    private String apiKey;

    @Value("${brevo.from.email}")
    private String fromEmail;

    @Value("${brevo.from.name}")
    private String fromName;

    private final RestTemplate restTemplate = new RestTemplate();

    public void sendEmail(String to, String subject, String body) {

        String url = "https://api.brevo.com/v3/smtp/email";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("api-key", apiKey);

        String payload = """
        {
          "sender": {
            "email": "%s",
            "name": "%s"
          },
          "to": [
            {
              "email": "%s"
            }
          ],
          "subject": "%s",
          "htmlContent": "%s"
        }
        """.formatted(
                fromEmail,
                fromName,
                to,
                subject,
                body.replace("\"", "\\\"")
        );

        HttpEntity<String> request = new HttpEntity<>(payload, headers);

        try {
            restTemplate.postForEntity(url, request, String.class);
        } catch (Exception e) {
            throw new RuntimeException("Brevo email failed: " + e.getMessage());
        }
    }
}
