INSERT INTO `student_hold` (`id`,`student_id`, `hold_id`) VALUES
(1,10000, 'BB01'),
(2,10006, 'FA05'),
(3,10072, 'AD10'),
(4,10074, 'AD56'),
(5,10075, 'FA08'),
(6,10079, 'RG01'),
(7,10081, 'AD89');

INSERT INTO `prerequisite` (`id`,`course_id`, `prereq_id`, `requiredGrade`) VALUES
(1,10001, 10000, 'C'),
(2,10003, 10002, 'C'),
(3,135, 134, 'C'),
(4,10058, 791, 'C'),
(5,10058, 10057, 'C');

INSERT INTO `enrollment` (`id`,`student_id`, `course_section_id`, `dateEnrolled`) VALUES
(1, 10084, 50001, '2019-01-22'),
(2, 10084, 50007, '2019-01-22'),
(3, 10084, 50021, '2019-01-22'),
(4, 10084, 50029, '2019-01-22'),
(5, 10008, 50001, '2019-01-22'),
(6, 10008, 50007, '2019-01-22'),
(7, 10003, 50021, '2019-01-22');

INSERT INTO `student_major` (`student_id`, `major_id`, `dateDeclared`) VALUES
(10000, 'Business Administration', '2018-09-03'),
(10005, 'Biology Bilogical Science', '2017-10-02'),
(10006, 'Early Chilghood Teacher', '2018-09-03'),
(10008, 'Computer Programming', '2018-11-05'),
(10009, 'Undecided', '2019-01-22'),
(10010, 'Undecided', '2019-01-22'),
(10031, 'Undecided', '2019-01-22'),
(10032, 'Undecided', '2019-01-22'),
(10070, 'Undecided', '2019-01-22'),
(10071, 'Undecided', '2019-01-22'),
(10072, 'Undecided', '2019-01-22'),
(10073, 'Undecided', '2019-01-22'),
(10074, 'Undecided', '2019-01-22'),
(10075, 'Undecided', '2019-01-22'),
(10076, 'Undecided', '2019-01-22'),
(10077, 'Undecided', '2019-01-22'),
(10078, 'Undecided', '2019-01-22'),
(10079, 'Undecided', '2019-01-22'),
(10080, 'Undecided', '2019-01-22'),
(10081, 'Undecided', '2019-01-22'),
(10082, 'Undecided', '2019-01-22'),
(10083, 'Undecided', '2019-01-22'),
(10084, 'Undecided', '2019-01-22');

INSERT INTO `major_requirement` (`majorName`, `course_id`, `gradeRequired`) VALUES
('Biochemistry', 179, 'B');
