import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { store } from './app/store.js'
import { Provider } from 'react-redux'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

console.log("TEST VALUE:", import.meta.env.VITE_TEST_VALUE);
if (!PUBLISHABLE_KEY) {
  console.log("Clerk key:", PUBLISHABLE_KEY);
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
    </BrowserRouter>,
)