echo off
cls

setlocal enabledelayedexpansion

set dirp=%~dp0
set sxml=%dirp%..\src\page.xsl

for %%x in (%dirp%..\src\*.xml) do (
	set h=%dirp%..\%%~nx.html
	echo %%x -- !h!
	%dirp%msxsl.exe %%x %sxml% -o !h!
)

pause