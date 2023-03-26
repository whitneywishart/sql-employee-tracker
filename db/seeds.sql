INSERT INTO
    department (id, department)
VALUES
    (10, "Accounting"),
    (11, "Human Resources"),
    (12, "Information Technology"),
    (13, "Legal"),
    (14, "Marketing"),
    (15, "Operations"),
    (16, "Research and Development"),
    (17, "Sales");

INSERT INTO
    role (id, title, salary, department_id)
VALUES
    (100, "Consultant", 50000, 10),
    (101, "Director", 80000, 12),
    (102, "Engineer", 90000, 12),
    (103, "Executive Vice President", 200000, 13),
    (104, "Intern", 50000, 14),
    (105, "Manager", 70000, 15),
    (106, "President", 120000, 16),
    (107, "Senior Director", 100000, 17),
    (108, "Senior Vice President", 125000, 17),
    (109, "Vice President", 150000, 15);

INSERT INTO
    employee (first_name, last_name, role_id, department_id, manager_id)
VALUES
    ("Helen", "Adams", 100, 10, 101),
    ("Jennifer", "Allen", 101, 12, 102),
    ("Christopher", "Anderson", 102, 13, 103),
    ("Sandra", "Baker", 103, 14, 104),
    ("Jason", "Brown", 104, 15, 105),
    ("Deborah", "Campbell", 105, 16, 106),
    ("Dorothy", "Carter", 106, 17, 107),
    ("Ronald", "Clark", 107, 15, 108),
    ("Sharon", "Collins", 108, 16, 109),
    ("Donald", "Davis", 109, 14, 102);