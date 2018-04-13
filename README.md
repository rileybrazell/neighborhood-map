# Neighborhood Map

A simple map app that creates markers from a set of location data points. Google Maps API is used for the map and markers, KnockoutJS handles automatic updates to visible elements, and Flickr API gets relevant and beautiful pictures of the locations.

# How to run app

Visit [the live version of the app!](https://rileybrazell.github.io/neighborhood-map) Or, clone the whole repository and open `index.html` in your favorite browser

### What I learned

This project was all about refinement of what I knew and expanding the edges of the knowledge. At times it felt like I was learning JavaScript all over again! I used Flickr's API services to pull down photos of the different locations. Google's Maps API did all of the map functions like markers and automatic resizing. Most importantly, KnockoutJS controls the list view of the locations, automatically building the list and connecting the entries to their corresponding marker locations. Working with KnockoutJS taught me a lot about how the structure of JS code affects your ability to interact with functions and data. Using a module pattern of writing JS code means all of the functions are abstracted away from the data, one only needs to change the location array object to add new markers, list items, and all logic behind them. This should make it easier to add new features later.

### How this app could be improved

I could definitely could make some changes to code structure. It feels like I'm repeating myself in some places, and have a loop within a loop with functions all over that works fine but isn't pretty, and probably isn't optimal. As for features, I think it would fairly straight-forward to enable to user to add their own points; the map will automatically update it's center based on where the points are. The location points require a lat/lng pair and title, with some work these could be guessed and automated from a title entered by the user.