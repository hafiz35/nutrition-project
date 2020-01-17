package com.cognizant.favoritesservice.entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "user")
public class User {
	
	@Id	
	@Column(name="us_username")
	private String username;
	
	@Column(name="us_password")
	private String password;
	
	@ManyToOne
	@JoinColumn(name="us_ro_id")
	private Role role;
	
	@Column(name="us_email", unique=true)
	private String email;
	
	@Column(name="us_number")
	private String mobileNumber;
	
	public Set<Item> getItems() {
		return items;
	}

	public void setItems(Set<Item> items) {
		this.items = items;
	}

	@Column(name="us_confirmed")
	private boolean confirmed;
	
	@ManyToMany(mappedBy="userList")
	private Set<Item> items=new HashSet<>();

	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	public User(String username, String password, Role role, String email, String mobileNumber,
			boolean confirmed) {
		super();
		this.username = username;
		this.password = password;
		this.role = role;
		this.email = email;
		this.mobileNumber = mobileNumber;
		this.confirmed = confirmed;
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

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
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
