# 🗺️ Vangoux website layout

  <img  src="./layout-images/image-desktop.png"  width="1000">

### 🔗 [Project layout link](https://art-litv.github.io/vangoux-layout/)

📏 Layout supports mobile (up-to-640) and desktop (up-to-1440) versions

### 🧰 The tech stack is:

-   [HTML5](https://en.wikipedia.org/wiki/HTML5)

-   [CSS3](https://en.wikipedia.org/wiki/Cascading_Style_Sheets)

-   [Flexbox](https://en.wikipedia.org/wiki/CSS_Flexible_Box_Layout)

-   [Sass (Scss)](https://sass-lang.com/)

-   [BEM methodology](https://en.bem.info/methodology/)

### 🗂️ Project structure

#### HTML

HTML sections are divided with comments.
HTML tag classes are named according to the BEM methodology

#### ICONS

Folder where all the project icons are stored.

#### LAYOUT IMAGES

Contains layout images for mobile and desktop versions

#### STYLES

Project style files (SCSS) are stored here.

<b>Inner structure</b>:

-   <b>abstracts</b>
    -   Gathers all Sass tools and helpers used across the project. Every global variable, function, mixin and placeholder should be put in here.
-   <b>base</b>
    -   Holds what we might call the boilerplate code for the project. In there, you might find some typographic rules, and probably a stylesheet (that I’m used to calling `_base.scss`), defining some standard styles for commonly used HTML elements.
-   <b>components</b>
    -   For small components, there is the `components/` folder. While `layout/` is macro (defining the global wireframe), `components/` is more focused on widgets. It contains all kind of specific modules like a slider, a loader, a widget, and basically anything along those lines. There are usually a lot of files in components/ since the whole site/application should be mostly composed of tiny modules.
-   <b>layout</b>
    -   Contains everything that takes part in laying out the site or application. This folder could have stylesheets for the main parts of the site (header, footer, navigation, sidebar…), the grid system or even CSS styles for all the forms.
-   <b>index.scss</b>
    -   The main file (usually labelled `main.scss`) should be the only Sass file from the whole code base not to begin with an underscore. This file should not contain anything but `@import` and comments.

#### .prettierrc

Contains default prettier configuration

#### styles.css

SASS compiled file (not minified)

### Author

Artem Litvinenko
