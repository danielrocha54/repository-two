package app.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "location")
public class Geolocation {

	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column
	private String city;
	@Column
	private String country;
	@Column
	private double lng;
	@Column
	private double lat;

	public int getId() {
		return this.id;
	}
	public void setId(int id) {
		this.id = id;
	}

	public String getCity() {
		return this.city;
	}
	public void setCity(String city) {
		this.city = city;
	}

	public String getCountry() {
		return this.country;
	}
	public void setLastName(String country) {
		this.country = country;
	}

	public double getLng() {
		return this.lng;
	}
	public void setLng(double lng) {
		this.lng = lng;
	}

	public double getLat() {
		return this.lat;
	}
	public void setLat(double lat) {
		this.lat = lat;
	}
	
	public String toString() {
		return "[id = " + this.id + "]" +
				", [city = " + this.city + "]" + 
				", [country = " + this.country + "]" +
				", [lng = " + this.lng + "]" +
				", [lat = " + this.lat + "]";
	}
	
}
