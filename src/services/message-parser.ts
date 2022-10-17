import { IMessage, MessageType, Station } from '../types';
import { getDartStations, getStationDataByName } from './irishrail';

const processStationListMessages = (stations: Station[], updateMessages: (messages: IMessage[]) => void) => {
    let htmlContent = 'Below is the list of possible DART stations:<br />';
    stations.forEach((station, index) => {
        htmlContent += `<br />${index + 1}. ${station.name} (${station.code})<br />`;
    });

    updateMessages([{
        htmlContent,
        type: MessageType.BOT
    }]);
}

const processStationDataMessages = async (station: Station, updateMessages: (messages: IMessage[]) => void) => {
    const stationData = await getStationDataByName(station.name);

    const nextDartTrains = stationData.trains.filter(train => (train.type.toLowerCase().includes('dart') && train.destination !== stationData.name));
    if (nextDartTrains.length > 0) {
        let htmlContent = nextDartTrains.length > 1 ? 'Below are the next DART train times' : 'Below is the next DART train time';
        htmlContent += ` available at <strong>${stationData.name}</strong>.`;

        const messages = [{
            htmlContent,
            type: MessageType.BOT
        }];

        nextDartTrains.splice(0, 2).forEach(train => {
            htmlContent = `
                <strong>Train ID:</strong> ${train.code}<br />
                <strong>Origin:</strong> ${train.origin}<br />
                <strong>Destination:</strong> ${train.destination}<br />
                <strong>Departure Time:</strong> ${train.late === '0' ? train.scheduledDeparture : train.expectedDeparture}<br />
                <strong>Due In:</strong> ${train.dueIn} mins<br />
                <strong>Arrival Time:</strong> ${train.destinationTime}<br />
                <strong>Direction:</strong> ${train.direction}<br />
                <strong>Latest Info:</strong> ${train.lastLocation || 'N/A'}
            `;

            messages.push({
                htmlContent,
                type: MessageType.BOT
            });
        });

        updateMessages(messages);
    } else {
        updateMessages([{
            htmlContent: `There is no DART train available at <strong>${station.name}</strong>.`,
            type: MessageType.BOT,
        }]);
    }
}

export const parseMessageContent = async (content: string, updateMessages: (messages: IMessage[]) => void) => {
    content = content.toLowerCase();

    const stations = await getDartStations();

    if (content.includes('list') && content.includes('station')) {
        processStationListMessages(stations, updateMessages);

        return;
    }

    const station = stations.find(station => {
        const testName = new RegExp(station.name, 'i').test(content);
        const testCode = new RegExp(station.code, 'i').test(content);

        return testName || testCode;
    });

    if (station && station.name) {
        await processStationDataMessages(station, updateMessages);
        return;
    }

    updateMessages([{
        content: 'Sorry, I don\'t know how to answer that.',
        type: MessageType.BOT,
    }]);
}