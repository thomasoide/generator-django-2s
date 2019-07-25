## Bootstrapping a (macOS) local development environment

Below are the steps to set up a local server on a Mac. These instructions have been tested on the latest releases of macOS Mojave (10.14), High Sierra (10.13) and macOS Sierra (10.12).

Open your terminal application, and type in each of these commands in the order specified.

### 1. Install Xcode Command Line Tools

Xcode is a large suite of software development tools and libraries, provided by Apple. We only need some of these tools (e.g., the GCC compiler), which is included in the subset Xcode called the Command Line Tools:

```bash
xcode-select --install
```

You'll then see a prompt, select "Install", then chill for a few minutes.

### 2. Install pyenv

[`pyenv`](https://github.com/pyenv/pyenv) helps you manage different versions of Python running on the same machine.

We can install it with homebrew:

```bash
brew install pyenv
```

### 3. Initialize pyenv in your shell

The default Unix shell for macOS is bash. We can confirm that this default is still intact:

```bash
echo "$SHELL"
```

And here is what you should see:

```bash
/bin/bash
```

We need to add a few lines of code to a file named `.bash_profile`, which is a configuration file that runs whenever a user starts their shell environment.

First, we need to an environment variable, which is value stored in your shell environment that can be used by software running within that environment. The specific environment variable we need to set is `PYENV_ROOT`, which should point to the directory where pyenv stores its data:

```bash
echo -e 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bash_profile
```

Then we run the command to initialize pyenv at the end of the profile, as directed by pyenv's [docs](https://github.com/pyenv/pyenv#basic-github-checkout):

```bash
echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n  eval "$(pyenv init -)"\nfi' >> ~/.bash_profile
```

In order for this change to take effect, restart your shell. Do this by closing your current Terminal application window and opening a new one.

### 4. Install PostgreSQL

PostgreSQL is an open-source relational database manager, which is required for this project.

```bash
brew install postgresql
```

Then, we use a shortcut provided by homebrew for starting PostgreSQL.

```bash
brew services start postgresql
```

### 5. Configure PostgreSQL

We have to create a database for our user profile:

```bash
createdb `whoami`
```

Then create a super user named "postgres", which is the typical configuration.

```bash
createuser -s postgres
```
