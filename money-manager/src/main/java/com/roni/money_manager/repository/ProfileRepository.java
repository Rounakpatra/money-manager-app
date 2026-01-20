package com.roni.money_manager.repository;

import com.roni.money_manager.entity.ProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfileRepository extends JpaRepository<ProfileEntity,Long> {

    //To find user by email from ProfileEntity
    Optional<ProfileEntity> findByEmail(String email);

    //To find user by activationToken from ProfileEntity
    Optional<ProfileEntity> findByActivationToken(String activationToken);

}
