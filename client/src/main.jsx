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


//   import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// import App from './App.jsx';
// import { Provider } from "react-redux";
// import store from './Store/index.js';
// import { BrowserRouter as Router } from 'react-router-dom';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Provider store={store}>
//       <Router> {/* Top-level Router */}
//         <ErrorBo
//         <App />
//       </Router>
//     </Provider>
//   </StrictMode>
// );

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import store from './store';

// ✅ Your Error Boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong.</h2>;
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <ErrorBoundary> {/* ✅ Fixed Tag Here */}
          <App />
        </ErrorBoundary>
      </Router>
    </Provider>
  </StrictMode>
);
