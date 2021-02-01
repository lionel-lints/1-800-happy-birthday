# 1-800-Happy-Birthday

This site is a simple react static depoyment for [1800-Happy-Birthday](https://www.1800happybirthday.com/)

## Quick Start

1. Create an base if you haven't already.
2. Clone this repo: `git clone git@github.com:postlight/liftoff.git`.
3. Run `yarn install` to install dependencies.
4. Run `yarn setup` for a walkthrough on setting environment variables.
5. Run `yarn run start:dev` to start up the webpack dev server.
6. [Make changes to your Airtable base](#setting-up-your-airtable-base).
7. [Style your site](#styling).
8. [Deploy your site](#deploying-your-site).

## Table of Contents

1. [Getting Started](#getting-started)
   - [Cloning this Repo](#cloning-this-repo)
   - [Installing Yarn](#installing-yarn)
   - [Environment setup](#environment-setup)
   - [Setting up your environment variables](#setting-up-your-environment-variables)
2. [Setting up your Airtable base](#setting-up-your-airtable-base)
   - [Supported field types](#supported-field-types)
   - [Markdown](#markdown)
3. [Development](#development)
4. [Styling](#styling)
   - [Favicon](#favicon)
5. [Pagination](#pagination)
6. [Custom renderers](#custom-renderers)
7. [Build](#build)
8. [Deploying your site](#deploying-your-site)

## Getting Started

### Cloning/downloading this repo

If you're familiar with git, you can go ahead and clone this repo the normal way.

### Installing Yarn

This project uses [Yarn](https://yarnpkg.com) to download and manage copies of the third party code we used to build it. If you already have Yarn installed, you can skip to the next section. Otherwise, you can follow the instructions [here](https://yarnpkg.com/lang/en/docs/install/#mac-stable) to install it for macOS or [here](https://yarnpkg.com/lang/en/docs/install/#windows-stable) to install it for Windows.

If you're a Mac user, you may want to install Homebrew if you haven't already. Homebrew is a package manager that will allow you to easily download, install, and manage software such as Yarn. You can follow the instructions on [the Homebrew website](https://brew.sh/) or you can install it from the command line by:

1. Opening up a terminal window via the "Terminal" application
2. Copy and pasting the following into the terminal window and hitting Enter/Return

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

After the installation completes, you can then open a new terminal window (Cmd+T works) and run `brew install yarn` to install Yarn.

When that's done, open up another terminal window and run `yarn install`. This will download the 3rd party code this project needs in order to work.

### Environment setup

#### Setting up your environment variables

All of the environment variables we need to set up can be found by going to the right place on the Airtable website.

From your terminal, run:

```bash
yarn setup
```

This script will walk you through each step of the process. Simply follow the instructions, enter the value the prompts ask you for, and press enter to move on to the next step. If you want to change an environment variable after the fact, you can directly edit the `.env` file in the root directory of your project, or you can run `yarn setup` again.

## Setting up your Airtable base

### Supported field types

This project currently supports most but not all Airtable field types. The only field types it doesn't currently support are "Link to another record", "Barcode", and "Collaborator". For "Attachment" types, it currently only supports image files.

### Publishing rows

You have two options for determining which rows are published. By default, all rows visible to an Airtable view will be published. If you want, however, you can add a Published checkbox column to your table. Any row that doesn't have a checkmark in that field will not be displayed on your site. This makes it easy to create drafts of your rows before publishing. Remember: If you don't include this field, every row will be displayed by default.

### Slugs

A slug is a unique ID that represents a resource in a URL. If you have a website called `website.com` with an article on it called "What Is a Website?", for instance, you might want that article's page to look something like `website.com/what-is-a-website.html` to make it readable and easy to remember. You can specify slugs in your site by adding a `Slug` column to your Airtable table and populating it in each row with your desired slug. Note that slugs cannot contain spaces, so you must use `-` or `_` to separate words. You don't need to include `.html` in your slug—that will be handled automatically.

## Development

Entering `yarn run start:dev` into a terminal window will fire up a server that will allow you to view your site and style it in real time. Each time you save after editing CSS or custom renderers (more on these below), your work will be automatically reflected in the browser.

## Styling

Any CSS put in the `styles.css` file at `/custom/styles.css` will be injected into your site for styling purposes.

Your field names will always be added as classes in the corresponding HTML. So for example, a field called "Title" will generate an HTML element with the class `.Title`. There are other classes that are put in by default, detailed below. You can make use of these classes to style the site to your liking.

Out of the box, we've provided some boilerplate styling that we hope will help ease the styling process - to remove, simply remove the unwanted css from `/public/default.css`. To view the boilerplate designs, click [here](https://liftoff-boilerplate.netlify.com).

## Pagination

Pagination is automatically implemented on any site with more than 10 posts. This makes back + next buttons available on the homepage of your site for navigating between different pages of posts.

### Favicon

You can include a [favicon](https://wikipedia.org/Favicon) for your website by putting a `favicon.ico` image file in the `/custom` directory. It must conform to favicon specifications, meaning it should be a `.ico` file and should be 16x16 or 32x32 pixels in size.

## Custom renderers

If you're comfortable writing React, you may find yourself wanting to write a custom component to render one of your fields. Luckily this is easy to do!

To add a custom renderer for one of your fields, create a React component that accepts `name` and `value` as props in the `custom/renderers` folder, then import and export it in `custom/renderers/index.js`. The name of the file and component must match the name of the column you would like it to serve as renderer for. If the name of your column includes spaces, do not include the spaces in the name of the corresponding file and component. So a custom renderer for a column called "Body Text" should be a React component called `BodyText` in a file called `custom/renderers/BodyText.js` and exported from `custom/renderers/index.js` as such.

For example:

```javascript
// in ./custom/renderers/BodyText.js
import React from "react";

const BodyText = ({ name, value }) => {
  return (
    <div>
      The name of this field is {name}; its value is {value}
    </div>
  );
};

export default BodyText;
```

## Build

Running `yarn build` in a terminal window will execute a build script that will generate your site. The generated site will live in the `/dist` folder.

## Deploying your site

After you build your site, you can deploy it anywhere that you can serve static HTML.

One service we often use at Postlight is [Netlify](https://netlify.com). You can follow instructions on their site to get your site up and running—the main things you need to remember for this process are that the folder you want to deploy is `/dist` and the command you need to run to build the site is `yarn build`.

To set your environment variables on Netlify, you will have to input them manually by going to the Setting tabs from the Netlify page for your website and clicking on "Build & deploy" in the sidebar. Now scroll down a little to the "Build environment variables" section and copy in your environment variables from your `.env` file [as set up above](#setting-up-your-environment-variables). When you've finished, it should look something like the following:

![Netlify environment variables](/readme-assets/netlify-config.png)

## License

Licensed under either of the below, at your preference:

- Apache License, Version 2.0
  ([LICENSE-APACHE](LICENSE-APACHE) or http://www.apache.org/licenses/LICENSE-2.0)
- MIT license
  ([LICENSE-MIT](LICENSE-MIT) or http://opensource.org/licenses/MIT)

## Contributing

For details on how to contribute, see [CONTRIBUTING.md](./CONTRIBUTING.md)

Unless it is explicitly stated otherwise, any contribution intentionally
submitted for inclusion in the work, as defined in the Apache-2.0 license,
shall be dual licensed as above without any additional terms or conditions.

---

🔬 A Labs project from your friends at [Postlight](https://postlight.com). Happy coding!
