package com.roni.money_manager.repository;


import com.roni.money_manager.entity.IncomeEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface IncomeRepository extends JpaRepository<IncomeEntity,Long> {

    // incomes for a user
    List<IncomeEntity> findByProfileEntity_IdOrderByDateDesc(Long profileId);

    // 5 latest incomes for a user
    List<IncomeEntity> findTop5ByProfileEntity_IdOrderByDateDesc(Long profileId);

    // total income
    @Query("""
        SELECT COALESCE(SUM(i.amount), 0)
        FROM IncomeEntity i
        WHERE i.profileEntity.id = :profileId
    """)
    BigDecimal findTotalIncomeByProfileEntity_Id(@Param("profileId") Long profileId);

    List<IncomeEntity> findByProfileEntity_IdAndDateBetweenAndNameContainingIgnoreCase(
            Long profileId,
            LocalDate startDate,
            LocalDate endDate,
            String keyword,
            Sort sort
    );

    List<IncomeEntity> findByProfileEntity_IdAndDateBetween(
            Long profileId,
            LocalDate startDate,
            LocalDate endDate
    );

    List<IncomeEntity> findByProfileEntity_IdAndDate(
            Long profileId,
            LocalDate date
    );
}
