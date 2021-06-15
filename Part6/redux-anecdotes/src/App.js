import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { initAnecdotes } from "./reducers/anecdoteReducer";
import {
  GlobalStyles,
  Wrapper,
  MainHeading,
} from "./components/StyledComponents";
import ProgressBar from "./components/ProgressBar";
import Notification from "./components/Notification";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import ModalSpinner from "./components/ModalSpinner";
import Filter from "./components/Filter";

const App = ({ isFetchingAnecdotes, initAnecdotes }) => {
  useEffect(() => {
    initAnecdotes();
  }, [initAnecdotes]);

  return (
    <>
      <GlobalStyles />
      <ProgressBar />
      <Wrapper>
        <MainHeading>Programming Anecdotes</MainHeading>
        <Notification />
        <AnecdoteForm />
        <Filter />
        <AnecdoteList />
        {isFetchingAnecdotes && <ModalSpinner />}
      </Wrapper>
    </>
  );
};

App.propTypes = {
  isFetchingAnecdotes: PropTypes.bool.isRequired,
  initAnecdotes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return { isFetchingAnecdotes: state.requests.initAnecdotes.isLoading };
};

export default connect(mapStateToProps, {
  initAnecdotes,
})(App);
