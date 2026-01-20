package com.roni.money_manager.service;

import com.roni.money_manager.dtos.CategoryDTO;
import com.roni.money_manager.dtos.ProfileDTO;
import com.roni.money_manager.entity.CategoryEntity;
import com.roni.money_manager.entity.ProfileEntity;
import com.roni.money_manager.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final ProfileService profileService;




    //save category
    public CategoryDTO saveCategory(CategoryDTO categoryDTO){
        ProfileEntity profileEntity=profileService.getCurrentProfile();

        if(categoryRepository.existsByNameAndProfileId(categoryDTO.getName(),profileEntity.getId())){
            throw new RuntimeException("Category with this name already exists");
        }

        CategoryEntity newCategory=toEntity(categoryDTO,profileEntity);
        newCategory=categoryRepository.save(newCategory);

        return toDTO(newCategory);
    }


    //get categories for current user
    public List<CategoryDTO> getCategoriesForCurrentUser(){
        ProfileEntity profileEntity=profileService.getCurrentProfile();
        List<CategoryEntity> categories=categoryRepository.findByProfileId(profileEntity.getId());

        return categories.stream().map(this::toDTO).toList();
    }


    //get categories by type for current user
    public List<CategoryDTO> getCategoriesByTypeForCurrentUser(String type){
        ProfileEntity profileEntity=profileService.getCurrentProfile();
        List<CategoryEntity> categories=categoryRepository.findByTypeAndProfileId(type,profileEntity.getId());

        return categories.stream().map(this::toDTO).toList();
    }

    //update category
    public CategoryDTO updateCategory(Long categoryId,CategoryDTO categoryDTO){
        ProfileEntity profileEntity=profileService.getCurrentProfile();

        CategoryEntity existingCategory = categoryRepository.findByIdAndProfileId(categoryId, profileEntity.getId())
                .orElseThrow(() -> new RuntimeException("Category not found or not accessible"));

        existingCategory.setName(categoryDTO.getName());
        existingCategory.setIcon(categoryDTO.getIcon());
        existingCategory.setType(categoryDTO.getType());

        existingCategory=categoryRepository.save(existingCategory);

        return toDTO(existingCategory);
    }



    //Utility Methods

    private CategoryEntity toEntity(CategoryDTO categoryDTO, ProfileEntity profileEntity){
        return CategoryEntity.builder()
                .name(categoryDTO.getName())
                .icon(categoryDTO.getIcon())
                .profile(profileEntity)
                .type(categoryDTO.getType())
                .build();
    }

    private CategoryDTO toDTO(CategoryEntity categoryEntity){
        return CategoryDTO.builder()
                .id(categoryEntity.getId())
                .profileId(categoryEntity.getProfile() != null ? categoryEntity.getProfile().getId(): null)
                .name(categoryEntity.getName())
                .type(categoryEntity.getType())
                .icon(categoryEntity.getIcon())
                .createdAt(categoryEntity.getCreatedAt())
                .updatedAt(categoryEntity.getUpdatedAt())
                .build();

    }

}
