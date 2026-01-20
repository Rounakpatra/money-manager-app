package com.roni.money_manager.service;


import com.roni.money_manager.dtos.IncomeDTO;
import com.roni.money_manager.entity.CategoryEntity;

import com.roni.money_manager.entity.IncomeEntity;
import com.roni.money_manager.entity.ProfileEntity;
import com.roni.money_manager.repository.CategoryRepository;
import com.roni.money_manager.repository.IncomeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IncomeService {

    private final IncomeRepository incomeRepository;
    private final CategoryRepository categoryRepository;
    private final ProfileService profileService;

    // adding income
    public IncomeDTO addIncome(IncomeDTO dto){
        ProfileEntity profileEntity=profileService.getCurrentProfile();

        CategoryEntity categoryEntity=
                categoryRepository.findById(dto.getCategoryId())
                        .orElseThrow(()->new RuntimeException("Category not found"));

        IncomeEntity newIncome=toEntity(dto,profileEntity,categoryEntity);

        //saving new income
        newIncome=incomeRepository.save(newIncome);
        return toDTO(newIncome);
    }


    //get all incomes within start and end date

    public List<IncomeDTO> getCurrentMonthIncomesForCurrentUser(){
        ProfileEntity profile=profileService.getCurrentProfile();

        LocalDate now=LocalDate.now();

        LocalDate startDate=now.withDayOfMonth(1);
        LocalDate endDate=now.withDayOfMonth(now.lengthOfMonth());

        List<IncomeEntity> list=incomeRepository.findByProfileEntity_IdAndDateBetween(
                profile.getId(),startDate,endDate);

        return list.stream().map(this::toDTO).toList();

    }

    //delete expense by id for current user

    public  void deleteIncome(Long id){
        ProfileEntity profile=profileService.getCurrentProfile();

        IncomeEntity entity=incomeRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Income not found"));

        if(!entity.getProfileEntity().getId().equals(profile.getId())){
            throw  new RuntimeException("Unauthorized to delete this income");
        }

        incomeRepository.delete(entity);

    }


    //getting latest 5 incomes for current user
    public List<IncomeDTO> getLatest5IncomeForCurrentUser(){
        ProfileEntity profile=profileService.getCurrentProfile();

        List<IncomeEntity> list=
                incomeRepository.findTop5ByProfileEntity_IdOrderByDateDesc(profile.getId());

        return list.stream().map(this::toDTO).toList();
    }

    //getting total income for current User
    public BigDecimal getTotalIncomeForCurrentUser(){
        ProfileEntity profile=profileService.getCurrentProfile();

        BigDecimal total=
                incomeRepository.findTotalIncomeByProfileEntity_Id(profile.getId());

        if(total!=null){
            return total;
        }
        return BigDecimal.ZERO;
    }

    //Filter incomes
    public List<IncomeDTO> filterIncomes(LocalDate startDate, LocalDate endDate
            , String keyword, Sort sort){
        ProfileEntity profile=profileService.getCurrentProfile();

        List<IncomeEntity> list=incomeRepository.findByProfileEntity_IdAndDateBetweenAndNameContainingIgnoreCase(
                profile.getId(), startDate,endDate,keyword,sort
        );

        return list.stream().map(this::toDTO).toList();

    }








    //Utility methods
    private IncomeEntity toEntity(IncomeDTO dto, ProfileEntity profile, CategoryEntity category){
        return IncomeEntity.builder()
                .name(dto.getName())
                .icon(dto.getIcon())
                .amount(dto.getAmount())
                .date(dto.getDate())
                .profileEntity(profile)
                .categoryEntity(category)
                .build();
    }

    private IncomeDTO toDTO(IncomeEntity entity) {
        return IncomeDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .icon(entity.getIcon())
                .categoryId(entity.getCategoryEntity() != null ? entity.getCategoryEntity().getId(): null)
                .categoryName(entity.getCategoryEntity() != null ? entity.getCategoryEntity().getName(): "N/A")
                .amount(entity.getAmount())
                .date(entity.getDate())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

}
