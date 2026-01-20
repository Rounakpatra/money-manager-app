package com.roni.money_manager.repository;

import com.roni.money_manager.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity,Long> {

    //Get List of CategoryEntity using profile_id for a User
    List<CategoryEntity> findByProfileId(Long profileId);

    //Get a particular CategoryEntity for a User
    Optional<CategoryEntity> findByIdAndProfileId(Long id, Long profileId);

    //Get a particular type of CategoryEntity for a User
    List<CategoryEntity> findByTypeAndProfileId(String type,Long profileId);

    Boolean existsByNameAndProfileId(String name,Long profileId);

}
