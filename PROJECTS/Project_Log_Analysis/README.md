# Log Analysis

The Third Project of Udacity's [Full Stack Web Developer Nanodegree](https://www.udacity.com/course/full-stack-web-developer-nanodegree--nd004).

### Table of Contents
 
* [About](#about)
* [Requirements](#requirements)
* [How to run](#how-to-run)
* [Views Used](#views-used)
* [Troubleshooting](#troubleshooting)

### About
In this project there is a database that contains newspaper articles, as well as the web server log for the site. The log has a database row for each time a reader loaded a web page. Using that information, the code will answer questions about the site's user activity. You will explore a large database with over a million rows. And queries are used to draw business conclusions from data.

## Requirements

[Python 2](https://www.python.org/downloads/) - The code uses ver Python 2.7.12\
[Vagrant](https://www.vagrantup.com/) - A virtual environment builder and manager.\
[VirtualBox](https://www.virtualbox.org/) - An open source virtualiztion product.\
**PostgreSQL** is also a requirement but it installs along with VirtualBox in this project.\
[Git](https://git-scm.com/) - An open source version control system **(This comes built in for MacBook users; so it would not be necessary to install.)**

### How to run
Follow the steps below to access the code of this project:

 1. If you don't already have the python download it from the link in requirements.
 2. Download and install Vagrant and VirtualBox.
 3. Download this Udacity [folder](https://d17h27t6h515a5.cloudfront.net/topher/2017/August/59822701_fsnd-virtual-machine/fsnd-virtual-machine.zip) with preconfigured vagrant settings.
 4. Clone this repository.
 5. Download [this](https://d17h27t6h515a5.cloudfront.net/topher/2016/August/57b5f748_newsdata/newsdata.zip) database.
 6. Navigate to the Udacity folder in your bash interface and inside that cd into the vagrant folder.
 7. Windows users can Open Git Bash and **for MacBook users, it's call the Terminal** then launch the virtual machine with`vagrant up`
 8. Once Vagrant installs necessary files use `vagrant ssh` to continue.
 9. The command line will now start with vagrant. Here cd into the /vagrant folder.
 10. Unpack the  database folder contents downloaded above over here and also place the log_analysis.py file present in this project of github in the same location.
 11.  To load the database type `psql -d news -f newsdata.sql`
 12. To run the database type `psql -d news`
 13. You must run the commands from the Views Used section here to run the python program successfully.
 14. Use command `python log_analysis.py` to run the python program that fetches query results.

### Views Used

#### log_slug
````sql
create view log_slug as
select substring(path from 10) 
from log;
````

#### status_total
````sql
create view status_total as 
select time::date,status
from log;
````
#### status_fail
````sql
create view status_fail as 
select time,count(*) as num_fail 
from status_total where status='404 NOT FOUND' 
group by time;
````
#### status_all
````sql
create view status_all as 
select time,count(*) as num 
from status_total 
where status='404 NOT FOUND' 
or status='200 OK' 
group by time;
````
#### percentage_count
````sql
create view percentage_count as 
select status_all.time,
status_all.num as num_all,
status_fail.num_fail as num_fail,
status_fail.num_fail::double precision/status_all.num::double precision * 100 
as percentage_fail 
from status_all,status_fail 
where status_all.time=status_fail.time;
````

### Troubleshooting
If your command prompt does not start with vagrant after typing `vagrant ssh` then please try the `winpty vagrant ssh` on your Windows system.