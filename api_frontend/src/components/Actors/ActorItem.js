import React from "react";

/**
 * Information that is displayed for every movie containing a queried actor
 * 
 * @param {item} param0 movie object 
 */
const ActorItem = ({ item }) => {
	return (
		<div className="card">
			<div className="card-inner">
				<div className="card-front">
					<img src={item.img_url} alt="" />
				</div>
				<div className="card-back">
					<h1>{item.title}</h1>
					<ul>
						<li>
							<strong>
								IMDb URL: <a href={item.imdb_url}>Click here</a>
							</strong>
						</li>
						<li>
							<strong>Runtime:</strong> {item.runtime}
						</li>
						<li>
							<strong>
								Actors: <br/>
							</strong>
							{item.actors.join(", ")}
						</li>
						<li>
							<strong>
								<a href={"/movies/" + item._id}>
									View more details
								</a>
							</strong>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default ActorItem;
