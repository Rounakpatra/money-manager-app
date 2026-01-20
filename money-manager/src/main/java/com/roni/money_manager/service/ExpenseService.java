package com.roni.money_manager.service;

import com.roni.money_manager.dtos.ExpenseDTO;
import com.roni.money_manager.entity.CategoryEntity;
import com.roni.money_manager.entity.ExpenseEntity;
import com.roni.money_manager.entity.ProfileEntity;
import com.roni.money_manager.repository.CategoryRepository;
import com.roni.money_manager.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final CategoryRepository categoryRepository;
    private final ProfileService profileService;


    // adding expense
    public ExpenseDTO addExpense(ExpenseDTO dto){
        ProfileEntity profileEntity=profileService.getCurrentProfile();

        CategoryEntity categoryEntity=
        categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(()->new RuntimeException("Category not found"));

        ExpenseEntity newExpense=toEntity(dto,profileEntity,categoryEntity);

        //saving new expense
        newExpense=expenseRepository.save(newExpense);
        return toDTO(newExpense);
    }

    //get all expenses within start and end date

    public List<ExpenseDTO> getCurrentMonthExpensesForCurrentUser(){
        ProfileEntity profile=profileService.getCurrentProfile();

        LocalDate now=LocalDate.now();

        LocalDate startDate=now.withDayOfMonth(1);
        LocalDate endDate=now.withDayOfMonth(now.lengthOfMonth());

        List<ExpenseEntity> list=expenseRepository.findByProfileEntity_IdAndDateBetween(
                profile.getId(),startDate,endDate);

        return list.stream().map(this::toDTO).toList();

    }


    //delete expense by id for current user
    public  void deleteExpense(Long id){
        ProfileEntity profile=profileService.getCurrentProfile();

        ExpenseEntity entity=expenseRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Expense not found"));

        if(!entity.getProfileEntity().getId().equals(profile.getId())){
            throw  new RuntimeException("Unauthorized to delete this expense");
        }

        expenseRepository.delete(entity);

    }

    //getting latest 5 expenses for current user
    public List<ExpenseDTO> getLatest5ExpenseForCurrentUser(){
        ProfileEntity profile=profileService.getCurrentProfile();

        List<ExpenseEntity> list=
        expenseRepository.findTop5ByProfileEntity_IdOrderByDateDesc(profile.getId());

        return list.stream().map(this::toDTO).toList();
    }

    //getting total expense for current User

    public BigDecimal getTotalExpenseForCurrentUser(){
        ProfileEntity profile=profileService.getCurrentProfile();

        BigDecimal total=
        expenseRepository.findTotalExpenseByProfileEntity_Id(profile.getId());

        if(total!=null){
            return total;
        }
        return BigDecimal.ZERO;
    }

    //Filter expenses
    public List<ExpenseDTO> filterExpenses(LocalDate startDate, LocalDate endDate
        , String keyword, Sort sort){
        ProfileEntity profile=profileService.getCurrentProfile();

        List<ExpenseEntity> list=expenseRepository.findByProfileEntity_IdAndDateBetweenAndNameContainingIgnoreCase(
                profile.getId(), startDate,endDate,keyword,sort
        );

        return list.stream().map(this::toDTO).toList();

    }


    //notifications
    public List<ExpenseDTO> getExpensesForUserOnDate(Long profileId,LocalDate date){

        List<ExpenseEntity> list= expenseRepository.findByProfileEntity_IdAndDate(profileId,date);
        return list.stream().map(this::toDTO).toList();
    }









    //Utility methods
    private ExpenseEntity toEntity(ExpenseDTO dto, ProfileEntity profile, CategoryEntity category){
        return ExpenseEntity.builder()
                .name(dto.getName())
                .icon(dto.getIcon())
                .amount(dto.getAmount())
                .date(dto.getDate())
                .profileEntity(profile)
                .categoryEntity(category)
                .build();
    }

    private ExpenseDTO toDTO(ExpenseEntity entity) {
        return ExpenseDTO.builder()
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
