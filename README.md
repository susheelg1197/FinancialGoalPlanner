# FinancialGoalPlanner
The "FinancialGoalPlanner" repository houses code and resources for a software tool enabling users to set, track, and achieve financial goals, such as savings, debt repayment, and budgeting. Developers and financial experts collaborate to enhance its functionality and usability.

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/susheelg1197/FinancialGoalPlanner.git
```

## Prerequisites for backend
1. Python (3.8 or later)
2. pip (Python package manager)
3. [PostgreSQL](https://www.postgresql.org/download)

### Running backend
```bash
cd backend

# for new venv setup run the following
python3 -m venv venv
source venv/bin/activate

# Install Dependencies
pip install -r requirements.txt

# update config.py
SQLALCHEMY_DATABASE_URI = 'postgresql://<your_username>:<your_password>@localhost/financialgoalplanner'

# Initialize the migration environment (only the first time)
flask db init

# Generate an initial migration
flask db migrate -m "Initial migration."

# Apply the migration to the database
flask db upgrade

# Start Application
python run.py
```
## Prerequisites for frontend

1. Node
2. NPM

Use [NVM](https://github.com/nvm-sh/nvm)

Prefer installation using NVM and use version 16.13.0



```bash
nvm install 16.13.0
nvm use 16.13.0
```


### Running Frontend

Run `npm run setup` in order to install dependencies and clean the git repo.<br />
    _At this point you can run `npm start` to see the example app at `http://localhost:3000`._
