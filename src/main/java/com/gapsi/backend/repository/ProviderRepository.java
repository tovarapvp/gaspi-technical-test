package com.gapsi.backend.repository;

import com.gapsi.backend.model.Provider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// Pattern applied here: Repository Pattern
@Repository
public interface ProviderRepository extends JpaRepository<Provider, Long> {
    Optional<Provider> findByName(String name);
}
