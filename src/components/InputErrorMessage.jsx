import PropTypes from 'prop-types';

export default function InputErrorMessage({ children }) {
  return <p className="text-left text-xs text-red-500">{children}</p>;
}

InputErrorMessage.propTypes = {
  children: PropTypes.node.isRequired,
};
