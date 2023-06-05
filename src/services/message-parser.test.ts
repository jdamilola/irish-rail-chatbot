import { processStationListMessages, parseMessageContent } from './message-parser';
import { IMessage, MessageType } from '../types';
import { getDartStations } from './irishrail';

import '@testing-library/jest-dom';

describe('message-parser', () => {
  test('processStationListMessages returns list of messages', () => {
    const stations = getDartStations();
    const updateMessages = jest.fn();
    processStationListMessages(stations, updateMessages);
    expect(updateMessages).toHaveBeenCalledWith([{
      htmlContent: expect.stringContaining('Below is the list of possible DART stations:'),
      type: MessageType.BOT
    }]);
  });
  
  test('parseMessageContent returns list of messages for station name', () => {
    const stationName = 'Howth';
    const updateMessages = jest.fn();
    parseMessageContent(stationName, updateMessages);
    expect(updateMessages).toHaveBeenCalledWith(expect.arrayContaining([{
      htmlContent: expect.stringContaining(`Below are the next DART train times available at <strong>${stationName}</strong>.`),
      type: MessageType.BOT
    }]));
  });
});

