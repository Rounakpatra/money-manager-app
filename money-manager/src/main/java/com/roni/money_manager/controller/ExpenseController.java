package com.roni.money_manager.controller;

import com.roni.money_manager.dtos.ExpenseDTO;
import com.roni.money_manager.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<ExpenseDTO> addExpense(@RequestBody ExpenseDTO dto){
        ExpenseDTO saved=expenseService.addExpense(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved );
    }

    @GetMapping
    public ResponseEntity<List<ExpenseDTO>> getExpense(){
        List<ExpenseDTO> list=expenseService.getCurrentMonthExpensesForCurrentUser();

        return ResponseEntity.ok(list);
    }

    //delete expense by expense Id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id){
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }

}
