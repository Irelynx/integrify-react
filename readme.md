# Country application (Integrify React assignment task)

## Used technologies

* [React](https://reactjs.org)
* [TypeScript](https://typscriptlang.org)
* [Vite](https://vitejs.dev)
* [MUI (Material UI)](https://mui.com)
* REST-full API (data provided by [restcountries.com](https://restcountries.com))

## Task:

> [Notion link](https://integrify-academy.notion.site/React-assignment-c3a78ef0538e4170a7feb9d63cf06823)

### Assignment requirements

* [x] Create a home page (component) that displays the country data and it should look similar to **Image 1.**
* [x] When you click on the button, it should navigate to another page showing detailed information about that country as **Image 2**. The URL for country detail will look like this: [https://restcountries.com/v3.1/name/{name](https://restcountries.com/v3.1/name/%7Bname)}
* [x] Create a search field that allows users to search country by country name.
* [x] When displaying country data, please add the pagination or lazy loading to only show 5 countries as in **Image 1**.
* [x] Make use of the following react concepts:
    - Use Functional React Component
    - React hooks: `useState`, `useEfect`, `useParams`
* [x] You can use Bootstrap, Vanilla CSS, or any other framework you wish for styling
* [ ] After finishing the task, push the code to a public repository on GitHub and deploy it to Netlify, Vercel, or any other static website hosting alternatives. When submitting the assignment, provide us with both links i.e. the link to the GitHub repository and the link to the deployed application.

### Extra points

You'll gain extra bonus points and appreciation by having the following:

* [x] TypeScript (use TypeScript instead of JavaScript)
* [x] Custom hook (create a [custom hook](https://reactjs.org/docs/hooks-custom.html) to fetch country data)
  > API class and `CacheStorage` used instead
* [x] MUI (Material UI - [https://mui.com/](https://mui.com/) )
* [x] File structure (organize files)
* [x] Clean code
* [x] Good styling
  > Enforced code style (ESlint and prettier)
* [x] Application optimization: [useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback), [useMemo](https://reactjs.org/docs/hooks-reference.html#usememo), Debounce (for user input)
  > Debounce used in [Header](src/components/header.tsx)
* [x] Redux (use Redux, Redux Toolkit, or Context API for managing state)
  > React Context API
* [ ] Testing (Front end Testing: Testing-library/react, Cypress, Jest or any other framework/library)
  > TODO: vitest
* [ ] Sorting by country name
  > TODO

## Also done

* Custom error page
* Layouts and nested routes support
* Enforce code style