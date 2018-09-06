import media
import fresh_tomatoes

"""
Creating Objects for the class Movie with 4 arguments each:
movie_title (title of the movie)
movie_storyline (brief description of the movie)
poster_url (URL of poster image)
trailer_url (URL of youtube trailer)
"""
toyStory = media.Movie("Toy Story",
                       "It is a computer-animated comedy adventure film",
                       "https://goo.gl/SDctZB",
                       "https://www.youtube.com/watch?v=Ny_hRfvsmU8")

avatar = media.Movie("Avatar",
                     "Avatar, is a 2009 American epic science fiction film.",
                     "https://goo.gl/S6tBQR",
                     "https://www.youtube.com/watch?v=6ziBFh3V1aM")

shaolin_soccer = media.Movie("Shaolin Soccer",
                             "It is a 2001 Hong Kong martial arts sports film",
                             "https://goo.gl/uEsKBL",
                             "https://www.youtube.com/watch?v=bREfcVPssiE")

snake_eagle_shadow = media.Movie(
                                 "Snake in the Eagle's Shadow",
                                 "It is a Hong Kong martial arts film",
                                 "https://goo.gl/P56Knz",
                                 "https://www.youtube.com/watch?v=2T6jjZvgGG4"
                                )

tirthy_six_chamber = media.Movie("The 36th Chamber of Shaolin",
                                 "It is a 1978 Hong Kong kung fu film.",
                                 "https://goo.gl/cbYZAf",
                                 "https://www.youtube.com/watch?v=P5_d0d-9ajU")

kungfu_panda = media.Movie("Kungfu Panda 3",
                           "It is a 3D computer-animated comedy film",
                           "https://goo.gl/a7ChVa",
                           "https://www.youtube.com/watch?v=fGPPfZIvtCw")

ratatouille = media.Movie("Ratatouille",
                          "It is a 2007 American comedy film by Pixar",
                          "https://goo.gl/b1zTgZ",
                          "https://www.youtube.com/watch?v=c3sBBRxDAqk")

# Storing objects of class Movie into a list
movies = [avatar, shaolin_soccer, snake_eagle_shadow,
          tirthy_six_chamber, kungfu_panda, ratatouille]

# call the funtion in fresh_tomatoes.py and pass the list movies as argument
fresh_tomatoes.open_movies_page(movies)
