import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = theme => ({
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100vh',
		backgroundColor: theme.palette.primary.main,
	},
	link: {
		color: theme.palette.primary.textMain,
	},
	text: {
		color: theme.palette.primary.secondary,
	}
});

class NotFound extends React.Component {
	render() {
		const { classes } = this.props;

		return (
			<div className={classes.container}>
				<div>
					<Typography className={classes.text} align="center" paragraph variant="h3">
						Page not found.
					</Typography>
					<Typography className={classes.text}  align="center" variant="h5">
						Would you like to go to the <Link className={classes.link} to="/">homepage</Link>?
					</Typography>
				</div>
			</div>
		);
	}
}

NotFound.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotFound);