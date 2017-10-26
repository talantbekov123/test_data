import mysql.connector
from __future__ import print_function
from datetime import date, datetime, timedelta

config = {
    'user': 'scott',
    'password': 'tiger',
    'host': '127.0.0.1',
    'database': 'employees',
    'raise_on_warnings': True,
    'use_pure': False,
}

cnx = mysql.connector.connect(**config)
cursor = cnx.cursor()

tomorrow = datetime.now().date() + timedelta(days=1)

add_salary = ("INSERT INTO salaries "
              "(emp_no, salary, from_date, to_date) "
              "VALUES (%(emp_no)s, %(salary)s, %(from_date)s, %(to_date)s)")

# Insert salary information
data_salary = {
  'emp_no': emp_no,
  'salary': 50000,
  'from_date': tomorrow,
  'to_date': date(9999, 1, 1),
}
cursor.execute(add_salary, data_salary)

# Make sure data is committed to the database
cnx.commit()
cursor.close()
cnx.close()