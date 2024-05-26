package com.example.BootApp.specifications;

import com.example.BootApp.DTO.FilterDataDTO;
import com.example.BootApp.models.Post;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;


import java.util.Date;
@Component
public class PostSpecifications {
    public static Specification<Post> filterPosts(FilterDataDTO dataDTO) {
        return (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();
            Date today = new Date();
            if (dataDTO.getPostHeader() != null && !dataDTO.getPostHeader().isEmpty()) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("post_header"), "%" + dataDTO.getPostHeader() + "%"));
            }

            if (dataDTO.getPostCity() != null && !dataDTO.getPostCity().isEmpty()) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("post_city"), "%" + dataDTO.getPostCity() + "%"));
            }

            if (dataDTO.getPostType() != null && !dataDTO.getPostType().isEmpty()) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("post_type"), dataDTO.getPostType()));
            }

            if (dataDTO.getCompany() != null && !dataDTO.getCompany().isEmpty()) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("company"), dataDTO.getCompany()));
            }
            predicate = criteriaBuilder.and(predicate, criteriaBuilder.lessThanOrEqualTo(root.get("posts_start_day"), today));
            predicate = criteriaBuilder.and(predicate, criteriaBuilder.greaterThan(root.get("posts_end_day"), today));
            return predicate;
        };
    }
}
