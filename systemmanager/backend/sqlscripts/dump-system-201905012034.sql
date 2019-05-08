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
  KEY `advisor_faculty_id_b26f650f` (`faculty_id`),
  KEY `advisor_student_id_85d75315` (`student_id`),
  CONSTRAINT `advisor_faculty_id_b26f650f_fk_faculty_user_id` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`user_id`),
  CONSTRAINT `advisor_student_id_85d75315_fk_student_user_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attendance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enrollment_id` int(11) NOT NULL,
  `isPresent` tinyint(1) NOT NULL,
  `dayAttended` date NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `attendance_enrollment_id_be7ff56a_fk_enrollment_id` FOREIGN KEY (`enrollment_id`) REFERENCES `enrollment` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=21042 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Table structure for table `grade`
--

DROP TABLE IF EXISTS `grade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grade` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `numberGrade` int(11) NOT NULL,
  `course_section_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `grade_student_id_course_section_id_75a3c4ef_uniq` (`student_id`,`course_section_id`),
  KEY `grade_course_section_id_5680784d_fk_course_section_id` (`course_section_id`),
  CONSTRAINT `grade_course_section_id_5680784d_fk_course_section_id` FOREIGN KEY (`course_section_id`) REFERENCES `course_section` (`id`),
  CONSTRAINT `grade_student_id_d11d152d_fk_student_user_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Table structure for table `major`
--

DROP TABLE IF EXISTS `major`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `major` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `department_id` varchar(4) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `major_department_id_13c2669d_fk_department_code` (`department_id`),
  CONSTRAINT `major_department_id_13c2669d_fk_department_code` FOREIGN KEY (`department_id`) REFERENCES `department` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `minor`
--

DROP TABLE IF EXISTS `minor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `minor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `department_id` varchar(4) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `minor_department_id_8d5346eb_fk_department_code` (`department_id`),
  CONSTRAINT `minor_department_id_8d5346eb_fk_department_code` FOREIGN KEY (`department_id`) REFERENCES `department` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Table structure for table `transcript`
--

DROP TABLE IF EXISTS `transcript`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transcript` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gradeReceived` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` int(11) NOT NULL,
  `season` varchar(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_id` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `student_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `transcript_student_id_course_id_bcfaa249_uniq` (`student_id`,`course_id`),
  KEY `transcript_course_id_94a1a50a_fk_course_id` (`course_id`),
  CONSTRAINT `transcript_course_id_94a1a50a_fk_course_id` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  CONSTRAINT `transcript_student_id_f0716c2e_fk_student_user_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `last_login` datetime(6) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=40421 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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

-- Dump completed on 2019-05-01 20:34:47
