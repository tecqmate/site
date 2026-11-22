---
layout: post
title: "Native Docker on Windows Without Docker Desktop"
h1: "How to Run Native Docker on Windows Without Docker Desktop (Using Skrog & WSL 2)"
description: "Learn how to set up upstream Docker Engine on Windows using Skrog, Docker CLI, and Docker Compose via WSL 2, completely bypassing Docker Desktop's..."
date: 2027-01-13
topic: software
tags: ["Docker", "WSL2", "Windows", "DevOps", "Containers", "Skrog"]
read_mins: 4
audience: Windows developers, DevOps engineers, and power users seeking a lightweight, containerized development environment without Docker Desktop
last_reviewed: 2026-11-23
sources:
  - label: "Skrog project"
    url: "https://github.com/wslkit/skrog"
    note: "Upstream project documentation"
  - label: "Microsoft WSL container tutorial"
    url: "https://learn.microsoft.com/en-us/windows/wsl/tutorials/wsl-containers"
    note: "Official WSL container guidance"
image: "/assets/images/topics/software-card.png"
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
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
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
## In case if `skrog` command fails throwing error such as:
`Failed to detect nested virtualization support, error: HCS_E_SERVICE_NOT_AVAILABLE`

The failure is from **WSL/Windows**, not the rootfs download. `HCS_E_SERVICE_NOT_AVAILABLE` means the Windows Host Compute Service (HCS), which WSL2 relies on, isn’t available. The “nested virtualization” warning may also matter if Windows itself is running inside a VM.

Try these steps in **Administrator PowerShell**:

1. Enable the required Windows features:
   ```powershell
   dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
   dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
   ```
2. Restart Windows.
3. After reboot, run:
   ```powershell
   wsl --update
   wsl --status
   Get-Service vmcompute
   ```
   If `vmcompute` is stopped, try:
   ```powershell
   Start-Service vmcompute
   ```
4. Retry `skrog install`.

Also check that hardware virtualization is enabled in BIOS/UEFI. If Windows is a guest VM, enable **nested virtualization** in the hypervisor. If you can’t enable virtualization, Skrog’s WSL2-based setup may not work in that environment.

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

---

## Architecture at a Glance

It helps to know which component owns what when something breaks:

* **WSL 2** supplies the Linux kernel, namespaces, and cgroups that containers need.
* **Skrog** installs and manages the upstream Docker Engine (`dockerd`) inside your chosen WSL distribution and exposes the API to Windows.
* **Docker CLI and Compose** are just clients. They do not run containers themselves.
* **The named pipe** is the bridge between the Windows client and the Linux daemon.

Because the engine lives in a distribution, container filesystems and image layers live there too. That is useful for performance, but it means deleting the distribution also deletes your local images and volumes. Before deciding whether this route suits you, compare the trade-offs in [Docker Desktop vs Docker Engine on WSL 2]({{ '/2026/12/08/docker-desktop-vs-docker-engine-wsl2-performance-licensing-migration/' | relative_url }}). The same Linux-native setup is a good base for practising [blue-green and canary deployments]({{ '/2026/11/16/zero-downtime-deployments-blue-green-and-canary/' | relative_url }}) locally.

---

## Failure Modes and Diagnostics

| Symptom | Likely cause | What to try |
| :--- | :--- | :--- |
| `Cannot connect to the Docker daemon` | Skrog is stopped, or the named pipe is missing | Run `skrog start`, open a new terminal, then retry `docker version`. |
| `docker` works in WSL but not PowerShell | Client installed only inside Linux, or `PATH` not refreshed | Install the Windows CLI with WinGet and open a fresh terminal. |
| `skrog install` reports nested virtualization errors | Host Compute Service unavailable or virtualization disabled | Check `vmcompute`, enable virtualization in BIOS/UEFI, and confirm nested virtualization if Windows is a guest VM. |
| Port already in use | Another engine or service holds the port | Identify the listener before changing Compose ports. |
| Builds fail only on large images | Disk or memory pressure in the WSL distribution | Check free space in WSL and consider resource limits in `.wslconfig`. |
| Containers lose network access after reboot | Engine started before the virtual network was ready | Restart Skrog and verify with a simple pull and run. |
| Volumes disappear after a WSL reset | Data lived inside the distribution | Store important data on a persisted location and back it up. |

One recurring mistake is running verification commands in the wrong shell. A successful `docker run` inside Ubuntu does not prove the Windows named-pipe bridge works. Run the three checks from the same PowerShell session you intend to use for daily development.

---

## Checklist Before You Rely on This for Daily Work

- [ ] `docker version` reports both a client and a server from the Windows terminal.
- [ ] `docker-compose version` resolves without a path error.
- [ ] A test container starts and is removed cleanly with `docker run --rm`.
- [ ] WSL has enough free disk space for your images and build cache.
- [ ] Hardware virtualization is enabled and `vmcompute` is running.
- [ ] You know which WSL distribution hosts the engine and how to back up its data.
- [ ] IDE integrations point at the same engine as your terminal.
- [ ] You have documented the restart steps for after a Windows update.

---

## FAQ

**Is this the same as Docker Desktop?** No. You are running the upstream engine in WSL 2 with a CLI bridge. Features bundled with the Desktop application—such as its GUI dashboard and certain integrations—are not part of this setup.

**Can I use Docker Compose files unchanged?** In most cases yes, since the Compose plugin speaks the same Docker API. Test volume and networking settings in your own project before relying on them.

**Will this reduce memory usage?** It can avoid the Desktop application's overhead, but the engine and containers still consume resources inside WSL. Measure on your own machine rather than assuming a figure.

**What happens after a Windows reboot?** The WSL distribution may need to start again. If clients cannot connect, run `skrog start` and repeat `docker version`.

---

## Next Steps

Move one real project across rather than migrating everything at once. Run its Compose stack, execute the test suite, and check volume persistence after a restart. If your team uses dev containers or Testcontainers, verify those integrations explicitly—they depend on the same named pipe as the CLI. Once the workflow is stable, write down the install and recovery commands in your team's setup notes so a reboot or a new laptop does not become a research project.
