package com.gapsi.backend.service;

import com.gapsi.backend.model.Provider;
import com.gapsi.backend.repository.ProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

// Pattern applied here: Service Layer
@Service
public class ProviderService {

    private final ProviderRepository providerRepository;

    @Autowired
    public ProviderService(ProviderRepository providerRepository) {
        this.providerRepository = providerRepository;
    }

    public Page<Provider> getAllProviders(Pageable pageable) {
        return providerRepository.findAll(pageable);
    }

    public Provider createProvider(Provider provider) {
        // Validation: Check if name already exists
        Optional<Provider> existingProvider = providerRepository.findByName(provider.getName());
        if (existingProvider.isPresent()) {
            throw new IllegalArgumentException("Provider with name '" + provider.getName() + "' already exists.");
        }
        return providerRepository.save(provider);
    }

    public void deleteProvider(Long id) {
        if (!providerRepository.existsById(id)) {
             throw new IllegalArgumentException("Provider with id '" + id + "' not found.");
        }
        providerRepository.deleteById(id);
    }
}
