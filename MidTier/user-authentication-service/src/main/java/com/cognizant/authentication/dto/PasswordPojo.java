package com.cognizant.authentication.dto;

public class PasswordPojo {
	
	private String oldPassword;
	private String newPassword;
	public PasswordPojo() {
		super();
		// TODO Auto-generated constructor stub
	}
	public PasswordPojo(String oldPassword, String newPassword) {
		super();
		this.oldPassword = oldPassword;
		this.newPassword = newPassword;
	}
	public String getOldPassword() {
		return oldPassword;
	}
	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}
	public String getNewPassword() {
		return newPassword;
	}
	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
	
}
