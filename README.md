# Django 2S Generator

This is a Yeoman based project generator that generates bare-bones scaffolding for a Django project that's a bit more detailed than what Django offers out of the box.

This architecture is based on the book Two Scoops of Django and currently powers many of the Django applications built by the RJI Futures Lab.

## Homebrew

If you've already installed Homebrew, you can skip this step.

Homebrew is an un-official package manager for Macs. It helps us install and configure software that you can't find on the App Store.

You may already have it installed. Let's check by updating to the latest version:

```bash
brew update
```

If you get get something like this:

```bash
Updated Homebrew from bb038c7048 to ff3cede96f.
Updated 2 taps (homebrew/core, homebrew/cask).
==> New Formulae
i2pd                                      opensubdiv                                tdlib
==> Updated Formulae
cgal ✔                                    go                                        logstash
cmake ✔                                   godep                                     mariadb
```

But if you get this:

```bash
brew: command not found
```

Then you need to install it like this:

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

You will see a prompt that looks like this:

```bash
==> This script will install:
/usr/local/bin/brew
/usr/local/share/doc/homebrew
/usr/local/share/man/man1/brew.1
/usr/local/share/zsh/site-functions/_brew
/usr/local/etc/bash_completion.d/brew
/usr/local/Homebrew
==> The following new directories will be created:
/usr/local/bin
/usr/local/etc
/usr/local/include
/usr/local/lib
/usr/local/sbin
/usr/local/share
/usr/local/var
/usr/local/opt
/usr/local/share/zsh
/usr/local/share/zsh/site-functions
/usr/local/var/homebrew
/usr/local/var/homebrew/linked
/usr/local/Cellar
/usr/local/Caskroom
/usr/local/Homebrew
/usr/local/Frameworks

Press RETURN to continue or any other key to abort
```

So then press RETURN, and enter your password for your user account on your Mac.

## Install pipenv

`pipenv` has recently gained a lot of traction as tool to help Python developers manage workflows related to virtual environments, package installation and dependency management. As such, it is now the tool [recommended](https://packaging.python.org/tutorials/managing-dependencies/#installing-pipenv) by python.org for managing application dependencies.

```bash
brew install pipenv
```

## Install the generator

1. Assuming you're using a Mac and have installed Homebrew, run `brew install node`. You'll need Node 8 or later to use this generator.
2. Install [Yeoman](http://yeoman.io/): `npm install -g yo`
3. Clone this repository to your desktop or whatever location you chose (Since this is small scale, I figure it'd be easist to do this way): `git clone https://github.com/thomasoide/generator-django-2s.git`
4. cd into into the repository and type the command `npm link`

## Using the generator

1. Make a new directory from the command line and cd into the folder: `mkdir testproj ; cd testproj`
2. Run Yeoman `yo` and select the django-2s option.
3. Answer the prompts and wait for the project to create.
4. A README.md will automatically be generated in the project directory, which includes details about architecture and some changes you'll need to make by hand. Future versions of this generator will hopefully eliminate this need.   
5. Simply running `yo` doesn't put you in the clear yet. You'll also need to run `yo django-2s:startapp` to create an application within the project. Make sure your app name doesn't have spaces in it.

### More docs coming soon.
