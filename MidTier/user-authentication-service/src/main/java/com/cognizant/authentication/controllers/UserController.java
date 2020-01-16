package com.cognizant.authentication.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.authentication.dto.PasswordPojo;
import com.cognizant.authentication.dto.UserDto;
import com.cognizant.authentication.entities.Role;
import com.cognizant.authentication.entities.User;
import com.cognizant.authentication.exception.UserNotFoundException;
import com.cognizant.authentication.service.AppUserDetailsService;
import com.cognizant.authentication.service.RoleService;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	private AppUserDetailsService appUserDetailsService;
	@Autowired
	private RoleService roleService;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@GetMapping("/{username}")
	public UserDto getUser(@PathVariable String username) throws UserNotFoundException {
		try {
			return convertUserToUserDto(appUserDetailsService.getUser(username));
		} catch (NullPointerException e) {
			return null;
		}
	}

	@GetMapping("")
	public boolean userExists(@RequestParam("username") String username) {
		System.out.println(username);
		return this.appUserDetailsService.userExists(username);
	}

	@PutMapping
	public UserDto updateProfile(@RequestBody UserDto userDto) {
		User user = convertUserDtoToUser(userDto);
		try {
			return new UserDto(appUserDetailsService.updateProfile(user));
		} catch (NullPointerException e) {
			return null;
		}
	}

	@PutMapping("/{username}")
	public UserDto updatePassword(@RequestBody PasswordPojo passwordPojo, @PathVariable String username)
			throws UserNotFoundException {
		User user = appUserDetailsService.getUser(username);
		if (passwordEncoder.matches(passwordPojo.getOldPassword(), user.getPassword())) {
			return new UserDto(appUserDetailsService.updatePassword(user.getUsername(), passwordPojo.getNewPassword()));
		} else {
			return null;
		}
	}

	@PutMapping("/change/{uid}")
	public User changePassword(@PathVariable String uid, @RequestBody PasswordPojo passwordObj)
			throws UserNotFoundException {
		System.out.println(passwordObj.getOldPassword());
		System.out.println(passwordObj.getNewPassword());
		User us = appUserDetailsService.getUser(uid);
		if (passwordEncoder.matches(passwordObj.getOldPassword(), us.getPassword())) {
			us.setPassword(passwordEncoder.encode(passwordObj.getNewPassword()));
			return appUserDetailsService.modifyUser(us);
		} else {
			return null;
		}
	}

	@PostMapping
	public UserDto signUp(@RequestBody UserDto userDto) {
		userDto.setRole("ROLE_USER");
		User user = convertUserDtoToUser(userDto);
		return convertUserToUserDto(appUserDetailsService.signupUser(user));
	}

	private User convertUserDtoToUser(UserDto userDto) {
		Role role = roleService.getRoleByRoleName(userDto.getRole());
		User user = new User(userDto.getUsername(), userDto.getPassword(), role, userDto.getEmail(),
				userDto.getMobileNumber(), userDto.isConfirmed());
		return user;
	}

	private UserDto convertUserToUserDto(User user) {
		UserDto userDto = new UserDto(user.getUsername(), user.getPassword(), user.getRole().getName(), user.getEmail(),
				user.getMobileNumber(), user.isConfirmed());
		return userDto;
	}
}
