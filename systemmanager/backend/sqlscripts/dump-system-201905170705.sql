-- MySQL dump 10.17  Distrib 10.3.14-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: system
-- ------------------------------------------------------
-- Server version	10.3.14-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account_emailaddress`
--

DROP TABLE IF EXISTS `account_emailaddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_emailaddress` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `verified` tinyint(1) NOT NULL,
  `primary` tinyint(1) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `account_emailaddress_user_id_2c513194_fk_user_id` (`user_id`),
  CONSTRAINT `account_emailaddress_user_id_2c513194_fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_emailaddress`
--

LOCK TABLES `account_emailaddress` WRITE;
/*!40000 ALTER TABLE `account_emailaddress` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_emailaddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_emailconfirmation`
--

DROP TABLE IF EXISTS `account_emailconfirmation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_emailconfirmation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime(6) NOT NULL,
  `sent` datetime(6) DEFAULT NULL,
  `key` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_address_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`),
  KEY `account_emailconfirm_email_address_id_5b7f8c58_fk_account_e` (`email_address_id`),
  CONSTRAINT `account_emailconfirm_email_address_id_5b7f8c58_fk_account_e` FOREIGN KEY (`email_address_id`) REFERENCES `account_emailaddress` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_emailconfirmation`
--

LOCK TABLES `account_emailconfirmation` WRITE;
/*!40000 ALTER TABLE `account_emailconfirmation` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_emailconfirmation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `admin_user_id_8a7d8779_fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (20001),(20002),(20003),(20004);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `advisor`
--

DROP TABLE IF EXISTS `advisor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `advisor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dateAssigned` date DEFAULT NULL,
  `faculty_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `advisor_faculty_id_student_id_7850cfbf_uniq` (`faculty_id`,`student_id`),
  KEY `advisor_student_id_85d75315_fk_student_user_id` (`student_id`),
  CONSTRAINT `advisor_faculty_id_b26f650f_fk_faculty_user_id` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`user_id`),
  CONSTRAINT `advisor_student_id_85d75315_fk_student_user_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `advisor`
--

LOCK TABLES `advisor` WRITE;
/*!40000 ALTER TABLE `advisor` DISABLE KEYS */;
INSERT INTO `advisor` VALUES (1,'2018-07-22',10002,40001),(2,'2018-07-22',10002,40002),(3,'2018-07-22',10002,40003),(4,'2018-07-22',10002,40004),(5,'2018-07-22',10002,40005),(6,'2018-07-22',10002,40006),(7,'2018-07-22',10002,40007),(8,'2018-07-22',10002,40008),(9,'2018-07-22',10002,40009),(10,'2018-07-22',10002,40010),(11,'2018-07-22',10002,40011),(12,'2018-07-22',10002,40012),(13,'2018-07-22',10002,40013),(14,'2018-07-22',10002,40014),(15,'2018-07-22',10002,40015),(16,'2018-07-22',10002,40016),(17,'2018-07-22',10002,40017),(18,'2018-07-22',10002,40018),(19,'2018-07-22',10002,40019),(20,'2018-07-22',10002,40020),(21,'2016-07-22',10003,40101),(22,'2016-07-22',10003,40102),(23,'2016-07-22',10003,40103),(24,'2016-07-22',10003,40104),(25,'2016-07-22',10003,40105),(26,'2016-07-22',10003,40106),(27,'2016-07-22',10003,40107),(28,'2016-07-22',10003,40108),(29,'2016-07-22',10003,40109),(30,'2016-07-22',10003,40110),(31,'2016-07-22',10003,40111),(32,'2016-07-22',10003,40112),(33,'2016-07-22',10003,40113),(34,'2016-07-22',10003,40114),(35,'2016-07-22',10003,40115),(36,'2016-07-22',10003,40116),(37,'2016-07-22',10003,40117),(38,'2016-07-22',10003,40118),(39,'2016-07-22',10003,40119),(40,'2016-07-22',10003,40120),(41,'2018-07-22',10006,40201),(42,'2018-07-22',10006,40202),(43,'2018-07-22',10006,40203),(44,'2018-07-22',10006,40204),(45,'2018-07-22',10006,40205),(46,'2018-07-22',10006,40206),(47,'2018-07-22',10006,40207),(48,'2018-07-22',10006,40208),(49,'2018-07-22',10006,40209),(50,'2018-07-22',10006,40210),(51,'2018-07-22',10006,40211),(52,'2018-07-22',10006,40212),(53,'2018-07-22',10006,40213),(54,'2018-07-22',10006,40214),(55,'2018-07-22',10006,40215),(56,'2018-07-22',10006,40216),(57,'2018-07-22',10006,40217),(58,'2018-07-22',10006,40218),(59,'2018-07-22',10006,40219),(60,'2018-07-22',10006,40220),(61,'2016-07-22',10007,40301),(62,'2016-07-22',10007,40302),(63,'2016-07-22',10007,40303),(64,'2016-07-22',10007,40304),(65,'2016-07-22',10007,40305),(66,'2016-07-22',10007,40306),(67,'2016-07-22',10007,40307),(68,'2016-07-22',10007,40308),(69,'2016-07-22',10007,40309),(70,'2016-07-22',10007,40310),(71,'2016-07-22',10007,40311),(72,'2016-07-22',10007,40312),(73,'2016-07-22',10007,40313),(74,'2016-07-22',10007,40314),(75,'2016-07-22',10007,40315),(76,'2016-07-22',10007,40316),(77,'2016-07-22',10007,40317),(78,'2016-07-22',10007,40318),(79,'2016-07-22',10007,40319),(80,'2016-07-22',10007,40320),(81,'2018-07-22',10005,40401),(82,'2018-07-22',10005,40402),(83,'2018-07-22',10005,40403),(84,'2018-07-22',10005,40404),(85,'2018-07-22',10005,40405),(86,'2018-07-22',10005,40406),(87,'2018-07-22',10005,40407),(88,'2018-07-22',10005,40408),(89,'2018-07-22',10005,40409),(90,'2018-07-22',10005,40410),(91,'2017-07-22',10005,40411),(92,'2017-07-22',10005,40412),(93,'2017-07-22',10005,40413),(94,'2017-07-22',10005,40414),(95,'2017-07-22',10005,40415),(96,'2017-07-22',10005,40416),(97,'2017-07-22',10005,40417),(98,'2017-07-22',10005,40418),(99,'2017-07-22',10005,40419),(100,'2017-07-22',10005,40420);
/*!40000 ALTER TABLE `advisor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attendance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isPresent` tinyint(1) NOT NULL,
  `dayAttended` date NOT NULL,
  `enrollment_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `attendance_enrollment_id_be7ff56a_fk_enrollment_id` (`enrollment_id`),
  CONSTRAINT `attendance_enrollment_id_be7ff56a_fk_enrollment_id` FOREIGN KEY (`enrollment_id`) REFERENCES `enrollment` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=185 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add site',6,'add_site'),(22,'Can change site',6,'change_site'),(23,'Can delete site',6,'delete_site'),(24,'Can view site',6,'view_site'),(25,'Can add email address',7,'add_emailaddress'),(26,'Can change email address',7,'change_emailaddress'),(27,'Can delete email address',7,'delete_emailaddress'),(28,'Can view email address',7,'view_emailaddress'),(29,'Can add email confirmation',8,'add_emailconfirmation'),(30,'Can change email confirmation',8,'change_emailconfirmation'),(31,'Can delete email confirmation',8,'delete_emailconfirmation'),(32,'Can view email confirmation',8,'view_emailconfirmation'),(33,'Can add social account',9,'add_socialaccount'),(34,'Can change social account',9,'change_socialaccount'),(35,'Can delete social account',9,'delete_socialaccount'),(36,'Can view social account',9,'view_socialaccount'),(37,'Can add social application',10,'add_socialapp'),(38,'Can change social application',10,'change_socialapp'),(39,'Can delete social application',10,'delete_socialapp'),(40,'Can view social application',10,'view_socialapp'),(41,'Can add social application token',11,'add_socialtoken'),(42,'Can change social application token',11,'change_socialtoken'),(43,'Can delete social application token',11,'delete_socialtoken'),(44,'Can view social application token',11,'view_socialtoken'),(45,'Can add Token',12,'add_token'),(46,'Can change Token',12,'change_token'),(47,'Can delete Token',12,'delete_token'),(48,'Can view Token',12,'view_token'),(49,'Can add user',13,'add_user'),(50,'Can change user',13,'change_user'),(51,'Can delete user',13,'delete_user'),(52,'Can view user',13,'view_user'),(53,'Can add building',14,'add_building'),(54,'Can change building',14,'change_building'),(55,'Can delete building',14,'delete_building'),(56,'Can view building',14,'view_building'),(57,'Can add course',15,'add_course'),(58,'Can change course',15,'change_course'),(59,'Can delete course',15,'delete_course'),(60,'Can view course',15,'view_course'),(61,'Can add course section',16,'add_coursesection'),(62,'Can change course section',16,'change_coursesection'),(63,'Can delete course section',16,'delete_coursesection'),(64,'Can view course section',16,'view_coursesection'),(65,'Can add day',17,'add_day'),(66,'Can change day',17,'change_day'),(67,'Can delete day',17,'delete_day'),(68,'Can view day',17,'view_day'),(69,'Can add department',18,'add_department'),(70,'Can change department',18,'change_department'),(71,'Can delete department',18,'delete_department'),(72,'Can view department',18,'view_department'),(73,'Can add hold',19,'add_hold'),(74,'Can change hold',19,'change_hold'),(75,'Can delete hold',19,'delete_hold'),(76,'Can view hold',19,'view_hold'),(77,'Can add major',20,'add_major'),(78,'Can change major',20,'change_major'),(79,'Can delete major',20,'delete_major'),(80,'Can view major',20,'view_major'),(81,'Can add minor',21,'add_minor'),(82,'Can change minor',21,'change_minor'),(83,'Can delete minor',21,'delete_minor'),(84,'Can view minor',21,'view_minor'),(85,'Can add term',22,'add_term'),(86,'Can change term',22,'change_term'),(87,'Can delete term',22,'delete_term'),(88,'Can view term',22,'view_term'),(89,'Can add time',23,'add_time'),(90,'Can change time',23,'change_time'),(91,'Can delete time',23,'delete_time'),(92,'Can view time',23,'view_time'),(93,'Can add admin',24,'add_admin'),(94,'Can change admin',24,'change_admin'),(95,'Can delete admin',24,'delete_admin'),(96,'Can view admin',24,'view_admin'),(97,'Can add faculty',25,'add_faculty'),(98,'Can change faculty',25,'change_faculty'),(99,'Can delete faculty',25,'delete_faculty'),(100,'Can view faculty',25,'view_faculty'),(101,'Can add researcher',26,'add_researcher'),(102,'Can change researcher',26,'change_researcher'),(103,'Can delete researcher',26,'delete_researcher'),(104,'Can view researcher',26,'view_researcher'),(105,'Can add student',27,'add_student'),(106,'Can change student',27,'change_student'),(107,'Can delete student',27,'delete_student'),(108,'Can view student',27,'view_student'),(109,'Can add slot',28,'add_slot'),(110,'Can change slot',28,'change_slot'),(111,'Can delete slot',28,'delete_slot'),(112,'Can view slot',28,'view_slot'),(113,'Can add room',29,'add_room'),(114,'Can change room',29,'change_room'),(115,'Can delete room',29,'delete_room'),(116,'Can view room',29,'view_room'),(117,'Can add enrollment',30,'add_enrollment'),(118,'Can change enrollment',30,'change_enrollment'),(119,'Can delete enrollment',30,'delete_enrollment'),(120,'Can view enrollment',30,'view_enrollment'),(121,'Can add attendance',31,'add_attendance'),(122,'Can change attendance',31,'change_attendance'),(123,'Can delete attendance',31,'delete_attendance'),(124,'Can view attendance',31,'view_attendance'),(125,'Can add full time faculty',32,'add_fulltimefaculty'),(126,'Can change full time faculty',32,'change_fulltimefaculty'),(127,'Can delete full time faculty',32,'delete_fulltimefaculty'),(128,'Can view full time faculty',32,'view_fulltimefaculty'),(129,'Can add grad student',33,'add_gradstudent'),(130,'Can change grad student',33,'change_gradstudent'),(131,'Can delete grad student',33,'delete_gradstudent'),(132,'Can view grad student',33,'view_gradstudent'),(133,'Can add part time faculty',34,'add_parttimefaculty'),(134,'Can change part time faculty',34,'change_parttimefaculty'),(135,'Can delete part time faculty',34,'delete_parttimefaculty'),(136,'Can view part time faculty',34,'view_parttimefaculty'),(137,'Can add undergrad student',35,'add_undergradstudent'),(138,'Can change undergrad student',35,'change_undergradstudent'),(139,'Can delete undergrad student',35,'delete_undergradstudent'),(140,'Can view undergrad student',35,'view_undergradstudent'),(141,'Can add prerequisite',36,'add_prerequisite'),(142,'Can change prerequisite',36,'change_prerequisite'),(143,'Can delete prerequisite',36,'delete_prerequisite'),(144,'Can view prerequisite',36,'view_prerequisite'),(145,'Can add department chair',37,'add_departmentchair'),(146,'Can change department chair',37,'change_departmentchair'),(147,'Can delete department chair',37,'delete_departmentchair'),(148,'Can view department chair',37,'view_departmentchair'),(149,'Can add full time grad student',38,'add_fulltimegradstudent'),(150,'Can change full time grad student',38,'change_fulltimegradstudent'),(151,'Can delete full time grad student',38,'delete_fulltimegradstudent'),(152,'Can view full time grad student',38,'view_fulltimegradstudent'),(153,'Can add full time undergrad student',39,'add_fulltimeundergradstudent'),(154,'Can change full time undergrad student',39,'change_fulltimeundergradstudent'),(155,'Can delete full time undergrad student',39,'delete_fulltimeundergradstudent'),(156,'Can view full time undergrad student',39,'view_fulltimeundergradstudent'),(157,'Can add part time grad student',40,'add_parttimegradstudent'),(158,'Can change part time grad student',40,'change_parttimegradstudent'),(159,'Can delete part time grad student',40,'delete_parttimegradstudent'),(160,'Can view part time grad student',40,'view_parttimegradstudent'),(161,'Can add part time undergrad student',41,'add_parttimeundergradstudent'),(162,'Can change part time undergrad student',41,'change_parttimeundergradstudent'),(163,'Can delete part time undergrad student',41,'delete_parttimeundergradstudent'),(164,'Can view part time undergrad student',41,'view_parttimeundergradstudent'),(165,'Can add transcript',42,'add_transcript'),(166,'Can change transcript',42,'change_transcript'),(167,'Can delete transcript',42,'delete_transcript'),(168,'Can view transcript',42,'view_transcript'),(169,'Can add student minor',43,'add_studentminor'),(170,'Can change student minor',43,'change_studentminor'),(171,'Can delete student minor',43,'delete_studentminor'),(172,'Can view student minor',43,'view_studentminor'),(173,'Can add student major',44,'add_studentmajor'),(174,'Can change student major',44,'change_studentmajor'),(175,'Can delete student major',44,'delete_studentmajor'),(176,'Can view student major',44,'view_studentmajor'),(177,'Can add grade',45,'add_grade'),(178,'Can change grade',45,'change_grade'),(179,'Can delete grade',45,'delete_grade'),(180,'Can view grade',45,'view_grade'),(181,'Can add advisor',46,'add_advisor'),(182,'Can change advisor',46,'change_advisor'),(183,'Can delete advisor',46,'delete_advisor'),(184,'Can view advisor',46,'view_advisor');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authtoken_token`
--

DROP TABLE IF EXISTS `authtoken_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `authtoken_token` (
  `key` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `authtoken_token_user_id_35299eff_fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authtoken_token`
--

LOCK TABLES `authtoken_token` WRITE;
/*!40000 ALTER TABLE `authtoken_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `authtoken_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `building`
--

DROP TABLE IF EXISTS `building`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `building` (
  `code` varchar(4) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `building`
--

LOCK TABLES `building` WRITE;
/*!40000 ALTER TABLE `building` DISABLE KEYS */;
INSERT INTO `building` VALUES ('CC','Campus Center'),('ET','Engineering Tower');
/*!40000 ALTER TABLE `building` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course` (
  `id` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `number` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `numberOfCredits` int(11) NOT NULL,
  `isGraduateCourse` tinyint(1) NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `department_id` varchar(4) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `course_department_id_5110981f_fk_department_code` (`department_id`),
  CONSTRAINT `course_department_id_5110981f_fk_department_code` FOREIGN KEY (`department_id`) REFERENCES `department` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES ('CE110','110','General Chemistry','General Chemistry Description',3,0,1,'CE'),('CE111','111','General Chemistry Laboratory','General Chemistry Laboratory Description',2,0,1,'CE'),('CE123','123','test','fewq',1,0,1,'CE'),('CE124','124','flkasjr;lkjewkl;','dwqr',1,0,1,'CE'),('CE125','125','Test Name','Description IS this ',3,0,1,'CE'),('CE160','160','Physical Principles of Chemistry','Physical Principles of Chemistry Description',3,0,1,'CE'),('CE211','211','Material Science for Chemical Engineers','Material Science for Chemical Engineers Description',3,0,1,'CE'),('CE221','221','Material and Energy Balances','Material and Energy Balances Description',3,0,1,'CE'),('CE232','232','Chemical Engineering Thermodynamics I','Chemical Engineering Thermodynamics I Description',3,0,1,'CE'),('CE241','241','Organic Chemistry I','Organic Chemistry I Description',3,0,1,'CE'),('CE242','242','Organic Chemistry II','Organic Chemistry II Description',3,0,1,'CE'),('CE243','243','Organic Chemistry Laboratory','Organic Chemistry Laboratory Description',2,0,1,'CE'),('CE321','321','Physical Chemistry I','Physical Chemistry I Description',3,0,1,'CE'),('CE322','322','Physical Chemistry II','Physical Chemistry II Description',2,0,1,'CE'),('CE331','331','Chemical Engineering Thermodynamics II','Chemical Engineering Thermodynamics II Description',3,0,1,'CE'),('CE332','332','Chemical Reaction Engineering','Chemical Reaction Engineering Description',3,0,1,'CE'),('CE341','341','Fluid Mechanics and Flow Systems','Fluid Mechanics and Flow Systems Description',3,0,1,'CE'),('CE342','342','Heat and Mass Transfer','Heat and Mass Transfer Description',3,0,1,'CE'),('CE350','350','Instrumental Analysis Laboratory','Instrumental Analysis Laboratory Description',2,0,1,'CE'),('CE351','351','Separation Process Principles','Separation Process Principles Description',3,0,1,'CE'),('CE352','352','Process Simulation and Mathematical Techniques for Chemical Engineers','Process Simulation and Mathematical Techniques for Chemical Engineers Description',3,0,1,'CE'),('CE361','361','Chemical Process Dynamics and Control','Chemical Process Dynamics and Control Description',3,0,1,'CE'),('CE371','371','Chemical Engineering Laboratory I','Chemical Engineering Laboratory I Description',2,0,1,'CE'),('CE372','372','Chemical Engineering Laboratory II','Chemical Engineering Laboratory II Description',2,0,1,'CE'),('CE381','381','Process Evaluation and Chemical Systems Design I','Process Evaluation and Chemical Systems Design I Description',3,0,1,'CE'),('CE382','382','Process Evaluation and Chemical Systems Design II','Process Evaluation and Chemical Systems Design II',3,0,1,'CE'),('EE101','101','Engineering Design and Problem Solving','Engineering Design and Problem Solving Description',3,0,1,'EE'),('EE102','102','Engineering Design Graphics','Engineering Design Graphics Description',1,0,1,'EE'),('EE123','123','Test Name Name','jdf;lkasf;kwlerj;alsd\n\\\n',1,0,1,'EE'),('EE150','150','Digital Logic Design','Digital Logic Design Description',3,0,1,'EE'),('EE160','160','Programming for Electrical Engineers','Programming for Electrical Engineers Description',3,0,1,'EE'),('EE211','211','Signal Processing & Systems Analysis','Signal Processing & Systems Analysis Descprition',3,0,1,'EE'),('EE240','240','Circuit Analysis','Circuit Analysis Description',3,0,1,'EE'),('EE241','244','Electronics I','Robotic Legos!!!!!',4,0,1,'EE'),('EE251','251','Computer Architecture','Gateways to Heaven',3,0,1,'EE'),('EE264','264','Data Structures & Algorithms I','Description',3,0,1,'EE'),('EE300','300','Communication Theory','01101000 01110100 01110100 01110000 01110011 00111010 00101111 00101111 01111001 01101111 01110101 01110100 01110101 00101110 01100010 01100101 00101111 01100100 01010001 01110111 00110100 01110111 00111001 01010111 01100111 01011000 01100011 01010001',3,0,1,'EE'),('EE303','303','Technical Communications','Basically an English Class',3,0,1,'EE'),('EE310','310','C++','I dont want a C++, I want a C--',3,0,1,'EE'),('EE342','342','Electronics II','Bionicles are upgrades from Legos',4,0,1,'EE'),('EE357','357','Operating Systems','prehistory linux',3,0,1,'EE'),('EE360','360','Software Engineering','Hai would not be impressed',3,0,1,'EE'),('EE365','365','Data Structures & Algorithms II','What my school needs to add to our curriculum',3,0,1,'EE'),('EE394','394','Android Development','Windows Phones are better',3,0,1,'EE'),('EE395','395','Data Mining','Facebook is amazing!',3,0,1,'EE'),('EE396','396','AI','Make a chess AI that can beat the professor. Pass - Fail',3,0,1,'EE'),('EE399','399','Senior Project','Create your own ideas',4,0,1,'EE'),('HU101','101','Literary Forms and Expressions','Literary Forms and Expressions Description',3,0,1,'HU'),('HU102','102','Texts and Contexts: Old and New Worlds','Text from ancient and modern literature',3,0,1,'HU'),('HU103','103','The Making of Modern Society','The Making of Modern Society Description',3,0,1,'HU'),('HU104','104','The Modern Context: Figures and Topics','Famous people\'s influence -- Description',3,0,1,'HU'),('MA110','110','Introduction to Linear Algebra','Introduction to Linear Algebra Description',2,0,1,'MA'),('MA111','111','Calculus I','Calculus I Description',4,0,1,'MA'),('MA113','113','Calculus II','Calculus II Description',4,0,1,'MA'),('MA223','223','Vector Calculus','Vector Calculus Description',2,0,1,'MA'),('MA224','224','Probability','Probability Description',3,0,1,'MA'),('MA240','240','Ordinary and Partial Differential Equations','Ordinary and Partial Differential Equations Descriptions',3,0,1,'MA'),('MA302','302','Statistics','Need. It. Stat.',3,0,1,'MA'),('MA303','303','Discrete Mathematics','Shhhhh',3,0,1,'MA'),('MA304','304','Linear Algebra','Matrices',3,0,1,'MA'),('MA305','305','Calculus III','Calculus III Description',3,0,1,'MA'),('PH101','101','Physics I','Somehow this class bends time',4,0,1,'PH'),('PH102','102','Physics II','The Star Wars sequel we never wanted',4,0,1,'PH'),('PH103','103','Physics III','Modern Physics. How does light bend around dense masses?',4,0,1,'PH');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_section`
--

DROP TABLE IF EXISTS `course_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_section` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` int(11) NOT NULL,
  `numOfSeats` int(11) DEFAULT NULL,
  `numOfTaken` int(11) NOT NULL,
  `course_id` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `room_id` varchar(9) COLLATE utf8mb4_unicode_ci NOT NULL,
  `term_id` int(11) NOT NULL,
  `faculty_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `course_section_course_id_b17c56a1_fk_course_id` (`course_id`),
  KEY `course_section_room_id_18ce5340_fk_room_id` (`room_id`),
  KEY `course_section_term_id_92ec2fa3_fk_term_id` (`term_id`),
  KEY `course_section_faculty_id_af4b49d4_fk_faculty_user_id` (`faculty_id`),
  CONSTRAINT `course_section_course_id_b17c56a1_fk_course_id` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  CONSTRAINT `course_section_faculty_id_af4b49d4_fk_faculty_user_id` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`user_id`),
  CONSTRAINT `course_section_room_id_18ce5340_fk_room_id` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`),
  CONSTRAINT `course_section_term_id_92ec2fa3_fk_term_id` FOREIGN KEY (`term_id`) REFERENCES `term` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50058 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_section`
--

LOCK TABLES `course_section` WRITE;
/*!40000 ALTER TABLE `course_section` DISABLE KEYS */;
INSERT INTO `course_section` VALUES (20001,1,30,20,'CE110','ET16',2,10004),(20002,2,30,21,'CE110','ET16',2,10004),(20003,1,30,20,'CE241','ET17',2,10004),(20004,1,20,20,'CE350','ET17',2,10004),(20005,1,30,20,'CE321','ET18',2,10003),(20006,1,30,20,'CE221','ET18',2,10003),(20007,1,30,20,'CE211','ET19',2,10003),(20008,1,30,20,'CE331','ET19',2,10003),(20009,1,30,20,'CE341','ET20',2,10002),(20010,1,20,20,'CE371','ET20',2,10002),(20011,1,30,20,'CE381','ET21',2,10002),(20012,1,30,20,'CE351','ET21',2,10001),(20013,1,30,20,'CE361','ET22',2,10001),(20014,1,30,20,'MA110','ET22',2,10010),(20015,2,30,20,'MA110','ET23',2,10010),(20016,1,30,20,'MA111','ET23',2,10010),(20017,2,30,20,'MA111','ET24',2,10010),(20018,1,30,20,'MA223','ET24',2,10009),(20019,1,30,20,'MA224','ET25',2,10009),(20020,1,30,20,'MA303','ET25',2,10009),(20021,1,30,20,'HU101','ET26',2,10014),(20022,2,30,20,'HU101','ET26',2,10014),(20023,1,30,20,'HU103','ET27',2,10013),(20024,2,30,20,'HU103','ET27',2,10013),(20025,1,30,30,'PH102','ET28',2,10012),(20026,1,30,30,'PH102','ET28',2,10012),(20027,1,30,20,'EE240','ET29',2,10008),(20028,2,30,20,'EE240','ET30',2,10008),(20029,1,30,20,'EE300','ET30',2,10007),(20030,2,30,20,'EE300','ET31',2,10007),(20031,1,30,20,'EE310','ET31',2,10008),(20032,2,30,20,'EE310','ET32',2,10008),(20033,1,30,20,'EE342','ET32',2,10007),(20034,2,30,20,'EE342','ET33',2,10007),(20035,1,30,20,'EE357','ET33',2,10006),(20036,2,30,20,'EE357','ET34',2,10006),(20037,1,30,20,'EE365','ET34',2,10006),(20038,2,30,20,'EE365','ET35',2,10006),(20039,1,30,30,'EE395','ET35',2,10005),(20040,1,30,30,'EE396','ET36',2,10005),(20041,1,30,30,'EE396','ET36',2,10005),(20042,1,30,30,'EE101','ET36',2,10008),(20043,1,30,30,'EE101','ET36',2,10008),(20044,1,30,30,'EE102','ET35',2,10007),(20045,1,30,30,'EE102','ET35',2,10007),(21001,1,20,20,'CE111','ET16',3,10004),(21002,1,20,20,'CE111','ET16',3,10004),(21003,1,30,20,'CE160','ET17',3,10004),(21004,2,30,20,'CE160','ET17',3,10004),(21005,1,30,20,'CE242','ET18',3,10003),(21006,1,30,20,'CE243','ET18',3,10003),(21007,1,30,20,'CE322','ET19',3,10003),(21008,1,30,20,'CE232','ET19',3,10003),(21009,1,30,20,'CE332','ET20',3,10002),(21010,1,30,20,'CE342','ET20',3,10002),(21011,1,30,20,'CE352','ET21',3,10002),(21012,1,20,20,'CE372','ET21',3,10001),(21013,1,30,20,'CE382','ET22',3,10001),(21014,1,30,20,'MA113','ET22',3,10010),(21015,2,30,20,'MA113','ET23',3,10010),(21016,1,30,20,'MA302','ET23',3,10010),(21017,1,30,20,'MA304','ET24',3,10009),(21018,1,30,20,'MA305','ET24',3,10009),(21019,1,30,20,'HU102','ET25',3,10014),(21020,2,30,20,'HU102','ET25',3,10014),(21021,1,30,20,'HU104','ET26',3,10013),(21022,2,30,20,'HU104','ET26',3,10013),(21023,1,30,30,'PH101','ET27',3,10012),(21024,2,20,20,'PH101','ET27',3,10012),(21025,3,30,30,'PH101','ET28',3,10012),(21026,1,30,30,'PH103','ET28',3,10011),(21028,1,30,30,'PH103','ET29',3,10011),(21029,1,30,20,'EE150','ET29',3,10008),(21030,2,30,20,'EE150','ET30',3,10008),(21031,1,30,20,'EE160','ET30',3,10008),(21032,2,30,20,'EE160','ET31',3,10008),(21033,1,30,20,'EE211','ET31',3,10007),(21034,2,30,20,'EE211','ET32',3,10007),(21035,1,30,20,'EE241','ET32',3,10007),(21036,1,30,20,'EE241','ET33',3,10007),(21037,1,30,30,'EE251','ET33',3,10006),(21038,1,30,30,'EE264','ET34',3,10006),(21039,1,30,30,'EE303','ET34',3,10006),(21040,1,30,30,'EE360','ET35',3,10005),(21041,1,30,30,'EE394','ET35',3,10005),(30001,1,30,20,'CE110','ET16',4,10004),(30002,2,30,20,'CE110','ET16',4,10004),(30003,1,30,20,'CE241','ET17',4,10004),(30004,1,20,20,'CE350','ET17',4,10004),(30005,1,30,20,'CE321','ET18',4,10003),(30006,1,30,20,'CE221','ET18',4,10003),(30007,1,30,20,'CE211','ET19',4,10003),(30008,1,30,20,'CE331','ET19',4,10003),(30009,1,30,20,'CE341','ET20',4,10002),(30010,1,20,20,'CE371','ET20',4,10002),(30011,1,30,20,'CE381','ET21',4,10002),(30012,1,30,20,'CE351','ET21',4,10001),(30013,1,30,20,'CE361','ET22',4,10001),(30014,1,30,20,'MA110','ET22',4,10010),(30015,2,30,20,'MA110','ET23',4,10010),(30016,1,30,20,'MA111','ET23',4,10010),(30017,2,30,20,'MA111','ET24',4,10010),(30018,1,30,20,'MA223','ET24',4,10009),(30019,1,30,20,'MA224','ET25',4,10009),(30020,1,30,20,'MA303','ET25',4,10009),(30021,1,30,20,'HU101','ET26',4,10014),(30022,2,30,20,'HU101','ET26',4,10014),(30023,1,30,20,'HU103','ET27',4,10013),(30024,2,30,20,'HU103','ET27',4,10013),(30025,1,30,30,'PH102','ET28',4,10012),(30026,1,30,30,'PH102','ET28',4,10012),(30027,1,30,20,'EE240','ET29',4,10008),(30028,2,30,20,'EE240','ET30',4,10008),(30029,1,30,20,'EE300','ET30',4,10007),(30030,2,30,20,'EE300','ET31',4,10007),(30031,1,30,20,'EE310','ET31',4,10008),(30032,2,30,20,'EE310','ET32',4,10008),(30033,1,30,20,'EE342','ET32',4,10007),(30034,2,30,20,'EE342','ET33',4,10007),(30035,1,30,20,'EE357','ET33',4,10006),(30036,2,30,20,'EE357','ET34',4,10006),(30037,1,30,20,'EE365','ET34',4,10006),(30038,2,30,20,'EE365','ET35',4,10006),(30039,1,30,30,'EE395','ET35',4,10005),(30040,1,30,30,'EE396','ET36',4,10005),(30041,1,30,30,'EE396','ET36',4,10005),(30042,1,30,30,'EE101','ET36',4,10008),(30043,1,30,30,'EE101','ET36',4,10008),(30044,1,30,30,'EE102','ET35',4,10007),(30045,1,30,30,'EE102','ET35',4,10007),(31001,1,20,20,'CE111','ET16',5,10004),(31002,1,20,20,'CE111','ET16',5,10004),(31003,1,30,20,'CE160','ET17',5,10004),(31004,2,30,20,'CE160','ET17',5,10004),(31005,1,30,20,'CE242','ET18',5,10003),(31006,1,30,20,'CE243','ET18',5,10003),(31007,1,30,20,'CE322','ET19',5,10003),(31008,1,30,20,'CE232','ET19',5,10003),(31009,1,30,20,'CE332','ET20',5,10002),(31010,1,30,20,'CE342','ET20',5,10002),(31011,1,30,20,'CE352','ET21',5,10002),(31012,1,20,20,'CE372','ET21',5,10001),(31013,1,30,20,'CE382','ET22',5,10001),(31014,1,30,20,'MA113','ET22',5,10010),(31015,2,30,20,'MA113','ET23',5,10010),(31016,1,30,20,'MA302','ET23',5,10010),(31017,1,30,20,'MA304','ET24',5,10009),(31018,1,30,20,'MA305','ET24',5,10009),(31019,1,30,20,'HU102','ET25',5,10014),(31020,2,30,20,'HU102','ET25',5,10014),(31021,1,30,20,'HU104','ET26',5,10013),(31022,2,30,20,'HU104','ET26',5,10013),(31023,1,30,30,'PH101','ET27',5,10012),(31024,2,20,20,'PH101','ET27',5,10012),(31025,3,30,30,'PH101','ET28',5,10012),(31026,1,30,30,'PH103','ET28',5,10011),(31028,1,30,30,'PH103','ET29',5,10011),(31029,1,30,20,'EE150','ET29',5,10008),(31030,2,30,20,'EE150','ET30',5,10008),(31031,1,30,20,'EE160','ET30',5,10008),(31032,2,30,20,'EE160','ET31',5,10008),(31033,1,30,20,'EE211','ET31',5,10007),(31034,2,30,20,'EE211','ET32',5,10007),(31035,1,30,20,'EE241','ET32',5,10007),(31036,1,30,20,'EE241','ET33',5,10007),(31037,1,30,30,'EE251','ET33',5,10006),(31038,1,30,30,'EE264','ET34',5,10006),(31039,1,30,30,'EE303','ET34',5,10006),(31040,1,30,30,'EE360','ET35',5,10005),(31041,1,30,30,'EE394','ET35',5,10005),(40001,1,30,20,'CE110','ET16',6,10004),(40002,2,30,20,'CE110','ET16',6,10004),(40003,1,30,20,'CE241','ET17',6,10004),(40004,1,20,20,'CE350','ET17',6,10004),(40005,1,30,20,'CE321','ET18',6,10003),(40006,1,30,20,'CE221','ET18',6,10003),(40007,1,30,20,'CE211','ET19',6,10003),(40008,1,30,20,'CE331','ET19',6,10003),(40009,1,30,20,'CE341','ET20',6,10002),(40010,1,20,20,'CE371','ET20',6,10002),(40011,1,30,20,'CE381','ET21',6,10002),(40012,1,30,20,'CE351','ET21',6,10001),(40013,1,30,20,'CE361','ET22',6,10001),(40014,1,30,20,'MA110','ET22',6,10010),(40015,2,30,20,'MA110','ET23',6,10010),(40016,1,30,20,'MA111','ET23',6,10010),(40017,2,30,20,'MA111','ET24',6,10010),(40018,1,30,20,'MA223','ET24',6,10009),(40019,1,30,20,'MA224','ET25',6,10009),(40020,1,30,20,'MA303','ET25',6,10009),(40021,1,30,20,'HU101','ET26',6,10014),(40022,2,30,20,'HU101','ET26',6,10014),(40023,1,30,20,'HU103','ET27',6,10013),(40024,2,30,20,'HU103','ET27',6,10013),(40025,1,30,30,'PH102','ET28',6,10012),(40026,1,30,30,'PH102','ET28',6,10012),(40027,1,30,20,'EE240','ET29',6,10008),(40028,2,30,20,'EE240','ET30',6,10008),(40029,1,30,20,'EE300','ET30',6,10007),(40030,2,30,20,'EE300','ET31',6,10007),(40031,1,30,20,'EE310','ET31',6,10008),(40032,2,30,20,'EE310','ET32',6,10008),(40033,1,30,20,'EE342','ET32',6,10007),(40034,2,30,20,'EE342','ET33',6,10007),(40035,1,30,20,'EE357','ET33',6,10006),(40036,2,30,20,'EE357','ET34',6,10006),(40037,1,30,20,'EE365','ET34',6,10006),(40038,2,30,20,'EE365','ET35',6,10006),(40039,1,30,30,'EE395','ET35',6,10005),(40040,1,30,30,'EE396','ET36',6,10005),(40041,1,30,30,'EE396','ET36',6,10005),(40042,1,30,30,'EE101','ET36',6,10008),(40043,1,30,30,'EE101','ET36',6,10008),(40044,1,30,30,'EE102','ET35',6,10007),(40045,1,30,30,'EE102','ET35',6,10007),(41001,1,20,20,'CE111','ET16',7,10004),(41002,1,20,20,'CE111','ET16',7,10004),(41003,1,30,20,'CE160','ET17',7,10004),(41004,2,30,20,'CE160','ET17',7,10004),(41005,1,30,20,'CE242','ET18',7,10003),(41006,1,30,20,'CE243','ET18',7,10003),(41007,1,30,20,'CE322','ET19',7,10003),(41008,1,30,20,'CE232','ET19',7,10003),(41009,1,30,20,'CE332','ET20',7,10002),(41010,1,30,20,'CE342','ET20',7,10002),(41011,1,30,20,'CE352','ET21',7,10002),(41012,1,20,20,'CE372','ET21',7,10001),(41013,1,30,20,'CE382','ET22',7,10001),(41014,1,30,20,'MA113','ET22',7,10010),(41015,2,30,20,'MA113','ET23',7,10010),(41016,1,30,20,'MA302','ET23',7,10010),(41017,1,30,20,'MA304','ET24',7,10009),(41018,1,30,20,'MA305','ET24',7,10009),(41019,1,30,20,'HU102','ET25',7,10014),(41020,2,30,20,'HU102','ET25',7,10014),(41021,1,30,20,'HU104','ET26',7,10013),(41022,2,30,20,'HU104','ET26',7,10013),(41023,1,30,30,'PH101','ET27',7,10012),(41024,2,20,20,'PH101','ET27',7,10012),(41025,3,30,30,'PH101','ET28',7,10012),(41026,1,30,30,'PH103','ET28',7,10011),(41028,1,30,30,'PH103','ET29',7,10011),(41029,1,30,20,'EE150','ET29',7,10008),(41030,2,30,20,'EE150','ET30',7,10008),(41031,1,30,20,'EE160','ET30',7,10008),(41032,2,30,20,'EE160','ET31',7,10008),(41033,1,30,20,'EE211','ET31',7,10007),(41034,2,30,20,'EE211','ET32',7,10007),(41035,1,30,20,'EE241','ET32',7,10007),(41036,1,30,20,'EE241','ET33',7,10007),(41037,1,30,30,'EE251','ET33',7,10006),(41038,1,30,30,'EE264','ET34',7,10006),(41039,1,30,30,'EE303','ET34',7,10006),(41040,1,30,30,'EE360','ET35',7,10005),(41041,1,30,30,'EE394','ET35',7,10005),(50001,1,30,21,'CE110','ET16',8,10004),(50002,2,30,20,'CE110','ET16',8,10004),(50003,1,30,21,'CE241','ET17',8,10004),(50004,1,20,20,'CE350','ET17',8,10004),(50005,1,30,20,'CE321','ET18',8,10003),(50006,1,30,20,'CE221','ET18',8,10003),(50007,1,30,20,'CE211','ET19',8,10003),(50008,1,30,20,'CE331','ET19',8,10003),(50009,1,30,20,'CE341','ET20',8,10002),(50010,1,20,20,'CE371','ET20',8,10002),(50011,1,30,20,'CE381','ET21',8,10002),(50012,1,30,20,'CE351','ET21',8,10001),(50013,1,30,20,'CE361','ET22',8,10001),(50014,1,30,20,'MA110','ET22',8,10010),(50015,2,30,20,'MA110','ET23',8,10010),(50016,1,30,20,'MA111','ET23',8,10010),(50017,2,30,20,'MA111','ET24',8,10010),(50018,1,30,20,'MA223','ET24',8,10009),(50019,1,30,20,'MA224','ET25',8,10009),(50020,1,30,20,'MA303','ET25',8,10009),(50021,1,30,20,'HU101','ET26',8,10014),(50022,2,30,20,'HU101','ET26',8,10014),(50023,1,30,20,'HU103','ET27',8,10013),(50024,2,30,20,'HU103','ET27',8,10013),(50025,1,30,30,'PH102','ET28',8,10012),(50026,1,30,30,'PH102','ET28',8,10012),(50027,1,30,21,'EE240','ET29',8,10008),(50028,2,30,20,'EE240','ET30',8,10008),(50029,1,30,20,'EE300','ET30',8,10007),(50030,2,30,20,'EE300','ET31',8,10007),(50031,1,30,20,'EE310','ET31',8,10008),(50032,2,30,20,'EE310','ET32',8,10008),(50033,1,30,20,'EE342','ET32',8,10007),(50034,2,30,20,'EE342','ET33',8,10007),(50035,1,30,20,'EE357','ET33',8,10006),(50036,2,30,20,'EE357','ET34',8,10006),(50037,1,30,20,'EE365','ET34',8,10006),(50038,2,30,20,'EE365','ET35',8,10006),(50039,1,30,30,'EE395','ET35',8,10005),(50040,1,30,30,'EE396','ET36',8,10005),(50041,1,30,30,'EE396','ET36',8,10005),(50042,1,30,30,'EE101','ET36',8,10008),(50043,1,30,30,'EE101','ET36',8,10008),(50044,1,30,30,'EE102','ET35',8,10007),(50045,1,30,30,'EE102','ET35',8,10007),(50046,9,1,0,'CE110','CC1',8,10001),(50047,1,10,0,'CE125','CC1',8,10001),(50048,2,43,0,'CE125','CC1',8,10001),(50049,3,43,0,'CE125','CC1',8,10001),(50050,4,43,0,'CE125','CC1',8,10004),(50051,5,NULL,0,'CE125','CC1',8,10001),(50052,6,NULL,0,'CE125','CC1',8,10001),(50053,7,NULL,0,'CE125','CC1',8,10001),(50054,8,NULL,0,'CE125','CC1',8,10001),(50055,9,NULL,0,'CE125','CC1',8,10001),(50056,10,NULL,0,'CE125','CC1',8,10001),(50057,10,20,0,'CE110','ET14',8,10001);
/*!40000 ALTER TABLE `course_section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_section_slot`
--

DROP TABLE IF EXISTS `course_section_slot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_section_slot` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `coursesection_id` int(11) NOT NULL,
  `slot_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `course_section_slot_coursesection_id_slot_id_522c8403_uniq` (`coursesection_id`,`slot_id`),
  KEY `course_section_slot_slot_id_0ab793b5_fk_slot_id` (`slot_id`),
  CONSTRAINT `course_section_slot_coursesection_id_7d28a61a_fk_course_se` FOREIGN KEY (`coursesection_id`) REFERENCES `course_section` (`id`),
  CONSTRAINT `course_section_slot_slot_id_0ab793b5_fk_slot_id` FOREIGN KEY (`slot_id`) REFERENCES `slot` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=370 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_section_slot`
--

LOCK TABLES `course_section_slot` WRITE;
/*!40000 ALTER TABLE `course_section_slot` DISABLE KEYS */;
INSERT INTO `course_section_slot` VALUES (1,20027,1),(2,20027,17),(3,20027,25),(4,20028,2),(5,20028,18),(6,20028,26),(7,20029,1),(8,20029,17),(9,20029,25),(10,20030,2),(11,20030,18),(12,20030,25),(13,20031,3),(14,20031,19),(15,20031,26),(16,20032,4),(17,20032,19),(18,20032,26),(19,20033,9),(20,20033,10),(21,20033,17),(22,20033,18),(23,20034,11),(24,20034,12),(25,20034,19),(26,20034,20),(27,20035,5),(28,20035,20),(29,20035,27),(30,20036,6),(31,20036,21),(32,20036,28),(33,20037,7),(34,20037,23),(35,20037,31),(36,20038,8),(37,20038,24),(38,20038,32),(39,20039,33),(40,20039,37),(41,20039,40),(42,20040,2),(43,20040,18),(44,20040,25),(45,20041,3),(46,20041,19),(47,20041,26),(48,20042,4),(49,20042,19),(50,20042,26),(51,20043,9),(52,20043,10),(53,20043,17),(54,20044,13),(55,20044,14),(56,20044,15),(57,20045,27),(58,20045,28),(59,20045,29),(60,21029,1),(61,21029,17),(62,21029,25),(63,21030,2),(64,21030,18),(65,21030,26),(66,21031,1),(67,21031,17),(68,21031,25),(69,21032,2),(70,21032,18),(71,21032,25),(72,21033,3),(73,21033,19),(74,21033,26),(75,21034,4),(76,21034,19),(77,21034,26),(78,21035,9),(79,21035,10),(80,21035,17),(81,21035,18),(82,21036,11),(83,21036,12),(84,21036,19),(85,21036,20),(86,21037,5),(87,21037,20),(89,21037,27),(90,21038,6),(91,21038,21),(92,21038,28),(93,21039,7),(94,21039,23),(95,21039,31),(96,21040,8),(97,21040,24),(98,21040,32),(99,21041,33),(100,21041,37),(101,21041,40),(102,30027,1),(103,30027,17),(104,30027,25),(105,30028,2),(106,30028,18),(107,30028,26),(108,30029,1),(109,30029,17),(110,30029,25),(111,30030,2),(112,30030,18),(113,30030,25),(114,30031,3),(115,30031,19),(116,30031,26),(117,30032,4),(118,30032,19),(119,30032,26),(120,30033,9),(121,30033,10),(122,30033,17),(123,30033,18),(124,30034,11),(125,30034,12),(126,30034,19),(127,30034,20),(128,30035,5),(129,30035,20),(130,30035,27),(131,30036,6),(132,30036,21),(133,30036,28),(134,30037,7),(135,30037,23),(136,30037,31),(137,30038,8),(138,30038,24),(139,30038,32),(140,30039,33),(141,30039,37),(142,30039,40),(143,30040,2),(144,30040,18),(145,30040,25),(146,30041,3),(147,30041,19),(148,30041,26),(149,30042,4),(150,30042,19),(151,30042,26),(152,30043,9),(153,30043,10),(154,30043,17),(155,30044,13),(156,30044,14),(157,30044,15),(158,30045,27),(159,30045,28),(160,30045,29),(161,31029,1),(162,31029,17),(163,31029,25),(164,31030,2),(165,31030,18),(166,31030,26),(167,31031,1),(168,31031,17),(169,31031,25),(170,31032,2),(171,31032,18),(172,31032,25),(173,31033,3),(174,31033,19),(175,31033,26),(176,31034,4),(177,31034,19),(178,31034,26),(179,31035,9),(180,31035,10),(181,31035,17),(182,31035,18),(183,31036,11),(184,31036,12),(185,31036,19),(186,31036,20),(187,31037,5),(188,31037,20),(189,31037,27),(190,31038,6),(191,31038,21),(192,31038,28),(193,31039,7),(194,31039,23),(195,31039,31),(196,31040,8),(197,31040,24),(198,31040,32),(199,31041,33),(200,31041,37),(201,31041,40),(202,40027,1),(203,40027,17),(204,40027,25),(205,40028,2),(206,40028,18),(207,40028,26),(208,40029,1),(209,40029,17),(210,40029,25),(211,40030,2),(212,40030,18),(213,40030,25),(214,40031,3),(215,40031,19),(216,40031,26),(217,40032,4),(218,40032,19),(219,40032,26),(220,40033,9),(221,40033,10),(222,40033,17),(223,40033,18),(224,40034,11),(225,40034,12),(226,40034,19),(227,40034,20),(228,40035,5),(229,40035,20),(230,40035,27),(231,40036,6),(232,40036,21),(233,40036,28),(234,40037,7),(235,40037,23),(236,40037,31),(237,40038,8),(238,40038,24),(239,40038,32),(240,40039,33),(241,40039,37),(242,40039,40),(243,40040,2),(244,40040,18),(245,40040,25),(246,40041,3),(247,40041,19),(248,40041,26),(249,40042,4),(250,40042,19),(251,40042,26),(252,40043,9),(253,40043,10),(254,40043,17),(255,40044,13),(256,40044,14),(257,40044,15),(258,40045,27),(259,40045,28),(260,40045,29),(261,41029,1),(262,41029,17),(263,41029,25),(264,41030,2),(265,41030,18),(266,41030,26),(267,41031,1),(268,41031,17),(269,41031,25),(270,41032,2),(271,41032,18),(272,41032,25),(273,41033,3),(274,41033,19),(275,41033,26),(276,41034,4),(277,41034,19),(278,41034,26),(279,41035,9),(280,41035,10),(281,41035,17),(282,41035,18),(283,41036,11),(284,41036,12),(285,41036,19),(286,41036,20),(287,41037,5),(288,41037,20),(289,41037,27),(290,41038,6),(291,41038,21),(292,41038,28),(293,41039,7),(294,41039,23),(295,41039,31),(296,41040,8),(297,41040,24),(298,41040,32),(299,41041,33),(300,41041,37),(301,41041,40),(302,50027,1),(303,50027,17),(304,50027,25),(305,50028,2),(306,50028,18),(307,50028,26),(308,50029,1),(309,50029,17),(310,50029,25),(311,50030,2),(312,50030,18),(313,50030,25),(314,50031,3),(315,50031,19),(316,50031,26),(317,50032,4),(318,50032,19),(319,50032,26),(320,50033,9),(321,50033,10),(322,50033,17),(323,50033,18),(324,50034,11),(325,50034,12),(326,50034,19),(327,50034,20),(328,50035,5),(329,50035,20),(330,50035,27),(331,50036,6),(332,50036,21),(333,50036,28),(334,50037,7),(335,50037,23),(336,50037,31),(337,50038,8),(338,50038,24),(339,50038,32),(340,50039,33),(341,50039,37),(342,50039,40),(343,50040,2),(344,50040,18),(345,50040,25),(346,50041,3),(347,50041,19),(348,50041,26),(349,50042,4),(350,50042,19),(351,50042,26),(352,50043,9),(353,50043,10),(354,50043,17),(355,50044,13),(356,50044,14),(357,50044,15),(358,50045,27),(359,50045,28),(360,50045,29),(361,50046,1),(362,50046,3),(364,50046,5),(367,50047,2),(368,50047,4),(366,50050,1),(365,50050,17),(369,50057,12);
/*!40000 ALTER TABLE `course_section_slot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `day`
--

DROP TABLE IF EXISTS `day`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `day` (
  `id` int(11) NOT NULL,
  `name` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `day`
--

LOCK TABLES `day` WRITE;
/*!40000 ALTER TABLE `day` DISABLE KEYS */;
INSERT INTO `day` VALUES (1,'MO'),(2,'TU'),(3,'WE'),(4,'TH'),(5,'F');
/*!40000 ALTER TABLE `day` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `department` (
  `code` varchar(4) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES ('CE','Chemical Engineering'),('EE','Electrical Engineering'),('HU','Humantities'),('MA','Mathematics'),('PH','Physics');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department_chair`
--

DROP TABLE IF EXISTS `department_chair`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `department_chair` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `faculty_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `faculty_id` (`faculty_id`),
  CONSTRAINT `department_chair_faculty_id_4712d829_fk_faculty_user_id` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department_chair`
--

LOCK TABLES `department_chair` WRITE;
/*!40000 ALTER TABLE `department_chair` DISABLE KEYS */;
INSERT INTO `department_chair` VALUES (1,10001),(2,10005),(3,10009),(4,10011);
/*!40000 ALTER TABLE `department_chair` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `object_repr` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (7,'account','emailaddress'),(8,'account','emailconfirmation'),(1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(12,'authtoken','token'),(24,'backend','admin'),(46,'backend','advisor'),(31,'backend','attendance'),(14,'backend','building'),(15,'backend','course'),(16,'backend','coursesection'),(17,'backend','day'),(18,'backend','department'),(37,'backend','departmentchair'),(30,'backend','enrollment'),(25,'backend','faculty'),(32,'backend','fulltimefaculty'),(38,'backend','fulltimegradstudent'),(39,'backend','fulltimeundergradstudent'),(45,'backend','grade'),(33,'backend','gradstudent'),(19,'backend','hold'),(20,'backend','major'),(21,'backend','minor'),(34,'backend','parttimefaculty'),(40,'backend','parttimegradstudent'),(41,'backend','parttimeundergradstudent'),(36,'backend','prerequisite'),(26,'backend','researcher'),(29,'backend','room'),(28,'backend','slot'),(27,'backend','student'),(44,'backend','studentmajor'),(43,'backend','studentminor'),(22,'backend','term'),(23,'backend','time'),(42,'backend','transcript'),(35,'backend','undergradstudent'),(13,'backend','user'),(4,'contenttypes','contenttype'),(5,'sessions','session'),(6,'sites','site'),(9,'socialaccount','socialaccount'),(10,'socialaccount','socialapp'),(11,'socialaccount','socialtoken');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'backend','0001_initial','2019-05-16 02:28:39.144009'),(2,'account','0001_initial','2019-05-16 02:28:42.613530'),(3,'account','0002_email_max_length','2019-05-16 02:28:42.766461'),(4,'contenttypes','0001_initial','2019-05-16 02:28:42.814530'),(5,'admin','0001_initial','2019-05-16 02:28:42.883573'),(6,'admin','0002_logentry_remove_auto_add','2019-05-16 02:28:43.043208'),(7,'admin','0003_logentry_add_action_flag_choices','2019-05-16 02:28:43.056949'),(8,'contenttypes','0002_remove_content_type_name','2019-05-16 02:28:43.199030'),(9,'auth','0001_initial','2019-05-16 02:28:43.346906'),(10,'auth','0002_alter_permission_name_max_length','2019-05-16 02:28:43.644663'),(11,'auth','0003_alter_user_email_max_length','2019-05-16 02:28:43.661091'),(12,'auth','0004_alter_user_username_opts','2019-05-16 02:28:43.678401'),(13,'auth','0005_alter_user_last_login_null','2019-05-16 02:28:43.693635'),(14,'auth','0006_require_contenttypes_0002','2019-05-16 02:28:43.698672'),(15,'auth','0007_alter_validators_add_error_messages','2019-05-16 02:28:43.713561'),(16,'auth','0008_alter_user_username_max_length','2019-05-16 02:28:43.725172'),(17,'auth','0009_alter_user_last_name_max_length','2019-05-16 02:28:43.735595'),(18,'auth','0010_alter_group_name_max_length','2019-05-16 02:28:43.748928'),(19,'auth','0011_update_proxy_permissions','2019-05-16 02:28:43.788634'),(20,'authtoken','0001_initial','2019-05-16 02:28:43.835270'),(21,'authtoken','0002_auto_20160226_1747','2019-05-16 02:28:43.990925'),(22,'sessions','0001_initial','2019-05-16 02:28:44.012896'),(23,'sites','0001_initial','2019-05-16 02:28:44.049905'),(24,'sites','0002_alter_domain_unique','2019-05-16 02:28:44.068992'),(25,'socialaccount','0001_initial','2019-05-16 02:28:44.359122'),(26,'socialaccount','0002_token_max_lengths','2019-05-16 02:28:44.760777'),(27,'socialaccount','0003_extra_data_default_dict','2019-05-16 02:28:44.774753'),(28,'backend','0002_auto_20190516_2334','2019-05-16 23:34:36.638413');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `session_data` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_site`
--

DROP TABLE IF EXISTS `django_site`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_site` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `domain` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_site_domain_a2e37b91_uniq` (`domain`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_site`
--

LOCK TABLES `django_site` WRITE;
/*!40000 ALTER TABLE `django_site` DISABLE KEYS */;
INSERT INTO `django_site` VALUES (1,'example.com','example.com');
/*!40000 ALTER TABLE `django_site` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enrollment`
--

DROP TABLE IF EXISTS `enrollment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enrollment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dateEnrolled` date NOT NULL,
  `course_section_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `enrollment_student_id_course_section_id_d6d9c74b_uniq` (`student_id`,`course_section_id`),
  KEY `enrollment_course_section_id_1e8dcc63_fk_course_section_id` (`course_section_id`),
  CONSTRAINT `enrollment_course_section_id_1e8dcc63_fk_course_section_id` FOREIGN KEY (`course_section_id`) REFERENCES `course_section` (`id`),
  CONSTRAINT `enrollment_student_id_75934c6f_fk_student_user_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enrollment`
--

LOCK TABLES `enrollment` WRITE;
/*!40000 ALTER TABLE `enrollment` DISABLE KEYS */;
INSERT INTO `enrollment` VALUES (1,'2018-05-20',40023,40201),(2,'2018-05-20',40025,40201),(3,'2018-05-20',40029,40201),(4,'2018-05-20',40031,40201),(5,'2018-05-20',40034,40201),(6,'2018-05-20',40014,40001),(7,'2018-05-20',40014,40202),(8,'2018-05-20',40014,40203),(9,'2018-05-20',40014,40204),(10,'2018-05-20',40014,40205),(11,'2018-05-20',40014,40206),(12,'2018-05-20',40014,40207),(13,'2018-05-20',40014,40208),(14,'2018-05-20',40014,40209),(15,'2018-05-20',40014,40210),(16,'2018-05-20',40014,40211),(17,'2018-05-20',40014,40212),(18,'2018-05-20',40014,40213),(19,'2018-05-20',40014,40214),(20,'2018-05-20',40014,40215),(21,'2018-05-20',40014,40216),(22,'2018-05-20',40014,40217),(23,'2018-05-20',40014,40218),(24,'2018-05-20',40014,40219),(25,'2018-05-20',40014,40220),(26,'2018-12-20',40018,40001),(27,'2018-12-20',40018,40202),(28,'2018-12-20',40018,40203),(29,'2018-12-20',40018,40204),(30,'2018-12-20',40018,40205),(31,'2018-12-20',40018,40206),(32,'2018-12-20',40018,40207),(33,'2018-12-20',40018,40208),(34,'2018-12-20',40018,40209),(35,'2018-12-20',40018,40210),(36,'2018-12-20',40018,40211),(37,'2018-12-20',40018,40212),(38,'2018-12-20',40018,40213),(39,'2018-12-20',40018,40214),(40,'2018-12-20',40018,40215),(41,'2018-12-20',40018,40216),(42,'2018-12-20',40018,40217),(43,'2018-12-20',40018,40218),(44,'2018-12-20',40018,40219),(45,'2018-12-20',40018,40220),(46,'2018-12-20',41026,40201),(47,'2018-12-20',41017,40201),(48,'2018-12-20',41039,40201),(49,'2018-12-20',41040,40201),(50,'2018-12-20',41041,40201),(51,'2018-05-20',30014,40201),(52,'2018-05-20',30021,40201),(53,'2018-05-20',30025,40201),(54,'2018-05-20',30042,40201),(55,'2018-05-20',30044,40201),(56,'2018-05-20',31014,40201),(57,'2018-05-20',31017,40201),(58,'2018-05-20',31035,40201),(59,'2018-05-20',31037,40201),(60,'2018-05-20',31038,40201);
/*!40000 ALTER TABLE `enrollment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faculty`
--

DROP TABLE IF EXISTS `faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `faculty` (
  `user_id` int(11) NOT NULL,
  `isFullTime` tinyint(1) NOT NULL,
  `department_id` varchar(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `room_id` varchar(9) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `faculty_department_id_6d1c47f7_fk_department_code` (`department_id`),
  KEY `faculty_room_id_d04822d8_fk_room_id` (`room_id`),
  CONSTRAINT `faculty_department_id_6d1c47f7_fk_department_code` FOREIGN KEY (`department_id`) REFERENCES `department` (`code`),
  CONSTRAINT `faculty_room_id_d04822d8_fk_room_id` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`),
  CONSTRAINT `faculty_user_id_c7169dec_fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculty`
--

LOCK TABLES `faculty` WRITE;
/*!40000 ALTER TABLE `faculty` DISABLE KEYS */;
INSERT INTO `faculty` VALUES (10001,1,'CE','ET1'),(10002,1,'CE','ET1'),(10003,1,'CE','ET1'),(10004,1,'CE','ET1'),(10005,1,'CE','ET2'),(10006,1,'EE','ET2'),(10007,1,'EE','ET2'),(10008,1,'EE','ET2'),(10009,1,'MA','ET3'),(10010,1,'MA','ET3'),(10011,1,'PH','ET4'),(10012,1,'PH','ET4'),(10013,1,'HU','CC1'),(10014,1,'HU','CC1');
/*!40000 ALTER TABLE `faculty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `full_time_faculty`
--

DROP TABLE IF EXISTS `full_time_faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `full_time_faculty` (
  `faculty_id` int(11) NOT NULL,
  PRIMARY KEY (`faculty_id`),
  CONSTRAINT `full_time_faculty_faculty_id_f48f52ac_fk_faculty_user_id` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `full_time_faculty`
--

LOCK TABLES `full_time_faculty` WRITE;
/*!40000 ALTER TABLE `full_time_faculty` DISABLE KEYS */;
/*!40000 ALTER TABLE `full_time_faculty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `full_time_grad_student`
--

DROP TABLE IF EXISTS `full_time_grad_student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `full_time_grad_student` (
  `grad_id` int(11) NOT NULL,
  PRIMARY KEY (`grad_id`),
  CONSTRAINT `full_time_grad_stude_grad_id_3d64c718_fk_grad_stud` FOREIGN KEY (`grad_id`) REFERENCES `grad_student` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `full_time_grad_student`
--

LOCK TABLES `full_time_grad_student` WRITE;
/*!40000 ALTER TABLE `full_time_grad_student` DISABLE KEYS */;
/*!40000 ALTER TABLE `full_time_grad_student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `full_time_undergrad_student`
--

DROP TABLE IF EXISTS `full_time_undergrad_student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `full_time_undergrad_student` (
  `undergrad_id` int(11) NOT NULL,
  PRIMARY KEY (`undergrad_id`),
  CONSTRAINT `full_time_undergrad__undergrad_id_3d868f56_fk_undergrad` FOREIGN KEY (`undergrad_id`) REFERENCES `undergrad_student` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `full_time_undergrad_student`
--

LOCK TABLES `full_time_undergrad_student` WRITE;
/*!40000 ALTER TABLE `full_time_undergrad_student` DISABLE KEYS */;
/*!40000 ALTER TABLE `full_time_undergrad_student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grad_student`
--

DROP TABLE IF EXISTS `grad_student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grad_student` (
  `student_id` int(11) NOT NULL,
  `isFullTime` tinyint(1) NOT NULL,
  PRIMARY KEY (`student_id`),
  CONSTRAINT `grad_student_student_id_c23d7519_fk_student_user_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grad_student`
--

LOCK TABLES `grad_student` WRITE;
/*!40000 ALTER TABLE `grad_student` DISABLE KEYS */;
/*!40000 ALTER TABLE `grad_student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grade`
--

DROP TABLE IF EXISTS `grade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grade` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `letterGrade` varchar(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_section_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `grade_student_id_course_section_id_type_b2acc5af_uniq` (`student_id`,`course_section_id`,`type`),
  KEY `grade_course_section_id_5680784d_fk_course_section_id` (`course_section_id`),
  CONSTRAINT `grade_course_section_id_5680784d_fk_course_section_id` FOREIGN KEY (`course_section_id`) REFERENCES `course_section` (`id`),
  CONSTRAINT `grade_student_id_d11d152d_fk_student_user_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grade`
--

LOCK TABLES `grade` WRITE;
/*!40000 ALTER TABLE `grade` DISABLE KEYS */;
INSERT INTO `grade` VALUES (1,'M','B',40014,40201),(2,'F','B',40014,40201),(3,'M','A',40042,40201),(4,'F','B',40042,40201),(5,'M','B',40045,40201),(6,'F','B',40045,40201),(7,'M','C',40025,40201),(8,'F','A',40025,40201),(9,'M','B',40023,40201),(10,'F','B',40023,40201),(11,'M','B',40018,40201),(12,'F','A',40018,40201),(13,'M','B',40020,40201),(14,'F','B',40020,40201),(15,'M','A',40030,40201),(16,'F','A',40030,40201),(17,'M','A',40031,40201),(18,'F','A',40031,40201),(19,'M','B',40033,40201),(20,'F','A',40033,40201);
/*!40000 ALTER TABLE `grade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hold`
--

DROP TABLE IF EXISTS `hold`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hold` (
  `name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hold`
--

LOCK TABLES `hold` WRITE;
/*!40000 ALTER TABLE `hold` DISABLE KEYS */;
INSERT INTO `hold` VALUES ('AD03','Admission','Admission Application Incomplete'),('AD04','Admission','Transfer transcript required'),('AD10','Admission','Graduate Student Recommendation letters missing'),('AD11','Admission','Immunization records required'),('AD20','Admission','International Student Visa required'),('AD50','Admission','Orientation required'),('AD52','Admission','High School records required'),('AD56','Admission','International Student Transcript/Records required'),('AD89','Admission','Graduate Application required'),('BB01','Bursar','Unpaid Balance'),('BB02','Bursar','Payyment plan amount due'),('BB03','Bursar','Admission Application fee required '),('BB60','Bursar','Bounced check'),('BB68','Bursar','Graduation fee required'),('BB80','Bursar','Student dorm balance due '),('FA05','Financial Aid','Incomplete/Missing Income documents'),('FA06','Financial Aid','Incomplete/Missing FASA'),('FA07','Financial Aid','Incomplete/Missing TAP'),('FA08','Financial Aid','Incomplete/Missing PELL'),('RG01','Registration','Undeclared Major'),('RG02','Registration','Pre-Requisite required'),('RG03','Registration','Academic Probation'),('RG42','Registration','Scholarship warning grade requirement is below B '),('RG65','Registration','Instructor approval required'),('RG66','Registration','Academic advisement required');
/*!40000 ALTER TABLE `hold` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `major`
--

DROP TABLE IF EXISTS `major`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `major` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `department_id` varchar(4) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `major_department_id_13c2669d_fk_department_code` (`department_id`),
  CONSTRAINT `major_department_id_13c2669d_fk_department_code` FOREIGN KEY (`department_id`) REFERENCES `department` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `major`
--

LOCK TABLES `major` WRITE;
/*!40000 ALTER TABLE `major` DISABLE KEYS */;
INSERT INTO `major` VALUES (1,'Electrical Engineering','BS','EE'),(2,'Chemical Engineering','BS','CE');
/*!40000 ALTER TABLE `major` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `major_requirement`
--

DROP TABLE IF EXISTS `major_requirement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `major_requirement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `major_id` int(11) NOT NULL,
  `course_id` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `major_requirement_major_id_course_id_18186c8e_uniq` (`major_id`,`course_id`),
  KEY `major_requirement_course_id_82965fdd_fk_course_id` (`course_id`),
  CONSTRAINT `major_requirement_course_id_82965fdd_fk_course_id` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  CONSTRAINT `major_requirement_major_id_f6945809_fk_major_id` FOREIGN KEY (`major_id`) REFERENCES `major` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `major_requirement`
--

LOCK TABLES `major_requirement` WRITE;
/*!40000 ALTER TABLE `major_requirement` DISABLE KEYS */;
INSERT INTO `major_requirement` VALUES (1,1,'EE101'),(2,1,'EE102'),(3,1,'EE150'),(4,1,'EE160'),(6,1,'EE211'),(5,1,'EE240'),(7,1,'EE241'),(8,1,'EE251'),(9,1,'EE264'),(10,1,'EE300'),(14,1,'EE303'),(11,1,'EE310'),(12,1,'EE342'),(15,1,'EE360'),(13,1,'EE365'),(19,1,'HU101'),(20,1,'HU102'),(21,1,'HU103'),(22,1,'HU104'),(23,1,'MA110'),(24,1,'MA111'),(25,1,'MA113'),(26,1,'MA223'),(27,1,'MA224'),(28,1,'MA302'),(29,1,'MA303'),(16,1,'PH101'),(17,1,'PH102'),(18,1,'PH103'),(32,2,'CE110'),(33,2,'CE111'),(34,2,'CE160'),(35,2,'CE211'),(36,2,'CE221'),(37,2,'CE232'),(38,2,'CE331'),(39,2,'CE341'),(40,2,'CE351'),(41,2,'CE352'),(42,2,'CE361'),(43,2,'CE371'),(44,2,'CE372'),(30,2,'EE101'),(31,2,'EE102'),(48,2,'HU101'),(49,2,'HU102'),(50,2,'HU103'),(51,2,'HU104'),(52,2,'MA110'),(53,2,'MA111'),(54,2,'MA113'),(55,2,'MA223'),(56,2,'MA224'),(57,2,'MA302'),(58,2,'MA303'),(45,2,'PH101'),(46,2,'PH102'),(47,2,'PH103');
/*!40000 ALTER TABLE `major_requirement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `minor`
--

DROP TABLE IF EXISTS `minor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `minor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `department_id` varchar(4) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `minor_department_id_8d5346eb_fk_department_code` (`department_id`),
  CONSTRAINT `minor_department_id_8d5346eb_fk_department_code` FOREIGN KEY (`department_id`) REFERENCES `department` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `minor`
--

LOCK TABLES `minor` WRITE;
/*!40000 ALTER TABLE `minor` DISABLE KEYS */;
INSERT INTO `minor` VALUES (1,'Mathematics','MA');
/*!40000 ALTER TABLE `minor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `minor_requirement`
--

DROP TABLE IF EXISTS `minor_requirement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `minor_requirement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `minor_id` int(11) NOT NULL,
  `course_id` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `minor_requirement_minor_id_course_id_e7d0a41a_uniq` (`minor_id`,`course_id`),
  KEY `minor_requirement_course_id_6fd3f89d_fk_course_id` (`course_id`),
  CONSTRAINT `minor_requirement_course_id_6fd3f89d_fk_course_id` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  CONSTRAINT `minor_requirement_minor_id_ec1ddcb0_fk_minor_id` FOREIGN KEY (`minor_id`) REFERENCES `minor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `minor_requirement`
--

LOCK TABLES `minor_requirement` WRITE;
/*!40000 ALTER TABLE `minor_requirement` DISABLE KEYS */;
/*!40000 ALTER TABLE `minor_requirement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `part_time_faculty`
--

DROP TABLE IF EXISTS `part_time_faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `part_time_faculty` (
  `faculty_id` int(11) NOT NULL,
  PRIMARY KEY (`faculty_id`),
  CONSTRAINT `part_time_faculty_faculty_id_274013cf_fk_faculty_user_id` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `part_time_faculty`
--

LOCK TABLES `part_time_faculty` WRITE;
/*!40000 ALTER TABLE `part_time_faculty` DISABLE KEYS */;
/*!40000 ALTER TABLE `part_time_faculty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `part_time_grad_student`
--

DROP TABLE IF EXISTS `part_time_grad_student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `part_time_grad_student` (
  `grad_id` int(11) NOT NULL,
  PRIMARY KEY (`grad_id`),
  CONSTRAINT `part_time_grad_stude_grad_id_b9eb20d7_fk_grad_stud` FOREIGN KEY (`grad_id`) REFERENCES `grad_student` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `part_time_grad_student`
--

LOCK TABLES `part_time_grad_student` WRITE;
/*!40000 ALTER TABLE `part_time_grad_student` DISABLE KEYS */;
/*!40000 ALTER TABLE `part_time_grad_student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `part_time_undergrad_student`
--

DROP TABLE IF EXISTS `part_time_undergrad_student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `part_time_undergrad_student` (
  `undergrad_id` int(11) NOT NULL,
  PRIMARY KEY (`undergrad_id`),
  CONSTRAINT `part_time_undergrad__undergrad_id_cfb32e2f_fk_undergrad` FOREIGN KEY (`undergrad_id`) REFERENCES `undergrad_student` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `part_time_undergrad_student`
--

LOCK TABLES `part_time_undergrad_student` WRITE;
/*!40000 ALTER TABLE `part_time_undergrad_student` DISABLE KEYS */;
/*!40000 ALTER TABLE `part_time_undergrad_student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prerequisite`
--

DROP TABLE IF EXISTS `prerequisite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prerequisite` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `requiredGrade` varchar(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_id` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prereq_id` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `prerequisite_course_id_prereq_id_b347793e_uniq` (`course_id`,`prereq_id`),
  KEY `prerequisite_prereq_id_b7b365d8_fk_course_id` (`prereq_id`),
  CONSTRAINT `prerequisite_course_id_7106036f_fk_course_id` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  CONSTRAINT `prerequisite_prereq_id_b7b365d8_fk_course_id` FOREIGN KEY (`prereq_id`) REFERENCES `course` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prerequisite`
--

LOCK TABLES `prerequisite` WRITE;
/*!40000 ALTER TABLE `prerequisite` DISABLE KEYS */;
INSERT INTO `prerequisite` VALUES (1,'C','EE240','MA113'),(2,'C','EE241','EE240'),(3,'C','EE251','EE150'),(4,'C','EE264','EE150'),(5,'C','EE300','MA224'),(6,'C','EE310','MA240'),(7,'C','EE342','EE241'),(8,'C','EE357','EE264'),(9,'C','EE365','EE264'),(10,'C','EE303','EE342'),(11,'C','EE360','EE264'),(12,'C','EE394','EE365'),(13,'C','EE395','EE365'),(14,'C','EE396','EE365'),(15,'C','EE399','EE360'),(16,'C','CE241','MA113'),(17,'C','CE242','CE241'),(18,'C','CE321','CE160'),(19,'C','CE322','CE321'),(20,'C','CE331','CE232'),(21,'C','CE332','CE331'),(22,'C','CE342','CE341'),(23,'C','CE361','CE352'),(24,'C','CE372','CE371'),(25,'C','CE382','CE381'),(39,'C','CE125','CE221'),(41,'C','CE125','CE160'),(42,'C','CE125','CE211'),(43,'C','CE125','CE241'),(44,'C','CE125','CE232'),(45,'C','CE123','CE110'),(46,'C','CE123','CE111'),(47,'C','CE123','CE125'),(48,'C','CE111','CE110');
/*!40000 ALTER TABLE `prerequisite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `researcher`
--

DROP TABLE IF EXISTS `researcher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `researcher` (
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `researcher_user_id_fc610fef_fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `researcher`
--

LOCK TABLES `researcher` WRITE;
/*!40000 ALTER TABLE `researcher` DISABLE KEYS */;
INSERT INTO `researcher` VALUES (30001),(30002);
/*!40000 ALTER TABLE `researcher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room` (
  `id` varchar(9) COLLATE utf8mb4_unicode_ci NOT NULL,
  `number` int(11) NOT NULL,
  `type` varchar(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `capacity` int(11) NOT NULL,
  `building_id` varchar(4) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `room_building_id_02c667dd_fk_building_code` (`building_id`),
  CONSTRAINT `room_building_id_02c667dd_fk_building_code` FOREIGN KEY (`building_id`) REFERENCES `building` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES ('CC1',101,'F',6,'CC'),('CC10',110,'O',20,'CC'),('CC11',201,'C',30,'CC'),('CC12',202,'C',30,'CC'),('CC13',203,'C',30,'CC'),('CC14',204,'C',30,'CC'),('CC15',205,'T',30,'CC'),('CC2',102,'O',20,'CC'),('CC3',103,'O',20,'CC'),('CC4',104,'O',20,'CC'),('CC5',105,'O',20,'CC'),('CC6',106,'O',20,'CC'),('CC7',107,'O',20,'CC'),('CC8',108,'O',20,'CC'),('CC9',109,'O',20,'CC'),('ET1',101,'F',6,'ET'),('ET10',110,'L',20,'ET'),('ET11',201,'L',20,'ET'),('ET12',202,'L',20,'ET'),('ET13',203,'L',20,'ET'),('ET14',204,'L',20,'ET'),('ET15',205,'L',20,'ET'),('ET16',206,'C',30,'ET'),('ET17',207,'C',30,'ET'),('ET18',208,'C',30,'ET'),('ET19',209,'C',30,'ET'),('ET2',102,'F',6,'ET'),('ET20',210,'C',30,'ET'),('ET21',301,'C',30,'ET'),('ET22',302,'C',30,'ET'),('ET23',303,'C',30,'ET'),('ET24',304,'C',30,'ET'),('ET25',305,'C',30,'ET'),('ET26',306,'C',30,'ET'),('ET27',307,'C',30,'ET'),('ET28',308,'C',30,'ET'),('ET29',309,'C',30,'ET'),('ET3',103,'F',6,'ET'),('ET30',310,'C',30,'ET'),('ET31',401,'C',30,'ET'),('ET32',402,'C',30,'ET'),('ET33',403,'C',30,'ET'),('ET34',404,'C',30,'ET'),('ET35',405,'C',30,'ET'),('ET36',406,'C',30,'ET'),('ET37',407,'C',30,'ET'),('ET38',408,'C',30,'ET'),('ET39',409,'C',30,'ET'),('ET4',104,'F',6,'ET'),('ET40',410,'C',30,'ET'),('ET5',105,'L',20,'ET'),('ET6',106,'L',20,'ET'),('ET7',107,'L',20,'ET'),('ET8',108,'L',20,'ET'),('ET9',109,'L',20,'ET');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slot`
--

DROP TABLE IF EXISTS `slot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `slot` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `day_id` int(11) NOT NULL,
  `time_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `slot_day_id_3ef6ea02_fk_day_id` (`day_id`),
  KEY `slot_time_id_2f03b43c_fk_time_id` (`time_id`),
  CONSTRAINT `slot_day_id_3ef6ea02_fk_day_id` FOREIGN KEY (`day_id`) REFERENCES `day` (`id`),
  CONSTRAINT `slot_time_id_2f03b43c_fk_time_id` FOREIGN KEY (`time_id`) REFERENCES `time` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slot`
--

LOCK TABLES `slot` WRITE;
/*!40000 ALTER TABLE `slot` DISABLE KEYS */;
INSERT INTO `slot` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,1,6),(7,1,7),(8,1,8),(9,2,1),(10,2,2),(11,2,3),(12,2,4),(13,2,5),(14,2,6),(15,2,7),(16,2,8),(17,3,1),(18,3,2),(19,3,3),(20,3,4),(21,3,5),(22,3,6),(23,3,7),(24,3,8),(25,4,1),(26,4,2),(27,4,3),(28,4,4),(29,4,5),(30,4,6),(31,4,7),(32,4,8),(33,5,1),(34,5,2),(35,5,3),(36,5,4),(37,5,5),(38,5,6),(39,5,7),(40,5,8);
/*!40000 ALTER TABLE `slot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialaccount`
--

DROP TABLE IF EXISTS `socialaccount_socialaccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `socialaccount_socialaccount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `provider` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_login` datetime(6) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `extra_data` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `socialaccount_socialaccount_provider_uid_fc810c6e_uniq` (`provider`,`uid`),
  KEY `socialaccount_socialaccount_user_id_8146e70c_fk_user_id` (`user_id`),
  CONSTRAINT `socialaccount_socialaccount_user_id_8146e70c_fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialaccount`
--

LOCK TABLES `socialaccount_socialaccount` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialaccount` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialapp`
--

DROP TABLE IF EXISTS `socialaccount_socialapp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `socialaccount_socialapp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `provider` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `client_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialapp`
--

LOCK TABLES `socialaccount_socialapp` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialapp` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialapp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialapp_sites`
--

DROP TABLE IF EXISTS `socialaccount_socialapp_sites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `socialaccount_socialapp_sites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `socialapp_id` int(11) NOT NULL,
  `site_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `socialaccount_socialapp_sites_socialapp_id_site_id_71a9a768_uniq` (`socialapp_id`,`site_id`),
  KEY `socialaccount_socialapp_sites_site_id_2579dee5_fk_django_site_id` (`site_id`),
  CONSTRAINT `socialaccount_social_socialapp_id_97fb6e7d_fk_socialacc` FOREIGN KEY (`socialapp_id`) REFERENCES `socialaccount_socialapp` (`id`),
  CONSTRAINT `socialaccount_socialapp_sites_site_id_2579dee5_fk_django_site_id` FOREIGN KEY (`site_id`) REFERENCES `django_site` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialapp_sites`
--

LOCK TABLES `socialaccount_socialapp_sites` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialapp_sites` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialapp_sites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialtoken`
--

DROP TABLE IF EXISTS `socialaccount_socialtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `socialaccount_socialtoken` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `token_secret` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires_at` datetime(6) DEFAULT NULL,
  `account_id` int(11) NOT NULL,
  `app_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `socialaccount_socialtoken_app_id_account_id_fca4e0ac_uniq` (`app_id`,`account_id`),
  KEY `socialaccount_social_account_id_951f210e_fk_socialacc` (`account_id`),
  CONSTRAINT `socialaccount_social_account_id_951f210e_fk_socialacc` FOREIGN KEY (`account_id`) REFERENCES `socialaccount_socialaccount` (`id`),
  CONSTRAINT `socialaccount_social_app_id_636a42d7_fk_socialacc` FOREIGN KEY (`app_id`) REFERENCES `socialaccount_socialapp` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialtoken`
--

LOCK TABLES `socialaccount_socialtoken` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialtoken` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student` (
  `user_id` int(11) NOT NULL,
  `isUndergrad` tinyint(1) NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `student_user_id_dcc2526f_fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (40001,1),(40002,1),(40003,1),(40004,1),(40005,1),(40006,1),(40007,1),(40008,1),(40009,1),(40010,1),(40011,1),(40012,1),(40013,1),(40014,1),(40015,1),(40016,1),(40017,1),(40018,1),(40019,1),(40020,1),(40101,1),(40102,1),(40103,1),(40104,1),(40105,1),(40106,1),(40107,1),(40108,1),(40109,1),(40110,1),(40111,1),(40112,1),(40113,1),(40114,1),(40115,1),(40116,1),(40117,1),(40118,1),(40119,1),(40120,1),(40201,1),(40202,1),(40203,1),(40204,1),(40205,1),(40206,1),(40207,1),(40208,1),(40209,1),(40210,1),(40211,1),(40212,1),(40213,1),(40214,1),(40215,1),(40216,1),(40217,1),(40218,1),(40219,1),(40220,1),(40301,1),(40302,1),(40303,1),(40304,1),(40305,1),(40306,1),(40307,1),(40308,1),(40309,1),(40310,1),(40311,1),(40312,1),(40313,1),(40314,1),(40315,1),(40316,1),(40317,1),(40318,1),(40319,1),(40320,1),(40401,0),(40402,0),(40403,0),(40404,0),(40405,0),(40406,0),(40407,0),(40408,0),(40409,0),(40410,0),(40411,0),(40412,0),(40413,0),(40414,0),(40415,0),(40416,0),(40417,0),(40418,0),(40419,0),(40420,0);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_hold`
--

DROP TABLE IF EXISTS `student_hold`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student_hold` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `hold_id` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_hold_student_id_hold_id_3a4bb61e_uniq` (`student_id`,`hold_id`),
  KEY `student_hold_hold_id_f02e2f19_fk_hold_name` (`hold_id`),
  CONSTRAINT `student_hold_hold_id_f02e2f19_fk_hold_name` FOREIGN KEY (`hold_id`) REFERENCES `hold` (`name`),
  CONSTRAINT `student_hold_student_id_27061b83_fk_student_user_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_hold`
--

LOCK TABLES `student_hold` WRITE;
/*!40000 ALTER TABLE `student_hold` DISABLE KEYS */;
INSERT INTO `student_hold` VALUES (5,40001,'AD52'),(6,40001,'AD56'),(2,40201,'AD10'),(1,40201,'AD89'),(7,40201,'BB68');
/*!40000 ALTER TABLE `student_hold` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_major`
--

DROP TABLE IF EXISTS `student_major`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student_major` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dateDeclared` date NOT NULL,
  `major_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_major_student_id_major_id_14c45044_uniq` (`student_id`,`major_id`),
  KEY `student_major_major_id_c6e56373_fk_major_id` (`major_id`),
  CONSTRAINT `student_major_major_id_c6e56373_fk_major_id` FOREIGN KEY (`major_id`) REFERENCES `major` (`id`),
  CONSTRAINT `student_major_student_id_b7ed7c38_fk_student_user_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_major`
--

LOCK TABLES `student_major` WRITE;
/*!40000 ALTER TABLE `student_major` DISABLE KEYS */;
INSERT INTO `student_major` VALUES (1,'2016-08-04',1,40201);
/*!40000 ALTER TABLE `student_major` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_minor`
--

DROP TABLE IF EXISTS `student_minor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student_minor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dateDeclared` date NOT NULL,
  `minor_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_minor_student_id_minor_id_9507513e_uniq` (`student_id`,`minor_id`),
  KEY `student_minor_minor_id_69c4f7bf_fk_minor_id` (`minor_id`),
  CONSTRAINT `student_minor_minor_id_69c4f7bf_fk_minor_id` FOREIGN KEY (`minor_id`) REFERENCES `minor` (`id`),
  CONSTRAINT `student_minor_student_id_8ceb6754_fk_student_user_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_minor`
--

LOCK TABLES `student_minor` WRITE;
/*!40000 ALTER TABLE `student_minor` DISABLE KEYS */;
INSERT INTO `student_minor` VALUES (1,'2016-08-04',1,40201);
/*!40000 ALTER TABLE `student_minor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `term`
--

DROP TABLE IF EXISTS `term`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `term` (
  `id` int(11) NOT NULL,
  `season` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` varchar(4) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `term`
--

LOCK TABLES `term` WRITE;
/*!40000 ALTER TABLE `term` DISABLE KEYS */;
INSERT INTO `term` VALUES (1,'SP','2016'),(2,'F','2016'),(3,'SP','2017'),(4,'F','2017'),(5,'SP','2017'),(6,'F','2018'),(7,'SP','2019'),(8,'F','2019');
/*!40000 ALTER TABLE `term` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `time`
--

DROP TABLE IF EXISTS `time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `time` (
  `id` int(11) NOT NULL,
  `start` time(6) NOT NULL,
  `end` time(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `time`
--

LOCK TABLES `time` WRITE;
/*!40000 ALTER TABLE `time` DISABLE KEYS */;
INSERT INTO `time` VALUES (1,'08:00:00.000000','09:00:00.000000'),(2,'09:00:00.000000','10:00:00.000000'),(3,'10:00:00.000000','11:00:00.000000'),(4,'11:00:00.000000','12:00:00.000000'),(5,'12:00:00.000000','13:00:00.000000'),(6,'13:00:00.000000','14:00:00.000000'),(7,'14:00:00.000000','15:00:00.000000'),(8,'15:00:00.000000','16:00:00.000000');
/*!40000 ALTER TABLE `time` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transcript`
--

DROP TABLE IF EXISTS `transcript`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transcript` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gradeReceived` varchar(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `year` int(11) NOT NULL,
  `season` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_id` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `student_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `transcript_student_id_course_id_bcfaa249_uniq` (`student_id`,`course_id`),
  KEY `transcript_course_id_94a1a50a_fk_course_id` (`course_id`),
  CONSTRAINT `transcript_course_id_94a1a50a_fk_course_id` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  CONSTRAINT `transcript_student_id_f0716c2e_fk_student_user_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transcript`
--

LOCK TABLES `transcript` WRITE;
/*!40000 ALTER TABLE `transcript` DISABLE KEYS */;
INSERT INTO `transcript` VALUES (1,'B',2017,'F','MA110',40201),(2,'A',2017,'F','EE365',40201),(3,'F',2017,'F','PH101',40201),(4,'B',2017,'F','EE101',40201),(5,'B',2017,'F','EE102',40201),(6,'B',2018,'SP','MA113',40201),(7,'B',2018,'SP','MA304',40201),(8,'A',2018,'SP','EE241',40201),(9,'A',2018,'SP','EE251',40201),(10,'A',2018,'SP','EE264',40201),(11,'B',2018,'F','HU103',40201),(12,'B',2018,'F','PH102',40201),(13,'A',2018,'F','EE300',40201),(14,'A',2018,'F','EE310',40201),(15,'A',2018,'F','EE342',40201),(16,NULL,2019,'SP','PH103',40201),(17,NULL,2019,'SP','MA305',40201),(18,NULL,2019,'SP','EE303',40201),(19,NULL,2019,'SP','EE360',40201),(20,NULL,2019,'SP','EE394',40201);
/*!40000 ALTER TABLE `transcript` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `undergrad_student`
--

DROP TABLE IF EXISTS `undergrad_student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `undergrad_student` (
  `student_id` int(11) NOT NULL,
  `isFullTime` tinyint(1) NOT NULL,
  PRIMARY KEY (`student_id`),
  CONSTRAINT `undergrad_student_student_id_64c4c5d5_fk_student_user_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `undergrad_student`
--

LOCK TABLES `undergrad_student` WRITE;
/*!40000 ALTER TABLE `undergrad_student` DISABLE KEYS */;
/*!40000 ALTER TABLE `undergrad_student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `last_login` datetime(6) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isLockout` tinyint(1) NOT NULL,
  `firstName` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `zipCode` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phoneNumber` varchar(13) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=40422 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (NULL,1,'toothQ','pbkdf2_sha256$150000$LZzTo2xc3Zwd$qM/uFkJ1qCJypiGFOR/3EDsJ1ZummPfZDbPrpGKurE8=','A',0,'Tooth','Q','Random','Floral Park','NY','USA','11111','1234567890'),(NULL,10001,'cancinog','5678','F',0,'Gerard','Cancino','100 Main St','Lynbrrok','NY','USA','11563','5167900666'),(NULL,10002,'caih','4584','F',0,'Haojun','Cai','223 store hill rd','old westbury','NY','USA','11568','9293008380'),(NULL,10003,'chungs','2324','F',0,'Sikho','Chung','101 Main St','Lynbrrok','NY','USA','11563','5167900666'),(NULL,10004,'harrisond','2425','F',0,'David','Harrison','546 Hill St','Garden City','NY','USA','11560','5164545555'),(NULL,10005,'algare','2526','F',0,'Edward','Algar','7th Ave','New York','NY','USA','11020','2475684747'),(NULL,10006,'lewisg','2627','F',0,'George','Lewis','87 Fair View','Horton','NY','USA','11400','7188774545'),(NULL,10007,'jhonsonk','2728','F',0,'Carly','Johonsn','4500 Mill Rd','Saw Mill','NY','USA','11760','9144506565'),(NULL,10008,'williamsf','2829','F',0,'Frank','Williams','30 George Rd','Portchester','NY','USA','11789','9195857777'),(NULL,10009,'samsd','3031','F',0,'David','Sams','67 Valentine Lane','Freeport','NY','USA','11545','5164141111'),(NULL,10010,'chewy','4501','F',0,'Yonny','Chew','34 Park Ave','Union','NJ','USA','20560','7064569999'),(NULL,10011,'chend','4502','F',0,'Denna','Chen','59 Moonside St','Valley Stream','NY','USA','11580','5166338080'),(NULL,10012,'parkm','4503','F',0,'Marie','Park','258 Golf Rd','New Rochelle','NY','USA','10530','9145257778'),(NULL,10013,'dantet','4504','F',0,'Thomas','Dante','699 Hill Ave','Toronto','CA','Canada','0015','156-555-0000'),(NULL,10014,'sheltond','1111','F',0,'Dawn','Shelton','529 Newton Street','St Cloud','MN','USA','11178','3202911613'),(NULL,20001,'dabrowd','9101','A',0,'Daniel','Dabrowski','50 Hill Ave','Forest Hill','NY','USA','11568','7184502569'),(NULL,20002,'moorem','9102','A',0,'Mark','Moore','50 Hill Ave','Forest Hill','NY','USA','11568','7184502570'),(NULL,20003,'markj','2021','A',0,'Jannet','Mark','1000 Horton Ave','Manhattan','NY','USA','11100','2125468900'),(NULL,20004,'davism','3120','A',0,'Maria','Davis','788 Dixie Rd','Farmingdale','NY','USA','11590','516-363-6666'),(NULL,30001,'shawp','1213','R',0,'Paul','Shaw','45 Mill Rd','Valley','NY','USA','11570','5164506000'),(NULL,30002,'thomase','4010','R',0,'Eddie','Thomas','112 Carl Ave','Lynbrook','NY','USA','11563','5167122020'),(NULL,40001,'toothG','2234','S',0,'George','Tooth','223 Grand Ave','Garden City','NY','USA','11530','5165601525'),(NULL,40002,'millH','1415','S',0,'Harry','Mill','78 Bail Rd','White Plains','NY','USA','11710','9146321550'),(NULL,40003,'LynerC','1516','S',0,'Carl','Lyner','890 Wake Rd','Garden City','NY','USA','11530','5169698500'),(NULL,40004,'GuzmanG','2223','S',0,'Garry','Guzman','45 Lewis Rd','Riverdale','NY','USA','11710','9144507777'),(NULL,40005,'KurstJ','1920','S',0,'John','Kurst','8500 Jill Rd','Hicksville','NY','USA','11598','5168799999'),(NULL,40006,'AlvaR','1718','S',0,'Ron','Alva','1212 North Ave','Baldwin','NY','USA','11570','5169600000'),(NULL,40007,'LewisP','7878','S',0,'Patrice','Lewis','54 Locust Hill','Yonkers','NY','USA','10710','9144845554'),(NULL,40008,'MoonL','4747','S',0,'Larry','Moon','4788 Liberty Ave','Seattle','WA','USA','98101','4258585566'),(NULL,40009,'MilanO','3654','S',0,'Opina','Milan','458 Bismark Ct','Ocean ','CA','USA','93304','6618511525'),(NULL,40010,'JuneK','3971','S',0,'Kelly','June','5468 Rock Pl','Yonkers','NY','USA','10706','91456560000'),(NULL,40011,'KapiloskiU','5586','S',0,'Ubert','Kapilski','300 Moon Lane','Brooklyn','NY','USA','11209','2129998787'),(NULL,40012,'LordC','7784','S',0,'Connie','Lord','227 Place Terrace','Queens','NY','USA','11405','7188523636'),(NULL,40013,'PewisP','7870','S',0,'Patrice','Pewis','54 Locust Hill','Yonkers','NY','USA','10710','9144845554'),(NULL,40014,'HomerF','7411','S',0,'Fatima','Homer','65 Little Neck Rd','White Stone','NY','USA','11406','2122333636'),(NULL,40015,'HoltzH','2512','S',0,'Hazel','Holtz','45688 Hillside','Long Beach','CA','USA','27012','9085839696'),(NULL,40016,'GordonH','1136','S',0,'Harriett','Gordon','45 Pine St','Valley Stream','NY','USA','11881','5169898989'),(NULL,40017,'BursonF','2364','S',0,'Fanny','Burson','1075 Court Lane','Connecticut','NY','USA','06002','2037898888'),(NULL,40018,'VasquezL','9713','S',0,'Letty','Vasquez','14 Caryl Rd','FishKill','NY','USA','12524','8459708711'),(NULL,40019,'MayorI','3698','S',0,'Irma','Mayor','14 Capital Lane','Wishkill','WI','USA','00081','7060555600'),(NULL,40020,'CastroJ','9636','S',0,'Jeannie','Castro','568 Pine Lane','Hartford','NY','USA','06004','2031414578'),(NULL,40101,'brownJ','9640','S',0,'Joe','Brown','223 Grand Ave','Garden City','NY','USA','11530','5165601525'),(NULL,40102,'PolaskiD','1112','S',0,'Nancy','Polaski','5221 Newton Street','Farmingdale','NY','USA','11472','3491223132'),(NULL,40103,'ChungM','5678','S',0,'Mari','Chung','101 Main St','Lynbrrok','NY','USA','11563','5167907070'),(NULL,40104,'ChevyD','1113','S',0,'Dan','Chevy','530 Newton Street','St Cloud','MN','USA','11148','3202912312'),(NULL,40105,'HammerD','1114','S',0,'Dave','Hammer','554 Hill St','Garden City','NY','USA','11560','5164545123'),(NULL,40106,'Patp','1115','S',0,'Patrick','Pat','11th Ave','New York','NY','USA','11022','2475684723'),(NULL,40107,'LewisC','1116','S',0,'Corriene','Lewis','87 Fair Mountain','Horton','NY','USA','11212','7188772431'),(NULL,40108,'Admask','1117','S',0,'Kiara','Admas','4512 Mill Rd','Saw Mill','NY','USA','11723','9144506323'),(NULL,40109,'RoseF','1118','S',0,'Frank','Rose','323 George Rd','Portchester','NY','USA','11742','9195857764'),(NULL,40110,'SamsA','1119','S',0,'Adam','Sams','600 Valentine Lane','Freeport','NY','USA','11545','5164141211'),(NULL,40111,'CollinsE','1211','S',0,'Edwin','Collins','134 Cherry Road','New Rochelle','NY','USA','10802','9146574432'),(NULL,40112,'PetrovskyC','1212','S',0,'Conrad','Petrovsky','65 Harvest Lane','Yonkers','NY','USA','10704','9145646677'),(NULL,40113,'WestE','1213','S',0,'Emily','West','44 Green Street','Garden City','NY','USA','11530','5162430910'),(NULL,40114,'LeviB','1214','S',0,'Beatrice','Levi','11 Shell Avenue','Port Jefferson','NY','USA','11777','6312231974'),(NULL,40115,'HansonS','1215','S',0,'Sue','Hanson','642 Rose Lane','Hempstead','NY','USA','11530','5169881012'),(NULL,40116,'DowlingS','1216','S',0,'Sandy','Dowling','64 Washington Boulevard','Mineola','NY','USA','11501','5167554315'),(NULL,40117,'DavisC','1217','S',0,'Cristopher','Davis','2394 Frum Street','Dickson','TN','USA','37055','6153266921'),(NULL,40118,'DesrosiersR','1218','S',0,'Rebecca','Desrosiers','3517 Centennial Farm Road','Wall Lake','IA','USA','51466','7126640082'),(NULL,40119,'DicksonJ','1219','S',0,'Jeff','Dickson','1410 Zappia Drive','Lexington','KY','USA','40507','8593681491'),(NULL,40120,'TregreL','1220','S',0,'Linh','Tregre','2518 Cedarstone Drive','Defiance','OH','USA','43512','4194984411'),(NULL,40201,'GertzG','1221','S',0,'George','Gertz','1092 Pooh Bear Lane','Greenville','SC','USA','29607','8647064684'),(NULL,40202,'ChuckR','1120','S',0,'Rose','Chuck','232 Hammer St','Hicksville','NY','USA','11801','5168291212'),(NULL,40203,'mathewK','1121','S',0,'Kill','mathew','334 Park Ave','Union','PA','USA','20560','7065669923'),(NULL,40204,'CriagD','1122','S',0,'Denna','Criag','549 Moonside St','Valley Stream','NY','USA','11580','5166238080'),(NULL,40205,'ParkJ','1123','S',0,'John','Park','2128 Golf Rd','New Rochelle','NY','USA','10530','9145251092'),(NULL,40206,'DanteR','1124','S',0,'Rilley','Dante','691 Hill Ave','Toronto','CA','Canada','0015','5165554212'),(NULL,40207,'HillsC','1222','S',0,'Caleb','Hills','2610 Angie Drive','Huntington Beach','CA','USA','92648','7149608153'),(NULL,40208,'McGeeB','1223','S',0,'Betty','McGee','1513 Bates Brothers Road','Columbus','OH','USA','43204','6143084533'),(NULL,40209,'CardenasK','1224','S',0,'Kecia','Cardenas','484 Huntz Lane','Acton','MA','USA','01720','9786061225'),(NULL,40210,'BermudezG','1225','S',0,'George','Bermudez','2224 Marietta Street','Oakland','CA','USA','94612','7075977671'),(NULL,40211,'FarrellD','1226','S',0,'Don','Farrell','2884 Lakewood Drive','Fair Lawn','NJ','USA','07410','2017964116'),(NULL,40212,'BurtonM','1227','S',0,'Maria','Burton','707 Anmoore Road','Staten Island','NY','USA','10314','7187616915'),(NULL,40213,'HoltonD','1228','S',0,'Donald','Holton','2291 Martha Ellen Drive','Elko','NV','USA','89801','7757388174'),(NULL,40214,'WardS','1229','S',0,'Sasha','Ward','690 Golf Course Drive','Manassas','VA','USA','22110','7033358491'),(NULL,40215,'ShintaniK','1230','S',0,'Kisa','Shintani','42 Goosetown Drive','Taylorsville','NC','USA','28681','8286355900'),(NULL,40216,'HamadaS','1231','S',0,'Sahara','Hamada','806 Stratford Park','Terre Haute','IN','USA','47805','8128724626'),(NULL,40217,'TaketouI','1232','S',0,'Isae','Taketou','2125 Lake Road','Egg Harbor','NJ','USA','08232','6094120025'),(NULL,40218,'MotsuzukiR','1233','S',0,'Ryou','Motsuzuki','679 Jadewood Drive','South Bend','IN','USA','46601','2199734248'),(NULL,40219,'MunguiaO','1234','S',0,'Ozias','Munguia','720 Hawks Nest Lane','Saint Louis','MO','USA','63101','3146788245'),(NULL,40220,'GranadosS','1235','S',0,'Sibila','Granados','2899 Apple Lane','San Jose','IL','USA','62682','3092477424'),(NULL,40301,'HallG','1236','S',0,'Sibila','Granados','184 Heatherleigh','Cooksville','ON','Canada','L5A 1V9','9058975797'),(NULL,40302,'MollyD','1130','S',0,'Dolly','Molly','549 Moonside St','Valley Stream','NY','USA','11580','5166238080'),(NULL,40303,'MollyE','1131','S',0,'Ellen','Molly','5442 Moonside St','Valley Stream','NY','USA','11580','5166238080'),(NULL,40304,'HarrisonP','1140','S',0,'Patrick','Harrison','542 Hill St','Garden City','NY','USA','11560','5164545211'),(NULL,40305,'TylerW','1141','S',0,'Walter','Tyler','51th Ave','New York','NY','USA','11020','2475684723'),(NULL,40306,'BourneJ','1142','S',0,'Jason','Bourne','2123 Golf Rd','New Rochelle','NY','USA','10530','9145251231'),(NULL,40307,'EberhardtJ','1237','S',0,'Juliane','Eberhardt','388 Custer Street','Chicago','IL','USA','60607','8152155274'),(NULL,40308,'SalibT','1238','S',0,'Tareef','Salib','4397 Pin Oak Drive','Pomona','CA','USA','91766','5629993704'),(NULL,40309,'TumaA','1239','S',0,'Ajib','Tuma','3462 Huntz Lane','Cambridge','MA','USA','02141','9786073839'),(NULL,40310,'BisharaW','1240','S',0,'Waliy','Bishara','104 Poplar Street','Burr Ridge','IL','USA','61257','7087277744'),(NULL,40311,'MarounA','1241','S',0,'Ataa','Maroun','1511 Hoffman Avenue','New York','NY','USA','10003','9179614688'),(NULL,40312,'StankovicT','1242','S',0,'Teo','Stankovic','1481 Baker Avenue','Dallas','TX','USA','75244','8178937793'),(NULL,40313,'JepsenR','1243','S',0,'Rikke','Jepsen','1093 Snowbird Lane','Hooper','NE','USA','68031','4026545363'),(NULL,40314,'JoudaS','1244','S',0,'Sai','Jouda','4918 Oakmound Drive','Chicago','IL','USA','60605','7733517885'),(NULL,40315,'EndoO','1245','S',0,'Otohiko','Endo','1613 Deans Lane','Fairview Park','NY','USA','10603','9147892888'),(NULL,40316,'SandovalG','1246','S',0,'George','Sandoval','4889 Glen Street','Brandenburg','KY','USA','40108','2704227409'),(NULL,40317,'CooleyA','1247','S',0,'Alfred','Cooley','4884 John Avenue','East Lansing','MI','USA','48823','5179250756'),(NULL,40318,'LockhartJ','1248','S',0,'James','Lockhart','3603 Warner Street','Miami','FL','USA','33169','3059926675'),(NULL,40319,'RiddleB','1249','S',0,'Betty','Riddle','607 August Lane','Shreveport','LA','USA','71101','318-461-3457'),(NULL,40320,'ChenN','1250','S',0,'Nick','Chen','222 store hill rd','old westbury','NY','USA','11568','9293008381'),(NULL,40401,'BrownJe','1150','S',0,'Jennifer','Brown','4520 Mill Rd','Saw Mill','NY','USA','11760','9144506551'),(NULL,40402,'WilliamsM','1151','S',0,'Mary','Williams','310 George Rd','Portchester','NY','USA','11789','9195857621'),(NULL,40403,'JonesM','1152','S',0,'Mary','Jones','102 Main St','Lynbrrok','NY','USA','11563','5167900623'),(NULL,40404,'BrownD','1153','S',0,'Dave','Brown','5421 Hill St','Garden City','NY','USA','11560','5164545521'),(NULL,40405,'MiaN','1154','S',0,'Nazim','Mia','100th Ave','New York','NY','USA','11020','2475682222'),(NULL,40406,'VasquezC','1155','S',0,'Connie','Vasquez','812 Fair View','Horton','NY','USA','11400','7188774121'),(NULL,40407,'NashS','1251','S',0,'Sergio','Nash','433 Golden Street','Miami','FL','USA','33143','3056616606'),(NULL,40408,'ThompsonM','1252','S',0,'Mary','Thompson','4589 Windy Ridge Road','Fort Wayne','IN','USA','46805','2604719988'),(NULL,40409,'FlemingK','1253','S',0,'Kathryn','Fleming','4478 Myra Street','Providence','RI','USA','02906','4015599812'),(NULL,40410,'CatheyC','1254','S',0,'Constance','Cathey','190 Hiddenview Drive','Portland','PA','USA','97205','2159261768'),(NULL,40411,'ChaseL','1160','S',0,'Lorane','Chase','4500 Mill Rd','Saw Mill','FL','USA','11760','9144506511'),(NULL,40412,'QueensT','1161','S',0,'Telly','Queens','321 George Rd','Portchester','NY','USA','11789','9195857212'),(NULL,40413,'JamesP','1162','S',0,'Polly','James','67 Valentine Lane','Freeport','NY','USA','11545','5164141112'),(NULL,40414,'MarciaA','1163','S',0,'Anthony','Marcia','34 Valentine Lane','Freeport','NY','USA','11545','5164569912'),(NULL,40415,'ChenH','1164','S',0,'Hat','Chen','59 Moonside St','Valley Stream','NY','USA','11580','5166338021'),(NULL,40416,'RobertsJ','1165','S',0,'Jane','Roberts','258 Golf Rd','New Rochelle','NY','USA','10530','9145257121'),(NULL,40417,'choik','1255','S',0,'Ken','Choi','221 hill rd','old westbury','NY','USA','11568','9293008388'),(NULL,40418,'choin','1256','S',0,'Nick','Choi','225 hill rd','old westbury','NY','USA','11568','5165556666'),(NULL,40419,'zhens','1257','S',0,'steve','zhen','220 store rd','old westbury','NY','USA','11568','5166203320'),(NULL,40420,'tangj','1258','S',0,'jenny','tang','110 store rd','old westbury','NY','USA','11568','9298883868'),(NULL,40421,'studentS','pbkdf2_sha256$150000$niSNsazXByf7$BVmVNy+BKBoUEgqf8ye/6yONNIAnT6717yNlUr8wnw0=','S',0,'Gerard','Cancino','street','my city','NY','USA','11000','1234567890');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'system'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-17  7:05:38
