package com.cognizant.authentication.dto;

import com.cognizant.authentication.entities.User;

public class UserDto {
	private String username;
	private String password;
	private String role;
	private String email;
	private String mobileNumber;
	private boolean confirmed;
	public UserDto() {
		super();
		// TODO Auto-generated constructor stub
	}
	public UserDto( String username, String password, String role, String email, String mobileNumber,
			boolean confirmed) {
		super();
		this.username = username;
		this.password = password;
		this.role = role;
		this.email = email;
		this.mobileNumber = mobileNumber;
		this.confirmed = confirmed;
	}
	public UserDto(User user) {
		this.username = user.getUsername();
		this.password = user.getPassword();
		this.role = user.getRole().getName();
		this.email = user.getEmail();
		this.mobileNumber = user.getMobileNumber();
		this.confirmed = user.isConfirmed();
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getMobileNumber() {
		return mobileNumber;
	}
	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}
	public boolean isConfirmed() {
		return confirmed;
	}
	public void setConfirmed(boolean confirmed) {
		this.confirmed = confirmed;
	}
	
	
}
