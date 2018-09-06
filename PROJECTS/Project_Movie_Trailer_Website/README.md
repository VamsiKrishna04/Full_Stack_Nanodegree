# Movie Trailer Website:Fresh Tomatoes

A website created for the first project of Udacity's [Full Stack Web Developer Nanodegree](https://www.udacity.com/course/full-stack-web-developer-nanodegree--nd004).

### Table of Contents
 
* [About](#about)
* [Demo](#demo)
* [Dependencies](#dependencies)
* [How to run](#how-to-run)
* [Directory Structure](#directory-structure)
* [Documentation](#documentation)


### About
This project creates a website with a list of favourite movies.
It is a demonstration of server-side code to store a list of movies, including movie poster URL and a movie trailer URL.Udacity supplied code fresh_tomatoes is used to generate a static web page allowing visitors to watch trailers of the movies present in the website .

### Demo
For a demo, check out website,https://vamsikrishna04.github.io/Full_Stack_Nanodegree/PROJECTS/Project_Movie_Trailer_Website/fresh_tomatoes.html

### Dependencies
Python must be installed in the environment.

### How to run
Clone this repository and run `entertainment_center.py` in your python console or
you can open `fresh_tomatoes.html` in any browser.

### Directory Structure
Within the download you'll find the following directories and files:

```
Project_Movie_Trailer_Website/
├── entertainment_center.py
├── fresh_tomatoes.html
├── fresh_tomatoes.py
├── media.py
└── README.md
```

### Documentation

1. This project includes three python files, they are entertainment_center.py, fresh_tomatoes.py and media.py. The main function of the project is to write the server-side code to store a list of your favorite movies, including the poster and a movie trailer URL. Then serve this data as a web page allowing visitors to watch the trailers.

2. The python file media import the webbrower API and include a class named Movie and its constructor includes four paremeters, they are movie_title, movie_storyline, poster_url, trailer_url.

3. The file entertainment_center.py is used to create instances of Movie and store them into a list, then called the function of open_movies_page in fresh_tomatoes.py which opens the required webpage in the browser.

4. The file fresh_tomatoes.py is an open source file, which is used to create the dynamic html file.
