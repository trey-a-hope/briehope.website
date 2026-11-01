# Brie Hope Website

A personal portfolio website for Brie L. Hope with a landing page, a photo portfolio organized into sections, an about page and contact details. The owner can sign in with a passcode and edit the site in place: change headings and text, upload photos and add portfolio sections. It's an AngularJS 1.4 app written in TypeScript on top of the Start Bootstrap "Creative" theme, with Firebase for content and images.

## Pages

States are defined in `app/routing/Routing.ts` (Angular UI Router):

| State | What it shows |
| --- | --- |
| `intro` | landing page with an editable title and subtitle (`app/landing/`) |
| `portfolio` | portfolio sections as image tiles, with "+ Section" for the owner (`app/portfolio/Portfolio.html`) |
| `full-portfolio` | every photo in one section, with "+ Photo" for the owner (`app/portfolio/FullPortfolio.html`) |
| `about` | bio text and a profile picture the owner can replace (`app/about/`) |
| `contact` | editable email and phone links (`app/contact/`) |
| `login` | passcode sign-in that turns on edit mode (`app/login/`) |

## How it works

- Page content lives in the Firebase Realtime Database under nodes such as `LandingPage`, `PortfolioPage`, `AboutPage`, `ContactPage` and `LoginPage`, and photos are stored in Firebase Storage (`app/services/`). The Firebase JS SDK 3.6 is loaded from the CDN in `index.html`.
- The login controller compares the typed passcode with the one stored in the database, and edit buttons appear when `loginService.isLoggedIn()` is true.
- Add and edit dialogs, confirmations and errors use the modal templates in `app/modal/`.
- `php/sendEmail.php` is a mail script for the theme's contact form.

## Tech stack

- AngularJS 1.4.8 + Angular UI Router, written in TypeScript (`tsconfig.json`, compiled `.js` files are committed next to the `.ts` sources)
- Firebase Realtime Database and Storage
- Start Bootstrap Creative theme: Bootstrap 3, Font Awesome, LESS
- Gulp for LESS compilation, CSS/JS minification and a BrowserSync dev server

## Getting started

```sh
npm install
npx gulp dev       # BrowserSync dev server with live reload
npx gulp           # compile LESS, minify CSS/JS and copy vendor files
```

After editing a `.ts` file, recompile it with the TypeScript compiler (`npx tsc`) so the matching `.js` file is updated.

## Note

The passcode check runs in the browser against a value read from the database, so it hides the edit buttons but doesn't secure the data. Firebase security rules are what actually decide who can write.

## License

The Creative theme is MIT licensed by Blackrock Digital LLC (see `LICENSE`).
