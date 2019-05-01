USE system;

-- Faculty in the 10000
-- Admins in the 20000
-- Researchers in the 30000
-- Students in the 40000

-- Faculty
INSERT INTO `user`
(`id`, `password`, `type`, `email`, `firstName`, `lastName`, `address`, `city`, `state`, `country`, `zipCode`, `phoneNumber`, `isLockout`) VALUES
(10001, '5678', 'F', 'cancinog', 'Gerard', 'Cancino', '100 Main St', 'Lynbrrok', 'NY', 'USA', '11563', '5167900666', 0),
(10002,'password','F','email104','first','last','address','city','NY','USA','11568','1234567890', 0),
(10003,'password','F','email105','first','last','address','city','NY','USA','11568','1234567890', 0),
(10004,'password','F','email106','first','last','address','city','NY','USA','11568','1234567890', 0),
(10005,'password','F','email107','first','last','address','city','NY','USA','11568','1234567890', 0),
(10006,'password','F','email108','first','last','address','city','NY','USA','11568','1234567890', 0),
(10007,'password','F','email109','first','last','address','city','NY','USA','11568','1234567890', 0),
(10008,'password','F','email110','first','last','address','city','NY','USA','11568','1234567890', 0),
(10009,'password','F','email111','first','last','address','city','NY','USA','11568','1234567890', 0),
(10010,'password','F','email112','first','last','address','city','NY','USA','11568','1234567890', 0),
(10011,'password','F','email113','first','last','address','city','NY','USA','11568','1234567890', 0),
(10012,'password','F','email114','first','last','address','city','NY','USA','11568','1234567890', 0),
(10013,'password','F','email115','first','last','address','city','NY','USA','11568','1234567890', 0),
(10014,'password','F','email116','first','last','address','city','NY','USA','11568','1234567890', 0);

-- Admin
INSERT INTO `user`
(`id`, `password`, `type`, `email`, `firstName`, `lastName`, `address`, `city`, `state`, `country`, `zipCode`, `phoneNumber`, `isLockout`) VALUES
(20001, '9101', 'A', 'dabrowd', 'Daniel', 'Dabrowski', '50 Hill Ave', 'Forest Hill', 'NY', 'USA', '11568', '7184502569', 0),
(20002,'password','A','email101','first','last','address','city','NY','USA','11568','1234567890', 0),
(20003,'password','A','email102','first','last','address','city','NY','USA','11568','1234567890', 0),
(20004,'password','A','email103','first','last','address','city','NY','USA','11568','1234567890', 0);

-- Researcher
INSERT INTO `user`
(`id`, `password`, `type`, `email`, `firstName`, `lastName`, `address`, `city`, `state`, `country`, `zipCode`, `phoneNumber`, `isLockout`) VALUES
(30001, '1213', 'R', 'caih', 'Haojun', 'Cai', '45 Mill Rd', 'Valley', 'NY', 'USA', '11570', '5164506000', 0),
(30002, 'password','R','email100','first','last','address','city','NY','USA','11568','1234567890', 0);

-- Student
INSERT INTO `user`
(`id`, `password`, `type`, `email`, `firstName`, `lastName`, `address`, `city`, `state`, `country`, `zipCode`, `phoneNumber`, `isLockout`) VALUES
(40001, '1234', 'S', 'toothG', 'George', 'Tooth', '223 Grand Ave', 'Garden City', 'NY', 'USA', '11530', '5165601525', 0), -- Chemical Engineering Freshmen // Minor Math
(40002,'password','S','email1','first','last','address','city','NY','USA','11568','1234567890', 0), 
(40003,'password','S','email2','first','last','address','city','NY','USA','11568','1234567890', 0),
(40004,'password','S','email3','first','last','address','city','NY','USA','11568','1234567890', 0),
(40005,'password','S','email4','first','last','address','city','NY','USA','11568','1234567890', 0),
(40006,'password','S','email5','first','last','address','city','NY','USA','11568','1234567890', 0),
(40007,'password','S','email6','first','last','address','city','NY','USA','11568','1234567890', 0),
(40008,'password','S','email7','first','last','address','city','NY','USA','11568','1234567890', 0),
(40009,'password','S','email8','first','last','address','city','NY','USA','11568','1234567890', 0),
(40010,'password','S','email9','first','last','address','city','NY','USA','11568','1234567890', 0),  -- ^ Minor Math ^
(40011,'password','S','email10','first','last','address','city','NY','USA','11568','1234567890', 0),
(40012,'password','S','email11','first','last','address','city','NY','USA','11568','1234567890', 0), 
(40013,'password','S','email12','first','last','address','city','NY','USA','11568','1234567890', 0),
(40014,'password','S','email13','first','last','address','city','NY','USA','11568','1234567890', 0),
(40015,'password','S','email14','first','last','address','city','NY','USA','11568','1234567890', 0),
(40016,'password','S','email15','first','last','address','city','NY','USA','11568','1234567890', 0), 
(40017,'password','S','email16','first','last','address','city','NY','USA','11568','1234567890', 0),
(40018,'password','S','email17','first','last','address','city','NY','USA','11568','1234567890', 0),
(40019,'password','S','email18','first','last','address','city','NY','USA','11568','1234567890', 0),
(40020,'password','S','email19','first','last','address','city','NY','USA','11568','1234567890', 0),
(40101,'password','S','email20','first','last','address','city','NY','USA','11568','1234567890', 0), -- Chemical Engineering Juniors
(40102,'password','S','email21','first','last','address','city','NY','USA','11568','1234567890', 0),
(40103,'password','S','email22','first','last','address','city','NY','USA','11568','1234567890', 0),
(40104,'password','S','email23','first','last','address','city','NY','USA','11568','1234567890', 0),
(40105,'password','S','email24','first','last','address','city','NY','USA','11568','1234567890', 0),
(40106,'password','S','email25','first','last','address','city','NY','USA','11568','1234567890', 0),
(40107,'password','S','email26','first','last','address','city','NY','USA','11568','1234567890', 0),
(40108,'password','S','email27','first','last','address','city','NY','USA','11568','1234567890', 0),
(40109,'password','S','email28','first','last','address','city','NY','USA','11568','1234567890', 0),
(40110,'password','S','email29','first','last','address','city','NY','USA','11568','1234567890', 0),
(40111,'password','S','email30','first','last','address','city','NY','USA','11568','1234567890', 0),
(40112,'password','S','email31','first','last','address','city','NY','USA','11568','1234567890', 0),
(40113,'password','S','email32','first','last','address','city','NY','USA','11568','1234567890', 0),
(40114,'password','S','email33','first','last','address','city','NY','USA','11568','1234567890', 0),
(40115,'password','S','email34','first','last','address','city','NY','USA','11568','1234567890', 0),
(40116,'password','S','email35','first','last','address','city','NY','USA','11568','1234567890', 0),
(40117,'password','S','email36','first','last','address','city','NY','USA','11568','1234567890', 0),
(40118,'password','S','email37','first','last','address','city','NY','USA','11568','1234567890', 0),
(40119,'password','S','email38','first','last','address','city','NY','USA','11568','1234567890', 0),
(40120,'password','S','email39','first','last','address','city','NY','USA','11568','1234567890', 0),
(40201,'password','S','email40','first','last','address','city','NY','USA','11568','1234567890', 0), -- Computer Engineering Freshmen
(40202,'password','S','email41','first','last','address','city','NY','USA','11568','1234567890', 0),
(40203,'password','S','email42','first','last','address','city','NY','USA','11568','1234567890', 0),
(40204,'password','S','email43','first','last','address','city','NY','USA','11568','1234567890', 0),
(40205,'password','S','email44','first','last','address','city','NY','USA','11568','1234567890', 0),
(40206,'password','S','email45','first','last','address','city','NY','USA','11568','1234567890', 0),
(40207,'password','S','email46','first','last','address','city','NY','USA','11568','1234567890', 0),
(40208,'password','S','email47','first','last','address','city','NY','USA','11568','1234567890', 0),
(40209,'password','S','email48','first','last','address','city','NY','USA','11568','1234567890', 0),
(40210,'password','S','email49','first','last','address','city','NY','USA','11568','1234567890', 0),
(40211,'password','S','email50','first','last','address','city','NY','USA','11568','1234567890', 0),
(40212,'password','S','email51','first','last','address','city','NY','USA','11568','1234567890', 0),
(40213,'password','S','email52','first','last','address','city','NY','USA','11568','1234567890', 0),
(40214,'password','S','email53','first','last','address','city','NY','USA','11568','1234567890', 0),
(40215,'password','S','email54','first','last','address','city','NY','USA','11568','1234567890', 0),
(40216,'password','S','email55','first','last','address','city','NY','USA','11568','1234567890', 0),
(40217,'password','S','email56','first','last','address','city','NY','USA','11568','1234567890', 0),
(40218,'password','S','email57','first','last','address','city','NY','USA','11568','1234567890', 0),
(40219,'password','S','email58','first','last','address','city','NY','USA','11568','1234567890', 0),
(40220,'password','S','email59','first','last','address','city','NY','USA','11568','1234567890', 0),
(40301,'password','S','email60','first','last','address','city','NY','USA','11568','1234567890', 0), -- Computer Engineering Juniors
(40302,'password','S','email61','first','last','address','city','NY','USA','11568','1234567890', 0),
(40303,'password','S','email62','first','last','address','city','NY','USA','11568','1234567890', 0),
(40304,'password','S','email63','first','last','address','city','NY','USA','11568','1234567890', 0),
(40305,'password','S','email64','first','last','address','city','NY','USA','11568','1234567890', 0),
(40306,'password','S','email65','first','last','address','city','NY','USA','11568','1234567890', 0),
(40307,'password','S','email66','first','last','address','city','NY','USA','11568','1234567890', 0),
(40308,'password','S','email67','first','last','address','city','NY','USA','11568','1234567890', 0),
(40309,'password','S','email68','first','last','address','city','NY','USA','11568','1234567890', 0),
(40310,'password','S','email69','first','last','address','city','NY','USA','11568','1234567890', 0),
(40311,'password','S','email70','first','last','address','city','NY','USA','11568','1234567890', 0),
(40312,'password','S','email71','first','last','address','city','NY','USA','11568','1234567890', 0),
(40313,'password','S','email72','first','last','address','city','NY','USA','11568','1234567890', 0),
(40314,'password','S','email73','first','last','address','city','NY','USA','11568','1234567890', 0),
(40315,'password','S','email74','first','last','address','city','NY','USA','11568','1234567890', 0),
(40316,'password','S','email75','first','last','address','city','NY','USA','11568','1234567890', 0),
(40317,'password','S','email76','first','last','address','city','NY','USA','11568','1234567890', 0), 
(40318,'password','S','email77','first','last','address','city','NY','USA','11568','1234567890', 0),
(40319,'password','S','email78','first','last','address','city','NY','USA','11568','1234567890', 0),
(40320,'password','S','email79','first','last','address','city','NY','USA','11568','1234567890', 0),
(40401,'password','S','email80','first','last','address','city','NY','USA','11568','1234567890', 0), -- Electrical Grad Fresh
(40402,'password','S','email81','first','last','address','city','NY','USA','11568','1234567890', 0),
(40403,'password','S','email82','first','last','address','city','NY','USA','11568','1234567890', 0),
(40404,'password','S','email83','first','last','address','city','NY','USA','11568','1234567890', 0),
(40405,'password','S','email84','first','last','address','city','NY','USA','11568','1234567890', 0),
(40406,'password','S','email85','first','last','address','city','NY','USA','11568','1234567890', 0),
(40407,'password','S','email86','first','last','address','city','NY','USA','11568','1234567890', 0),
(40408,'password','S','email87','first','last','address','city','NY','USA','11568','1234567890', 0),
(40409,'password','S','email88','first','last','address','city','NY','USA','11568','1234567890', 0),
(40410,'password','S','email89','first','last','address','city','NY','USA','11568','1234567890', 0),
(40411,'password','S','email90','first','last','address','city','NY','USA','11568','1234567890', 0), -- Electrical Grad Junior
(40412,'password','S','email91','first','last','address','city','NY','USA','11568','1234567890', 0),
(40413,'password','S','email92','first','last','address','city','NY','USA','11568','1234567890', 0),
(40414,'password','S','email93','first','last','address','city','NY','USA','11568','1234567890', 0),
(40415,'password','S','email94','first','last','address','city','NY','USA','11568','1234567890', 0),
(40416,'password','S','email95','first','last','address','city','NY','USA','11568','1234567890', 0),
(40417,'password','S','email96','first','last','address','city','NY','USA','11568','1234567890', 0), 
(40418,'password','S','email97','first','last','address','city','NY','USA','11568','1234567890', 0),
(40419,'password','S','email98','first','last','address','city','NY','USA','11568','1234567890', 0),
(40420,'password','S','email99','first','last','address','city','NY','USA','11568','1234567890', 0);

INSERT INTO `building` (`code`, `name`) VALUES
('CC', 'Campus Center'), 
('ET', 'Engineering Tower');

-- 1 to 4 are faculty for ESTT 
-- 5 to 10 are specials // Office, Lab or Theatre
-- 11 to 30 are classrooms
INSERT INTO `room` (`id`, `building_id`, `number`, `type`, `capacity`) VALUES
('CC1','CC',101,'F',6), -- Humantities Faculty
('CC2','CC',102,'O',20), -- Faculty
('CC3','CC',103,'O',20), -- Faculty
('CC4','CC',104,'O',20), -- Faculty
('CC5','CC',105,'O',20), -- Finance
('CC6','CC',106,'O',20), -- Security
('CC7','CC',107,'O',20), -- Administration
('CC8','CC',108,'O',20), -- Tech Support
('CC9','CC',109,'O',20), -- Student Help Desk
('CC10','CC',110,'O',20), -- Registrar
('CC11','CC',201,'C',30), -- Classrooms
('CC12','CC',202,'C',30),
('CC13','CC',203,'C',30),
('CC14','CC',204,'C',30),
('CC15','CC',205,'T',30), -- Theatre Hall
('ET1','ET',101,'F',6), -- Chemical E
('ET2','ET',102,'F',6), -- Electrical E
('ET3','ET',103,'F',6), -- Physics
('ET4','ET',104,'F',6), -- Mathematics
('ET5','ET',105,'L',20), -- Labs
('ET6','ET',106,'L',20), 
('ET7','ET',107,'L',20), 
('ET8','ET',108,'L',20), 
('ET9','ET',109,'L',20), 
('ET10','ET',110,'L',20), 
('ET11','ET',201,'L',20),
('ET12','ET',202,'L',20),
('ET13','ET',203,'L',20),
('ET14','ET',204,'L',20),
('ET15','ET',205,'L',20), 
('ET16','ET',206,'C',30), -- Classrooms 
('ET17','ET',207,'C',30),
('ET18','ET',208,'C',30),
('ET19','ET',209,'C',30),
('ET20','ET',210,'C',30),
('ET21','ET',301,'C',30),
('ET22','ET',302,'C',30),
('ET23','ET',303,'C',30),
('ET24','ET',304,'C',30),
('ET25','ET',305,'C',30),
('ET26','ET',306,'C',30),
('ET27','ET',307,'C',30),
('ET28','ET',308,'C',30),
('ET29','ET',309,'C',30),
('ET30','ET',310,'C',30),
('ET31','ET',401,'C',30),
('ET32','ET',402,'C',30),
('ET33','ET',403,'C',30),
('ET34','ET',404,'C',30),
('ET35','ET',405,'C',30),
('ET36','ET',406,'C',30),
('ET37','ET',407,'C',30),
('ET38','ET',408,'C',30),
('ET39','ET',409,'C',30),
('ET40','ET',410,'C',30);

-- 5 departments
-- 2 Undergrad Major
  -- Electrical Engineering 
  -- Chemical Engineering
-- 1 Grad Major
  -- Electrical Engineering
-- 1 Minors
  -- Mathematics 
INSERT INTO `department` (`code`, `name`) VALUES
('CE','Chemical Engineering'), -- 5 Prof
('EE', 'Electrical Engineering'),  -- 5 Prof
('MA', 'Mathematics'), -- 2 Prof
('PH', 'Physics'), -- 2 Prof
('HU', 'Humantities'); -- 2 Prof 

-- ET
INSERT INTO `faculty` (`user_id`, `isFullTime`, `department_id`, `room_id`) VALUES
(10001, 1, 'CE', 'ET1'), -- Chemical E
(10002, 1, 'CE', 'ET1'),
(10003, 1, 'CE', 'ET1'),
(10004, 1, 'CE', 'ET1'),
(10005, 1, 'CE', 'ET2'), -- Electrical E
(10006, 1, 'EE', 'ET2'),
(10007, 1, 'EE', 'ET2'),
(10008, 1, 'EE', 'ET2'),
(10009, 1, 'MA', 'ET3'), -- Mathematics
(10010, 1, 'MA', 'ET3'),
(10011, 1, 'PH', 'ET4'), -- Physics
(10012, 1, 'PH', 'ET4'),
(10013, 1, 'HU', 'CC1'), -- Humanities
(10014, 1, 'HU', 'CC1');

INSERT INTO `hold` (`name`, `type`, `description`) VALUES
('BB01', 'Bursar', 'Unpaid Balance'),
('BB02', 'Bursar', 'Payyment plan amount due'),
('AD03', 'Admission', 'Admission Application Incomplete'),
('BB03', 'Bursar', 'Admission Application fee required '),
('AD04', 'Admission', 'Transfer transcript required'),
('AD50', 'Admission', 'Orientation required'),
('FA05', 'Financial Aid', 'Incomplete/Missing Income documents'),
('FA06', 'Financial Aid', 'Incomplete/Missing FASA'),
('FA07', 'Financial Aid', 'Incomplete/Missing TAP'),
('FA08', 'Financial Aid', 'Incomplete/Missing PELL'),
('AD10', 'Admission', 'Graduate Student Recommendation letters missing'),
('RG01', 'Registration', 'Undeclared Major'),
('RG02', 'Registration', 'Pre-Requisite required'),
('RG03', 'Registration', 'Academic Probation'),
('AD11', 'Admission', 'Immunization records required'),
('AD52', 'Admission', 'High School records required'),
('AD20', 'Admission', 'International Student Visa required'),
('AD56', 'Admission', 'International Student Transcript/Records required'),
('BB60', 'Bursar', 'Bounced check'),
('RG65', 'Registration', 'Instructor approval required'),
('RG66', 'Registration', 'Academic advisement required'),
('RG42', 'Registration', 'Scholarship warning grade requirement is below B '),
('BB68', 'Bursar', 'Graduation fee required'),
('BB80', 'Bursar', 'Student dorm balance due '),
('AD89', 'Admission', 'Graduate Application required');

-- 4 Selected Majors * 20 students = 80 students total
-- All Science
INSERT INTO `student` (`user_id`,`isUndergrad`) VALUES
(40001, 1), -- Chem E Fresh
(40002, 1),
(40003, 1),
(40004, 1),
(40005, 1),
(40006, 1),
(40007, 1),
(40008, 1),
(40009, 1),
(40010, 1),
(40011, 1),
(40012, 1), 
(40013, 1),
(40014, 1),
(40015, 1),
(40016, 1), 
(40017, 1),
(40018, 1),
(40019, 1),
(40020, 1),
(40101, 1), -- Chem E Junior
(40102, 1),
(40103, 1),
(40104, 1),
(40105, 1),
(40106, 1),
(40107, 1),
(40108, 1),
(40109, 1),
(40110, 1),
(40111, 1),
(40112, 1),
(40113, 1),
(40114, 1),
(40115, 1),
(40116, 1),
(40117, 1),
(40118, 1),
(40119, 1),
(40120, 1),
(40201, 1), -- Elect E Fresh
(40202, 1),
(40203, 1),
(40204, 1),
(40205, 1),
(40206, 1),
(40207, 1),
(40208, 1),
(40209, 1),
(40210, 1),
(40211, 1),
(40212, 1),
(40213, 1),
(40214, 1),
(40215, 1),
(40216, 1),
(40217, 1),
(40218, 1),
(40219, 1),
(40220, 1),
(40301, 1), -- Elect E Junior
(40302, 1),
(40303, 1),
(40304, 1),
(40305, 1),
(40306, 1),
(40307, 1),
(40308, 1),
(40309, 1),
(40310, 1),
(40311, 1),
(40312, 1),
(40313, 1),
(40314, 1),
(40315, 1),
(40316, 1),
(40317, 1), 
(40318, 1),
(40319, 1),
(40320, 1),
(40401, 0), -- Electrical Grad 1st
(40402, 0),
(40403, 0),
(40404, 0),
(40405, 0),
(40406, 0),
(40407, 0),
(40408, 0),
(40409, 0),
(40410, 0),
(40411, 0), -- Electrical Grad 2nd
(40412, 0),
(40413, 0),
(40414, 0),
(40415, 0),
(40416, 0),
(40417, 0), 
(40418, 0),
(40419, 0),
(40420, 0);

INSERT INTO `advisor` (`id`, `faculty_id`, `student_id`,`dateAssigned`) VALUES 
(1,10002, 40001, '2018-07-22'), -- Chem E Fresh
(2,10002, 40002, '2018-07-22'),
(3,10002, 40003, '2018-07-22'),
(4,10002, 40004, '2018-07-22'),
(5,10002, 40005, '2018-07-22'),
(6,10002, 40006, '2018-07-22'),
(7,10002, 40007, '2018-07-22'),
(8,10002, 40008, '2018-07-22'),
(9,10002, 40009, '2018-07-22'),
(10,10002, 40010, '2018-07-22'),
(11,10002, 40011, '2018-07-22'),
(12,10002, 40012, '2018-07-22'),
(13,10002, 40013, '2018-07-22'),
(14,10002, 40014, '2018-07-22'),
(15,10002, 40015, '2018-07-22'),
(16,10002, 40016, '2018-07-22'),
(17,10002, 40017, '2018-07-22'),
(18,10002, 40018, '2018-07-22'),
(19,10002, 40019, '2018-07-22'),
(20,10002, 40020, '2018-07-22'),
(21,10003, 40101, '2016-07-22'), -- Chem E Junior
(22,10003, 40102, '2016-07-22'),
(23,10003, 40103, '2016-07-22'),
(24,10003, 40104, '2016-07-22'),
(25,10003, 40105, '2016-07-22'),
(26,10003, 40106, '2016-07-22'),
(27,10003, 40107, '2016-07-22'),
(28,10003, 40108, '2016-07-22'),
(29,10003, 40109, '2016-07-22'),
(30,10003, 40110, '2016-07-22'),
(31,10003, 40111, '2016-07-22'),
(32,10003, 40112, '2016-07-22'),
(33,10003, 40113, '2016-07-22'),
(34,10003, 40114, '2016-07-22'),
(35,10003, 40115, '2016-07-22'),
(36,10003, 40116, '2016-07-22'),
(37,10003, 40117, '2016-07-22'),
(38,10003, 40118, '2016-07-22'),
(39,10003, 40119, '2016-07-22'),
(40,10003, 40120, '2016-07-22'),
(41,10006, 40201, '2018-07-22'), -- Elect E Fresh
(42,10006, 40202, '2018-07-22'),
(43,10006, 40203, '2018-07-22'),
(44,10006, 40204, '2018-07-22'),
(45,10006, 40205, '2018-07-22'),
(46,10006, 40206, '2018-07-22'),
(47,10006, 40207, '2018-07-22'),
(48,10006, 40208, '2018-07-22'),
(49,10006, 40209, '2018-07-22'),
(50,10006, 40210, '2018-07-22'),
(51,10006, 40211, '2018-07-22'),
(52,10006, 40212, '2018-07-22'),
(53,10006, 40213, '2018-07-22'),
(54,10006, 40214, '2018-07-22'),
(55,10006, 40215, '2018-07-22'),
(56,10006, 40216, '2018-07-22'),
(57,10006, 40217, '2018-07-22'),
(58,10006, 40218, '2018-07-22'),
(59,10006, 40219, '2018-07-22'),
(60,10006, 40220, '2018-07-22'),
(61,10007, 40301, '2016-07-22'), -- Elect E Jun
(62,10007, 40302, '2016-07-22'),
(63,10007, 40303, '2016-07-22'),
(64,10007, 40304, '2016-07-22'),
(65,10007, 40305, '2016-07-22'),
(66,10007, 40306, '2016-07-22'),
(67,10007, 40307, '2016-07-22'),
(68,10007, 40308, '2016-07-22'),
(69,10007, 40309, '2016-07-22'),
(70,10007, 40310, '2016-07-22'),
(71,10007, 40311, '2016-07-22'),
(72,10007, 40312, '2016-07-22'),
(73,10007, 40313, '2016-07-22'),
(74,10007, 40314, '2016-07-22'),
(75,10007, 40315, '2016-07-22'),
(76,10007, 40316, '2016-07-22'),
(77,10007, 40317, '2016-07-22'),
(78,10007, 40318, '2016-07-22'),
(79,10007, 40319, '2016-07-22'),
(80,10007, 40320, '2016-07-22'),
(81,10005, 40401, '2018-07-22'), -- Elect E Grad 1st
(82,10005, 40402, '2018-07-22'),
(83,10005, 40403, '2018-07-22'),
(84,10005, 40404, '2018-07-22'),
(85,10005, 40405, '2018-07-22'),
(86,10005, 40406, '2018-07-22'),
(87,10005, 40407, '2018-07-22'),
(88,10005, 40408, '2018-07-22'),
(89,10005, 40409, '2018-07-22'),
(90,10005, 40410, '2018-07-22'),
(91,10005, 40411, '2017-07-22'), -- Elect E Grad 2nd
(92,10005, 40412, '2017-07-22'),
(93,10005, 40413, '2017-07-22'),
(94,10005, 40414, '2017-07-22'),
(95,10005, 40415, '2017-07-22'),
(96,10005, 40416, '2017-07-22'),
(97,10005, 40417, '2017-07-22'),
(98,10005, 40418, '2017-07-22'),
(99,10005, 40419, '2017-07-22'),
(100,10005, 40420, '2017-07-22');

INSERT INTO `admin` (`user_id`) VALUES
(20001),
(20002),
(20003),
(20004);

INSERT INTO `researcher` (`user_id`) VALUES
(30001),
(30002);

INSERT INTO `department_chair` (`faculty_id`) VALUES
(10001),
(10005),
(10009),
(10011);

INSERT INTO `time` (`id`, `start`, `end`) VALUES
(1, '08:00:00', '09:00:00'), -- 8 - 9
(2, '09:00:00', '10:00:00'), -- 9 - 10
(3, '10:00:00', '11:00:00'), -- 10 - 11
(4, '11:00:00', '12:00:00'), -- 11 - 12
(5, '12:00:00', '13:00:00'), -- 12 - 1
(6, '13:00:00', '14:00:00'), -- 1 - 2
(7, '14:00:00', '15:00:00'), -- 2 - 3
(8, '15:00:00', '16:00:00'); -- 3 - 4

INSERT INTO `term` (`id`, `season`, `year`) VALUES
(1, 'SP', 2016),
(2, 'F', 2016),
(3, 'SP', 2017),
(4, 'F', 2017),
(5, 'SP', 2017),
(6, 'F', 2018),
(7, 'SP', 2019),
(8, 'F', 2019);

INSERT INTO `day` (`id`, `name`) VALUES
(1,'MO'),
(2,'TU'),
(3,'WE'),
(4,'TH'),
(5,'F');


INSERT INTO `course` (`id`, `department_id`, `number`, `name`, `description`, `numberOfCredits`, `isGraduateCourse`, `isActive`) VALUES
-- Basic Chemistry
('CE110','CE',110,'General Chemistry',"General Chemistry Description",3,0,1),
('CE111','CE',111,'General Chemistry Laboratory',"General Chemistry Laboratory Description",1.5,0,1),
('CE160','CE',160,'Physical Principles of Chemistry',"Physical Principles of Chemistry Description",3,0,1),
('CE241','CE',241,'Organic Chemistry I',"Organic Chemistry I Description",3,0,1),
('CE242','CE',242,'Organic Chemistry II',"Organic Chemistry II Description",3,0,1),
('CE243','CE',243,'Organic Chemistry Laboratory',"Organic Chemistry Laboratory Description",2,0,1),
('CE350','CE',350,'Instrumental Analysis Laboratory',"Instrumental Analysis Laboratory Description",2,0,1),
('CE321','CE',321,'Physical Chemistry I',"Physical Chemistry I Description",3,0,1),
('CE322','CE',322,'Physical Chemistry II',"Physical Chemistry II Description",2,0,1),
-- Chemical Engineering
('CE221','CE',221,'Material and Energy Balances',"Material and Energy Balances Description",3,0,1),
('CE211','CE',211,'Material Science for Chemical Engineers',"Material Science for Chemical Engineers Description",3,0,1),
('CE232','CE',232,'Chemical Engineering Thermodynamics I',"Chemical Engineering Thermodynamics I Description",3,0,1),
('CE331','CE',331,'Chemical Engineering Thermodynamics II',"Chemical Engineering Thermodynamics II Description",3,0,1),
('CE341','CE',341,'Fluid Mechanics and Flow Systems',"Fluid Mechanics and Flow Systems Description",3,0,1),
('CE332','CE',332,'Chemical Reaction Engineering',"Chemical Reaction Engineering Description",3,0,1),
('CE342','CE',342,'Heat and Mass Transfer',"Heat and Mass Transfer Description", 3,0,1),
('CE352','CE',352,'Process Simulation and Mathematical Techniques for Chemical Engineers',"Process Simulation and Mathematical Techniques for Chemical Engineers Description",3,0,1),
('CE371','CE',371,'Chemical Engineering Laboratory I',"Chemical Engineering Laboratory I Description",2,0,1),
('CE381','CE',381,'Process Evaluation and Chemical Systems Design I',"Process Evaluation and Chemical Systems Design I Description",3,0,1),
('CE351','CE',351,'Separation Process Principles',"Separation Process Principles Description", 3,0,1),
('CE361','CE',361,'Chemical Process Dynamics and Control',"Chemical Process Dynamics and Control Description", 3,0,1),
('CE372','CE',372,'Chemical Engineering Laboratory II',"Chemical Engineering Laboratory II Description", 2,0,1),
('CE382','CE',382,'Process Evaluation and Chemical Systems Design II',"Process Evaluation and Chemical Systems Design II",3,0,1),
-- Mathematics
('MA110','MA',110,'Introduction to Linear Algebra',"Introduction to Linear Algebra Description", 2,0,1),
('MA111','MA',111,'Calculus I', "Calculus I Description",4,0,1),
('MA113','MA',113,'Calculus II',"Calculus II Description",4,0,1),
('MA223','MA',223,'Vector Calculus', "Vector Calculus Description",2,0,1),
('MA240','MA',240,'Ordinary and Partial Differential Equations',"Ordinary and Partial Differential Equations Descriptions",3,0,1),
('MA224','MA',224,'Probability',"Probability Description",3,0,1),
('MA302','MA',302,'Statistics',"Need. It. Stat.",3,0,1),
('MA303','MA',303,'Discrete Mathematics',"Shhhhh",3,0,1),
('MA304','MA',304,'Linear Algebra',"Matrices",3,0,1),
('MA305','MA',305,'Calculus III',"Calculus III Description",3,0,1),
-- Humanities
('HU101','HU',101,'Literary Forms and Expressions',"Literary Forms and Expressions Description",3,0,1),
('HU102','HU',102,'Texts and Contexts: Old and New Worlds',"Text from ancient and modern literature", 3,0,1),
('HU103','HU',103,'The Making of Modern Society',"The Making of Modern Society Description",3,0,1),
('HU104','HU',104,'The Modern Context: Figures and Topics',"Famous people's influence -- Description",3,0,1),
-- Electrical Engineering
('EE101','EE',101,'Engineering Design and Problem Solving',"Engineering Design and Problem Solving Description",3,0,1),
('EE102','EE',102,'Engineering Design Graphics',"Engineering Design Graphics Description",1,0,1),
('EE150','EE',150,'Digital Logic Design',"Digital Logic Design Description",3,0,1),
('EE160','EE',160,'Programming for Electrical Engineers',"Programming for Electrical Engineers Description",3,0,1),
('EE240','EE',240,'Circuit Analysis',"Circuit Analysis Description",3,0,1),
('EE211','EE',211,'Signal Processing & Systems Analysis',"Signal Processing & Systems Analysis Descprition",3,0,1),
('EE241','EE',244,'Electronics I',"Robotic Legos!!!!!",4,0,1),
('EE251','EE',251,'Computer Architecture',"Gateways to Heaven",3,0,1),
('EE264','EE',264,'Data Structures & Algorithms I',"Description", 3,0,1),
('EE300','EE',300,'Communication Theory',"01101000 01110100 01110100 01110000 01110011 00111010 00101111 00101111 01111001 01101111 01110101 01110100 01110101 00101110 01100010 01100101 00101111 01100100 01010001 01110111 00110100 01110111 00111001 01010111 01100111 01011000 01100011 01010001",3,0,1),
('EE310','EE',310,'C++',"I dont want a C++, I want a C--",3,0,1),
('EE342','EE',342,'Electronics II',"Bionicles are upgrades from Legos",4,0,1),
('EE357','EE',357,'Operating Systems',"prehistory linux",3,0,1),
('EE365','EE',365,'Data Structures & Algorithms II',"What my school needs to add to our curriculum",3,0,1),
('EE303','EE',303,'Technical Communications','Basically an English Class',3,0,1),
('EE360','EE',360,'Software Engineering',"Hai would not be impressed",3,0,1),
('EE394','EE',394,'Android Development',"Windows Phones are better",3,0,1),
('EE395','EE',395,'Data Mining',"Facebook is amazing!",3,0,1),
('EE396','EE',396,'AI',"Make a chess AI that can beat the professor. Pass - Fail",3,0,1),
('EE399','EE',399,'Senior Project',"Create your own ideas",4,0,1),
-- Physics
('PH101','PH',101,'Physics I',"Somehow this class bends time",4,0,1),
('PH102','PH',102,'Physics II',"The Star Wars sequel we never wanted",4,0,1),
('PH103','PH',103,'Physics III',"Modern Physics. How does light bend around dense masses?",4,0,1);

-- To create more sections, add 1 to the first number in id, and change the term id to + 2, every other/ fall and spring are different
-- ^ Please insert fall 2018, spring 2019 and fall 2019
-- Fall 2016
INSERT INTO `course_section` (`id`,`course_id`,`number`,`faculty_id`,`numOfSeats`,`numOfTaken`,`term_id`,`room_id`) VALUES
(20001,'CE110',1,10004,30,20,2,'ET16'), 
(20002,'CE110',2,10004,30,20,2,'ET16'),
(20003,'CE241',1,10004,30,20,2,'ET17'),
(20004,'CE350',1,10004,20,20,2,'ET17'),
(20005,'CE321',1,10003,30,20,2,'ET18'),
(20006,'CE221',1,10003,30,20,2,'ET18'),
(20007,'CE211',1,10003,30,20,2,'ET19'),
(20008,'CE331',1,10003,30,20,2,'ET19'),
(20009,'CE341',1,10002,30,20,2,'ET20'),
(20010,'CE371',1,10002,20,20,2,'ET20'),
(20011,'CE381',1,10002,30,20,2,'ET21'),
(20012,'CE351',1,10001,30,20,2,'ET21'),
(20013,'CE361',1,10001,30,20,2,'ET22'),
(20014,'MA110',1,10010,30,20,2,'ET22'),
(20015,'MA110',2,10010,30,20,2,'ET23'),
(20016,'MA111',1,10010,30,20,2,'ET23'),
(20017,'MA111',2,10010,30,20,2,'ET24'),
(20018,'MA223',1,10009,30,20,2,'ET24'),
(20019,'MA224',1,10009,30,20,2,'ET25'),
(20020,'MA303',1,10009,30,20,2,'ET25'),
(20021,'HU101',1,10014,30,20,2,'ET26'),
(20022,'HU101',2,10014,30,20,2,'ET26'),
(20023,'HU103',1,10013,30,20,2,'ET27'),
(20024,'HU103',2,10013,30,20,2,'ET27'),
(20025,'PH102',1,10012,30,30,2,'ET28'),
(20026,'PH102',1,10012,30,30,2,'ET28'),
(20027,'EE240',1,10008,30,20,2,'ET29'),
(20028,'EE240',2,10008,30,20,2,'ET30'),
(20029,'EE300',1,10007,30,20,2,'ET30'),
(20030,'EE300',2,10007,30,20,2,'ET31'),
(20031,'EE310',1,10008,30,20,2,'ET31'),
(20032,'EE310',2,10008,30,20,2,'ET32'),
(20033,'EE342',1,10007,30,20,2,'ET32'),
(20034,'EE342',2,10007,30,20,2,'ET33'),
(20035,'EE357',1,10006,30,20,2,'ET33'),
(20036,'EE357',2,10006,30,20,2,'ET34'),
(20037,'EE365',1,10006,30,20,2,'ET34'),
(20038,'EE365',2,10006,30,20,2,'ET35'),
(20039,'EE395',1,10005,30,30,2,'ET35'),
(20040,'EE396',1,10005,30,30,2,'ET36'),
(20041,'EE396',1,10005,30,30,2,'ET36'),
(20042,'EE101',1,10008,30,30,2,'ET36'),
(20043,'EE101',1,10008,30,30,2,'ET36'),
(20044,'EE102',1,10007,30,30,2,'ET35'),
(20045,'EE102',1,10007,30,30,2,'ET35');

-- Spring 2017
INSERT INTO `course_section` (`id`,`course_id`,`number`,`faculty_id`,`numOfSeats`,`numOfTaken`,`term_id`,`room_id`) VALUES
(21001,'CE111',1,10004,20,20,3,'ET16'),
(21002,'CE111',1,10004,20,20,3,'ET16'),
(21003,'CE160',1,10004,30,20,3,'ET17'),
(21004,'CE160',2,10004,30,20,3,'ET17'),
(21005,'CE242',1,10003,30,20,3,'ET18'),
(21006,'CE243',1,10003,30,20,3,'ET18'),
(21007,'CE322',1,10003,30,20,3,'ET19'),
(21008,'CE232',1,10003,30,20,3,'ET19'),
(21009,'CE332',1,10002,30,20,3,'ET20'),
(21010,'CE342',1,10002,30,20,3,'ET20'),
(21011,'CE352',1,10002,30,20,3,'ET21'),
(21012,'CE372',1,10001,20,20,3,'ET21'),
(21013,'CE382',1,10001,30,20,3,'ET22'),
(21014,'MA113',1,10010,30,20,3,'ET22'),
(21015,'MA113',2,10010,30,20,3,'ET23'),
(21016,'MA302',1,10010,30,20,3,'ET23'),
(21017,'MA304',1,10009,30,20,3,'ET24'),
(21018,'MA305',1,10009,30,20,3,'ET24'),
(21019,'HU102',1,10014,30,20,3,'ET25'),
(21020,'HU102',2,10014,30,20,3,'ET25'),
(21021,'HU104',1,10013,30,20,3,'ET26'),
(21022,'HU104',2,10013,30,20,3,'ET26'),
(21023,'PH101',1,10012,30,30,3,'ET27'),
(21024,'PH101',2,10012,20,20,3,'ET27'),
(21025,'PH101',3,10012,30,30,3,'ET28'),
(21026,'PH103',1,10011,30,30,3,'ET28'),
(21028,'PH103',1,10011,30,30,3,'ET29'),
(21029,'EE150',1,10008,30,20,3,'ET29'),
(21030,'EE150',2,10008,30,20,3,'ET30'),
(21031,'EE160',1,10008,30,20,3,'ET30'),
(21032,'EE160',2,10008,30,20,3,'ET31'),
(21033,'EE211',1,10007,30,20,3,'ET31'),
(21034,'EE211',2,10007,30,20,3,'ET32'),
(21035,'EE241',1,10007,30,20,3,'ET32'),
(21036,'EE241',1,10007,30,20,3,'ET33'),
(21037,'EE251',1,10006,30,30,3,'ET33'),
(21038,'EE264',1,10006,30,30,3,'ET34'),
(21039,'EE303',1,10006,30,30,3,'ET34'),
(21040,'EE360',1,10005,30,30,3,'ET35'),
(21041,'EE394',1,10005,30,30,3,'ET35');

INSERT INTO `prerequisite` (`id`,`requiredGrade`,`course_id`,`prereq_id`) VALUES
(1,'C','EE240','MA113'),
(2,'C','EE241','EE240'),
(3,'C','EE251','EE150'),
(4,'C','EE264','EE150'),
(5,'C','EE300','MA224'),
(6,'C','EE310','MA240'),
(7,'C','EE342','EE241'),
(8,'C','EE357','EE264'),
(9,'C','EE365','EE264'),
(10,'C','EE303','EE342'),
(11,'C','EE360','EE264'),
(12,'C','EE394','EE365'),
(13,'C','EE395','EE365'),
(14,'C','EE396','EE365'),
(15,'C','EE399','EE360');

INSERT INTO `minor` (`id`,`name`,`department_id`) VALUES 
(1,'Mathematics','MA');

INSERT INTO `major` (`id`,`name`,`department_id`) VALUES 
(1,'Bachelors of Science in Electrical Engineering','EE'),
(2,'Bachelors of Science in Chemical Engineering','CE');

-- Please follow major requirements when inserting to minor requirements
-- INSERT INTO `minor_requirements` (`id`,`minor_id`,`course_id`) VALUES 
-- ();

-- NOTE: Not all courses are in the requirements 
  -- i.e. students need to take 2 '300' or '400' course level
-- NOTE: Some chemical engineering requirements exist in other departments
INSERT INTO `major_requirements` (`id`,`major_id`,`course_id`) VALUES
-- General engineering. All engineers need to take
-- NOTE: Please add this to CE too
(1,1,'EE101'),
(2,1,'EE102'),
-- Actual EE
(3,1,'EE150'),
(4,1,'EE160'),
(5,1,'EE240'),
(6,1,'EE211'),
(7,1,'EE241'),
(8,1,'EE251'),
(9,1,'EE264'),
(10,1,'EE300'),
(11,1,'EE310'),
(12,1,'EE342'),
(13,1,'EE365'),
(14,1,'EE303'),
(15,1,'EE360'),
-- General for all engineers
-- Please add this to CE too
(16,1,'PH101'),
(17,1,'PH102'),
(18,1,'PH103'),
(19,1,'HU101'),
(20,1,'HU102'),
(21,1,'HU103'),
(22,1,'HU104'),
(23,1,'MA110'),
(24,1,'MA111'),
(25,1,'MA113'),
(26,1,'MA223'),
(27,1,'MA224'),
(28,1,'MA302'),
(29,1,'MA303');

INSERT INTO `slot` (`id`,`day_id`,`time_id`) VALUES
-- Monday
(1,1,1),
(2,1,2),
(3,1,3),
(4,1,4),
(5,1,5),
(6,1,6),
(7,1,7),
(8,1,8),
-- Tuesday
(9,2,1),
(10,2,2),
(11,2,3),
(12,2,4),
(13,2,5),
(14,2,6),
(15,2,7),
(16,2,8),
-- Wednesday
(17,3,1),
(18,3,2),
(19,3,3),
(20,3,4),
(21,3,5),
(22,3,6),
(23,3,7),
(24,3,8),
-- Thursday
(25,4,1),
(26,4,2),
(27,4,3),
(28,4,4),
(29,4,5),
(30,4,6),
(31,4,7),
(32,4,8),
-- Friday
(33,5,1),
(34,5,2),
(35,5,3),
(36,5,4),
(37,5,5),
(38,5,6),
(39,5,7),
(40,5,8);

-- id - day - time
  -- time changes first then day ^
  -- if wed at 9 am = 16 + 2 = 18
-- NOTE: Go by credits = hours
  -- if lab then number of slots = Credits * 2
    -- 2 credits = 4 hours = 4 slots
-- Please insert from course number 20036 -> 20045, spring of 2019, and fall of 2019
INSERT INTO `course_section_slot` (`id`,`coursesection_id`,`slot_id`) VALUES
(1,20027,1),
(2,20027,17),
(3,20027,25),
(4,20028,2),
(5,20028,18),
(6,20028,26),
(7,20029,1),
(8,20029,17),
(9,20029,25),
(10,20030,2),
(11,20030,18),
(12,20030,25),
(13,20031,3),
(14,20031,19),
(15,20031,26),
(16,20032,4),
(17,20032,19),
(18,20032,26),
(19,20033,9),
(20,20033,10),
(21,20033,17),
(22,20033,18),
(23,20034,11),
(24,20034,12),
(25,20034,19),
(26,20034,20),
(27,20035,5),
(28,20035,20),
(29,20035,27);



