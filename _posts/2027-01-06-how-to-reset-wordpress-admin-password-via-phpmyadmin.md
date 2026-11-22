---
layout: post
title: "Reset WordPress Password via phpMyAdmin"
h1: "How to Reset Your WordPress Admin Password via phpMyAdmin and password_hash()"
description: "A developer and site administrator guide to manually resetting a locked WordPress wp-admin password directly in MySQL/MariaDB using phpMyAdmin and..."
date: 2027-01-06
topic: software
tags: ["wordpress", "database", "web-security"]
read_mins: 5
audience: Web Developers, Systems Administrators, WordPress Site Owners, Database Administrators
image: "/assets/images/topics/software-card.png"
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
-- hash generated from step 1, `$2y$10$Nb2Dwdhl/C9bTR77WwvMrOIaFc8ia2/OPXS9WPhIn6auhuEsEWrl.`
UPDATE `wp_users` 
SET `user_pass` =  '$2y$10$Nb2Dwdhl/C9bTR77WwvMrOIaFc8ia2/OPXS9WPhIn6auhuEsEWrl.'
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

---

## Choosing the Right Recovery Route

Database access is powerful, but it is not always the shortest path. Match the method to the failure:

| Situation | Preferred route | Why |
| :--- | :--- | :--- |
| PHP executes and WordPress loads, but reset mail is missing | [PHP recovery script]({{ '/2027/01/05/how-to-reset-wordpress-wp-admin-login-password-php-script/' | relative_url }}) | Core functions handle hashing and session invalidation for you. |
| Reset emails bounce or never arrive | Review mail setup and [email verification]({{ '/2027/01/10/how-to-verify-email-addresses-and-prevent-bounces/' | relative_url }}) | Fixing delivery restores the normal self-service flow. |
| PHP execution blocked, core files broken, or no mail access | This phpMyAdmin method | It works directly against the stored user record. |
| Repeated lockouts after a successful reset | Investigate plugins, bots, and login policy | A password change alone does not fix the underlying cause. |

Treat direct SQL as a break-glass procedure: take a backup of the `wp_users` row first, and record who made the change and why.

---

## Failure Modes and Safe Recovery

* **Wrong table prefix** — many installations use something other than `wp_`. Check `$table_prefix` in `wp-config.php` and confirm the table name in the left sidebar before running an `UPDATE`.
* **Wrong database** — a hosting account may contain several sites. Confirm `DB_NAME` in `wp-config.php`; updating a similarly named database is a common and avoidable mistake.
* **Hash format not accepted** — different WordPress versions accept different hash formats. A generic `password_hash()` string may not authenticate on every installation. If the bcrypt-style hash in the example does not work, use the MD5 function in phpMyAdmin's Function dropdown, which WordPress has historically accepted and re-hashed on first login, or use the core-function script linked above.
* **Sixteen- or thirty-two-character confusion** — pasting the *plain-text* password into `user_pass` never works. The column must contain a hash, never the password itself.
* **Writing to a read-only replica** — some control panels expose a replica. If the update appears successful but the old password still works, confirm you are connected to the primary database.
* **Object or page cache** — a cached login page rarely affects password checks, but stale admin screens can be confusing. Clear caches after recovery and test in a private window.
* **Multisite** — user tables and site registrations can differ. Confirm which network and site the account belongs to before editing.
* **No session invalidation** — changing the hash directly does not explicitly clear active auth cookies in the way core functions do. Consider forcing all sessions to end via your security tooling or by updating the user's auth key, and rotate the password again after login.

If the update affects zero rows, the `WHERE` clause does not match. Re-check `user_login`, `ID`, and the prefix rather than removing the filter and running a broader update.

---

## Safety Checklist

- [ ] A fresh database backup exists before any write.
- [ ] `DB_NAME` and `$table_prefix` were read from the live `wp-config.php`.
- [ ] The exact administrator `user_login` and `ID` were confirmed with a `SELECT`.
- [ ] The `UPDATE` includes a restrictive `WHERE` clause and `LIMIT 1`.
- [ ] The password is unique, strong, and not written into tickets or chat messages.
- [ ] You verified which database node you are writing to.
- [ ] You logged in successfully and then changed the password again through the dashboard.
- [ ] Any temporary phpMyAdmin session or shared terminal access was closed afterwards.

For the wider question of how often recovery procedures should be reviewed and who owns them, see [choosing a website maintenance plan]({{ '/2026/12/02/website-maintenance-plans-what-is-included-how-to-choose/' | relative_url }}).

---

## FAQ

**Why does the guide show both MD5 and a bcrypt-style hash?** They illustrate two different routes: the Function dropdown computes MD5 at edit time, while the SQL example uses a precomputed hash from `password_hash()`. WordPress version behaviour differs, so verify authentication after the change and fall back to a core-function reset if needed.

**Can I reset a password without knowing the username?** Yes. Run the `SELECT` query shown above, identify the correct administrator, and use both `user_login` and `ID` in the `WHERE` clause.

**Will this unlock an account locked by a security plugin?** Not necessarily. A plugin may enforce its own lockout state. After logging in, review the plugin's logs and allow-list your IP if appropriate.

**Is editing the database riskier than using the PHP script?** It bypasses application validation, so a typo can affect the wrong row. That is why the backup, `SELECT`, and narrow `WHERE` clause matter.

---

## Next Steps

After you regain access, immediately change the password through **Users → Profile**, review administrator accounts, and check for unfamiliar plugins or scheduled tasks. Then find out why the normal reset path failed — mail delivery, plugin conflict, or a lost mailbox — so the next incident does not require database access. Keep a dated note of the procedure and the checks that worked; rehearsing recovery calmly is far easier than improvising it during an outage.