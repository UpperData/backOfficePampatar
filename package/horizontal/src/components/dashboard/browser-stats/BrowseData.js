import React from 'react';
import PropTypes from 'prop-types';

class BrowseData extends React.Component {
  render() {
    const image = <img src={this.props.image} alt="logo" />;
    const content = <span className="ml-3 text-dark font-16">{this.props.content}</span>;

    const badge = (
      <span className="text-dark font-16">
        {this.props.badge}
      </span>
    );
    return (
      /*--------------------------------------------------------------------------------*/
      /* Component Html                                                                 */
      /*--------------------------------------------------------------------------------*/
      <div className="d-flex align-items-center mt-3 py-2">
        <div>
          {image}
          {content}
        </div>
        <div className="ml-auto">{badge}</div>
      </div>
    );
  }
}

BrowseData.defaultProps = {
  badgeColor: 'primary'
};

BrowseData.propTypes = {
  image: PropTypes.string,
  content: PropTypes.string,
  badge: PropTypes.string
};

export default BrowseData;
