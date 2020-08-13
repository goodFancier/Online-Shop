package com.messager.service.taxiMaster;

import org.json.simple.JSONObject;

public class Address {
	public String street;
	public String house;
	public Double lat;
	public Double lon;
	public int sd;
	
	public Address() {
		street = "";
		house = "";
		lat = 0.0;
		lon = 0.0;
		sd = 100;
	}
	
	public Address(JSONObject j) {
		if (j == null || j.get("street") == null || j.get("house") == null ||
			j.get("coords") == null) {
			street = "";
			house = "";
			lat = 0.0;
			lon = 0.0;
			sd = 100;			
		}
			
		street = (String)j.get("street");
		house = (String)j.get("house");
		JSONObject coords = (JSONObject)j.get("coords");
		lat = (Double)(coords.get("lat"));
		lon = (Double)(coords.get("lon"));
	}
	
	public String getAddr() {
		return street + ", " + house;
	}
}
