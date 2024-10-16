# Automated Invitation Link Script

This Node.js script uses Puppeteer to automate the process of sending activation emails for user accounts on a specific website. It reads user IDs from a file, logs into the admin portal, and sends activation emails.

## Prerequisites

- Node.js (version 14 or higher)
- An admin account for the website
- `puppeteer` and `dotenv` Node.js packages

### Installing Node.js

If you don't have Node.js installed, follow these steps:

1. Go to the [Node.js official website](https://nodejs.org/).
2. Download and install the **LTS** (Long Term Support) version for your operating system.
3. Follow the installation instructions specific to your system:
   - On Windows: Follow the setup wizard and complete the installation.
   - On macOS: Use the `.pkg` file and follow the installation guide.
   - On Linux: You can use package managers like `apt` or `yum` depending on your distribution.

   For more detailed instructions, refer to the [official Node.js installation documentation](https://nodejs.org/en/download/package-manager/).

Once installed, confirm that Node.js is correctly installed by running the following commands in your terminal:

```bash
node -v
npm -v
```

These commands should print the version numbers of Node.js and npm (Node's package manager).

## Setup Instructions

### 1. Clone the Repository

First, clone the repository to your local machine.

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

### 2. Install Dependencies

Install the required Node.js packages using `npm`:

```bash
npm install
```

This will install the necessary packages like `puppeteer` and `dotenv` as specified in the `package.json`.

### 3. Create the `.env` File

Create a `.env` file in the root of your project directory and add the following environment variables:

```
ADMIN_ACCOUNT=your_admin_username
ADMIN_PASSWORD=your_admin_password
```

Replace `your_admin_username` and `your_admin_password` with the actual admin credentials for the website.

### 4. Add User IDs to `accounts.txt`

Create a file named `accounts.txt` in the root of your project directory. Each user ID should be on a new line.

Example of `accounts.txt`:

```
33
33
33
```

Each user ID will be padded to 10 characters with leading zeros.

### 5. Run the Script

Once everything is set up, run the script using the following command:

```bash
node index.js
```

### 6. How the Script Works

1. The script reads user IDs from the `accounts.txt` file.
2. It logs into the admin website using the credentials from the `.env` file.
3. For each user ID, the script navigates to the user's admin page and sends an activation email.

### Notes

- Make sure the website is accessible and the admin account credentials are correct.
- The script runs in non-headless mode (`headless: false`), meaning you will see the browser actions. If you want to run it in headless mode, change the `headless` option to `true` in the Puppeteer configuration.

### Troubleshooting

- If the script fails to log in, verify that the credentials in the `.env` file are correct.
- Ensure that the selectors used in the script match the structure of the website.
- If you encounter timeout issues, try increasing the delays between actions in the script.

---

**Author**: Nicolas Scheurer  
