---
layout: post
title: "How to Reset Your WordPress Admin Password via phpMyAdmin and password_hash()"
description: "A developer and site administrator guide to manually resetting a locked WordPress wp-admin password directly in MySQL/MariaDB using phpMyAdmin and password_hash() replacement."
date: 2027-01-06
tags: ["wordpress", "database", "web-security"]
read_mins: 5
audience: Web Developers, Systems Administrators, WordPress Site Owners, Database Administrators  
---

## Direct Database Access When PHP Execution Is Blocked

When access to the WordPress `wp-admin` dashboard is completely blocked—and server restrictions or broken core files prevent executing custom PHP recovery scripts—modifying the underlying MySQL or MariaDB database directly via **phpMyAdmin** offers a direct, fail-safe path to administrative recovery.

Because WordPress uses hashed passwords stored in the `wp_users` table, you cannot simply type a plain-text password into the database. Understanding how WordPress handles legacy MD5 hashes and automatically upgrades them upon login allows you to safely force an account password update directly inside database rows.

---

## Password Hash Incompatibility and Table Prefix Confusion
* **What is the problem?** Inexperienced administrators often attempt to paste plain-text passwords directly into the `user_pass` column, or fail to apply the **MD5** hashing function in phpMyAdmin, resulting in invalid login credentials and continued dashboard lockout.
* **Why does it happen?** WordPress core expects a salted/hashed string in `user_pass`. While modern WordPress uses the `phpass` framework for password hashing, it maintains backward compatibility with raw MD5 hashes: when you enter a standard 32-character MD5 hash into `user_pass`, WordPress accepts it on the first login and automatically re-hashes it into a modern, salted `phpass` hash upon successful authentication.

---

## The Direct SQL Emergency Recovery Query

If you prefer running a direct SQL query inside phpMyAdmin's **SQL** tab instead of using the graphical row editor, execute the following query (replace `wp_` with your database table prefix if customized):

```php
<?php

$new_password   = 'YourNewStrongPass123!'; // Desired recovery password
echo password_hash($new_password, PASSWORD_BCRYPT); // step 1, prints password hash
```
---

> **Note:** If you do not know your exact administrator username, you can list all administrator accounts using this **SELECT query:**
> 
> ```
> SELECT ID, user_login, user_email FROM wp_users;
> ```

---

```sql
-- Direct SQL Password Update for WordPress Administrator, assuming your username is `admin`
-- hash generated from step 1, `$2y$10$xqLeKrCh7cJ0ytEuHnE6IOP30IFwqOA7PNJCYDBEWFdSzV.l5QlPu`
UPDATE `wp_users` 
SET `user_pass` =  '$2y$10$xqLeKrCh7cJ0ytEuHnE6IOP30IFwqOA7PNJCYDBEWFdSzV.l5QlPu'
WHERE `user_login` = 'admin' and `ID` = 1 limit 1;
```
## A 4-Step phpMyAdmin Recovery Protocol

To safely reset your `wp-admin` credentials through the cPanel/hosting database interface, follow this step-by-step workflow:

-   **Step 1: Open phpMyAdmin and Locate Your Database:** Log into your hosting cPanel, Plesk, or server management dashboard, launch **phpMyAdmin**, and select your WordPress database from the left sidebar (check `wp-config.php` for `DB_NAME` if hosting multiple sites).
-   **Step 2: Access the `wp_users` Table:** Click on the `wp_users` table (or `{prefix}_users`). Locate the target administrator account under the `user_login` column and click **Edit** (the pencil icon) on that row.
-   **Step 3: Update `user_pass` with MD5 Hashing:** Find the `user_pass` field row. In the **Function** dropdown column, select **MD5**. In the **Value** column, clear the existing hash string and type your new desired plain-text password. Click **Go** at the bottom to save changes.
-   **Step 4: Authenticate and Verify Hash Upgrade:** Navigate to your login URL (`https://yourdomain.com/wp-admin`), log in with your username and new password. WordPress will authenticate the MD5 hash and immediately convert it to a secure `phpass` format in the database.

## Final Verdict

Resetting a WordPress administrator password via phpMyAdmin is a dependable, high-control recovery technique when all application-level options are unavailable. By applying the MD5 function in phpMyAdmin or executing a targeted `UPDATE` query, you bypass broken application code, clear login locks, and regain complete administrative authority over your site.