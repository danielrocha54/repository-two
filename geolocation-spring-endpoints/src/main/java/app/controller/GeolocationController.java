package app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.util.UriComponentsBuilder;

import app.model.AppResponse;
import app.model.Geolocation;
import app.service.GeolocationService;

@Controller
public class GeolocationController {

	@Autowired
	private GeolocationService geolocationService;

	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "/api/locations", method = RequestMethod.GET)
	public ResponseEntity<AppResponse> locationDetails() {
		
		List<Geolocation> locationDetails = geolocationService.getLocationsDetails();
		return new ResponseEntity<AppResponse>(new AppResponse(200, "OK", locationDetails), HttpStatus.OK);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "/api/create", method = RequestMethod.POST)
	public ResponseEntity<AppResponse> addLocation(@RequestBody Geolocation geoloc) {
		
		boolean locationCreated = geolocationService.saveLocation(geoloc);
        
        AppResponse appResponse = new AppResponse();
        
        if (locationCreated) {
        	appResponse.setHTTPStatus(200);
        	appResponse.setErrorMessage("OK");
        } else {
        	appResponse.setHTTPStatus(400);
        	appResponse.setErrorMessage("location " + geoloc.getCity() + " not created");
        }
        
        return new ResponseEntity<AppResponse>(appResponse, (locationCreated)? HttpStatus.CREATED : HttpStatus.CONFLICT);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "/api/update", method = RequestMethod.POST)
	public ResponseEntity<AppResponse> updateLocation(@RequestBody Geolocation geoloc) {
		
		boolean locationUpdated = geolocationService.updateLocation(geoloc);
        
        AppResponse appResponse = new AppResponse();
        
        if (locationUpdated) {
        	appResponse.setHTTPStatus(200);
        	appResponse.setErrorMessage("OK");
        } else {
        	appResponse.setHTTPStatus(400);
        	appResponse.setErrorMessage("location " + geoloc.getCity() + " not updated");
        }
        
        return new ResponseEntity<AppResponse>(appResponse, (locationUpdated)? HttpStatus.OK : HttpStatus.CONFLICT);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "/api/delete/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<AppResponse> deleteUser(
    		@PathVariable("id") int id) {
		
		Geolocation location = geolocationService.getLocationById(id);
		
		if (location == null) {
            return new ResponseEntity<AppResponse>(new AppResponse(400, "unable to delete. geolocation with id " + id + " not found", null), HttpStatus.NOT_FOUND);
        }
 
        boolean locationDeleted = geolocationService.removeLocation(location);
        
        AppResponse appResponse = new AppResponse();
        
        if (locationDeleted) {
        	appResponse.setHTTPStatus(200);
        	appResponse.setErrorMessage("OK");
        } else {
        	appResponse.setHTTPStatus(400);
        	appResponse.setErrorMessage("unable to delete geolocation " + id);
        }
        
        return new ResponseEntity<AppResponse>(appResponse, (locationDeleted)? HttpStatus.NO_CONTENT : HttpStatus.CONFLICT);
	}
	
}
