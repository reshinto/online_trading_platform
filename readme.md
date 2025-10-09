# Online Trading Platform

![Demo](./images/demo.gif)

## Overview
This repository contains a full-stack web application that simulates an online equities trading experience. The backend is built with Django and the Django REST Framework, while the frontend is a React single-page application styled with Material-UI and powered by Redux state management. The platform lets users authenticate, explore market data, visualise interactive stock charts, follow company fundamentals and news, and manage a simulated trading portfolio including cash movements.

Financial market data is aggregated from multiple third-party providers. Historical charts, quotes, and financial statements are requested from the IEX Cloud API through custom client helpers (`src/iexAPI/iex.js` and `src/iexAPI/iexCloud.js`), company profiles are fetched from Financial Modeling Prep, and market headlines are sourced from NewsAPI. These feeds are refreshed periodically to keep the dashboard up to date (`Title.js`, `SetChart.js`, and `SetNews.js`).

## Purpose
* This is my 1st big project to develop a full stack app by myself.
* It will be an online trading platform mainly for equities.
* Charts visualization and creation of personal portfolios will be the first end goal.
* Implement machine learning to analyze stocks will be my 2nd end goal, this will be done in the near future when I have the time.

## Architecture
- **Backend (`backend/`)**
  - Django project configured in `trading_platform/settings.py` with Django REST Framework, Knox token authentication, CORS handling, and SQLite (development) / PostgreSQL (production) database support.
  - REST APIs exposed via routers in `portfolio/urls.py` and `funds/urls.py`, and authentication endpoints in `accounts/urls.py`.
  - Portfolio transactions and cash movements are stored in the `Portfolio` and `Funds` models (`portfolio/models.py`, `funds/models.py`). Knox tokens secure user sessions (`accounts/api.py`).
- **Frontend (`frontend/trading_platform/`)**
  - React application bootstrapped with Create React App (`src/index.js`, `src/App.js`).
  - Global state handled by Redux (`src/redux/store.js`) with feature-specific reducers for authentication, market data, news, profile, trades, and funds.
  - UI built with Material-UI components and custom visualisations using `react-stockcharts` and D3 (`src/components/graphs/`).

## Key Features
- **Authentication & Session Management** – Users can register, log in, and manage sessions backed by Knox tokens (`accounts/api.py`, `authAction.js`). Modal dialogs in the navbar provide quick access to signup and login flows (`SubMenuSection.js`, `Login.js`, `Signup.js`).
- **Symbol Search & Navigation** – An asynchronous multi-select search bar pulls the full IEX symbol directory and drives the active context for charts, stats, and news (`Navbar/SearchBar.js`, `iexAction.js`). Navigation drawers (`Navbar/MainMenu.js`) and tabs (`Navbar/Tab.js`) organise access to dashboard sections.
- **Market Data Dashboard** – The dashboard combines real-time quotes, intraday price updates, and configurable historical charts with multiple visualisations (candlestick, Heikin Ashi, area) and range selectors (`SetChart.js`, `ChartSelect.js`, `CandleStickChart.js`, `HeikinAshiChart.js`, `AreaChart.js`). Quotes refresh every five seconds while a trade dialog remains readily accessible (`Title.js`, `portfolio/Trade.js`).
- **Fundamentals & Financial Statements** – Detailed company profiles, advanced statistics, key metrics, and multi-period financial statements are retrieved from external APIs and rendered in responsive tables (`CompanyProfile.js`, `FinancialStatements.js`). Users can toggle between annual and quarterly data as well as different statement types.
- **News Integration** – Market headlines related to the selected symbol are streamed from NewsAPI and presented with imagery, attribution, and publication timestamps (`news/SetNews.js`, `news/News.js`).
- **Portfolio & Funds Management** – Authenticated users can execute simulated buy/sell trades, automatically adjusting their cash balance (`portfolio/Trade.js`). Transaction and fund histories are persisted via REST endpoints and displayed with sortable tables and expandable dialogs (`PortfolioHistory.js`, `FundsHistory.js`, `profile/SetTradeHistory.js`, `profile/SetFundsHistory.js`).
- **Profile Management** – Users can review and update their username, email, and password, as well as deposit additional funds through modal forms with validation and error feedback (`profile/SetUsername.js`, `profile/UpdateData.js`, `profile/UpdatePassword.js`, `profile/FundInput.js`).

## Data Providers & Environment Variables
Configure the following environment variables before running the project:

| Variable | Purpose | Where it is used |
| --- | --- | --- |
| `stock_trading_platform_django` | Django secret key | `backend/trading_platform/settings.py` |
| `DEBUG_VALUE` | Enables Django debug mode when set to `True` | `backend/trading_platform/settings.py` |
| `my_email1`, `my_email_password1` | SMTP credentials for password reset emails | `backend/trading_platform/settings.py` |
| `REACT_APP_DB` | Base URL of the backend API | `frontend/trading_platform/src/redux/utility.js` |
| `REACT_APP_iexToken` | IEX Cloud API token (use sandbox for development) | `frontend/trading_platform/src/iexAPI/iexCloud.js` |
| `REACT_APP_newsAPI` | NewsAPI key | `frontend/trading_platform/src/redux/actions/newsAction.js` |

Optional: configure `DATABASE_URL` for PostgreSQL via `dj_database_url` when deploying.

## How to make this work
* Get your own Django secret key
  * Create your own Django app => copy the secret key => paste into this project's secret key location at settings.py or in your environment.
      ```python
      # Use python 3 to generate your own Django secret key
      import secrets
      print(secrets.token_hex(24))
      ```
* ~~Create your own mysql database~~
  * ~~Change the username, password, and database name at settings.py~~
* API key is required if you want to use data from IEX cloud.
  * Create free account with IEX at https://iexcloud.io/.
  * Real data is free data but limited. However, simulated data is completely free.
    * If using simulated data, paste the following with the api key in the environment
      > export REACT_APP_iexToken="api_key"
* API key is required to get real news feed from news api
  * Create account for free at https://newsapi.org/
    > export REACT_APP_newsAPI="api_key"
* Add local server address to environment or manually edit in the utility.js file
  > export REACT_APP_DB="http://127.0.0.1:8000"
* Company profile data is taken from https://financialmodelingprep.com
  * no additional settings required

## Project Structure
```
├── backend/
│   ├── accounts/          # Authentication APIs and serializers
│   ├── funds/             # Cash ledger REST endpoints
│   ├── portfolio/         # Trade history REST endpoints
│   └── trading_platform/  # Django project settings and root URLs
├── frontend/
│   └── trading_platform/
│       ├── src/
│       │   ├── components/   # Navbar, charts, news, portfolio, profile UI
│       │   ├── pages/        # Dashboard, Chart, Company, Financials, Profile views
│       │   ├── redux/        # Store, actions, reducers, utilities
│       │   └── iexAPI/       # REST client helpers for IEX endpoints
│       └── package.json
├── images/               # Demo assets
└── Pipfile               # Python dependencies
```

## Backend Setup
1. **Install dependencies**
   ```bash
   pipenv install
   ```
2. **Activate the virtual environment**
   ```bash
   pipenv shell
   ```
3. **Apply database migrations**
   ```bash
   python manage.py migrate
   ```
4. *(Optional)* create a superuser for Django admin access:
   ```bash
   python manage.py createsuperuser
   ```

### Running the backend
```bash
python manage.py runserver
```
The server defaults to `http://127.0.0.1:8000/`. REST endpoints include:
- `POST /api/auth/register` – register a new user (`accounts/api.py`)
- `POST /api/auth/login` – obtain a Knox token (`accounts/api.py`)
- `GET /api/auth/user` – retrieve the authenticated user profile (`accounts/api.py`)
- `PUT /api/auth/user` – update username or email (`accounts/api.py`)
- `PUT /api/auth/user/password/change` – change password (`accounts/api.py`)
- `GET/POST /api/portfolio/` – list or create trades (`portfolio/api.py`)
- `DELETE /api/portfolio/<id>/` – remove a trade record (`portfolio/api.py`)
- `GET/POST /api/funds/` – list or create fund ledger entries (`funds/api.py`)
- `DELETE /api/funds/<id>/` – remove a fund entry (`funds/api.py`)
- `POST /api/auth/logout` – invalidate the active Knox token (`accounts/urls.py`)

Knox expects the `Authorization: Bearer <token>` header on authenticated requests.

## Frontend Setup
1. Install Node dependencies:
   ```bash
   cd frontend/trading_platform
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
   The React app runs on `http://localhost:3000/` and proxies API calls to the backend address provided by `REACT_APP_DB`.

### Available npm scripts
- `npm start` – start the development server.
- `npm run build` – build the production bundle.
- `npm test` – run tests configured by Create React App.

### Available npm scripts
- `npm start` – start the development server.
- `npm run build` – build the production bundle.
- `npm test` – run tests configured by Create React App.

## Development Notes
- Authentication state, market data, and user data are persisted in Redux reducers (`authReducer.js`, `iexReducer.js`, `userReducer.js`, etc.), with side effects handled via thunk actions (`redux/actions/`).
- Intraday polling and chart range management are encapsulated in `SetChart.js`, which keeps the chart responsive to user selections and streaming data.
- The profile view refreshes user data after mutations to keep the UI in sync with backend responses (`Profile.js`).
- Initial fund balances are automatically seeded once a user authenticates (`SubMenuSection.js`).

## Additional Resources
- IEX Cloud API Documentation: https://iexcloud.io/docs/api/
- Financial Modeling Prep API: https://financialmodelingprep.com/developer
- NewsAPI Documentation: https://newsapi.org/docs

## List of major technologies used
* Django
* React
* D3
* ~~MySql~~ changed to sqlite for development, and Postgres for production
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
* ~~Improve d3 visualization~~
* ~~Expand the type of graphs and visualizations with d3~~
* ~~Add loading UI~~
* ~~Add last 4 annually and quarterly financial reports~~
* ~~Fix number and word formats in financial reports~~
* ~~Add password reset feature~~
* ~~Add Tooltip~~
* ~~Add Icons~~
* ~~Add Real time chart support~~
* Add multi symbol support on a single chart
* Improve auto logout alert UI
* Improve overall styling
