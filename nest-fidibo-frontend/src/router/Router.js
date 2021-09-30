import React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import Answer from "../views/Answer";
import Questions from "../views/Questions";
import Random from "../views/Random";
import Reports from "../views/Reports";
import Students from "../views/Students";

const Router = () => {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">students</Link>
          </li>
          <li>
            <Link to="/questions">questions</Link>
          </li>
          <li>
            <Link to="/reports">reports</Link>
          </li>
          <li>
            <Link to="/random-numbers">random</Link>
          </li>
          <li>
            <Link to="/answer">answer</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/">
          <Students />
        </Route>
        <Route exact path="/questions">
          <Questions />
        </Route>
        <Route exact path="/reports">
          <Reports />
        </Route>
        <Route exact path="/random-numbers">
          <Random />
        </Route>
        <Route exact path="/answer">
          <Answer />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
