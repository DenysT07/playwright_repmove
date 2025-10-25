# Test Automation Project with Playwright 

This project contains automation tests for a Repmove web application using Playwright.

##  Notes

Short test plan - [link](https://docs.google.com/document/d/1ps8hRjZn-1thdBIjSWhAse-fMn9Z7LOzGNAXouDyvmA/edit?usp=sharing)

CI/CD pipeline automatically runs tests and publishes reports to [GitHub Pages.](https://denyst07.github.io/playwright_repmove/)

## Setup Instructions

1. Clone the repository
```
git clone https://github.com/DenysT07/playwright_repmove.git
```
2. Install dependencies
```
npm ci
```

3. Create an .env file in the project root and define environment variables:
```
BASE_URL=https://app-url.com
VALID_EMAIL=example@mail.com
VALID_PASSWORD=your_password
```

4. Install Playwright browsers
```
npx playwright install --with-deps
```
# How to Run the Tests

- Run all tests:
```
npm run test
```
- Run all tests headed:
```
npm run test:headed
```
- Generate and view the HTML report:
```
npm run report
```
