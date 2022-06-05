import React from "react";

/**
 * Statistics of an actor
 * 
 * @param {stats} param0 Stats contains mean, median and standard deviation
 */
const StatsItem = ({ stats }) => {
	return (
			<div className="list">
				{stats.mean != null && 
					<ul>
						<li>
							<strong>Mean:</strong> {stats.mean}
						</li>
						<li>
							<strong>Median:</strong> {stats.median}
						</li>
						<li>
							<strong>Standard deviation:</strong> {stats.standard_deviation}
						</li>
					</ul>
				}
			</div>
	);
};

export default StatsItem;
