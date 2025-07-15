# 🧠 DSA Archives

A developer-friendly web app to browse and search through **my personal solutions** to problems from platforms like **LeetCode**, **GeeksforGeeks**, and others. Solutions are organized by **topic**, **platform**, and **difficulty** — all accessible through an intuitive UI built with **Next.js**, **Tailwind CSS**, **HeroUI**, and **TypeScript**.

---

## 🔍 Features

- ⚡ **Search by URL, keyword, or title** (e.g., "two sum")
- 🗂️ **Structured folder view**: Topic → Platform → Difficulty → Problem
- 🎨 **Syntax-highlighted code** viewer for Java and C++
- 📂 **Live folder data** fetched from a GitHub public repo
- 📦 Minimal API layer using Next.js `app` directory
- 📱 Fully responsive & optimized for mobile

---

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + HeroUI
- **Icons**: React Icons
- **Code Highlighting**: `react-syntax-highlighter`
- **Data Fetching**: Axios + GitHub API

---

## 🗃 Folder Structure (Example)

```bash
dsa_archives/
├── Array/
│   ├── LeetCode/
│   │   ├── Easy/
│   │   │   └── TwoSum/
│   │   │       ├── TwoSum.cpp
│   │   │       └── TwoSum.java
````

> 📎 Metadata is pre-generated using a local script and stored as `metadata.json` for efficient searching.

---

## 📦 Metadata Script

To keep the search fast, a script is used locally to crawl the folder structure and generate a `metadata.json` with:

* `url`: the problem link
* `path`: the GitHub folder path of the solution

> This JSON is uploaded manually to the GitHub repo and used in production.

---

## 🌐 Live Demo

> The project is deployed on [Vercel](https://dsa-archives.vercel.app/).

---

## 🙌 Author

**S. Faizaan Hussain**

* GitHub: [@shahfaiz-07](https://github.com/shahfaiz-07)
* Portfolio: [portfolio-nine-cyan-awvxdg979r.vercel.app](https://portfolio-nine-cyan-awvxdg979r.vercel.app/)

