USE system;

--
INSERT INTO `user`
(`id`, `password`, `type`, `email`, `firstName`, `lastName`, `address`, `city`, `state`, `country`, `zipCode`, `phoneNumber`, `isLockout`) VALUES
(10000, '1234', 'S', 'lopezG', 'George', 'Lopez', '223 Grand Ave', 'Garden City', 'NY', 'USA', '11530', '5165601525', 0),
(10002, '5678', 'F', 'cancinog', 'Gerard', 'Cancino', '100 Main St', 'Lynbrrok', 'NY', 'USA', '11563', '5167900666', 0),
(10003, '9101', 'A', 'dabrowd', 'Daniel', 'Dabrowski', '50 Hill Ave', 'Forest Hill', 'NY', 'USA', '11568', '7184502569', 0),
(10004, '1213', 'R', 'caih', 'Haojun', 'Cai', '45 Mill Rd', 'Valley', 'NY', 'USA', '11570', '5164506000', 0);

INSERT INTO `building` (`code`, `name`) VALUES
('CC', 'Campus Center'), -- Business, English, Offices
('ESTT', 'Engineering & Science Technology Tower'), -- Engineering, Mathematics, Science
('LCAH', 'Literature & The Creative Arts Hall'), -- Art, English, History, Music, 

INSERT INTO `room` (`id`, `building_id`, `number`, `type`, `capacity`) VALUES
('CC1','CC',101,'C',20),
('CC2','CC',102,'C',20),
('CC3','CC',103,'C',20),
('CC4','CC',104,'C',20),
('CC5','CC',105,'C',20),
('CC6','CC',106,'C',20),
('CC7','CC',107,'C',20),
('CC8','CC',108,'C',20),
('CC9','CC',109,'C',20),
('CC10','CC',110,'C',20),
('CC11','CC',111,'O',10), -- Finance
('CC12','CC',112,'O',10), -- Security
('CC13','CC',113,'O',10), -- Administration
('CC14','CC',114,'O',10), -- Tech Support
('CC15','CC',115,'O',10), -- Student Help Desk


INSERT INTO `department` (`code`, `name`) VALUES
('ANT', 'Anthropology'),
('CSC', 'Computer Science'),
('ENG', 'English'),
('CHM', 'Chemistry'),
('CIS', 'Computer Science'),
('MAT', 'Mathematics'),
('PSY', 'Psychology'),
('VAR', 'Visual Arts'),
('PHI', 'Philosophy'),
('EDU', 'Education'),
('BIO', 'Biology'),
('GEO', 'Geology'),
('BUS', 'Business'),
('SOC', 'Sociology'),
('PHE', 'Public Health'),
('MLA', 'Modern Languages'),
('SCI', 'Science'),
('HIS', 'History'),
('PHY', 'Physics'),
('MUS', 'Music'),
('MED', 'Medicine'),
('LIN', 'Linguistics'),
('THR', 'Theater'),
('MEC', 'Mechanical'),
('JRN', 'Journalism');


INSERT INTO `faculty` (`user_id`, `isFullTime`, `department_id`, `room_id`) VALUES
(10002, 1, 'GEO', 'ARTS1'),
(10011, 1, 'PHE', 'ARTS1'),
(10012, 1, 'ENG', 'ARTS1'),
(10013, 1, 'CHM', 'ARTS1'),
(10014, 1, 'MAT', 'ARTS1'),
(10015, 1, 'PSY', 'ARTS1'),
(10016, 1, 'VAR', 'ARTS1'),
(10033, 1, 'PHI', 'ARTS1'),
(10034, 1, 'EDU', 'ARTS1'),
(10035, 1, 'BIO', 'ARTS1'),
(10036, 1, 'BUS', 'ARTS1'),
(10038, 1, 'MLA', 'ARTS1'),
(10039, 1, 'SCI', 'ARTS1'),
(10040, 1, 'HIS', 'ARTS1'),
(10041, 1, 'PHY', 'ARTS1'),
(10042, 1, 'ENG', 'ARTS1'),
(10043, 1, 'CHM', 'ARTS1'),
(10044, 1, 'CSC', 'ARTS1'),
(10045, 1, 'MAT', 'ARTS1'),
(10046, 1, 'PSY', 'ARTS1'),
(10047, 1, 'VAR', 'ARTS1'),
(10048, 1, 'PHY', 'ARTS1'),
(10049, 1, 'EDU', 'ARTS1'),
(10050, 1, 'BIO', 'ARTS1'),
(10051, 1, 'GEO', 'ARTS1'),
(10052, 1, 'PHE', 'ARTS1'),
(10053, 1, 'MLA', 'ARTS1'),
(10054, 1, 'SCI', 'ARTS1'),
(10055, 1, 'HIS', 'ARTS1'),
(10056, 1, 'PHY', 'ARTS1'),
(10057, 1, 'CSC', 'ARTS1'),
(10058, 1, 'MAT', 'ARTS1'),
(10059, 1, 'SOC', 'ARTS1'),
(10092,1, 'CSC', 'ARTS1'),
(10093,1, 'CSC', 'ARTS1'),
(10094,1, 'CSC', 'ARTS1'),
(10095,1, 'CSC', 'ARTS1'),
(10096,1, 'CSC', 'ARTS1'),
(10097,1, 'CSC', 'ARTS1'),
(10098,1, 'CSC', 'ARTS1'),
(10099,1, 'BUS', 'ARTS1'),
(10100,1, 'BUS', 'ARTS1'),
(10101,1, 'BUS', 'ARTS1'),
(10102,1, 'BUS', 'ARTS1'),
(10103, 1, 'EDU', 'ARTS1'),
(10104, 1, 'EDU', 'ARTS1'),
(10105, 1, 'EDU', 'ARTS1'),
(10106, 1, 'EDU', 'ARTS1'),
(10107, 1, 'MLA', 'ARTS1'),
(10108, 1, 'MLA', 'ARTS1'),
(10109, 1, 'MLA', 'ARTS1'),
(10110, 1, 'MLA', 'ARTS1'),
(10111, 1, 'VAR', 'ARTS1'),
(10112, 1, 'ENG', 'ARTS1'),
(10113, 1, 'ANT', 'ARTS1'),
(10114, 1, 'HIS', 'ARTS1'),
(10115, 1, 'CHM', 'ARTS1'),
(10116, 1, 'CHM', 'ARTS1'),
(10117, 1, 'PHE', 'ARTS1'),
(10118, 1, 'PHE', 'ARTS1'),
(10119, 1, 'SOC', 'ARTS1'),
(10120, 1, 'SOC', 'ARTS1'),
(10121,1, 'MAT', 'ARTS1'),
(10122,1, 'MAT','ARTS1'),
(10123,1, 'MAT','ARTS1'),
(10124,1, 'MAT','ARTS1'),
(10125,1, 'MAT','ARTS1'),
(10126,1, 'MAT','ARTS1'),
(10127,1, 'MAT','ARTS1'),
(10128,1, 'CSC','ARTS1');

INSERT INTO `full_time_faculty` (`faculty_id`) VALUES
(10002),
(10012),
(10013),
(10014),
(10015),
(10016),
(10033);

INSERT INTO `part_time_faculty` (`faculty_id`) VALUES
(10034);

INSERT INTO `admin`(`user_id`) VALUES
(10003),
(10007),
(10017),
(10018),
(10019),
(10020),
(10027),
(10028),
(10029),
(10030),
(10037);

INSERT INTO `researcher` (`user_id`) VALUES
(10004),
(10021),
(10022),
(10023),
(10024),
(10025),
(10026);

INSERT INTO `department_chair` (`faculty_id`) VALUES
(10002),
(10012),
(10013),
(10014),
(10015),
(10016),
(10033),
(10034);

INSERT INTO `major` (`id`,`name`,`department_id`, `type`) VALUES
(1, 'English', 'ENG', 'BA'),
(2, 'Biology', 'BIO', 'BS'),
(3, 'Education', 'EDU', 'BA'),
(4, 'Computer Science', 'CSC', 'BS');

INSERT INTO `minor` (`id`,`name`,`department_id`) VALUES
(1, 'English', 'ENG'),
(2, 'Biology', 'BIO'), 
(3, 'Education', 'EDU'),
(4, 'Computer Science', 'CSC');

INSERT INTO `term` (`id`, `season`, `year`) VALUES
(1, 'F', 2016),
(2, 'SP', 2017),
(3, 'F', 2017),
(4, 'SP', 2018),
(5, 'F', 2018),
(6, 'SP', 2019),
(7, 'F', 2019),
(8, 'SP', 2020);

-- INSERT INTO `Student_Major` (`student_id`, `major_id`, `dateDeclared`) VALUES
-- (10005, 2, '2019-10-02'),
-- (10006, 3, '2018-09-03'),
-- (10008, 4, '2018-11-05');
-- 
-- INSERT INTO `Student_Minor` (`student_id`, `minor_id`, `dateDeclared`) VALUES
-- (10005, 3, '2019-10-02'),
-- (10006, 2, '2018-09-03'),
-- (10008, 1, '2018-11-05');

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

-- INSERT INTO `Student_Hold` (`id`,`student_id`, `hold_id`) VALUES
-- (1,10006, 'FA05');

-- INSERT INTO `Major_Requirement` (`major_id`, `course_id`, `grade_required`) VALUES
-- (2, 102, 'C');
-- 
-- INSERT INTO `Minor_Requirement` (`minor_id`, `course_id`, `grade_required`) VALUES
-- (2, 102, 'C');



