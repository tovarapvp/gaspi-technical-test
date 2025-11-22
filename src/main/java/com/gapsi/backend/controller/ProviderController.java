package com.gapsi.backend.controller;

import com.gapsi.backend.dto.WelcomeResponse;
import com.gapsi.backend.model.Provider;
import com.gapsi.backend.service.ProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ProviderController {

    private final ProviderService providerService;

    @Autowired
    public ProviderController(ProviderService providerService) {
        this.providerService = providerService;
    }

    @GetMapping("/welcome")
    public ResponseEntity<WelcomeResponse> welcome() {
        // Pattern applied here: Builder Pattern
        WelcomeResponse response = WelcomeResponse.builder()
                .candidateName("Bienvenido Candidato 01")
                .version("0.0.1")
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/providers")
    public ResponseEntity<Page<Provider>> getAllProviders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(providerService.getAllProviders(pageable));
    }

    @PostMapping("/providers")
    public ResponseEntity<?> createProvider(@RequestBody Provider provider) {
        try {
            Provider createdProvider = providerService.createProvider(provider);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdProvider);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/providers/{id}")
    public ResponseEntity<?> deleteProvider(@PathVariable Long id) {
        try {
            providerService.deleteProvider(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
