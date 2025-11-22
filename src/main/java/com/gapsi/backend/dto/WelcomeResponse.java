package com.gapsi.backend.dto;

import lombok.Builder;
import lombok.Data;

// Pattern applied here: Builder Pattern
@Data
@Builder
public class WelcomeResponse {
    private String candidateName;
    private String version;
}
