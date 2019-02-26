package app.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.dao.GeolocationDao;
import app.model.Geolocation;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

@Component
public class GeolocationDaoImpl implements GeolocationDao {

	@Autowired
	private EntityManagerFactory entityManagerFactory;

	public List<Geolocation> getLocationsDetails() {
		EntityManager em = entityManagerFactory.createEntityManager();
		EntityTransaction et = em.getTransaction();
		et.begin();
		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery criteria = builder.createQuery(Geolocation.class);
		Root contactRoot = criteria.from(Geolocation.class);
		criteria.select(contactRoot);
		List locations = em.createQuery(criteria).getResultList();
		et.commit();
		em.close();
		return locations;
	}
	
	public Geolocation getLocationById(int id) {
		EntityManager em = entityManagerFactory.createEntityManager();
		EntityTransaction et = em.getTransaction();
		et.begin();
		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery criteria = builder.createQuery(Geolocation.class);
		Root contactRoot = criteria.from(Geolocation.class);
		criteria.select(contactRoot).where(builder.equal(contactRoot.get("id"), id));
		List locations = em.createQuery(criteria).getResultList();
		et.commit();
		em.close();
		return (Geolocation) ((locations.size() == 0)? null : locations.get(0));
	}

	public boolean saveLocation(Geolocation location) {
		EntityManager em = entityManagerFactory.createEntityManager();
		EntityTransaction et = em.getTransaction();
		et.begin();
		em.persist(location);
		et.commit();
		em.close();

		return getLocationById(location.getId()) != null;
	}
	
	public boolean updateLocation(Geolocation location) {
		EntityManager em = entityManagerFactory.createEntityManager();
		EntityTransaction et = em.getTransaction();
		et.begin();
		Geolocation updated = em.merge(location);
		et.commit();
		em.close();
		
		return	updated.getCity().equals(location.getCity()) &&
				updated.getCountry().equals(location.getCountry()) &&
				(updated.getLng() == location.getLng()) &&
				(updated.getLat() == location.getLat());
	}

	public boolean removeLocation(Geolocation location) {
		EntityManager em = entityManagerFactory.createEntityManager();
		EntityTransaction et = em.getTransaction();
		et.begin();
		em.remove(em.contains(location) ? location : em.merge(location));
		et.commit();
		em.close();

		return getLocationById(location.getId()) == null;
	}

}
