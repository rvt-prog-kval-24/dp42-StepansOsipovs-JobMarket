package com.example.BootApp.specifications;

import com.example.BootApp.DTO.AdminPostSpecificationsDTO;
import com.example.BootApp.DTO.FilterDataDTO;
import com.example.BootApp.models.Post;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

public class AdminPostSpecifications {
    public static Specification<Post> filterPosts(AdminPostSpecificationsDTO dataDTO) {
        return (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();
            if (dataDTO.getId() != null ) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("id"), dataDTO.getId() ));
            }
            return predicate;
        };
    }
}
