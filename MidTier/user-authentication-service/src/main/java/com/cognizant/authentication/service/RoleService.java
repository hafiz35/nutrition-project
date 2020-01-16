package com.cognizant.authentication.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.authentication.entities.Role;
import com.cognizant.authentication.repository.RoleRepository;

@Service
public class RoleService {
	@Autowired
	RoleRepository roleRepository;
	
	@Transactional
	public Role getRoleByRoleName(String name) {
		return roleRepository.findByName(name);
	}
}
