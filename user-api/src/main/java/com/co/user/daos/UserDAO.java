package com.co.user.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.co.user.entities.User;

/**
 * Usuario Repository
 * @author Fabian Torres
 */
public interface UserDAO extends JpaRepository<User, Long>{

}