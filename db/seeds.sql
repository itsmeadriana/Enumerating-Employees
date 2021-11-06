INSERT INTO department (dept_name)
VALUES
    ('Accounting'),
    ('Administration'),
    ('Executive'),
    ('Human Resources'),
    ('Management'),
    ('Marketing'),
    ('Public Relations'),
    ('Retail'),
    ('Sales'),
    ('Telecommunications');

INSERT INTO role (title, salary, department_id)
VALUES
    ('CFO', '645000', 3),
    ('CEO', '750000', 3),
    ('Chief Administrator', '90000', 2),
    ('Lead Administrator', '68799', 2),
    ('Department Head', '85000', 5),
    ('Manager', '55000', 5),
    ('Assistant Manager', '48000', 5),
    ('Director of Marketing', '110499', 6),
    ('HR Director', '78000', 4),
    ('Accountant', '140000', 1),
    ('Junior Representative', '58000', 7),
    ('Senior Representative', '82000', 7),
    ('Customer Service Rep', '41000', 8),
    ('Store clerk', '29000', 8),
    ('Stock clerk', '32000', 8),
    ('Salesperson', '112000', 9),
    ('Software Engineer', '125000', 10);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Wilhelmina', 'Abbot', 6, 0),
    ('David', 'Argon', 10, 8),
    ('Guillermo', 'Bolsonaro', 7, 1),
    ('Analycia', 'Broward', 3, 18),
    ('Edgar', 'Christensen', 5, 19),
    ('Shannon', 'Clybourne', 1, 0),
    ('Dennis', 'Danvers', 9, 10),
    ('Olivia', 'Doone', 6, 0),
    ('Cornelius', 'Emmerson', 12, 18),
    ('Theodora', 'Evers', 2, 0),
    ('Penelope', 'Fan', 5, 19),
    ('Ronald', 'Francis', 4, 8),
    ('Giorgio', 'Ghinna', 5, 19),
    ('Molly', 'Green', 8, 10),
    ('Jaime', 'Hendricks', 10, 8),
    ('Luis', 'Isidro', 4, 8),
    ('Hannah', 'Ivy', 7, 1),
    ('Alicia', 'Jackson', 6, 0),
    ('Velma', 'Joaquim', 7, 8),
    ('Philip', 'Klongerbo', 5, 18),
    ('Jose', 'Knaves', 16, 19),
    ('Gaal', 'Linzer', 16, 19),
    ('Benjamin', 'Ludwig', 13, 18),
    ('Christopher', 'Morgen', 16, 1),
    ('Elisa', 'Muir', 14, 1),
    ('Chave', 'Nielsen', 14, 17),
    ('Holger', 'Noah', 17, 8),
    ('Joanna', 'Odessa', 13, 18),
    ('Frank', 'Orner', 15, 1),
    ('Isabel', 'Parry', 14, 1),
    ('Kodak', 'Pines', 13, 18),
    ('Olga', 'Quinella', 13, 18),
    ('Marcus', 'Rainy', 15, 1),
    ('Nadja', 'Rubins', 17, 8),
    ('Javier', 'Santos', 16, 19),
    ('Abdul', 'Shoudhury', 14, 1),
    ('Enid', 'Teegue', 15, 1),
    ('Omar', 'Thiany', 14, 1),
    ('Rowan', 'Uberman', 10, 19),
    ('Seth', 'Vindberg', 14, 17),
    ('Ursula', 'Vorhees', 5, 18),
    ('Vincent', 'Walker', 14, 1),
    ('Zainab', 'Werner', 10, 19),
    ('Quincy', 'Young', 14, 1);