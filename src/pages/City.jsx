import React from "react";

import data from "../sample-data";

import Nav from "../components/Nav";
import Current from "../components/Current";
import Time from "../components/Time";
import Today from "../components/Today";
import Daily from "../components/Daily";

import {
  Loading, // small div to wrap text when loading data
  CityContainer, // wraps the entire content in this component
  CityBackground, // displays a background image covering whole page
  Forecast // Wrapper for when showing the Daily components
} from "../elements/city";

export default () => "theClima";