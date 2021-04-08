import RocketChat from '../../../lib/rocketchat';
import log from '../../../utils/log';
import setHeader from '../Components/header';


const loadRoom = async(state, props, setState) => {
	const { room: roomState } = state;
	const { route, editRoomPermission } = props;

	let room = route.params?.room;
	const permissions = await RocketChat.hasPermission([editRoomPermission], room.rid);
	if (permissions[0] && !room.prid) {
		setState({ showEdit: true }, () => setHeader(state, props));
	}

	if (room && room.observe) {
		const roomObservable = room.observe();
		return roomObservable
			.subscribe((changes) => {
				setState({ room: changes }, () => setHeader(state, props));
			});
	} else {
		try {
			const result = await RocketChat.getRoomInfo(props.route.params?.rid);
			if (result.success) {
				({ room } = result);
				setState({ room: { ...roomState, ...room } });
			}
		} catch (e) {
			log(e);
		}
	}

	return null;
};

export default loadRoom;
