import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// we want this alert to fetch the alert state from redux
// the alertType corresponds to a css class which will style the alert dynamically based on it's type
// we map through the alerts area to generate the jsx so we can display the alerts

const Alert = ({ alerts }) =>
    alerts !== null &&
    alerts.length > 0
    && alerts.map(alert => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
        </div>
    ));

Alert.PropTypes = {
    alerts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect()(Alert);