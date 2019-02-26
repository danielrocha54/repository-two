package app.dao;

import java.util.List;

import app.model.Geolocation;

public interface GeolocationDao {
	
	List<Geolocation> getLocationsDetails();
	
	Geolocation getLocationById(int id);
	
	boolean saveLocation(Geolocation location);
	
	boolean updateLocation(Geolocation location);
	
	boolean removeLocation(Geolocation location);

}
