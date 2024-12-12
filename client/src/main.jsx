  // // src/index.js
  // import { StrictMode } from 'react';
  // import { createRoot } from 'react-dom/client';
  // import './index.css';
  // import App from './App.jsx';
  // import { Provider } from "react-redux";
  // import store from './Store/index.js';
  // import { BrowserRouter as Router } from 'react-router-dom';

  // createRoot(document.getElementById('root')).render(
  //   <StrictMode>
  //     <Provider store={store}>  {/* Providing the Redux store */}
  //       <Router>                {/* Wrapping the app with Router */}
  //         <App />
  //       </Router>
  //     </Provider>
  //   </StrictMode>
  // );


  import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from "react-redux";
import store from './Store/index.js';
import { BrowserRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Router> {/* Top-level Router */}
        <App />
      </Router>
    </Provider>
  </StrictMode>
);
