# Online Trading Platform
## Purpose
* This is my 1st big project to develop a full stack app by myself.
* It will be an online trading platform mainly for equities.
* Charts visualization and creation of personal portfolios will be the first end goal.
* Implement machine learning to analyze stocks will be my 2nd end goal, this will be done in the near future when I have the time.

## How to make this work
* Get your own Django secret key
  * Create your own Django app => copy the secret key => paste into this project's secret key location at settings.py or in your environment.
* ~~Create your own mysql database~~
  * ~~Change the username, password, and database name at settings.py~~
* API key is required if you want to use data from IEX cloud.
  * Create free account with IEX at https://iexcloud.io/.
  * Free data is limited, simulated data is free
* API key is required to get real news feed from news api
  * Create account for free at https://newsapi.org/
* Use pipenv to install all python dependencies for the backend.
* Use npm to install all frontend related dependencies.

## How to run
1. ~~Turn on MySql server~~
2. Turn on backend server
    * python manage.py runserver
3. Turn on Frontend server
    * npm start

## List of major technologies used
* Django
* React
* D3
* ~~MySql~~ changed to sqlite due to django-mysql problem when updating user profile
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
* ~~Implement Async Select and Search in large database~~
* ~~Link Nav search bar with chart display~~
* ~~Add range select for chart~~
* ~~Implement Candle Stick chart~~
* ~~Fix X ticks~~
* ~~Implement Menu bar~~
* ~~Add news to Dashboard~~
* ~~Add Company Profile to Dashboard~~
* ~~Add Advanced Stats to Dashboard~~
* ~~Add Key Stats, Balance Sheet, Cash Flow, Income Statement to Dashboard~~
* ~~Add other features and links into Menu (news, etc.)~~
* ~~Reorganize Dashboard and split into different pages~~
* ~~Add Loading feature~~
* ~~Add portfolio frontend and backend feature~~
* ~~Add buy and sell stock feature~~
* ~~Improve trade UI~~
* ~~Add real time price update for trade UI~~
* ~~Add real time price and change update for Dashboard UI~~
* ~~Add Profile feature~~
* ~~Add privacy for portfolio and profile~~
* ~~Add token expiry feature (auto logout or extend) in backend and frontend~~
* ~~Add auto fund update for trade UI~~
* ~~Add transaction history at backend~~
* ~~Add manual fund input feature~~
* ~~Improve profile feature~~
* ~~Add username update feature~~
* ~~Add email update feature~~
* ~~Add password update feature~~
* ~~Add error handling for user profile update feature~~
* ~~Refactor code for reuse and reduce code redundancy~~
* ~~Implement real news feed~~
* ~~Implement real company profile details~~
* ~~Implement chart select feature~~
* Improve auto logout alert UI
* Add password reset feature
* Improve loading UI
* Improve d3 visualization
* Expand the type of graphs and visualizations with d3
* Add Real time chart support
* Improve overall styling
