from playwright.sync_api import sync_playwright, expect
import os

def run_verification(page):
    # 1. Navigate to the local index.html file
    file_path = os.path.abspath('index.html')
    page.goto(f'file://{file_path}')

    # 2. Scroll to the contact form
    contact_form_container = page.locator("#contact-form-container")
    contact_form_container.scroll_into_view_if_needed()

    # 3. Fill out the form
    page.locator("#name").fill("Test User")
    page.locator("#email").fill("test@example.com")
    page.locator("#message").fill("This is a test message.")

    # 4. Click the submit button
    page.get_by_role("button", name="Send Message").click()

    # 5. Assert that the success message is visible
    success_message = contact_form_container.locator(".success-message")
    expect(success_message).to_be_visible()
    expect(success_message).to_have_text("Thank you! We will get back to you soon.")

    # 6. Take a screenshot of the entire container
    screenshot_path = "jules-scratch/verification/verification.png"
    contact_form_container.screenshot(path=screenshot_path)
    print(f"Screenshot saved to {screenshot_path}")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        run_verification(page)
        browser.close()

if __name__ == "__main__":
    main()