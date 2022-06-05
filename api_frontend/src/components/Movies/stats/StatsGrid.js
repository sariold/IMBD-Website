import React from 'react';
import StatsItem from './StatsItem'

/**
 * Grid of statistics of an actor
 * 
 * @param {stats} param0 Stats contains mean, median and standard deviation
 */
const StatsGrid = ({stats}) => {
    return (
        <section className="center">
            <StatsItem stats={stats} />
        </section>
    )
}

export default StatsGrid;
