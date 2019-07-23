-- isincatalog business
-- Humanities courses to add to catalog ( major requirements)


INSERT INTO `course` (`id`, `department_id`, `number`, `name`, `description`, `numberOfCredits`, `isGraduateCourse`, `isActive`, `isInCatalog`) VALUES

('HU105','HU',105,'Humanities Intermediate Course','students will learn to be students',4,0,1,1),

('HU206','HU',206,'Humanities Junior Course','students will learn about junior Humanities studies',4,0,1,1),

('HU207','HU',207,'Humanities In Society Course','students will learn to about society',4,0,1,1),

('HU308','HU',308,'Humanities In Courses','students will learn about more Humanities',4,0,1,1),

('HU309','HU',309,'Humanities Expert Course','students will learn to be Humanities experts',4,0,1,1),

('HU410','HU',410,'Humanities Final Course','students will learn to be Humanities majors',4,0,1,1);


-- more math courses
INSERT INTO `course` (`id`, `department_id`, `number`, `name`, `description`, `numberOfCredits`, `isGraduateCourse`, `isActive`, `isInCatalog`) VALUES

('MA105','MA',105,'Vectors','students will be introduced to vectors',4,0,1,1),
('MA206','MA',206,'Vectors 2','students will learn to more of vectors',4,0,1,1),

('MA207','MA',207,'Algebra 4','students will learn to do algebra 4 problems',4,0,1,1),

('MA308','MA',308,'Decimals','students will learn to deal with complex decimals',4,0,1,1),

('MA309','MA',309,'Human Error Probability','Students will learn to calculate human error',4,0,1,1),

('MA410','MA',410,'Foundations of Math','students will learn to Foundations of math',4,0,1,1);


-- HUMANITIES and math Isincatalog inserts
INSERT INTO `major` (`id`,`name`,`type`,`department_id`) VALUES 
(6, 'Humanities', 'BS', 'HU');

INSERT INTO `major_requirement` (`id`,`major_id`,`course_id`) VALUES

(82,6,'HU101'),

(83,6,'HU102'),

(84,6,'HU103'),

(85,6,'HU104'),

(86,6,'HU105'),

(87,6,'HU206'),

(88,6,'HU207'),

(89,6,'HU308'),

(90,6,'HU309'),

(91,6,'HU410'),

(92,3,'MA105'),

(93,3,'MA110'),

(94,3,'MA111'),

(95,3,'MA113'),

(96,3,'MA206'),

(97,3,'MA207'),

(98,3,'MA223'),

(99,3,'MA224'),

(100,3,'MA240'),

(101,3,'MA302'),

(102,3,'MA303'),

(103,3,'MA304'),

(104,3,'MA305'),

(105,3,'MA308'),

(106,3,'MA309'),

(107,3,'MA410');

-- changing tooth grade and trascript for only ge102 to B because theres no class for GE102 in the 4th term
UPDATE transcript
SET gradeReceived = 'B'
 where id = 36;

DELETE FROM transcript where id = 38;


INSERT INTO `grade` (`id`,`type`,`letterGrade`,`course_section_id`,`student_id`) VALUES
-- (SP 2016)
(5000,'M','A',20072,40001),

(5001,'F','A',20072,40001),

(5002,'M','B',20073,40001),

(5003,'F','B',20073,40001),

(5004,'M','A',20074,40001),

(5005,'F','A',20074,40001),

(5006,'M','C',20075,40001),

(5007,'F','B',20075,40001),

-- (F 2017)

(5008,'M','A',20076,40001),

(5009,'F','A',20076,40001),

(5010,'M','B',20077,40001),

(5011,'F','B',20077,40001),

(5012,'M','B',20078,40001),

(5013,'F','C',20078,40001),

-- (SPR 2017)

(5014,'M','A',20079,40001),

(5015,'F','B',20079,40001),

(5016,'M','B',20080,40001),

(5017,'F','A',20080,40001),

(5018,'M','B',20081,40001),

(5019,'F','C',20081,40001),

-- (fall 2018)

(5020,'M','A',20082,40001),

(5021,'F','A',20082,40001),

(5022,'M','B',20083,40001),

(5023,'F','B',20083,40001),

(5024,'M','B',20084,40001),

(5025,'F','A',20084,40001),

(5026,'M','B',20085,40001),

(5027,'F','B',20085,40001),

-- (2018 spring)

(5028,'M','A',20086,40001),

(5029,'F','A',20086,40001),

(5030,'M','A',20087,40001),

(5031,'F','A',20087,40001),

(5032,'M','A',20088,40001),

(5033,'F','B',20088,40001),

(5034,'M','B',20089,40001),

(5035,'F','C',20089,40001);
