# 3D Element Showcase Template

This template packages the interactive 3D model (`Untitled.glb`) and its corresponding React Three Fiber scene (`Scene3D.jsx`) in a standalone, modern web application powered by **Vite**, **React 19**, and **Tailwind CSS v4**.

## Folder Structure

```
new-website/
├── public/
│   ├── favicon.svg      # Favicon asset
│   └── Untitled.glb     # The 3D model file
├── src/
│   ├── components/
│   │   └── Scene3D.jsx  # React Three Fiber canvas component
│   ├── App.jsx          # Premium landing page layout using Scene3D
│   ├── index.css        # Tailwind & global stylesheet reset
│   └── main.jsx         # React application entrypoint
├── index.html           # Main HTML document template
├── package.json         # Project dependencies list
└── vite.config.js       # Vite & plugin configurations
```

## Setup & Running Locally

Follow these steps to run the website on your local machine:

1. **Open your terminal** and navigate to this folder:
   ```bash
   cd new-website
   ```

2. **Install the dependencies**:
   ```bash
   npm install
   ```
   *Note: This installs React, Three.js, React Three Fiber, Framer Motion, and Tailwind CSS.*

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open the local url** in your browser (usually `http://localhost:5173`) to view the interactive 3D showcase.

---

## How to Move this Folder to a New Workspace

Because this folder is completely self-contained (it has its own `package.json` and configuration files), you can move the entire `new-website` folder anywhere else on your computer (e.g., to your Desktop or a dedicated projects folder):

1. Right-click the `new-website` folder and select **Cut** (or **Copy**).
2. Navigate to your desired directory and select **Paste**.
3. Open a terminal in that new location, run `npm install`, and then `npm run dev`. It will work perfectly as an independent website!
