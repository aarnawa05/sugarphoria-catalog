package com.nawa.sf_catalog.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.GetMapping;

import com.nawa.sf_catalog.model.Item;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    List<Item> itemList = new ArrayList<Item>();

    public ItemController() {
        // Initialize with some sample items
        Item item1 = new Item("Nerds", "10.00", "Category1", List.of("Dallas", "Denver"));
        Item item2 = new Item("Soda", "1.00", "Category2", List.of("Dallas", "Denver"));
        itemList.add(item1);
        itemList.add(item2);
    }

    @GetMapping
    public List<Item> getItems() {
        return itemList;
    }
}
