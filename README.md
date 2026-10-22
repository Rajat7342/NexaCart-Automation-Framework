
# NexaCart — E-Commerce Automation Testing Framework

An automated testing framework for validating the functionality of the NexaCart e-commerce application using Selenium, Pytest, API testing, and database validation.

## Features

- UI automation testing with Selenium WebDriver
- Test execution and assertions using Pytest
- API testing for GET, POST, PUT, and DELETE requests
- Database validation using SQLite
- API and database integration testing
- Reusable Page Object Model structure
- Logging and failure screenshots
- HTML test reports using pytest-html

## Tech Stack

- Python
- Selenium WebDriver
- Pytest
- Requests
- SQLite
- HTML, CSS, and JavaScript
- pytest-html

## Project Structure

```text
Enterprise-Automation-Framework/
├── api/
├── config/
├── database/
├── pages/
├── test_data/
├── tests/
├── utils/
├── conftest.py
├── pytest.ini
├── .gitignore
└── README.md
```

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Rajat7342/NexaCart-Automation-Framework.git
   cd NexaCart-Automation-Framework
   ```

2. Create and activate a virtual environment:

   ```bash
   python -m venv venv
   ```

   Windows PowerShell:

   ```powershell
   .\venv\Scripts\Activate.ps1
   ```

3. Install the required dependencies:

   ```bash
   pip install selenium pytest requests pytest-html
   ```

4. Run the local application from the project root:

   ```bash
   python -m http.server 5500
   ```

5. Run the tests in a separate terminal:

   ```bash
   python -m pytest
   ```

## Generate an HTML Report

```bash
python -m pytest --html=reports/test_report.html --self-contained-html
```

Open the generated report in your browser.

## Test Results

Latest recorded test run:

- Total tests: 28
- Passed: 28
- Failed: 0
- Execution time: 2 minutes 12 seconds

## Author

Rajat — [GitHub Profile](https://github.com/Rajat7342)
