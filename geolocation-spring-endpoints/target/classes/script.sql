create database geolocdb;
use geolocdb;

create table location (id int not null auto_increment, city varchar(64), country varchar(64), lat decimal(8,4), lng decimal(8,4), primary key (id));

insert into location (city, country, lat, lng ) values ('Zurich', 'Schweiz', 47.3769, 8.5417);
insert into location (city, country, lat, lng ) values ('Leipzig', 'Deutchland', 51.3397, 12.3731);
insert into location (city, country, lat, lng ) values ('Vienna', 'Osterreich', 48.2082, 16.3738);
insert into location (city, country, lat, lng ) values ('Frankfurt', 'Deutchland', 50.1109, 8.6821);
insert into location (city, country, lat, lng ) values ('Munchen', 'Deutchland', 48.1351, 11.5820);
