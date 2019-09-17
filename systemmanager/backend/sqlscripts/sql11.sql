UPDATE term
SET YEAR = 2018
WHERE ID =5;

UPDATE course_section_slot
SET slot_id=40
WHERE id=465;

delete from course_section where id =500013;
SET SQL_SAFE_UPDATES = 0;

UPDATE course_section
SET numOfSeats = 30
where numOfSeats=0;

SET SQL_SAFE_UPDATES = 1;