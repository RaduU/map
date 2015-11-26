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
//	public Coordinates insert() {
		Coordinates newCoordinates = new Coordinates(coordinates.getLatitude(), coordinates.getLongitude());
//		Coordinates newCoordinates = new Coordinates("111", "100");
		coordinatesService.insert(newCoordinates);
		return newCoordinates;
	}

	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public String test() {
		return "Merge!";
	}

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String welcome() {
		return "welcome!";
	}
}