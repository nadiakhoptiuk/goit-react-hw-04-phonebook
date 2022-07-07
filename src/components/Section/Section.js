import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '../Container';
import s from './Section.module.css';

export default class Section extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const { title, children } = this.props;
    return (
      <section className={s.section}>
        <Container>
          <h1 className={s.title}>{title}</h1>
          {children}
        </Container>
      </section>
    );
  }
}
