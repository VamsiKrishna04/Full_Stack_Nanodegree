import webbrowser


# Class to represent a Movie
class Movie():
    """ This class provides a way to store movie related information """

    # Constructor method of the class Movie
    def __init__(self, movie_title, movie_storyline,
                 poster_url, trailer_url):
        """ Initializes a movie object
        Arguments:
        movie_title = a string containing movie's title
        movie_storyline = a string containing brief description of the movie
        poster_url = a string containing URL for poster image
        trailer_url = a string containing youtube URL of the movie's trailer
        """

        self.title = movie_title
        self.movie_storyline = movie_storyline
        self.poster_image_url = poster_url
        self.trailer_youtube_url = trailer_url

    def show_trailer(self):
        # Opens the trailer in web browser
        webbrowser.open(self.trailer_youtube_url)
