package com.roni.money_manager.repository;

import com.roni.money_manager.entity.ExpenseEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<ExpenseEntity,Long> {

    // expenses for a user
    List<ExpenseEntity> findByProfileEntity_IdOrderByDateDesc(Long profileId);

    // 5 latest expenses for a user
    List<ExpenseEntity> findTop5ByProfileEntity_IdOrderByDateDesc(Long profileId);

    // total expense
    @Query("""
        SELECT COALESCE(SUM(e.amount), 0)
        FROM ExpenseEntity e
        WHERE e.profileEntity.id = :profileId
    """)
    BigDecimal findTotalExpenseByProfileEntity_Id(@Param("profileId") Long profileId);

    List<ExpenseEntity> findByProfileEntity_IdAndDateBetweenAndNameContainingIgnoreCase(
            Long profileId,
            LocalDate startDate,
            LocalDate endDate,
            String keyword,
            Sort sort
    );

    List<ExpenseEntity> findByProfileEntity_IdAndDateBetween(
            Long profileId,
            LocalDate startDate,
            LocalDate endDate
    );

    List<ExpenseEntity> findByProfileEntity_IdAndDate(
            Long profileId,
            LocalDate date
    );

}
