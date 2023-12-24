import PropTypes from "prop-types";

function Card({ children }) {
  return <div className="rounded-md border shadow-lg p-2">{children}</div>;
}

Card.propTypes = {
  children: PropTypes.any,
};

export default Card;
