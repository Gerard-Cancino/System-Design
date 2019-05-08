INSERT INTO `student_major` (`id`,`dateDeclared`,`major_id`,`student_id`) VALUES 
(1,'2016-08-04',1,40201);

INSERT INTO `student_minor` (`id`,`dateDeclared`,`minor_id`,`student_id`) VALUES
(1,'2016-08-04',1,40201);

-- one student
-- should change dump.sql`season` varchar(1) to (2)
INSERT INTO `transcript` (`id`,`gradeReceived`,`year`,`season`,`course_id`,`student_id`) VALUES 
(1,'B','2018','F','MA110','40201'),
(2,'A','2018','F','HU103','40201'),
(3,'B','2018','F','PH102','40201'),
(4,'B','2018','F','EE101','40201'),
(5,'B','2018','F','EE102','40201'),

(6,'B','2019','SP','MA223','40201'),
(7,'B','2019','SP','MA303','40201'),
(8,'A','2019','SP','EE300','40201'),
(9,'A','2019','SP','EE310','40201'),
(10,'A','2019','SP','EE342','40201')
;



-- 2 semesters 
-- One Class 20 students
-- 5 classes for 40001(is not EE majot so i change to 40201)
INSERT INTO `enrollment` (`id`,`dateEnrolled`,`course_section_id`,`student_id`) VALUES
--2018 fall
(1,'2018-05-20',40014,'40201'),
(2,'2018-05-20',40023,'40201'),
(3,'2018-05-20',40025,'40201'),
(4,'2018-05-20',40042,'40201'),
(5,'2018-05-20',40045,'40201'),

(6,'2018-05-20',40014,'40001'),
(7,'2018-05-20',40014,'40202'),
(8,'2018-05-20',40014,'40203'),
(9,'2018-05-20',40014,'40204'),
(10,'2018-05-20',40014,'40205'),
(11,'2018-05-20',40014,'40206'),
(12,'2018-05-20',40014,'40207'),
(13,'2018-05-20',40014,'40208'),
(14,'2018-05-20',40014,'40209'),
(15,'2018-05-20',40014,'40210'),
(16,'2018-05-20',40014,'40211'),
(17,'2018-05-20',40014,'40212'),
(18,'2018-05-20',40014,'40213'),
(19,'2018-05-20',40014,'40214'),
(20,'2018-05-20',40014,'40215'),
(21,'2018-05-20',40014,'40216'),
(22,'2018-05-20',40014,'40217'),
(23,'2018-05-20',40014,'40218'),
(24,'2018-05-20',40014,'40219'),
(25,'2018-05-20',40014,'40220'),
--2019 spring
(26,'2018-12-20',40018,'40001'),
(27,'2018-12-20',40018,'40202'),
(28,'2018-12-20',40018,'40203'),
(29,'2018-12-20',40018,'40204'),
(30,'2018-12-20',40018,'40205'),
(31,'2018-12-20',40018,'40206'),
(32,'2018-12-20',40018,'40207'),
(33,'2018-12-20',40018,'40208'),
(34,'2018-12-20',40018,'40209'),
(35,'2018-12-20',40018,'40210'),
(36,'2018-12-20',40018,'40211'),
(37,'2018-12-20',40018,'40212'),
(38,'2018-12-20',40018,'40213'),
(39,'2018-12-20',40018,'40214'),
(40,'2018-12-20',40018,'40215'),
(41,'2018-12-20',40018,'40216'),
(42,'2018-12-20',40018,'40217'),
(43,'2018-12-20',40018,'40218'),
(44,'2018-12-20',40018,'40219'),
(45,'2018-12-20',40018,'40220'),

(46,'2018-12-20',40018,'40201'),
(47,'2018-12-20',40020,'40201'),
(48,'2018-12-20',40030,'40201'),
(49,'2018-12-20',40031,'40201'),
(50,'2018-12-20',40033,'40201')

;




-- Just the current semester (change in the dump.sql because there is no 'id' at first)
INSERT INTO `attendance` (`id`,`isPresent`, `dayAttended`, `enrollment_id`) VALUES
(1,1,'2019-04-09',1),
(2,1,'2019-04-16',2),
(3,1,'2019-04-23',3),
(4,1,'2019-04-30',4),
(5,1,'2019-05-7',5),

(6,1,'2019-04-23',6),
(7,1,'2019-04-23',7),
(8,1,'2019-04-23',8),
(9,1,'2019-04-23',9),
(10,1,'2019-04-23',10),
(11,1,'2019-04-23',11),
(12,1,'2019-04-23',12),
(13,1,'2019-04-23',13),
(14,1,'2019-04-23',14),
(15,1,'2019-04-23',15),
(16,1,'2019-04-23',16),
(17,1,'2019-04-23',17),
(18,1,'2019-04-23',18),
(19,1,'2019-04-23',19),
(20,1,'2019-04-23',20),
(21,1,'2019-04-23',21),
(22,1,'2019-04-23',22),
(23,1,'2019-04-23',23),
(24,1,'2019-04-23',24),
(25,1,'2019-04-23',25)
;



-- Grade for just the previous semester and the current semester (spring 2019)
-- 5 courses
--should change in the dump.sql beacuse the old one is 'numberGrade'
INSERT INTO `grade` (`id`,`type`,`letterGrade`,`course_section_id`,`student_id`) VALUES
--previous(fall 2018)
(1,'M','B',40014,40201),
(2,'F','B',40014,40201),

(3,'M','A',40042,40201),
(4,'F','B',40042,40201),

(5,'M','B',40045,40201),
(6,'F','B',40045,40201),

(7,'M','C',40025,40201),
(8,'F','A',40025,40201),

(9,'M','B',40023,40201),
(10,'F','B',40023,40201),

--the current semester (spring 2019)
(11,'M','B',40018,40201),
(12,'F','A',40018,40201),

(13,'M','B',40020,40201),
(14,'F','B',40020,40201),

(15,'M','A',40030,40201),
(16,'F','A',40030,40201),

(17,'M','A',40031,40201),
(18,'F','A',40031,40201),

(19,'M','B',40033,40201),
(20,'F','A',40033,40201)
;
