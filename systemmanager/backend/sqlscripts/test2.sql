INSERT INTO `student_major` (`id`,`dateDeclared`,`major_id`,`student_id`) VALUES 
(1,'2016-08-04',1,40201);

INSERT INTO `student_minor` (`id`,`dateDeclared`,`minor_id`,`student_id`) VALUES
(1,'2016-08-04',1,40201);

-- Just one student.  Populate transcript for minor and student?
INSERT INTO `transcript` (`id`,`gradeReceived`,`year`,`season`,`course_id`,`student_id`) VALUES 
(1,'B','2016','F','EE101','40201');

-- Maybe 2 semesters?  if you want maybe a little more
-- One Class 20 students
-- 4-5 classes for 40001
INSERT INTO `enrollment` (`id`,`dateEnrolled`,`course_section_id`,`student_id`) VALUES
(1,'2018-12-20',20001,'40001');

-- Just the current semester
INSERT INTO `attendance` (`id`,`isPresent`, `dayAttended`, `enrollment_id`) VALUES
(1,1,'2019-04-23',1);

-- Grade for just the previous semester and the current semester (spring 2019)
-- 5 courses?
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
