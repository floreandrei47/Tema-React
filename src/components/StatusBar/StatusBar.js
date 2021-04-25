import React from 'react';
import PropTypes from 'prop-types';
import {Grid , Segment } from 'semantic-ui-react';

const StatusBar=(prop) => {
return(
    <Grid columns={2} className='status-bar'>
        <Grid.Column>
            <Segment basic>
                {prop.title}
            </Segment>
        </Grid.Column>
        <Grid.Column textAlign='right'>
            <Segment basic>
                {prop.children}
            </Segment>
        </Grid.Column>
    </Grid>
);
}

StatusBar.propTypes={
    title: PropTypes.string.isRequired,
}

export default StatusBar;