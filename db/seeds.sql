INSERT INTO
    department (department)
VALUES
    ("Accounting"),
    ("Human Resources"),
    ("Information Technology"),
    ("Legal"),
    ("Marketing"),
    ("Operations"),
    ("Research and Development"),
    ("Sales");

INSERT INTO
    role (title, salary, department_id)
VALUES
    ("Consultant", 50000, 1),
    ("Director", 80000, 1),
    ("Engineer", 90000, 2),
    ("Executive Vice President", 200000, 3),
    ("Intern", 50000, 4),
    ("Manager", 70000, 5),
    ("President", 120000, 6),
    ("Senior Director", 100000, 7),
    ("Senior Vice President", 125000, 8),
    ("Vice President", 150000, 8);

INSERT INTO
    employee (first_name, last_name, role_id, department_id, manager_id)
VALUES
    ("Helen", "Adams", 1, 2, 1),
    ("Jennifer", "Allen", 2, 1, 1),
    ("Christopher", "Anderson", 3, 1, 1),
    ("Sandra", "Baker", 4, 1, 1),
    ("Jason", "Brown", 5, 1, 1),
    ("Deborah", "Campbell", 6, 1, 5),
    ("Dorothy", "Carter", 7, 1, 1),
    ("Ronald", "Clark", 8, 1, 4),
    ("Sharon", "Collins", 1, 1, 4),
    ("Donald", "Davis", 2, 2, 2);