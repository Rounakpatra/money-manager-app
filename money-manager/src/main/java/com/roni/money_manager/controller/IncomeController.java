package com.roni.money_manager.controller;

import com.roni.money_manager.dtos.ExpenseDTO;
import com.roni.money_manager.dtos.IncomeDTO;
import com.roni.money_manager.service.IncomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/incomes")
public class IncomeController {

    private final IncomeService incomeService;

    @PostMapping
    public ResponseEntity<IncomeDTO> addExpense(@RequestBody IncomeDTO dto){
        IncomeDTO saved=incomeService.addIncome(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public ResponseEntity<List<IncomeDTO>> getExpense(){
        List<IncomeDTO> list=incomeService.getCurrentMonthIncomesForCurrentUser();

        return ResponseEntity.ok(list);
    }


    //delete income by income Id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncome(@PathVariable Long id){
        incomeService.deleteIncome(id);
        return ResponseEntity.noContent().build();
    }

}
