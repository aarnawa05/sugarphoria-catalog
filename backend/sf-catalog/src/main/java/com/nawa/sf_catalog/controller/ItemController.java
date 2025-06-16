package com.nawa.sf_catalog.controller;

import java.util.ArrayList;
import java.util.List;

// Spring Boot framework 
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.nawa.sf_catalog.model.Item;

@CrossOrigin(origins = "*") // Allow all origins for CORS (Cross-Origin Resource Sharing)
@RestController
@RequestMapping("/api/items")
public class ItemController {

    List<Item> itemList = new ArrayList<Item>();

    public ItemController() {
        // Initialize with some sample items
        Item item1 = new Item("Nerds", "10.00", "Category1", List.of("Dallas", "Denver"));
        Item item2 = new Item("Soda", "1.00", "Category2", List.of("Seattle", "Denver", "Dallas"));
        itemList.add(item1);
        itemList.add(item2);
    }

    // Get all items in the catalog
    @GetMapping
    public List<Item> getItems() {
        return itemList;
    }

    // Add a new item to the database
    @PostMapping
    public Item addItem(@RequestBody Item item) {
        System.out.println("adding item: " + item.getName());
        if (item.getLocations() == null) {
            System.out.println("item locations is null!");
        } else {
            for (String location : item.getLocations()) {
                System.out.println("item location: " + location);
            }
        }

        itemList.add(item);
        return item;
    }

    // Delete the most recent item from the database
    @DeleteMapping
    public Item deleteMostRecent() {
        return itemList.remove(itemList.size() - 1);
    }
}
