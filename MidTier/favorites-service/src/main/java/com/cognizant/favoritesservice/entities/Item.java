package com.cognizant.favoritesservice.entities;

import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name="item")
public class Item {
	@Id
	@Column(name="it_id")
	private Integer offset;
	@Column(name="it_group")
	private String group;
	@Column(name="it_name")
	private String name;
	@Column(name="it_ndbno")
	private Integer ndbno;
	@Column(name="it_ds")
	private  String ds;
	@Column(name="it_manu")
	private String manu;
	@ManyToMany
	@JoinTable(name = "favorite_user", joinColumns = @JoinColumn(name = "fu_it_id",referencedColumnName="it_id"), inverseJoinColumns = @JoinColumn(name = "fu_us_username",referencedColumnName="us_username"))
	@JsonIgnore
	private Set<User> userList;

	
	
	public Set<User> getUserList() {
		return userList;
	}
	public void setUserList(Set<User> userList) {
		this.userList = userList;
	}
	public Integer getOffset() {
		return offset;
	}
	public void setOffset(Integer offset) {
		this.offset = offset;
	}
	public String getGroup() {
		return group;
	}
	public void setGroup(String group) {
		this.group = group;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getNdbno() {
		return ndbno;
	}
	public void setNdbno(Integer ndbno) {
		this.ndbno = ndbno;
	}
	public String getDs() {
		return ds;
	}
	public void setDs(String ds) {
		this.ds = ds;
	}
	public String getManu() {
		return manu;
	}
	public void setManu(String manu) {
		this.manu = manu;
	}
	public Item(Integer offset, String group, String name, Integer ndbno, String ds, String manu,User ...users ) {
		super();
		this.offset = offset;
		this.group = group;
		this.name = name;
		this.ndbno = ndbno;
		this.ds = ds;
		this.manu = manu;
		this.userList=Stream.of(users).collect(Collectors.toSet());
		this.userList.forEach(x->x.getItems().add(this));

	}
	public Item() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	

}
