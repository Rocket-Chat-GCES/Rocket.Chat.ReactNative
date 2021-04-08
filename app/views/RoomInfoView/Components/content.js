import React from 'react';
import Livechat from '../Livechat';
import Channel from '../Channel';
import Direct from '../Direct';

const Content = (room, roomUser, state, props, setState, theme) => {
	if (room.t === 'd') {
		return <Direct state={state} props={props} setState={setState} roomUser={roomUser} theme={theme} />;
	} else if (room.t === 'l') {
		return <Livechat state={state} props={props} setState={setState} room={room} roomUser={roomUser} theme={theme} />;
	}
	return <Channel state={state} props={props} setState={setState} room={room} theme={theme} />;
};

export default Content;
