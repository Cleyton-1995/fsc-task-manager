import PropTypes from 'prop-types';

export default function Header(props) {
  return <header className="header">{props.children}</header>;
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
};
