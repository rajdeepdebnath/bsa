create PROCEDURE sp_ind_state(IN ind_id integer)
LANGUAGE sql
AS $$
    with ind_state as (
		select ind.id as ind_id, st.id as st_id
		from 
		(select id, geo_location from "Individual" where id=ind_id) as ind,
		(select id, geo_map from "State") as st
		where ST_Intersects(ind.geo_location, st.geo_map)
	)
	update "Individual"
	set state_id = (select st_id from ind_state)
	where id=(select ind_id from ind_state);
$$;