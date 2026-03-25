"""
test_elab_lab_fi_site.py

Automated UI test for the elab.lab.fi website using Selenium WebDriver and pytest.

This test verifies:
- Homepage loads correctly
- Cookie banner is handled
- Navigation to "Opintojen aloittaminen" page works
- URL changes correctly
- Screenshot is captured

Requirements:
- Python 3.x
- Selenium
- pytest
- webdriver_manager
"""

import pytest
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


@pytest.fixture
def driver():
    service = Service(ChromeDriverManager().install())
    
    options = webdriver.ChromeOptions()
    options.add_argument("--start-maximized")
    
    driver = webdriver.Chrome(service=service, options=options)
    yield driver
    driver.quit()

def test_elab_fi_title(driver):
    """
    Verify that the eLAB.fi homepage has the correct page title.

    Steps:
    1. Open the eLAB.fi homepage.
    2. Optionally wait to visually confirm the page load.
    3. Assert that the page title matches the expected string.

    Args:
        driver (webdriver.Chrome): Selenium WebDriver fixture.
    """
    print("Checking for correct page title")
    
    driver.get("https://elab.lab.fi/fi")
    time.sleep(2)  
    
    assert "Tervetuloa eLABiin! | eLAB" in driver.title # use the Selenium's built-in property
    
    time.sleep(2)

def test_navigation_to_opintojen_aloittaminen(driver):
    """
    Verify navigation from elab homepage to
    'Opintojen aloittaminen' page.
    """

    print("Opening elab.lab.fi homepage")

    driver.get("https://elab.lab.fi/fi")

    wait = WebDriverWait(driver, 5)

    # Handle cookie banner (Accept all)
    try:
        cookie_button = wait.until(
            EC.element_to_be_clickable((By.ID, "ppms_cm_agree-to-all"))
        )
        cookie_button.click()
        print("Cookie banner accepted")
    except:
        print("No cookie banner found")

    # Take screenshot
    screenshot_file = "elab_test_frontpage.png"
    driver.save_screenshot(screenshot_file)
    print(f"Screenshot saved to {screenshot_file}")

    # Click the link "Opintojen aloittaminen"
    print("Clicking 'Opintojen aloittaminen' link")

    link = wait.until(
        EC.element_to_be_clickable((By.LINK_TEXT, "Opintojen aloittaminen"))
    )
    link.click()

    # Wait for URL change
    wait.until(EC.url_contains("opintojen-aloittaminen"))

    # Assertion
    assert "opintojen-aloittaminen" in driver.current_url

    print("Navigation successful")

    # Take screenshot
    screenshot_file = f"elab_test_opintojen-aloittaminen_start.png"
    driver.save_screenshot(screenshot_file)
    print(f"Screenshot saved to {screenshot_file}")

    # Scroll down
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")


    # Take screenshot
    screenshot_file = f"elab_test_opintojen-aloittaminen_end.png"
    driver.save_screenshot(screenshot_file)
    print(f"Screenshot saved to {screenshot_file}")
    time.sleep(2)
