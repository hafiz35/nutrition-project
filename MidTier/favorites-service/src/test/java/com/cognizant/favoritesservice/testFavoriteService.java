/**
 * 
 */
package com.cognizant.favoritesservice;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import com.cognizant.favoritesservice.entities.Item;
import com.cognizant.favoritesservice.entities.Role;
import com.cognizant.favoritesservice.entities.User;
import com.cognizant.favoritesservice.exception.UserNotFoundException;
import com.cognizant.favoritesservice.repository.FavoriteRepository;
import com.cognizant.favoritesservice.services.FavoriteService;

@RunWith(SpringRunner.class)
@SpringBootTest
class testFavoriteService {

	@Autowired
	FavoriteService favoriteService;

	@MockBean
	FavoriteRepository favoriteRepository;


	@Test
	void testGetAllFavorites() {

		Item item1 = new Item();

		item1.setOffset(1);
		item1.setName("Broccolli");
		item1.setGroup("Dish");
		item1.setNdbno(1287332);
		item1.setDs("Li");
		item1.setManu("none");

		Item item2 = new Item();

		item2.setOffset(2);
		item2.setName("Food");
		item2.setGroup("Sliced");
		item2.setNdbno(3243324);
		item2.setDs("Li");
		item2.setManu("none");

		List<Item> itemList = Arrays.asList(item1, item2);
		Mockito.when(favoriteRepository.findAll()).thenReturn(itemList);
		assertThat(favoriteService.getAllFavorites()).isEqualTo(itemList);
	}

	@Test
	void testAddFavorite() throws UserNotFoundException {
		Role role = new Role(2, "ROLE_USER");
		User user = new User("hafiz", "password", role, "hafiz@gmail.com", "9876543212", true);
		
		Set<User> userList=new HashSet<User>();
		userList.add(user);
		
		Item item = new Item();

		item.setOffset(2);
		item.setName("Food");
		item.setGroup("Sliced");
		item.setNdbno(3243324);
		item.setDs("Li");
		item.setManu("none");
		item.setUserList(userList);
		
		Mockito.when(favoriteRepository.save(item)).thenReturn(item);

		assertThat(favoriteService.addFavorite("hafiz", item)).isEqualTo(item);
	}

}
