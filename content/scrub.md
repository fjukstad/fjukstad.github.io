---
title: .NET Core tools and Github Actions
date: 2020-07-02
author: Bjørn Fjukstad
---

TL;DR [.NET Core tools](https://docs.microsoft.com/en-us/dotnet/core/tools/global-tools-how-to-create)
are a great way of developing small platform-independent command line tools
with C# and .NET. [Github Actions](https://github.com/features/actions) are
really great for automating the whole process of building, and publishing
these tools.

## Introduction

Recently I have been switching a lot between `Powershell` on Windows and `bash`
in Ubuntu in [WSL](https://docs.microsoft.com/en-us/windows/wsl/) to get some
of our [openEHR](https://www.openehr.org/) components in .NET running on
Linux.

Since I was switching back and forth between the different shells,
there were times when I wished I had access to the same tools in both shells.
For example, in the development process I wanted to remove all build
artifacts to make a clean build. On Ubuntu I could run a command such as
`find . -name bin -exec rm -rf {} \;` to recursively find and remove all
folders named `bin`. In `Powershell`, I had to find a separate command and
run that etc. etc.

Since I had been hearing a lot about .NET Core tools, and building code with
Github Actions, I thought that it would be a fun experiment to create a small
tool for removing directories, and publishing it as a .NET Core tool to
[nuget.org](https://nuget.org).

## Background

When we compile code or fetch dependencies in .NET projects, the build tools
usually put the build artifacts into `bin/` and `obj/` folders within the
project. Once in a while it might be useful to clean out these directories.

When you install the [.NET Core CLI](https://dotnet.microsoft.com/download) you
get a bunch of different CLI tools for developing your software.
[`dotnet clean`](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-clean)
is a tool that cleans out the output from the previous build. However, it only
cleans out build artifacts specified in a MSBuild project or solution.
And the project had been built on Windows, running `dotnet clean`
on Ubuntu in WSL resulted in error messages such as
`NuGet.Packaging.Core.PackagingException: Unable to find fallback package folder 'C:\Program Files\dotnet\sdk\NuGetFallbackFolder'.`
which does not make a lot of sense on Ubuntu.

In addition, the library I was working on targeted both `net461` and
`netstandard2.0`, and since .NET Framework is not a thing on Ubuntu, running
`dotnet clean` after building it on Windows, left `net641` `dll`s and other build
artifacts in the output directories.

As I already mentioned, in bash on Ubuntu I had a command for removing all
`bin/` and `obj/` folders, but I wanted to run this command both from
`Powershell` and `bash`. So instead of finding a similar command in
`Powershell`, I wrote my first .NET Core tool, `scrub`.

## Step 1: Build the .NET Core tool

I followed the guide on how to create a .NET Core tool at
[docs.microsoft.com](https://docs.microsoft.com/en-us/dotnet/core/tools/global-tools-how-to-create)
where it all started with `dotnet new console scrub`. To parse command line
flags etc. I used
[System.CommandLine.DragonFruit](https://github.com/dotnet/command-line-api/wiki/Your-first-app-with-System.CommandLine.DragonFruit)
which is great and easy to use. When I was mostly happy
with `scrub` I packed it up with `dotnet pack` locally and installed it with
`dotnet tool install` to see that everything worked as planned.

## Step 2: Push to Github and create a Workflow

I set up a [scrub](https://github.com/fjukstad/scrub) repository and created
a .NET Core workflow in Github Actions from the starter workflows. This
workflow simply restores the dependencies and builds the project. A Github
Workflow is just a `yaml` file with the different steps of the build. In the
starter workflow these are simply `dotnet restore` and `dotnet build`. Below
is the starter workflow, which I copied from the
[starter-workflows repository](https://github.com/actions/starter-workflows/blob/master/ci/dotnet-core.yml).

```yaml
name: .NET Core

on:
  push:
    branches: [master]
  pull_request:
    branches: [master]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - name: Setup .NET Core
        uses: actions/setup-dotnet@v1
        with:
          dotnet-version: 3.1.101
      - name: Install dependencies
        run: dotnet restore
      - name: Build
        run: dotnet build --configuration Release --no-restore
      - name: Test
        run: dotnet test --no-restore --verbosity normal
```

The workflow above is fairly simple: it gets the dependencies, builds the project,
and runs the tests. You can specify what version of the .NET SDK

The Github workflows are very similar to
[Azure Pipelines](https://docs.microsoft.com/en-us/azure/devops/pipelines/ecosystems/dotnet-core?view=azure-devops)
if you have tried them out.

## Step 3: Get an API Key

To push packages to [nuget.org](https://nuget.org) you'll need a user
account, and an API KEY. I set up my account and created an API
[here](https://www.nuget.org/account/apikeys).

When I had my API key, I stored it as a
[secret](https://docs.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets)
in my repository, and named it `NUGET_API_KEY` which I could use in my Workflow.

## Step 4: Update the workflow to get it to push to nuget.org

To get a .NET Core tool pushed to [nuget.org](https://nuget.org) you simply
need to add a `dotnet pack` and a `dotnet nuget push` step to the Workflow:

```yaml
- name: Pack
  run: dotnet pack -c Release -o out
- name: Push generated package to GitHub registry
  run: dotnet nuget push out/*.nupkg -k ${{ secrets.NUGET_API_KEY }} --skip-duplicate --no-symbols true -s https://api.nuget.org/v3/index.json
```

That's it! It's pushed to [nuget.org/packages/scrub](https://www.nuget.org/packages/scrub) and it's possible to download and install it with

```
dotnet tool install scrub
```

## Conclusion

.NET Core tools are a neat way of developing small platform-independent
command line tools. If you come from the [go](https://golang.org) community, you
are probably used to getting small tools with `go install`, and these .NET
Core tools are very similar. The largest difference is however that with `go`
you can install a tool from source, or a Github repository, while with the
current `dotnet tool install` you'll have to specify a NuGet package. It
would be interesting to try to implement something like
`dotnet tool install github.com/fjukstad/scrub` though!

Github Actions were also nice to get started with. Easy to set up a build,
and the build stays together with your code, nice and simple. Would
reccommend to a friend!
