INSERT INTO `transcript` (`id`,`gradeReceived`,`year`,`season`,`course_id`,`student_id`) VALUES 
(1,'B','2016','F','CE110','40001');

INSERT INTO `enrollment` (`id`,`dateEnrolled`,`course_section_id`,`student_id`) VALUES
(1,'2018-12-20',20001,'40001');

INSERT INTO `attendance` (`id`,`isPresent`, `dayAttended`, `enrollment_id`) VALUES
(1,1,'2019-04-23',1);