---
title: Neovim and .NET
date: 2021-07-21
author: Bjørn Fjukstad
---

[![screenshot of nvim](/blog/images/nvim.png)](/blog/images/nvim.png)

Just before I went on summer vacation, I spent the last week writing .NET
code in [Neovim](https://neovim.io/). In the
[0.5 release of Neovim](https://twitter.com/Neovim/status/1411049544108892164)
they've added native support for the Language Server Protocol (LSP), which means
that you can get go-to-definition, find-references, completion, and other neat
features directly in Neovim.

I'm not a big fan of big clunky IDEs such as Visual Studio, so returning to vim
as my daily driver has been on my wish list ever since I started at my current
job. However, since I'm no C# and .NET maestro yet, features such as auto
completions and finding references is almost necessary for me to have set up in
my editor when I'm working in large enterprise codebases.

With WSL, the Windows Terminal, and Neovim it's now absolutely possible to get a
great developer experience writing .NET apps on Windows (sort of) without ever
leaving the terminal. One week in, I'm really impressed.

Here's a short description of what I did to get everything set up. If you've
already set up a dev environment in WSL or Ubuntu, skip to step 5.

1.  Install the [Windows Terminal](https://github.com/microsoft/terminal)
1.  Install [WSL](https://docs.microsoft.com/en-us/windows/wsl/)
1.  [Download and install Ubuntu 20.04](https://www.microsoft.com/en-us/p/ubuntu-2004-lts/9n6svws3rx71?activetab=pivot:overviewtab) in WSL
1.  Install the [.NET SDK](https://dotnet.microsoft.com/download).
1.  Install [Neovim](https://github.com/neovim/neovim/wiki/Installing-Neovim#homebrew-on-macos-or-linux).
    I opted for the Homebrew-route since I'm familiar with `brew` from my mac.
1.  Install the [OmniSharp](https://github.com/OmniSharp/omnisharp-roslyn)
    language server. I downloaded a binary and put it in `~/bin`.
1.  Install [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig) that
    launches and initializes LSP servers.
1.  Add the necessary config to your `init.nvim` to get the keybindings and
    completions set up. For more details, take a look at the [keybindings
    and completion
    section](https://github.com/neovim/nvim-lspconfig#keybindings-and-completion)
    in the `nvim-config/README.md`. Remember to put `omnisharp-roslyn` in the
    `local severs = {}` array!
1.  [Configure `nvim` to launch OmniSharp](https://github.com/neovim/nvim-lspconfig/blob/master/CONFIG.md#omnisharp),
    in other words, point it to where you installed Omnisharp (`~/bin` on my machine).

When you've gone through these steps, you'll get language support for C# and
.NET directly in Neovim, and you can do all your development work in the Windows
terminal!

After two weeks of every-day use, I'm really impressed with the developer
experience in Neovim with LSP support from Omnisharp. It just works!

If you have any issues setting this up yourself, feel free to reach out to me!
