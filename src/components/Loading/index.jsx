import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = theme => ({
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100vh',
		backgroundColor: theme.palette.primary.main,
	},
	text: {
		color: theme.palette.primary.secondary,
	}
});

class Loading extends React.Component {
	render() {
		const { classes } = this.props;

		return (
			<div className={classes.container}>
				<div>
					<Typography className={classes.text} align="center" paragraph variant="h3">
						Loading...
					</Typography>
				</div>
			</div>
		);
	}
}

Loading.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loading);