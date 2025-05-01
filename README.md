# BuyOnline – Web-Based Shopping System

## Overview

BuyOnline is a lightweight, XML-backed web application that simulates a basic e-commerce platform. The system enables customers to browse and purchase items, and allows store managers to manage inventory and process orders through a dedicated portal.

---

## 🔧 Features

### 👤 Customer Features
- Register with unique email and password
- Login securely
- Browse item catalog (AJAX-powered)
- Add/remove items to cart
- Confirm or cancel purchase
- Logout safely with cart clearance

### 🛒 Manager Features
- Secure login with manager ID
- Add new items with price, stock, description
- Process sales, update sold items
- Remove fully sold items
- Logout with session clearance

### 🛠️ Error Handling
- Input validation for all forms
- Duplicate email detection
- Password mismatch checks
- Invalid credentials error display

---

## 📁 File Structure

### 🔹 HTML Pages
- `BuyOnline.htm` – Home page
- `register.htm`, `login.htm`, `buying.htm` – Customer flow
- `mlogin.htm`, `listing.htm`, `processing.htm` – Manager flow
- `logout*.htm` – Logout pages

### 🔹 JavaScript
- `loginCustomer.js`, `buying.js`, `addItem.js`, etc.
- Handles front-end form logic, AJAX calls, and cart updates

### 🔹 PHP Scripts
- `register.php`, `login.php`, `buying.php`, `confirmPurchase.php`
- Server-side logic to read/write from XML and process transactions

### 🔹 Data Files
- `goods.xml` – Stores item listings
- `customer.xml` – Stores registered customer data
- `manager.txt` – Stores manager credentials

---

## 🧪 How to Run Locally

1. Install a local web server like XAMPP or WAMP
2. Place project files under the `htdocs` directory (XAMPP)
3. Start Apache service
4. Open `http://localhost/BuyOnline/BuyOnline.htm` in your browser

> Ensure file permissions allow reading/writing XML files.

---

## 📚 Technologies Used

- **Frontend:** HTML, CSS, JavaScript, AJAX
- **Backend:** PHP
- **Data Storage:** XML (goods.xml, customer.xml)
- **Tooling:** Apache server (via XAMPP or Mercury server)


