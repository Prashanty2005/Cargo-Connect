# 🚚 Cargo Connect: Logistics Marketplace (BlaBlaCar for Goods)

## Table of Contents
1.  [Project Overview](#project-overview)
2.  [Features & Functionality](#features--functionality)
3.  [Technology Stack](#technology-stack)
4.  [Architecture & Design Choices](#architecture--design-choices)
5.  [Setup and Run Locally](#setup-and-run-locally)
6.  [Screenshots/Demo](#screenshotsdemo)

---

## 1. Project Overview

**Cargo Connect** is a two-sided logistics marketplace designed to efficiently connect individuals/businesses with cargo (Shippers) to available goods vehicles (Carriers) traveling similar routes. It addresses the real-world problem of optimizing freight capacity and reducing transportation costs.

This project demonstrates expertise in building scalable, real-time user interfaces, complex data filtering, and secure user segmentation using a modern frontend stack.

* **Live Demo:** [Insert Live Demo Link Here]
* **GitHub Repository:** [https://github.com/Prashanty2005/Cargo-Connect](https://github.com/Prashanty2005/Cargo-Connect)

---

## 2. Features & Functionality

The application is engineered around two primary user roles, each with a distinct dashboard:

### 🧑‍💼 Shipper (Cargo Sender) Features
* **Intelligent Request Submission:** Form to submit cargo details (weight, volume, pickup location, drop-off location).
* **Route Matching:** Displays a filtered list of available carriers that match the cargo's route and capacity needs.
* **Request Management:** Dashboard to view the status of all submitted cargo requests.

### 🚛 Carrier (Vehicle Owner) Features
* **Route Management Dashboard:** Dedicated view to monitor and manage vehicle capacity and availability.
* **Dynamic Request Feed:** Real-time feed of new cargo requests relevant to the Carrier's planned routes.
* **Accept/Decline:** Functionality to accept or decline a cargo request, updating its status in the system.

---

## 3. Technology Stack

This project leverages a high-performance, modern web development stack:

| Category | Technology | Rationale |
| :--- | :--- | :--- |
| **Frontend** | **React.js** | Used for building a modular, component-based user interface. |
| **Language** | **TypeScript** | Ensures robust type safety for complex data structures (weights, coordinates, capacities), preventing runtime errors. |
| **Styling** | **Tailwind CSS** | Utility-first framework for rapid development and guaranteed **100% responsiveness** across all viewports. |
| **Tooling** | **Vite** | Lightning-fast build tool for development server speed and efficient bundling. |
| **Package Manager**| **Bun** | Modern runtime and package manager used for high-speed dependency management. |
| **State Mgt.** | **(e.g., Redux Toolkit / React Query)**| Used for centralized state management of dynamic data like filtering options and request status. |

---

## 4. Architecture & Design Choices

### Dual-Sided Marketplace Architecture
* The application is fundamentally designed with **Role-Based Access Control (RBAC)** in mind, ensuring Shippers can only access shipping features and Carriers only access vehicle management tools.

### Data Integrity with TypeScript (`.tsx`)
* All component files use the `.tsx` extension to enforce **TypeScript interfaces** on props and state (e.g., `interface ShipmentProps`), guaranteeing data is correctly structured before any network or component operation.

### Performance Optimization
* The use of **Vite** and lazy loading ensures that only necessary assets are loaded, contributing to a fast initial page load and excellent user experience.

---

## 5. Setup and Run Locally

Follow these instructions to get a copy of the project running on your local machine.

### Prerequisites
You need to have **Bun** installed on your system.

```bash
# Example: Install Bun
curl -fsSL [https://bun.sh/install](https://bun.sh/install) | bash
