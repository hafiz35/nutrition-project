package com.cognizant.favoritesservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cognizant.favoritesservice.entities.Item;
import com.cognizant.favoritesservice.entities.User;

@Repository
public interface FavoriteRepository extends JpaRepository<Item, Integer> {
}
