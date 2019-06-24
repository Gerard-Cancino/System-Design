-- COURSE SECTION

-- TBD FIX
-- 20001-20026

INSERT INTO `course_section_slot` (`id`,`coursesection_id`,`slot_id`) VALUES

(403,20001,13),

(404,20001,29),

(405,20002,12),

(406,20002,28),

(407,20003,11),

(408,20003,27),

(409,20004,10),

(410,20004,26),

(411,20005,14),

(412,20005,30),

(413,20006,13),

(414,20006,29),

(415,20007,12),

(416,20007,28),

(417,20008,11),

(418,20008,27),

(419,20009,14),

(420,20009,30),

(421,20010,13),

(422,20010,29),

(423,20011,12),

(424,20011,28),

(425,20012,11),

(426,20012,27),

(427,20013,14),

(428,20013,30),

(429,20014,13),

(430,20014,29),

(431,20015,12),

(432,20015,28),

(433,20016,11),

(434,20016,27),

(435,20017,14),

(436,20017,30),

(437,20018,13),

(438,20018,29),

(439,20019,12),

(440,20019,28),

(441,20020,14),

(442,20020,30),

(443,20021,13),

(444,20021,29),

(445,20022,14),

(446,20022,30),

(447,20023,13),

(448,20023,29),

(449,20024,12),

(450,20024,28),

(451,20025,11),

(452,20025,27),

(453,20026,14),

(454,20026,30);

-- next wave of TBD
-- 20050 - 20055

INSERT INTO `course_section_slot` (`id`,`coursesection_id`,`slot_id`) VALUES

(455,20050,13),

(456,20050,29),

(457,20051,12),

(458,20051,28),

(459,20052,14),

(460,20053,30),

(461,20053,13),

(462,20054,29),

(463,20054,12),

(464,20055,28),

(465,20055,14);


-- next gap
-- 21046 - 21055
INSERT INTO `course_section_slot` (`id`,`coursesection_id`,`slot_id`) VALUES

(400,21046,14),

(466,21046,30),

(467,21047,13),

(468,21047,29),

(469,21048,12),

(470,21048,28),

(471,21049,11),

(472,21049,27),

(473,21050,14),

(474,21050,30),

(475,21051,13),

(476,21051,29),

(477,21052,13),

(478,21052,29),

(479,21053,12),

(480,21053,28),

(481,21054,11),

(482,21054,27),

(483,21055,10),

(484,21055,26);

-- 30050-30055


INSERT INTO `course_section_slot` (`id`,`coursesection_id`,`slot_id`) VALUES

(485,30050,14),

(486,30050,30),

(487,30051,13),

(488,30051,29),

(489,30052,13),

(490,30052,29),

(491,30053,12),

(492,30053,28),

(493,30054,11),

(494,30054,27),

(495,30055,10),

(496,30055,26);

-- 31046 - 31055

INSERT INTO `course_section_slot` (`id`,`coursesection_id`,`slot_id`) VALUES

(497,31046,14),

(498,31046,30),

(499,31047,13),

(500,31047,29),

(501,31048,12),

(502,31048,28),

(503,31049,11),

(504,31049,27),

(505,31050,14),

(506,31050,30),

(507,31051,13),

(508,31051,29),

(509,31052,13),

(510,31052,29),

(511,31053,12),

(512,31053,28),

(513,31054,11),

(514,31054,27),

(515,31055,10),

(516,31055,26);


-- 50050-50055
INSERT INTO `course_section_slot` (`id`,`coursesection_id`,`slot_id`) VALUES

(517,50050,14),

(518,50050,30),

(519,50051,13),

(520,50051,29),

(521,50052,13),

(522,50052,29),

(523,50053,12),

(524,50053,28),

(525,50054,11),

(526,50054,27),

(527,50055,10),

(528,50055,26);

-- 40050-40055
INSERT INTO `course_section_slot` (`id`,`coursesection_id`,`slot_id`) VALUES

(529,40050,14),

(530,40050,30),

(531,40051,13),

(532,40051,29),

(533,40052,13),

(534,40052,29),

(535,40053,12),

(536,40053,28),

(537,40054,11),

(538,40054,27),

(539,40055,10),

(540,40055,26);


-- the rest

INSERT INTO `course_section_slot` (`id`,`coursesection_id`,`slot_id`) VALUES

(541,41042,10),

(542,41042,18),

(543,41043,13),

(544,41043,19),

(545,41044,15),

(546,41044,22),

(547,41045,22),

(548,41045,38),

(549,41050,12),

(550,41050,20),

(551,41051,7),

(552,41051,15),

(553,41052,4),

(554,41052,12),

(555,41053,5),

(556,41053,13),

(557,41054,6),

(558,41054,14),

(559,41055,7),

(560,41055,15);

-- TBD 10 CLASS 
-- YOU CAN PROBABLY JUST GET RID OF THIS CLASS BUT HERE ARE SLOTS ANWAYS
INSERT INTO `course_section_slot` (`id`,`coursesection_id`,`slot_id`) VALUES

(561, 50909, 8),

(562, 50909, 24);

-- 2)
-- COURSE SECTION UPDATES FOR ALL CE

-- Wasnt sure if you wanted for all but here is for all classes

UPDATE course_section 

SET faculty_id=10002

WHERE course_id LIKE 'CE%' AND faculty_id = 10001;

-- SPRING 2019 ONLY if needed
UPDATE course_section 

SET faculty_id=10002

WHERE 
term_id=7 AND course_id LIKE 'CE%' AND faculty_id = 10001;