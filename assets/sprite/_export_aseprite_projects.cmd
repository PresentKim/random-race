@echo off
TITLE Export ASE projects
chcp 65001 > NUL

ECHO ┌ [Export] Start aseprite project exporting
ECHO │ 

FOR /D %%d IN (*) DO (
	cd %%d
	FOR %%a in (*.ase) DO (
		aseprite -b %%a --save-as {layer}/{tag}_{frame00}.png
		ECHO ├── %%d/%%a exported
	)

	cd ..
)

ECHO │ 
ECHO └ [Done]

pause > NUL