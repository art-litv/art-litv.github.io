import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import store from './store';

import Header from './components/Header';
import DepartureSearchResults from './components/SearchResults/DepartureSearchResults';
import ArrivalSearchResults from './components/SearchResults/ArrivalSearchResults';

import { MainPage, NotFoundPage } from './pages';

export default function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />}>
              <Route
                path="departures"
                element={<DepartureSearchResults className="main-page__search-results" />}
              />
              <Route
                path="arrivals"
                element={<ArrivalSearchResults className="main-page__search-results" />}
              />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}
