package com.nawa.sf_catalog.model;

import java.util.List;


/** Class to represent an item in our catalog */
// @todo : Add entity class annotation when database is added
public class Item {
    private String name;
    private String price;
    private String category;
    private List<String> locations;

    public Item() {

    }

    public Item(String name, String price, String category, List<String> locations) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.locations = locations;
    }

    // Getters and Setters for field vars
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<String> getLocations() {
        return locations;
    }

    public void setLocations(List<String> locations) {
        this.locations = locations;
    }
}
