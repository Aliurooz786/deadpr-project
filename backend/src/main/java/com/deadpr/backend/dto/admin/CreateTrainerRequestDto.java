// In file: dto/admin/CreateTrainerRequestDto.java
package com.deadpr.backend.dto.admin;

import lombok.Data;
import java.util.List;

@Data
public class CreateTrainerRequestDto {

    private String name;
    private String email;
    private String password;
    private String phoneNumber;

    private String description;
    private List<String> specializations;
}