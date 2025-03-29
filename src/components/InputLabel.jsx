import PropTypes from 'prop-types';

export default function InputLabel(props) {
  return (
    <label className="text-sm font-semibold text-brand-dark-blue" {...props}>
      {props.children}
    </label>
  );
}

InputLabel.propTypes = {
  children: PropTypes.node.isRequired,
};
