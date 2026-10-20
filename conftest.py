import os
import pytest
from selenium import webdriver
from selenium.common.exceptions import UnexpectedAlertPresentException


@pytest.fixture
def driver():
    driver = webdriver.Chrome()
    driver.maximize_window()
    yield driver
    driver.quit()


@pytest.hookimpl(hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    report = outcome.get_result()

    if report.when == "call" and report.failed:
        driver = item.funcargs.get("driver")

        if driver:
            os.makedirs("reports/screenshots", exist_ok=True)

            # Handle unexpected browser alert before screenshot
            try:
                alert = driver.switch_to.alert
                print(f"\nUnexpected alert found: {alert.text}")
                alert.accept()
            except Exception:
                pass

            screenshot_name = f"reports/screenshots/{item.name}.png"

            try:
                driver.save_screenshot(screenshot_name)
                print(f"\nScreenshot saved: {screenshot_name}")
            except UnexpectedAlertPresentException:
                print("\nCould not capture screenshot because an alert remained open.")