INSERT INTO `student_major` (`id`,`dateDeclared`,`major_id`,`student_id`) VALUES 
(1,'2016-08-04',1,40001);

INSERT INTO `student_minor` (`id`,`dateDeclared`,`minor_id`,`student_id`) VALUES
(1,'2016-08-04',1,40001);

-- Just one student.  Populate transcript for minor and student?
INSERT INTO `transcript` (`id`,`gradeReceived`,`year`,`season`,`course_id`,`student_id`) VALUES 
(1,'B','2016','F','EE101','40001');

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
(1,'M','B',20014,40001);