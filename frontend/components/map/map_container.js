import { connect } from 'react-redux';
import { fetchLocation } from '../../actions/event_actions';

import Map from './map';

const mapStateToProps = (state) => ({
  center: state.ui.location
});

export default connect(
  mapStateToProps,
  null
)(Map)
