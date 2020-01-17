package com.cognizant.favoritesservice.services;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cognizant.favoritesservice.entities.AppUser;
import com.cognizant.favoritesservice.entities.User;
import com.cognizant.favoritesservice.exception.UserNotFoundException;
import com.cognizant.favoritesservice.repository.UserRepository;



@Service
public class AppUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	public AppUserDetailsService() {
		super();
	}

	public AppUserDetailsService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username).orElse(null);
		AppUser appUser = null;
		if (user != null) {
			appUser = new AppUser(user);
		} else {
			throw new UsernameNotFoundException("Username is invalid");
		}

		return appUser;
	}

	@Transactional
	public User getUser(String username) throws UserNotFoundException {
		Optional<User> user = userRepository.findByUsername(username);
		if (!user.isPresent()) {
			throw new UserNotFoundException("User with username " + username + " does not exists");
		} else {
			return user.get();
		}
	}

	@Transactional
	public User signupUser(User user) {
		user.setConfirmed(true);
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));
		User newUser = userRepository.save(user);
		return newUser;
	}

	@Transactional
	public boolean userExists(String username) {
		return userRepository.findById(username).isPresent();
	}

	@Transactional
	public User updateProfile(User user) {
		User userObj = userRepository.findByUsername(user.getUsername()).get();
		user.setPassword(userObj.getPassword());
		user.setConfirmed(userObj.isConfirmed());
		user.setRole(userObj.getRole());

		return userRepository.save(user);
	}

	@Transactional
	public User updatePassword(String username, String newPassword) {
		User user = userRepository.findByUsername(username).get();
		user.setPassword(passwordEncoder.encode(newPassword));

		return userRepository.save(user);
	}

	@Transactional
	public User modifyUser(User user) {
		return this.userRepository.save(user);
	}

}
