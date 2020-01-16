package com.cognizant.favoritesservice.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.favoritesservice.entities.Item;
import com.cognizant.favoritesservice.services.FavoriteService;

@RestController
@RequestMapping("/favorites")
public class FavoriteController {
	@Autowired
	FavoriteService favoriteService;
	
	@GetMapping("/{username}")
	public List<Item> getFavoritesByUsername(@PathVariable("username") String username){
		return favoriteService.getFavoritesByUsername(username);
	}
	@PostMapping
	public Item addFavorite(@RequestBody Item item) {
		return favoriteService.addFavorite(item);
	}
	@GetMapping
	public List<Item> getAllFavorites(){
		return favoriteService.getAllFavorites();
	}
}
