 package com.cognizant.favoritesservice.controllers;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.favoritesservice.entities.Item;
import com.cognizant.favoritesservice.exception.UserNotFoundException;
import com.cognizant.favoritesservice.services.FavoriteService;

@RestController
@RequestMapping("/favorites")
public class FavoriteController {
	@Autowired
	FavoriteService favoriteService;
	
	@GetMapping("/{username}")
	public Set<Item> getFavoritesByUsername(@PathVariable("username") String username){
		return favoriteService.getFavoritesByUsername(username);
	}
	@GetMapping("/{username}/{offset}")
	public boolean favoriteExist(@PathVariable("username") String username,@PathVariable("offset") int offset) {
		return this.favoriteService.favoriteExist(username, offset);
	}
	@PostMapping("/{username}")
	public Item addFavorite(@PathVariable("username") String username,@RequestBody Item item) throws UserNotFoundException {
		try {
			return favoriteService.addFavorite(username,item);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return item;
	}
	@GetMapping
	public List<Item> getAllFavorites(){
		return favoriteService.getAllFavorites();
	}
}
