

-- FALL 2016

INSERT INTO `course_section_slot` (`id`,`coursesection_id`,`slot_id`) VALUES
(1529,20001,12),
(1530,20002,13),
(1531,20003,14),
(1532,20004,15),
(1533,20005,17),
(1534,20006,18),
(1535,20007,19),
(1536,20008,20),
(1537,20009,21),
(1538,20010,22),
(1539,20011,23),
(1540,20012,7),
(1541,20013,8),
(1542,20014,34),
(1543,20015,35),
(1544,20016,36),
(1545,20017,37),
(1546,20018,38),
(1547,20019,39),
(1548,20020,40),
(1549,20021,25),
(1550,20022,26),
(1551,20023,27),
(1552,20024,31),
(1553,20025,29),
(1554,20026,32),
(1555,20012, 15),
(1556,20013,16);
select * from course_section_slot;
select * from room;
UPDATE course_section 
set room_id='ET20'
where id = 20042;

UPDATE course_section_slot
SET slot_id=27
where id = 15;

UPDATE course_section_slot
SET slot_id=28
where id = 18;

UPDATE course_section_slot
SET slot_id=20
where id = 17;

UPDATE course_section_slot
SET slot_id=21
where id = 21;

UPDATE course_section_slot
SET slot_id=22
where id = 22;


-- Spring 2017
-- gets rid of overlaps

delete from course_section_slot where id = 961 or id = 962;

delete from course_section_slot where id = 963 or id = 964;

delete from course_section_slot where id = 965 or id =966;

INSERT INTO `course_section_slot` (`id`,`coursesection_id`,`slot_id`) VALUES
(1497,20080,15),
(1498,20081,16),
(1499,20082,10),
(1500,21001,12),
(1501,21002,13),
(1502,21003,14),
(1503,21004,15),
(1504,21005,17),
(1505,21006,18),
(1506,21007,19),
(1507,21008,20),
(1508,21009,21),
(1509,21010,22),
(1510,21011,23),
(1511,21012,7),
(1512,21013,8),
(1513,21014,34),
(1514,21015,35),
(1515,21016,36),
(1516,21017,37),
(1517,21018,38),
(1518,21019,39),
(1519,21020,40),
(1520,21021,25),
(1521,21022,26),
(1522,21023,27),
(1523,21024,28),
(1524,21025,29),
(1525,21026,30),
(1526,21028,31),
(1527,21012,15),
(1528,21013,16);

UPDATE course_section_slot
SET slot_id=20
where id = 76;

UPDATE course_section_slot
SET slot_id=27
where id = 77;

UPDATE course_section_slot
SET slot_id=22
where id = 85;

UPDATE course_section_slot
SET slot_id=21
where id = 84;

UPDATE course_section_slot
SET slot_id=3
where id = 66;

UPDATE course_section_slot
SET slot_id=19
where id = 67;

UPDATE course_section_slot
SET slot_id=27
where id = 68;

UPDATE course_section_slot
SET slot_id=4
where id = 69;

UPDATE course_section_slot
SET slot_id=20
where id = 70;

UPDATE course_section_slot
SET slot_id=28
where id = 71;


-- fall 2017
-- gets rid of overlaps
delete from course_section_slot where id = 953 or id = 954;

delete from course_section_slot where id = 955 or id = 956;

delete from course_section_slot where id = 957 or id =958;


INSERT INTO `course_section_slot` (`id`,`coursesection_id`,`slot_id`) VALUES
(1557,20076,9),
(1558,20077,16),
(1559,20078,10),
(1560,30001,12),
(1561,30002,13),
(1562,30003,14),
(1563,30004,15),
(1564,30005,17),
(1565,30006,18),
(1566,30007,19),
(1567,30008,20),
(1568,30009,21),
(1569,30010,22),
(1570,30011,23),
(1571,30012,7),
(1572,30013,8),
(1573,30014,34),
(1574,30015,35),
(1575,30016,36),
(1576,30017,33),
(1577,30018,37),
(1578,30019,38),
(1579,30020,39),
(1580,30021,39),
(1581,30022,40),
(1582,30023,25),
(1583,30024,26),
(1584,30025,27),
(1585,30026,28),
(1586,30012,15),
(1587,30013,16);

select * from course_section_slot;
UPDATE course_section 
set room_id='ET20'
where id = 31035;

UPDATE course_section_slot
SET slot_id=27
where id = 116;

UPDATE course_section_slot
SET slot_id=28
where id = 119;
UPDATE course_section_slot
SET slot_id=20
where id = 118;

UPDATE course_section_slot
SET slot_id=26
where id = 113;

-- spring 2018
delete from course_section_slot where id = 973;
delete from course_section_slot where id = 974;
delete from course_section_slot where id = 975 or id = 976;

INSERT INTO `course_section_slot` (`id`,`coursesection_id`,`slot_id`) VALUES
(1588,20087,9),
(1589,20088,16),
(1590,20089,10),
(1591,31001,11),
(1592,31002,12),
(1593,31003,13),
(1594,31004,14),
(1595,31005,17),
(1596,31006,18),
(1597,31007,19),
(1598,31008,20),
(1599,31009,21),
(1600,31010,22),
(1601,31011,23),
(1602,31012,7),
(1603,31013,8),
(1604,31014,34),
(1605,31015,35),
(1606,31016,36),
(1607,31017,37),
(1608,31018,38),
(1609,31019,39),
(1610,31020,40),
(1611,31021,25),
(1612,31022,26),
(1613,31023,27),
(1614,31024,28),
(1615,31025,29),
(1616,31026,30),
(1617,31028,31),
(1618,31012,15),
(1619,31013,16),
(1620,20087,25),
(1621,20088,32);

UPDATE course_section_slot
SET slot_id=3
where id = 167;

UPDATE course_section_slot
SET slot_id=19
where id = 168;

UPDATE course_section_slot
SET slot_id=27
where id = 169;

UPDATE course_section_slot
SET slot_id=4
where id = 170;

UPDATE course_section_slot
SET slot_id=20
where id = 171;

UPDATE course_section_slot
SET slot_id=28
where id = 172;

UPDATE course_section_slot
SET slot_id=22
where id = 174;

UPDATE course_section_slot
SET slot_id=21
where id = 177;

UPDATE course_section_slot
SET slot_id=27
where id = 178;

-- Fall 2018
INSERT INTO `course_section_slot` (`id`,`coursesection_id`,`slot_id`) VALUES

(1622,20082,15),

(1623,20083,16),

(1624,20084,10),

(1625,40001,12),

(1626,40002,13),

(1627,40003,14),

(1628,40004,15),

(1629,40005,17),

(1630,40006,18),

(1631,40007,19),

(1632,40008,20),

(1633,40009,33),

(1634,40010,34),

(1635,40011,35),

(1636,40012,7),

(1637,40013,8),

(1638,40014,34),

(1639,40015,35),

(1640,40016,36),

(1641,40017,37),

(1642,40018,38),

(1643,40019,39),

(1644,40020,40),

(1645,40021,32),

(1646,40022,33),

(1647,40023,34),

(1648,40024,35),

(1649,40025,36),

(1650,40026,37),

(1651,40012,15),

(1652,40013,16);






delete from course_section_slot where id = 967 or id = 968;

delete from course_section_slot where id = 969 or id = 970;

UPDATE course_section_slot
SET slot_id=5
where id = 208;

UPDATE course_section_slot
SET slot_id=13
where id = 209;

UPDATE course_section_slot
SET slot_id=29
where id = 210;

UPDATE course_section_slot
SET slot_id=6
where id = 211;

UPDATE course_section_slot
SET slot_id=14
where id = 212;

UPDATE course_section_slot
SET slot_id=30
where id = 213;

UPDATE course_section_slot
SET slot_id=27
where id = 216;

UPDATE course_section_slot
SET slot_id=20
where id = 218;

UPDATE course_section_slot
SET slot_id=28
where id = 219;

UPDATE course_section 
set room_id='ET31'
where id = 40035;

-- spr 2019 fixxes

UPDATE course_section_slot
SET slot_id=3
where id = 267;

UPDATE course_section_slot
SET slot_id=19
where id = 268;

UPDATE course_section_slot
SET slot_id=27
where id = 269;

UPDATE course_section_slot
SET slot_id=4
where id = 270;

UPDATE course_section_slot
SET slot_id=20
where id = 271;

UPDATE course_section_slot
SET slot_id=28
where id = 272;

UPDATE course_section_slot
SET slot_id=20
where id = 276;

UPDATE course_section_slot
SET slot_id=28
where id = 277;

UPDATE course_section_slot
SET slot_id=24
where id = 291;


INSERT INTO `course_section_slot` (`id`,`coursesection_id`,`slot_id`) VALUES
(1653,41037,23);
