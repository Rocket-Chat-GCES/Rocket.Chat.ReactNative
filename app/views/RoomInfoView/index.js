/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { View, ScrollView } from 'react-native';

import { connect } from 'react-redux';
import styles from './styles';
import RocketChat from '../../lib/rocketchat';

import StatusBar from '../../containers/StatusBar';
import { themes } from '../../constants/colors';
import { withTheme } from '../../theme';

import SafeAreaView from '../../containers/SafeAreaView';
import getRoomTitle from './Components/roomTitle';
import setHeader from './Components/header';
import renderContent from './Components/content';
import renderButtons from './Components/Buttons';
import goRoom from './Services/goRoom';
import Avatar from './Components/avatar';
import createDirect from './Services/createDirect';

class RoomInfoView extends React.Component {
	constructor(props) {
		super(props);
		const room = props.route.params?.room;
		const roomUser = props.route.params?.member;
		this.rid = props.route.params?.rid;
		this.t = props.route.params?.t;
		this.state = {
			room: room || { rid: this.rid, t: this.t },
			roomUser: roomUser || {},
			showEdit: false
		};
	}

	componentDidMount() {
		setHeader(this.state, this.props, this.setState);
	}

	render() {
		const { room, roomUser } = this.state;
		const { theme, jitsiEnabled } = this.props;
		return (
			<ScrollView style={[styles.scroll, { backgroundColor: themes[theme].backgroundColor }]}>
				<StatusBar />
				<SafeAreaView
					style={{ backgroundColor: themes[theme].backgroundColor }}
					testID='room-info-view'
				>
					<View style={[styles.avatarContainer, { backgroundColor: themes[theme].auxiliaryBackground }]}>
						<Avatar room={room} roomUser={roomUser} roomType={this.t} />
						<View style={styles.roomTitleContainer}>{ getRoomTitle(room, this.t, roomUser?.name, roomUser?.username, roomUser?.statusText, theme) }</View>
						{renderButtons(room.t === 'd', () => createDirect(this.setState, this.props), jitsiEnabled, () => RocketChat.callJitsi(room), () => goRoom(this.state, this.props))}
					</View>
					{renderContent(room, roomUser, this.state, this.props, this.setState, theme)}
				</SafeAreaView>
			</ScrollView>
		);
	}
}

const mapStateToProps = state => ({
	rooms: state.room.rooms,
	isMasterDetail: state.app.isMasterDetail,
	jitsiEnabled: state.settings.Jitsi_Enabled || false,
	editRoomPermission: state.permissions['edit-room']
});

export default connect(mapStateToProps)(withTheme(RoomInfoView));
