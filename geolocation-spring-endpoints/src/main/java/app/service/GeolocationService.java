/**
 * 
 */
package app.service;

import java.util.List;

import app.model.Geolocation;

public interface GeolocationService {

	List<Geolocation> getLocationsDetails();
	
	Geolocation getLocationById(int id);
	
	boolean saveLocation(Geolocation location);
	
	boolean updateLocation(Geolocation location);
	
	boolean removeLocation(Geolocation location);
	
}
