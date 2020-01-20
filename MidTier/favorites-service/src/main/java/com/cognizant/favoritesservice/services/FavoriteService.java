package com.cognizant.favoritesservice.services;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.favoritesservice.entities.Item;
import com.cognizant.favoritesservice.entities.User;
import com.cognizant.favoritesservice.exception.UserNotFoundException;
import com.cognizant.favoritesservice.repository.FavoriteRepository;
import com.cognizant.favoritesservice.repository.UserRepository;


@Service
public class FavoriteService {
	@Autowired
	FavoriteRepository favoriteRepository;
	
	@Autowired
	UserRepository userRepository;
	
	public List<Item> getAllFavorites(){
		return favoriteRepository.findAll();
	}
	public Set<Item> getFavoritesByUsername(String username){
		User user=userRepository.findById(username).get();
		return user.getItems();
	}
	public boolean favoriteExist(String username,int offset) {
		User user=userRepository.findById(username).get();
		Set<Item> itemList=user.getItems();
		Item item=favoriteRepository.findById(offset).get();
		boolean favExist=itemList.contains(item);
		return favExist;
	}
	public Item addFavorite(String username,Item item) throws UserNotFoundException {
		Optional<User> user = userRepository.findByUsername(username);
		if (!user.isPresent()) {
			throw new UserNotFoundException("User with username " + username + " does not exists");
		} else {			
			Item new_item=new Item(item.getOffset(), item.getGroup(), item.getName(),item.getNdbno(), item.getDs(), item.getManu(),
					new User(user.get().getUsername(), user.get().getPassword(), user.get().getRole(), user.get().getEmail(), user.get().getMobileNumber(), user.get().isConfirmed()));
			favoriteRepository.save(new_item);
			return item;
		}
	}
}
