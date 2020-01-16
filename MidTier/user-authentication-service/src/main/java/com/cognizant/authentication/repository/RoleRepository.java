package com.cognizant.authentication.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cognizant.authentication.entities.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {
	Role findByName(String name);
}
