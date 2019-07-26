# Online Trading Platform
## Purpose
* This is my 1st big project to develop a full stack app by myself.
* It will be an online trading platform mainly for equities.
* Charts visualization and creation of personal portfolios will be the first end goal.
* Implement machine learning to analyze stocks will be my 2nd end goal, this will be done in the near future when I have the time.

## How to make this work
* Get your own Django secret key
  * Create your own Django app => copy the secret key => paste into this project's secret key location at settings.py or in your environment.
* Create your own mysql database
  * Change the username, password, and database name at settings.py
* API key is required if you want to use data from IEX cloud.
  * Create your own account with IEX (it's free).
* Use pipenv to install all python dependencies for the backend.
* Use npm to install all frontend related dependencies.

## How to run
1. Turn on MySql server
2. Turn on backend server
    * python manage.py runserver
3. Turn on Frontend server
    * npm start

## List of major technologies used
* Django
* React
* D3
* MySql
* Django Rest Framework
* Redux
* Material-UI

## List of Things to do
* ~~Build a restful api with Django~~
* ~~Start a simple template with React~~
* ~~Use MySql as database~~
* ~~Integrate MySql with Django~~
* ~~Integrate React with Django~~
* ~~Made a basic user authentication feature~~
* ~~Style with Material-UI~~
* ~~Integrate d3 with React~~
* ~~Write my own iex api to get financial data from IEX~~
* ~~Integrate iex api with d3~~
* ~~Write my own iex cloud api to get financial market and stocks data from IEX cloud~~
* ~~Integrate iex cloud api with d3~~
* ~~Slightly improved d3 charts~~
* ~~Reorganize Navbar into separate components~~
* ~~Implement Search Bar and enable multi search feature~~
* Increase search speed to enable search in large database of symbols
* Send search results to data input for display of stock chart
* Improve d3 visualization
* Expand the type of graphs and visualizations with d3
* Add portfolio functionality
* Add privacy for portfolio
* Add Realtime data support (if IEX allows it) else will create a mock version
* Add trading functionality
* Improve overall styling
