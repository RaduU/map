package com.map.app.controller;

import com.map.app.entities.Coordinates;
import com.map.app.service.CoordinatesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class ApplicationController {

	@Autowired
	private CoordinatesService coordinatesService;

	@RequestMapping(value = "/insert", method = RequestMethod.POST)
	public Coordinates insert(@RequestBody Coordinates coordinates) {
		Coordinates newCoordinates = new Coordinates(coordinates.getLatitude(), coordinates.getLongitude(), coordinates.getName(), coordinates.getDescription(), coordinates.getCity());
//		Coordinates newCoordinates = new Coordinates(coordinates.getLatitude(), coordinates.getLongitude());
		coordinatesService.insert(newCoordinates);
		return newCoordinates;
	}

	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public String test() {
		return "{\"test\": \"Merge!\"}";
	}

	public String welcome() {
		return "welcome!";
	}
}