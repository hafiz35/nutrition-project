package com.cognizant.favoritesservice.repository;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cognizant.favoritesservice.entities.Item;
import com.cognizant.favoritesservice.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, String>{
	public Optional<User> findByUsername(String username);
}
