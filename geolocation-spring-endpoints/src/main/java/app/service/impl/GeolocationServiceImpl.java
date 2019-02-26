/**
 * 
 */
package app.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.dao.GeolocationDao;
import app.model.Geolocation;
import app.service.GeolocationService;

@Service
public class GeolocationServiceImpl implements GeolocationService {
	
	@Autowired
	private GeolocationDao geolocationDao;

	public List<Geolocation> getLocationsDetails() {
		return geolocationDao.getLocationsDetails();
	}
	
	public Geolocation getLocationById(int id) {
		return geolocationDao.getLocationById(id);
	}

	public boolean saveLocation(Geolocation location) {
		return geolocationDao.saveLocation(location);
	}
	
	public boolean updateLocation(Geolocation location) {
		return geolocationDao.updateLocation(location);
	}

	public boolean removeLocation(Geolocation location) {
		return geolocationDao.removeLocation(location);
	}

}
