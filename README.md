# SpendSmart 💰

A lightweight, high-performance personal finance tracker built with **Vanilla HTML5, CSS3, and JavaScript**. Designed with a minimalist Stripe-inspired fintech aesthetic, SpendSmart allows you to track income, monitor expenses, and visualize spending categories locally without reliance on external backend servers or databases.

![Project Preview](https://img.shields.io/badge/status-active-success.svg)
![Tech Stack](https://img.shields.io/badge/stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-blue)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## ✨ Features

* **Dashboard Analytics:** Real-time calculation and display of Total Balance, Monthly/Total Income, and Total Expenses.
* **Interactive Visualizations:** Dynamic category-based expense breakdown charts powered by **Chart.js**.
* **Transaction Management:** Easily add new income or expense items via a sleek modal form, complete with category classification and date tagging.
* **Local Persistence:** All financial data is securely saved directly in your browser's `localStorage`, ensuring complete data privacy.
* **Responsive Fintech UI:** Clean, high-end styling inspired by modern financial dashboards, fully responsive across desktop and mobile screens.

---

## 🛠️ Tech Stack

* **Markup:** HTML5 (Semantic Structure)
* **Styling:** CSS3 (Custom Properties, Flexbox, CSS Grid)
* **Logic:** Vanilla JavaScript (ES6+, DOM Manipulation, Array Methods)
* **Libraries:** [Chart.js](https://www.chartjs.org/) (for data visualization)

---

## 📂 Project Structure

```text
spend-smart/
│
├── index.html       # Main application markup and modal skeleton
├── style.css        # Custom CSS3 styles, design tokens, and layout rules
└── app.js           # State management, local storage sync, and event handlers
