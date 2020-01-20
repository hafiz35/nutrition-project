create database nutritionist;
use nutritionist;

CREATE TABLE `user` (
  `us_username` varchar(255) NOT NULL,
  `us_confirmed` bit(1) DEFAULT NULL,
  `us_email` varchar(255) DEFAULT NULL,
  `us_number` varchar(255) DEFAULT NULL,
  `us_password` varchar(255) DEFAULT NULL,
  `us_ro_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`us_username`),
  UNIQUE KEY `UK_ouhj3ffbx90ik9hhqs0d22sla` (`us_email`),
  KEY `FK97pj0uds46v74ch98hpaha9hi` (`us_ro_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `role` (
  `ro_id` int(11) NOT NULL AUTO_INCREMENT,
  `ro_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ro_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

CREATE TABLE `item` (
  `it_id` int(11) NOT NULL,
  `it_ds` varchar(255) DEFAULT NULL,
  `it_group` varchar(255) DEFAULT NULL,
  `it_manu` varchar(255) DEFAULT NULL,
  `it_name` varchar(255) DEFAULT NULL,
  `it_ndbno` int(11) DEFAULT NULL,
  PRIMARY KEY (`it_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


CREATE TABLE `favorite_user` (
  `fu_us_username` varchar(255) NOT NULL,
  `fu_it_id` int(11) NOT NULL,
  PRIMARY KEY (`fu_us_username`,`fu_it_id`),
  KEY `FK5t7fet12mvx5h7e41qhgd5imn` (`fu_it_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `nutritionist`.`role`(`ro_id`,`ro_name`)
VALUES(1,"ROLE_ADMIN"),
	  (2,"ROLE_USER");
