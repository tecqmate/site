---
layout: post
title: "How to Run Native Docker on Windows Without Docker Desktop (Using Skrog & WSL 2)"
description: "Learn how to set up upstream Docker Engine on Windows using Skrog, Docker CLI, and Docker Compose via WSL 2, completely bypassing Docker Desktop's resource overhead and licensing constraints."
date: 2027-01-13
tags: ["Docker", "WSL2", "Windows", "DevOps", "Containers", "Skrog"]
read_mins: 4
audience: Windows developers, DevOps engineers, and power users seeking a lightweight, containerized development environment without Docker Desktop
---

If you love containerized workflows but want to bypass Docker Desktop’s heavyweight footprint, memory overhead, or licensing boundaries, you aren't out of luck.

Using Windows Subsystem for Linux (WSL 2) combined with Skrog, the Docker CLI, and Docker Compose, you can set up a native, lightweight, and performant developer environment. Skrog acts as an open-source bridge, running the upstream Docker Engine (`dockerd`) seamlessly inside a WSL 2 distribution while exposing the genuine Docker API over a named pipe to Windows. This means tools like VS Code Dev Containers, Testcontainers, and Compose work seamlessly out of the box.

This guide walks you through setting up a complete, native Docker stack on Windows using WinGet packages without ever installing Docker Desktop.

---

## Prerequisites
- Windows 10 (Build 19041+) or Windows 11
- WSL 2 installed and enabled with a Linux distribution (such as Ubuntu)
- Administrator privileges on your Windows machine to run package installations

## Do you need to install WSL 2 first?
Because Docker relies on Linux kernel features (such as namespaces and cgroups), Windows cannot run the upstream Docker Engine natively on its own kernel. WSL 2 is mandatory because Skrog runs `dockerd` inside your WSL 2 Linux distro behind the scenes.
- If you already use WSL 2 (e.g., you already have Ubuntu installed): Skip this step and move directly to Step 1. You do not need to run `wsl --install` or manually enable Windows optional features via DISM/PowerShell.
- If you do not have WSL 2 installed yet: Open PowerShell as Administrator and run the modern single-command installer (which replaces the older `Enable-WindowsOptionalFeature` commands):

```powershell
  wsl --install
  ```
(Restart your computer once the installation finishes).
---

## Step-by-Step Installation Guide
You can install all required components cleanly from your terminal using WinGet (or via their respective winstall.app links: Skrog, Docker Compose, and Docker CLI).

Step 1: Install the Docker CLI
The Docker client allows you to run `docker` commands from your Windows PowerShell or Command Prompt, communicating directly with the backend engine.
Run the following command in an administrator terminal:
```powershell
winget install -e --id Docker.DockerCLI
```

Step 2: Install Docker Compose
To run multi-container setups using `docker-compose.yml` files directly on Windows, install the Docker Compose CLI plugin:
```powershell
winget install -e --id Docker.DockerCompose
```

Step 3: Install Skrog (Docker Engine on WSL 2)
Skrog sets up and manages the upstream Docker Engine inside WSL 2, bridging it to your Windows host environment.
```powershell
winget install -e --id wslkit.skrog
```
---

Initializing and Starting Skrog
Once the WinGet packages are installed, open a new terminal window so your updated `PATH` variables load properly, then initialize and start the Skrog backend:

Initialize / Install the Engine Service:
```powershell
   skrog install
   ```
(This sets up the upstream Docker Engine backend inside your default WSL 2 distribution).

Start the Docker Engine Daemon:
```powershell
   skrog start
   ```
(This boots up `dockerd` inside WSL 2 and establishes the named pipe bridge back to your Windows host).

---

## How to Verify the Entire Stack is Working?
To confirm that your Windows CLI, the Skrog bridge, and the WSL 2 Docker Engine are communicating properly, run these three verification checks:
1. Check the Client and Server Connection
```powershell
docker version
```
Expected Result: Both the Client and Server (Docker Engine) version details print cleanly without connection timeouts or named pipe errors.
2. Verify Docker Compose
```powershell
docker-compose version
```
Expected Result: Outputs the installed Docker Compose version without dependency or path errors.
3. Run a Test Container
```powershell
docker run --rm hello-world
```
Expected Result: Docker pulls the lightweight `hello-world` image and prints the `"Hello from Docker!"` confirmation message, proving containers execute properly through the WSL 2 backend.

---

## Wrapping Up
With this setup complete, your Windows terminal can natively spin up containers, build images via BuildKit, and orchestrate multi-container apps using Docker Compose—all powered by a genuine Linux kernel backend via WSL 2, completely free of Docker Desktop.