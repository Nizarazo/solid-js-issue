# Project guidelines
## Perforce
Don't submit to P4:
node_modules
package-lock.json
the content of the following folders: dist, out - which are mainly products and not source code.

## Tips
Use .p4ignore before reconcile offline work to avoid Perforce from looking for changes in node_modules

## Delete node modules

node delete-node-modules.js
** In windows, run in bash terminal and not in powershell.

## At the first time

In BigSur (possibly other OS-s) give read & write permission recursively to HTML packages before Lerna bootstrapping (lerna bootstrap);

# Lerna
## Install Lerna Globally
sudo npm i -g lerna --save-dev
or
sudo npm i --g lerna @version(opt) --save-dev

If there are audit fix warnings:
npm audit fix

## Run with

lerna bootstrap
