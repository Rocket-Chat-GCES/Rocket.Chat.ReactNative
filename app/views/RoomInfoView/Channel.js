/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import I18n from '../../i18n';
import Item from './Item';
import loadRoom from './Services/loadRoom';

const Channel = ({
	room, state, props, setState, theme
}) => {
	const { description, topic, announcement } = room;

	useEffect(() => {
		const subscription = loadRoom(state, props, setState);

		return subscription;
	}, []);
	return (
		<>
			<Item
				label={I18n.t('Description')}
				content={description || `__${ I18n.t('No_label_provided', { label: 'description' }) }__`}
				theme={theme}
				testID='room-info-view-description'
			/>
			<Item
				label={I18n.t('Topic')}
				content={topic || `__${ I18n.t('No_label_provided', { label: 'topic' }) }__`}
				theme={theme}
				testID='room-info-view-topic'
			/>
			<Item
				label={I18n.t('Announcement')}
				content={announcement || `__${ I18n.t('No_label_provided', { label: 'announcement' }) }__`}
				theme={theme}
				testID='room-info-view-announcement'
			/>
			<Item
				label={I18n.t('Broadcast_Channel')}
				content={room.broadcast && I18n.t('Broadcast_channel_Description')}
				theme={theme}
				testID='room-info-view-broadcast'
			/>
		</>
	);
};
Channel.propTypes = {
	room: PropTypes.object,
	theme: PropTypes.string
};

export default Channel;
