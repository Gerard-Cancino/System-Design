-- course section updates for cancinog to teach EE courses

-- 5 = spr 2018

UPDATE `course_section` 
SET faculty_id = 10001 
WHERE course_id = 'EE150' AND term_id=5;
UPDATE `course_section` 
SET faculty_id = 10001
 WHERE course_id = 'EE160' AND term_id=5;

-- 6 = fall 2018

UPDATE `course_section` 
SET faculty_id = 10001
 WHERE course_id = 'EE240' AND term_id=6;

UPDATE `course_section` 
SET faculty_id = 10001 
WHERE course_id = 'EE300' AND term_id=6;
UPDATE `course_section` 
SET faculty_id = 10001 
WHERE course_id = 'EE310' AND term_id=6;


UPDATE `course_section` 
SET faculty_id = 10001 
WHERE course_id = 'EE264' AND term_id=7;

UPDATE `course_section` 
SET faculty_id = 10001
 WHERE course_id = 'EE251' AND term_id=7;
UPDATE `course_section` 
SET faculty_id = 10001
 WHERE course_id = 'EE241' AND term_id=7;

UPDATE `course_section` 
SET faculty_id = 10001 
WHERE course_id = 'EE310' AND term_id=8;

UPDATE `course_section` 
SET faculty_id = 10001 
WHERE course_id = 'EE365' AND term_id=8;
UPDATE `course_section` 
SET faculty_id = 10001
 WHERE course_id = 'EE360' AND term_id=8;


INSERT INTO `course_section_slot` (`id`,`coursesection_id`,`slot_id`) VALUES
(9410,41038,15), 
(9420,41038,23),
(9430,41037,14),
(9440,41037,22),
(9450,41036,13),
(9460,41036,21);  


INSERT INTO `enrollment` (`id`,`dateEnrolled`,`course_section_id`,`student_id`) VALUES
(330,'2018-11-21',41037,'40002'),
(331,'2018-11-20',41037,'40003'),
(332,'2018-11-20',41037,'40004'),
(333,'2018-11-20',41037,'40005'),
(334,'2018-11-20',41037,'40006'),
(335,'2018-11-20',41037,'40007'),
(336,'2018-11-20',41037,'40008'),
(337,'2018-11-20',41037,'40009'),
(338,'2018-11-20',41037,'40010'),
(339,'2018-11-20',41037,'40011');

INSERT INTO `enrollment` (`id`,`dateEnrolled`,`course_section_id`,`student_id`) VALUES
(340,'2018-11-21',41038,'40002'),
(341,'2018-11-20',41038,'40003'),
(342,'2018-11-20',41038,'40004'),
(343,'2018-11-20',41038,'40005'),
(344,'2018-11-20',41038,'40006'),
(345,'2018-11-20',41038,'40007'),
(346,'2018-11-20',41038,'40008'),
(347,'2018-11-20',41038,'40009'),
(348,'2018-11-20',41038,'40010'),
(349,'2018-11-20',41038,'40011');

-- toothg attendance for EE264
INSERT INTO `attendance` (`id`,`isPresent`,`dayAttended`,`enrollment_id`) VALUES
(9080,1,'2019-01-08', 320),
(9081,1,'2019-01-15', 320),
(9082,1,'2019-01-22', 320),
(9083,1,'2019-01-29', 320),
(9084,1,'2019-02-05', 320),
(9085,1,'2019-02-12', 320),
(9086,1,'2019-02-19', 320),
(9087,1,'2019-02-26', 320),
(9088,1,'2019-03-05', 320),
(9089,1,'2019-03-12', 320),
(9090,1,'2019-03-19', 320),
(9091,1,'2019-03-26', 320),
(9092,1,'2019-04-02', 320),
(9093,1,'2019-04-09', 320),
(9094,1,'2019-04-16', 320),
(9095,1,'2019-04-23', 320),
(9096,1,'2019-04-30', 320),
(9097,1,'2019-05-07', 320),
(9098,1,'2019-05-14', 320),
(9099,1,'2019-05-21', 320);